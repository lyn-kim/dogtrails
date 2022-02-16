require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();

app.use(jsonMiddleware);
app.use(staticMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "joinedAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/trails', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { trailName, length, difficulty, location, isDeleted } = req.body;
  if (!trailName || !length || !difficulty || !location || !isDeleted) {
    throw new ClientError(400, 'trailName, length, difficulty, location, isDeleted are required fields');
  }

  const url = `/images/${req.file.filename}`;
  const sql = `
    insert into "trails" ("userId", "trailName", "length", "difficulty", "location", "photoUrl", "isDeleted")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [userId, trailName, length, difficulty, location, url, isDeleted];
  db.query(sql, params)
    .then(result => {
      const [trail] = result.rows;
      res.status(201).json(trail);
    })
    .catch(err => next(err));
});

// app.get('/api/images', (req, res, next) => {
//   const sql = `
//     select *
//       from "images"
//   `;
//   db.query(sql)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.get('/api/trails', (req, res, next) => {
//   const { userId } = req.user;
//   const sql = `
//     select *
//       from "flashcards"
//      where "userId" = $1
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => next(err));
// });

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
