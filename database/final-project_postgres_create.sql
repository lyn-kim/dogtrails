CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."bookmarks" (
	"trailId" integer NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."trails" (
	"trailId" serial NOT NULL,
	"userId" integer NOT NULL,
	"trailName" TEXT NOT NULL,
	"length" integer NOT NULL,
	"difficulty" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"isDeleted" BOOLEAN NOT NULL,
	CONSTRAINT "trails_pk" PRIMARY KEY ("trailId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk0" FOREIGN KEY ("trailId") REFERENCES "trails"("trailId");
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "trails" ADD CONSTRAINT "trails_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
