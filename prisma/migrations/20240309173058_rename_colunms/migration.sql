/*
  Warnings:

  - You are about to drop the column `funcao` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `sigla` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `profissionais` table. All the data in the column will be lost.
  - Added the required column `acronym` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `function` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `profissionais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profissionais" DROP COLUMN "funcao",
DROP COLUMN "sigla",
DROP COLUMN "titulo",
ADD COLUMN     "acronym" TEXT NOT NULL,
ADD COLUMN     "function" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
