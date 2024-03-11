-- CreateTable
CREATE TABLE "unidades" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cnea" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "degree_of_risk" TEXT NOT NULL,
    "aso" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "legal_representative" TEXT NOT NULL,
    "cpf_legal_representative" TEXT NOT NULL,
    "cipa_type" TEXT NOT NULL,
    "num_employees_cipa" INTEGER NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "unidades" ADD CONSTRAINT "unidades_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
