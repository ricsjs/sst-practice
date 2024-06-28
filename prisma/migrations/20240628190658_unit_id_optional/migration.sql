-- DropForeignKey
ALTER TABLE "empregados" DROP CONSTRAINT "empregados_unitId_fkey";

-- AlterTable
ALTER TABLE "empregados" ALTER COLUMN "unitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "empregados" ADD CONSTRAINT "empregados_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unidades"("id") ON DELETE SET NULL ON UPDATE CASCADE;
