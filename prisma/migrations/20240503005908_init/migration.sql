-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(128) NOT NULL,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "deletedAt" DATE,
    "active" BOOLEAN DEFAULT true,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(128) NOT NULL,
    "number" INTEGER NOT NULL,
    "district" VARCHAR(128) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "deletedAt" DATE,
    "active" BOOLEAN DEFAULT true,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- CreateIndex
CREATE UNIQUE INDEX "people_phone_key" ON "people"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_district_key" ON "addresses"("district");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_city_key" ON "addresses"("city");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_state_key" ON "addresses"("state");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
