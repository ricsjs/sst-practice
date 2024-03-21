/*
  Warnings:

  - Added the required column `active` to the `asos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asos" ADD COLUMN     "active" BOOLEAN NOT NULL;
