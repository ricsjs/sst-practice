/*
  Warnings:

  - You are about to drop the column `blood_type` on the `empregados` table. All the data in the column will be lost.
  - You are about to drop the column `br_pdh` on the `empregados` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `empregados` table. All the data in the column will be lost.
  - You are about to drop the column `cbo` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `ccr` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `function` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `nis` on the `profissionais` table. All the data in the column will be lost.
  - You are about to drop the column `aso` on the `unidades` table. All the data in the column will be lost.
  - You are about to drop the column `cipa_type` on the `unidades` table. All the data in the column will be lost.
  - You are about to drop the column `cnea` on the `unidades` table. All the data in the column will be lost.
  - You are about to drop the column `num_employees_cipa` on the `unidades` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admission_dt` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cbo` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_function` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `function_start_dt` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `office` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcd` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcd_observation` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `empregados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `profissionais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnae` to the `unidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_contact` to the `unidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "empregados" DROP COLUMN "blood_type",
DROP COLUMN "br_pdh",
DROP COLUMN "phone",
ADD COLUMN     "admission_dt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cbo" TEXT NOT NULL,
ADD COLUMN     "employee_function" TEXT NOT NULL,
ADD COLUMN     "function_start_dt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "office" TEXT NOT NULL,
ADD COLUMN     "pcd" TEXT NOT NULL,
ADD COLUMN     "pcd_observation" TEXT NOT NULL,
ADD COLUMN     "registration" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profissionais" DROP COLUMN "cbo",
DROP COLUMN "ccr",
DROP COLUMN "function",
DROP COLUMN "nis",
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "unidades" DROP COLUMN "aso",
DROP COLUMN "cipa_type",
DROP COLUMN "cnea",
DROP COLUMN "num_employees_cipa",
ADD COLUMN     "cnae" TEXT NOT NULL,
ADD COLUMN     "reference_contact" TEXT NOT NULL;
