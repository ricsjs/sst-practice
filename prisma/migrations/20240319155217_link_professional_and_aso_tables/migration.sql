/*
  Warnings:

  - Added the required column `profissionalId` to the `asos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asos" ADD COLUMN     "profissionalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "asos" ADD CONSTRAINT "asos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
