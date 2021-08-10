CREATE TYPE "roles" AS ENUM (
  'GUEST',
  'DONOR',
  'AGENCY'
);

CREATE TYPE "agency_roles" AS ENUM (
  'OWNER',
  'MEMBER'
);

CREATE TYPE "wishcard_status" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'DONATED'
);

CREATE TYPE "donation_status" AS ENUM (
  'DONATED',
  'SHIPPED',
  'ARRIVED'
);

CREATE TYPE "gender" AS ENUM (
  'MALE',
  'FEMALE',
  'OTHER'
);

CREATE TYPE "animal_type" AS ENUM (
  'DOG',
  'CAT',
  'OTHER'
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "email" varchar UNIQUE NOT NULL,
  "uid" varchar UNIQUE NOT NULL,
  "role" roles NOT NULL DEFAULT 'DONOR',
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "agencyMember" (
  "userId" int NOT NULL,
  "agencyId" int NOT NULL,
  "agencyRole" agency_roles DEFAULT 'MEMBER',
  PRIMARY KEY ("userId", "agencyId")
);

CREATE TABLE "agency" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL,
  "bio" varchar,
  "isVerified" boolean DEFAULT false,
  "phone" varchar,
  "website" varchar,
  "createdBy" int NOT NULL,
  "addressId" int NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "wishcard" (
  "id" int PRIMARY KEY,
  "imagePath" varchar NOT NULL,
  "itemPrice" float NOT NULL,
  "itemUrl" varchar NOT NULL,
  "entityId" int NOT NULL,
  "agencyId" int NOT NULL,
  "createdBy" int NOT NULL,
  "addressId" int NOT NULL,
  "isLockedBy" int,
  "isLockedUntil" timestamp,
  "status" wishcard_status NOT NULL DEFAULT 'DRAFT',
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "child" (
  "id" int PRIMARY KEY,
  "birthday" date,
  "gender" gender,
  "firstName" varchar NOT NULL,
  "lastName" varchar,
  "interest" varchar,
  "bio" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "animal" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL,
  "gender" gender NOT NULL DEFAULT 'OTHER',
  "type" animal_type,
  "breed" varchar,
  "age" int,
  "bio" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "images" (
  "id" int PRIMARY KEY,
  "wishcardId" int NOT NULL,
  "path" varchar NOT NULL
);

CREATE TABLE "address" (
  "id" int PRIMARY KEY,
  "address1" varchar NOT NULL,
  "address2" varchar,
  "city" varchar NOT NULL,
  "country" varchar NOT NULL,
  "state" varchar NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "message" (
  "id" int PRIMARY KEY,
  "userId" int NOT NULL,
  "wishcardId" int NOT NULL,
  "message" varchar NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "donation" (
  "id" int PRIMARY KEY,
  "wishcardId" int NOT NULL,
  "userId" int NOT NULL,
  "donationPrice" float NOT NULL,
  "status" donation_status NOT NULL DEFAULT 'DONATED',
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

ALTER TABLE "agencyMember" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "agencyMember" ADD FOREIGN KEY ("agencyId") REFERENCES "agency" ("id");

ALTER TABLE "agency" ADD FOREIGN KEY ("createdBy") REFERENCES "user" ("id");

ALTER TABLE "agency" ADD FOREIGN KEY ("addressId") REFERENCES "address" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("entityId") REFERENCES "child" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("entityId") REFERENCES "animal" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("agencyId") REFERENCES "agency" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("createdBy") REFERENCES "user" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("addressId") REFERENCES "address" ("id");

ALTER TABLE "wishcard" ADD FOREIGN KEY ("isLockedBy") REFERENCES "user" ("id");

ALTER TABLE "images" ADD FOREIGN KEY ("wishcardId") REFERENCES "wishcard" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("wishcardId") REFERENCES "wishcard" ("id");

ALTER TABLE "donation" ADD FOREIGN KEY ("wishcardId") REFERENCES "wishcard" ("id");

ALTER TABLE "donation" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

CREATE INDEX ON "user" ("uid");

CREATE INDEX ON "user" ("email");

CREATE INDEX ON "wishcard" ("agencyId");

CREATE INDEX ON "wishcard" ("createdBy");

CREATE INDEX ON "wishcard" ("status");

CREATE INDEX ON "images" ("wishcardId");

CREATE INDEX ON "message" ("wishcardId");

CREATE INDEX ON "message" ("userId");

CREATE INDEX ON "donation" ("wishcardId");

CREATE INDEX ON "donation" ("userId");
