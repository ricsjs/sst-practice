-- CreateTable
CREATE TABLE "profissionais" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cbo" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "organ" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "ccr" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
