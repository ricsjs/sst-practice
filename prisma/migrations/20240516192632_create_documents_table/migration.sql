/*
  Warnings:

  - You are about to drop the column `asoId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the `asos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `documentsId` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "asos" DROP CONSTRAINT "asos_empregadoId_fkey";

-- DropForeignKey
ALTER TABLE "asos" DROP CONSTRAINT "asos_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "asos" DROP CONSTRAINT "asos_profissionalId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_asoId_fkey";

-- DropForeignKey
ALTER TABLE "exams" DROP CONSTRAINT "exams_asoId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "asoId",
ADD COLUMN     "documentsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "password_hash" DROP NOT NULL;

-- DropTable
DROP TABLE "asos";

-- DropTable
DROP TABLE "exams";

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "empregadoId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_empregadoId_fkey" FOREIGN KEY ("empregadoId") REFERENCES "empregados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_documentsId_fkey" FOREIGN KEY ("documentsId") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
