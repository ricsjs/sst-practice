import { FastifyInstance } from "fastify";
import { createAdmin } from "../controllers/admin-controllers/create-admin";
import { createCompany } from "../controllers/company-controllers/create-company";
import { createEmployee } from "../controllers/employee-controllers/create-employee";
import { createProfessional } from "../controllers/professional-controllers/create-professional";
import { createUnit } from "../controllers/unit-controllers/create-unit";
import { createExam } from "../controllers/exam-controllers/create-exam";
import { createAso } from "../controllers/aso-controllers/create-aso";
import { fetchAllEmployees } from "../controllers/employee-controllers/fetch-all-employees";
import { deleteEmployees } from "../controllers/employee-controllers/delete-employee";
import { updateEmployees } from "../controllers/employee-controllers/update-employee";
import { fetchAllUnits } from "../controllers/unit-controllers/fetch-all-units";
import { fetchUnitById } from "../controllers/unit-controllers/fetch-unit-by-id";
import { updateUnit } from "../controllers/unit-controllers/update-unit";
import { deleteUnit } from "../controllers/unit-controllers/delete-unit";
import { fetchAllCompanies } from "../controllers/company-controllers/fetch-all-companies";
import { deleteCompany } from "../controllers/company-controllers/delete-company";
import { updateCompany } from "../controllers/company-controllers/update-company";
import { fetchEmployeeById } from "../controllers/employee-controllers/fetch-employee-by-id";
import { fetchAllAsos } from "../controllers/aso-controllers/fetch-all-asos";
import { fetchAsoById } from "../controllers/aso-controllers/fetch-aso-by-id";
import { updateAso } from "../controllers/aso-controllers/update-aso";
import { deleteAso } from "../controllers/aso-controllers/delete-aso";
import { fetchAllAdmins } from "../controllers/admin-controllers/fetch-all-admins";
import { fetchAdminById } from "../controllers/admin-controllers/fetch-admin-by-id";
import { updateAdmin } from "../controllers/admin-controllers/update-admin";
import { fetchAllProfessionals } from "../controllers/professional-controllers/fetch-all-professionals";
import { fetchProfessionalById } from "../controllers/professional-controllers/fetch-professional-by-id";
import { deleteProfessional } from "../controllers/professional-controllers/delete-professional";
import { updateProfessional } from "../controllers/professional-controllers/update-professional";
import { fetchAllExams } from "../controllers/exam-controllers/fetch-all-exams";
import { fetchExamById } from "../controllers/exam-controllers/fetch-exam-by-id";
import { updateExam } from "../controllers/exam-controllers/update-exam";
import { deleteExam } from "../controllers/exam-controllers/delete-exam";
import { verifyJWT } from "../middlewares/jwt-verify";

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  // employees requests
  app.post("/employees", createEmployee);
  app.get("/employees/:companyId", fetchAllEmployees);
  app.get("/employee/:id", fetchEmployeeById);
  app.put("/employee/delete/:id", deleteEmployees);
  app.put("/employees/update/:id", updateEmployees);

  // companies requests
  app.post("/companies", createCompany);
  app.get("/companies", fetchAllCompanies);
  app.get("/companies/:id", deleteCompany);
  app.put("/companie/delete/:id", deleteCompany);
  app.put("/companies/update/:id", updateCompany);

  // units requests
  app.post("/units", createUnit);
  app.get("/units/:companyId", fetchAllUnits);
  app.get("/unit/:id", fetchUnitById);
  app.put("/unit/update/:id", updateUnit);
  app.put("/unit/delete/:id", deleteUnit);

  // professionals requests
  app.post("/professionals", createProfessional);
  app.get("/professionals", fetchAllProfessionals);
  app.get("/professional/:id", fetchProfessionalById);
  app.put("/professional/delete/:id", deleteProfessional);
  app.put("/professional/update/:id", updateProfessional);

  // asos requests
  app.post("/asos", createAso);
  app.get("/asos", fetchAllAsos);
  app.get("/aso/:id", fetchAsoById);
  app.put("/aso/update/:id", updateAso);
  app.put("/aso/delete/:id", deleteAso);

  // exams requests
  app.post("/exams", createExam);
  app.get("/exams", fetchAllExams);
  app.get("/exam/:id", fetchExamById);
  app.put("/exam/update/:id", updateExam);
  app.delete("/exam/delete/:id", deleteExam);

  // admin requests
  app.post("/admins", createAdmin);
  app.get("/admins", fetchAllAdmins);
  app.get("/admins/:id", fetchAdminById);
  app.put("/admins/update/:id", updateAdmin);

}
