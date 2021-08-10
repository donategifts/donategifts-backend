CREATE TYPE "ROLES" AS ENUM (
  'GUEST',
  'DONOR',
  'AGENCY'
);

CREATE TYPE "AGENCY_ROLES" AS ENUM (
  'OWNER',
  'MEMBER'
);

CREATE TYPE "WISHCARD_STATUS" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'DONATED'
);

CREATE TYPE "DONATION_STATUS" AS ENUM (
  'DONATED',
  'SHIPPED',
  'ARRIVED'
);

CREATE TYPE "GENDER" AS ENUM (
  'MALE',
  'FEMALE',
  'OTHER'
);

CREATE TYPE "ANIMAL_TYPE" AS ENUM (
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
  "role" ROLES NOT NULL DEFAULT 'donor',
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "agencyMember" (
  "userId" int NOT NULL,
  "agencyId" int NOT NULL,
  "agencyRole" AGENCY_ROLES DEFAULT 'member',
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
  "status" WISHCARD_STATUS NOT NULL DEFAULT 'draft',
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE "child" (
  "id" int PRIMARY KEY,
  "birthday" date,
  "gender" GENDER,
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
  "gender" GENDER NOT NULL DEFAULT 'other',
  "type" ANIMAL_TYPE,
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
  "status" DONATION_STATUS NOT NULL DEFAULT 'donated',
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
