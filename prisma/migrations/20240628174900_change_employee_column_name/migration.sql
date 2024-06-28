/*
  Warnings:

  - You are about to drop the column `unidadeId` on the `empregados` table. All the data in the column will be lost.
  - Added the required column `unitId` to the `empregados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "empregados" DROP CONSTRAINT "empregados_unidadeId_fkey";

-- AlterTable
ALTER TABLE "empregados" DROP COLUMN "unidadeId",
ADD COLUMN     "unitId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "empregados" ADD CONSTRAINT "empregados_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
