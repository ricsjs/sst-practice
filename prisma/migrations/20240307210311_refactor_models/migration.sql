/*
  Warnings:

  - You are about to drop the column `email` on the `empregados` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `empregados` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `empresas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "empregados_email_key";

-- DropIndex
DROP INDEX "empresas_email_key";

-- AlterTable
ALTER TABLE "empregados" DROP COLUMN "email",
DROP COLUMN "password_hash";

-- AlterTable
ALTER TABLE "empresas" DROP COLUMN "email",
DROP COLUMN "password_hash";
