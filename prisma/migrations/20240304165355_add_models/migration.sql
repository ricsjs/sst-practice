/*
  Warnings:

  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prontuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cards";

-- DropTable
DROP TABLE "clientes";

-- DropTable
DROP TABLE "prontuarios";

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "corporate_reason" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dt_start_esocial" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empregado" (
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

    CONSTRAINT "Empregado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_email_key" ON "empresas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empregado_email_key" ON "Empregado"("email");

-- AddForeignKey
ALTER TABLE "Empregado" ADD CONSTRAINT "Empregado_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
