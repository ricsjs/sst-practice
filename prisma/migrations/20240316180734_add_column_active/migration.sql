/*
  Warnings:

  - Added the required column `active` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `unidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "empregados" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "profissionais" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "unidades" ADD COLUMN     "active" BOOLEAN NOT NULL;
