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
import { verifyUserRole } from "../middlewares/verify-user-role";
import { profile } from "../controllers/users-controllers/get-user-profile";
import { fetchAllCards } from "../controllers/card-controllers/fetch-all-cards";
import { fetchCardById } from "../controllers/card-controllers/fetch-card-by-id";

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/profile", profile);

  // employees requests
  app.post("/employees", {onRequest: [verifyUserRole('COMPANY')]}, createEmployee);
  app.get("/employees/:companyId", {onRequest: [verifyUserRole('COMPANY')]}, fetchAllEmployees);
  app.get("/employee/:id", {onRequest: [verifyUserRole('COMPANY')]}, fetchEmployeeById);
  app.put("/employee/delete/:id", {onRequest: [verifyUserRole('COMPANY')]}, deleteEmployees);
  app.put("/employees/update/:id", {onRequest: [verifyUserRole('COMPANY')]}, updateEmployees);

  // companies requests
  app.post("/companies", {onRequest: [verifyUserRole('ADMIN')]}, createCompany);
  app.get("/companies", {onRequest: [verifyUserRole('ADMIN')]}, fetchAllCompanies);
  app.get("/companies/:id", {onRequest: [verifyUserRole('ADMIN')]}, deleteCompany);
  app.put("/companie/delete/:id", {onRequest: [verifyUserRole('ADMIN')]}, deleteCompany);
  app.put("/companies/update/:id", {onRequest: [verifyUserRole('ADMIN')]}, updateCompany);

  // units requests
  app.post("/units", {onRequest: [verifyUserRole('COMPANY')]}, createUnit);
  app.get("/units/:companyId", {onRequest: [verifyUserRole('COMPANY')]}, fetchAllUnits);
  app.get("/unit/:id", {onRequest: [verifyUserRole('COMPANY')]}, fetchUnitById);
  app.put("/unit/update/:id", {onRequest: [verifyUserRole('COMPANY')]}, updateUnit);
  app.put("/unit/delete/:id", {onRequest: [verifyUserRole('COMPANY')]}, deleteUnit);

  // professionals requests
  app.post("/professionals", {onRequest: [verifyUserRole('ADMIN')]}, createProfessional);
  app.get("/professionals", {onRequest: [verifyUserRole('ADMIN')]}, fetchAllProfessionals);
  app.get("/professional/:id", {onRequest: [verifyUserRole('ADMIN')]}, fetchProfessionalById);
  app.put("/professional/delete/:id", {onRequest: [verifyUserRole('ADMIN')]}, deleteProfessional);
  app.put("/professional/update/:id", {onRequest: [verifyUserRole('ADMIN')]}, updateProfessional);

  // asos requests
  app.post("/asos", {onRequest: [verifyUserRole('PROFESSIONAL')]}, createAso);
  app.get("/asos/:companyId", {onRequest: [verifyUserRole('PROFESSIONAL')]}, fetchAllAsos);
  app.get("/aso/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, fetchAsoById);
  app.put("/aso/update/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, updateAso);
  app.put("/aso/delete/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, deleteAso);

  // exams requests
  app.post("/exams", {onRequest: [verifyUserRole('PROFESSIONAL')]}, createExam);
  app.get("/exams", {onRequest: [verifyUserRole('PROFESSIONAL')]}, fetchAllExams);
  app.get("/exam/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, fetchExamById);
  app.put("/exam/update/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, updateExam);
  app.delete("/exam/delete/:id", {onRequest: [verifyUserRole('PROFESSIONAL')]}, deleteExam);

  // admin requests
  app.post("/admins", {onRequest: [verifyUserRole('ADMIN')]}, createAdmin);
  app.get("/admins", {onRequest: [verifyUserRole('ADMIN')]}, fetchAllAdmins);
  app.get("/admins/:id", {onRequest: [verifyUserRole('ADMIN')]}, fetchAdminById);
  app.put("/admins/update/:id", {onRequest: [verifyUserRole('ADMIN')]}, updateAdmin);

  // cards requests
  app.get("/cards/:companyId", {onRequest: [verifyUserRole('COMPANY')]}, fetchAllCards);
  app.get("/card/:id", {onRequest: [verifyUserRole('COMPANY')]}, fetchCardById);
}
