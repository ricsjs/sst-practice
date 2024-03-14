-- CreateTable
CREATE TABLE "asos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "empregadoId" TEXT NOT NULL,
    "physical_occupational_risk" TEXT,
    "chemical_occupational_risk" TEXT,
    "biological_occupational_risk" TEXT,
    "occupational_risk_of_accidents" TEXT,
    "ergonomic_occupational_risk" TEXT,
    "work_at_height" TEXT NOT NULL,
    "selfpropelled_machines" TEXT NOT NULL,
    "working_with_firearms" TEXT NOT NULL,
    "confined_space" TEXT NOT NULL,
    "food_handling" TEXT NOT NULL,
    "electrical_installations_and_services" TEXT NOT NULL,
    "observation" TEXT,
    "conclusion" TEXT,
    "doctor_responsible" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "examining_doctor_fullname" TEXT NOT NULL,
    "examining_doctor_function" TEXT NOT NULL,
    "examining_doctor_crm" TEXT NOT NULL,
    "technical_manager_fullname" TEXT NOT NULL,
    "technical_manager_function" TEXT NOT NULL,
    "technical_manager_crm" TEXT NOT NULL,

    CONSTRAINT "asos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "asoId" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "asos" ADD CONSTRAINT "asos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asos" ADD CONSTRAINT "asos_empregadoId_fkey" FOREIGN KEY ("empregadoId") REFERENCES "empregados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_asoId_fkey" FOREIGN KEY ("asoId") REFERENCES "asos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
