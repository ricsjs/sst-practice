import { FastifyInstance } from "fastify";
import { createAdmin } from "../controllers/admin-controllers/create-admin";
import { createCompany } from "../controllers/company-controllers/create-company";
import { createEmployee } from "../controllers/employee-controllers/create-employee";
import { createProfessional } from "../controllers/professional-controllers/create-professional";
import { createUnit } from "../controllers/unit-controllers/create-unit";
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
import { fetchAllAdmins } from "../controllers/admin-controllers/fetch-all-admins";
import { fetchAdminById } from "../controllers/admin-controllers/fetch-admin-by-id";
import { updateAdmin } from "../controllers/admin-controllers/update-admin";
import { fetchAllProfessionals } from "../controllers/professional-controllers/fetch-all-professionals";
import { fetchProfessionalById } from "../controllers/professional-controllers/fetch-professional-by-id";
import { deleteProfessional } from "../controllers/professional-controllers/delete-professional";
import { updateProfessional } from "../controllers/professional-controllers/update-professional";
import { verifyJWT } from "../middlewares/jwt-verify";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { profile } from "../controllers/users-controllers/get-user-profile";
import { fetchAllCards } from "../controllers/card-controllers/fetch-all-cards";
import { fetchCardById } from "../controllers/card-controllers/fetch-card-by-id";
import { fetchCompanyById } from "../controllers/company-controllers/fetch-company-by-id";
import { uploadDocument } from "../controllers/document-controllers/upload";
import { downloadDocument } from "../controllers/document-controllers/download";
import { fetchAllDocumentsByEmployeeId } from "../controllers/document-controllers/fetch-all-documents-by-user-id";

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/profile", profile);
  
  // document requests
  app.post('/uploads', { onRequest: [verifyUserRole(["PROFESSIONAL"])] }, uploadDocument);
  app.get('/document/:id', { onRequest: [verifyUserRole(["PROFESSIONAL", "COMPANY"])] }, downloadDocument);
  app.get('/documents/:employeeId', { onRequest: verifyUserRole(["COMPANY"]) }, fetchAllDocumentsByEmployeeId);

  // employees requests
  app.post(
    "/employees",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    createEmployee
  );
  app.get(
    "/employees/:companyId",
    { onRequest: [verifyUserRole(["COMPANY", "PROFESSIONAL"])] },
    fetchAllEmployees
  );
  app.get(
    "/employee/:id",
    { onRequest: [verifyUserRole(["COMPANY", "PROFESSIONAL"])] },
    fetchEmployeeById
  );
  app.put(
    "/employee/delete/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    deleteEmployees
  );
  app.put(
    "/employees/update/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    updateEmployees
  );

  // companies requests
  app.post(
    "/companies",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    createCompany
  );
  app.get(
    "/companies",
    { onRequest: [verifyUserRole(["ADMIN", "PROFESSIONAL"])] },
    fetchAllCompanies
);
  app.get(
    "/company/:id",
    { onRequest: [verifyUserRole(["ADMIN", "PROFESSIONAL"])] },
    fetchCompanyById
  );
  app.put(
    "/company/delete/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    deleteCompany
  );
  app.put(
    "/company/update/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    updateCompany
  );

  // units requests
  app.post("/units", { onRequest: [verifyUserRole(["COMPANY"])] }, createUnit);
  app.get(
    "/units/:companyId",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    fetchAllUnits
  );
  app.get(
    "/unit/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    fetchUnitById
  );
  app.put(
    "/unit/update/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    updateUnit
  );
  app.put(
    "/unit/delete/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    deleteUnit
  );

  // professionals requests
  app.post(
    "/professionals",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    createProfessional
  );
  app.get(
    "/professionals",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    fetchAllProfessionals
  );
  app.get(
    "/professional/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    fetchProfessionalById
  );
  app.put(
    "/professional/delete/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    deleteProfessional
  );
  app.put(
    "/professional/update/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    updateProfessional
  );

  // admin requests
  app.post("/admins", { onRequest: [verifyUserRole(["ADMIN"])] }, createAdmin);
  app.get("/admins", { onRequest: [verifyUserRole(["ADMIN"])] }, fetchAllAdmins);
  app.get(
    "/admins/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    fetchAdminById
  );
  app.put(
    "/admins/update/:id",
    { onRequest: [verifyUserRole(["ADMIN"])] },
    updateAdmin
  );

  // cards requests
  app.get(
    "/cards/:companyId",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    fetchAllCards
  );
  app.get(
    "/card/:id",
    { onRequest: [verifyUserRole(["COMPANY"])] },
    fetchCardById
  );
}
