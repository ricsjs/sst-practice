/*
  Warnings:

  - You are about to drop the column `documentsId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_documentsId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_empregadoId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_profissionalId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "documentsId";

-- DropTable
DROP TABLE "documents";
