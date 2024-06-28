/*
  Warnings:

  - Added the required column `unidadeId` to the `empregados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "empregados" ADD COLUMN     "unidadeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "empregados" ADD CONSTRAINT "empregados_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
