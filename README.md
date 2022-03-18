# DogTrails

### A web application for dog (or any pet) owners who want to explore on-leash, pet-friendly hiking trails.

Hiking and backpacking are two of my favorite hobbies that I enjoy with my adventure-loving rescue, Yani, to relieve stress and spend quality time outdoors! However, I have often found myself sifting through multiple websites before confirming whether a particular trail allows pets on-leash. As a result, my app, DogTrails, was brought to life. With DogTrails, my friends, family and I can keep a record of all pet-friendly trails in one place with easy access.

## Link to deployed project:
https://dogtrails.herokuapp.com/


## Technologies Used:
* React.js
* Node.js
* Express.js
* PostgreSQL
* JavaScript
* CSS3
* HTML5
* AWS S3
* Babel
* Webpack
* Argon2
* dotenv
* Pgweb
* Heroku


## Finished Features List:
* User can submit a trail
* User can see a list of all submitted trails (`Explore` link on main page)
* User can search trails by keyword
* User can see a list of trails that contain keyword
* User can see a list of trails submitted by them (`My List` on menu drawer)
* User can delete trails submitted by them
* User can sign up
* User can log in
* User can sign out


## Stretch Features Coming Soon:
* User can click on the address to open their google maps for driving directions
* User can bookmark trails
* User can see a list of their bookmarked trails
  
  
## Demo - User can submit a new trail(s) :
![demo-submit](https://user-images.githubusercontent.com/89041368/157511895-c8c1049e-9342-450b-85e3-c214e88179c2.gif)


## Demo - User can search trails by keyword :
![demo-search](https://user-images.githubusercontent.com/89041368/157511921-8d60f343-f3f9-461a-9fe0-7ad2980d9886.gif)


## Getting Started

1. Clone the repository.
    ```shell
    git clone git@github.com:lyn-kim/dogtrails.git
    cd dogtrails
    ```
2. Install all dependencies with npm.
    ```shell
    npm install
    ```
3. Create an [AWS account](https://aws.amazon.com/free/) then create an [IAM user](https://console.aws.amazon.com/iam/home) for S3.
   * Open IAM service in your AWS page.
   * From the left column, click on the `Users` link and then `Add users`.
   * Enter a username for the user.
   * For the AWS access type, check the `Access key` option for programmatic access.
   * Click `Next: Permissions`.
   * You have three options for `Set permissions`. Select `Attach existing policies directly`.
   * Filter the policies to file the `AmazonS3FullAccess` policy and check its box.
   * Skip through the `Tags` step to `Review`.
   * Create the user.
   * You will be shown an `access key id` and a `secret access key`. Copy these to a safe place that only you can access.
   * Done creating the user!
   * ![IAM-direction](https://user-images.githubusercontent.com/89041368/158915105-51276f93-4d93-453f-b8db-54ef0ef9cac4.png)

4. Create a [S3 bucket](https://console.aws.amazon.com/s3/home) for storing your uploads.
   * Click the `Create bucket` button.
   * Pick a unique name for your bucket.
   * Under Object Ownership, choose `ACLs enabled` and `Bucket owner preferred`.
   * `Uncheck` the option to Block *all* public access. Leave the other boxes unchecked as well.
   * Check the box that acknowledges public objects in the bucket.
   * Click Create bucket at the bottom of the page.
   * ![s3-bucket-directions](https://user-images.githubusercontent.com/89041368/158914286-e232ccbb-32d6-4e15-89c8-fd4d5dcdb454.JPG)

5. Create a new database with PostgreSQL.
    ```shell
    createdb trailApp
    ```
6. Copy the `.env.example` into `.env` and enter your own AWS credentials (access keys and s3 bucket name) and database url.
    ```shell
    cp .env.example .env
    ```
    Note: DATABASE_URL in `.env` should be updated to `postgres://dev:dev@localhost/trailApp`.
    
7. Import the database template into PostgreSQL.
    ```shell
    npm run db:import
    ```
8. Start your `postgresql` service in a separate terminal.
    ```shell
    sudo service postgresql start
    ```
9. Gain access to pgweb database by creating a new user.
    ```shell
    createuser dev
    ```
10. Launch the `pgweb` PostgreSQL database client GUI to review your database at `http://localhost:8081`.
    ```shell
    pgweb --db=trailApp
    ```
11. Build your main.js script with npm.
    ```shell
    npm run build
    ```
12. Start your project and open `http://localhost:3000` in the browser.
    ```shell
    npm run dev
    ```
13. Start adding some trails!
