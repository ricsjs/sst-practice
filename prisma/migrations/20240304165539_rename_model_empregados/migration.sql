/*
  Warnings:

  - You are about to drop the `Empregado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Empregado" DROP CONSTRAINT "Empregado_empresaId_fkey";

-- DropTable
DROP TABLE "Empregado";

-- CreateTable
CREATE TABLE "empregados" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "br_pdh" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dt_birth" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "empregados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empregados_email_key" ON "empregados"("email");

-- AddForeignKey
ALTER TABLE "empregados" ADD CONSTRAINT "empregados_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
