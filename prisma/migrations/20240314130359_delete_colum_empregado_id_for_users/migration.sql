/*
  Warnings:

  - You are about to drop the column `userId` on the `empregados` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "empregados" DROP CONSTRAINT "empregados_userId_fkey";

-- AlterTable
ALTER TABLE "empregados" DROP COLUMN "userId";
