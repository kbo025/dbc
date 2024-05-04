/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `people` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "people_phone_key";

-- AlterTable
ALTER TABLE "people" ADD COLUMN     "cpf" VARCHAR(12) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "people_cpf_key" ON "people"("cpf");
