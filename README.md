# App

SST Practice

# Documentação de API

## Rotas públicas

## Autenticação
- **Endpoint:** `/login`
- **Método:** POST
- **Descrição:** Faz a autenticação de um usuário.
- **Corpo da requisição:**
```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

## Rotas privadas

## Perfil
- **Endpoint:** `/profile`
- **Método:** GET
- **Descrição:** Retorna o perfil do usuário.

## Funcionários
- **Endpoint:** `/employees`
- **Método:** POST
- **Descrição:** Faz a criação de um funcionário.
- **Corpo da requisição:**
```json
{
    "companyId": "id_empresa",
    "name" : "nome",
    "cpf" : "cpf",
    "nis" : "nis",
    "rg" : "rg",
    "br_pdh" : "br_pdh",
    "sex" : "sex",
    "dt_birth" : "dt_birth",
    "phone" : "phone",
    "phone_number" : "phone_number",
    "blood_type" : "blood_type"
}
```

---

- **Endpoint:** `/employees/:companyId`
- **Método:** GET
- **Descrição:** Retorna todos os funcionários de uma empresa.

---

- **Endpoint:** `/employee/:id`
- **Método:** GET
- **Descrição:** Retorna um funcionário pelo ID.

---

- **Endpoint:** `/companie/delete/:id`
- **Método:** PUT
- **Descrição:** Delete um funcionário.

---

- **Endpoint:** `/companies/update/:id`
- **Método:** PUT
- **Descrição:** Faz a edição de um funcionário.
- **Corpo da requisição:**
```json
{
    "name": "nome",
    "cpf": "cpf",
    "nis": "nis",
    "rg": "rg",
    "br_pdh": "br_pdh",
    "sex": "sex",
    "dt_birth": "dt_birth",
    "phone": "phone",
    "phone_number": "phone number",
    "blood_type": "blood_type",
    "companyId": "id_empresa"
}
```

## RF

- [x] Deve ser possível os usuários acessarem o sistema;
- [x] Deve ser possível um cliente (empresa) fazer um crud de seus empregados;
- [x] Deve ser possível um administrador fazer um crud de clientes (empresas);
- [x] Deve ser possível um profissional de saúde fazer um crud de cards;
- [x] Deve ser possível um administrador fazer um crud de profissionais de saúde;
- [x] Deve ser possível um profissional de saúde fazer cruds de documentações (ASO e prontuários);
- [x] Deve ser possível filtrar empregados a partir de uma empresa no momento da criação da documentação;
- [x] Deve ser criado um card de notificação após o profissional de saúde cadastrar um documento referente a um empregado;
- [x] Deve ser possível um administrador visualizar todos os clientes;
- [x] Deve ser possível um cliente (empresa) acessar seus cards;
- [x] Deve ser possível um cliente (empresa) visualizar a documentação dos seus empregados;
- [x] Deve ser possível um cliente (empresa) visualizar todos os registros e filtrar tudo referente aos empregados;
- [x] Deve ser possível um usuário resgatar e atualizar informações de perfil;

## RN

- [x] Não deve haver e-mails duplicados no sistema;
- [x] Clientes (empresas), outros administradores e profissionais de saúde só poderão ser cadastrados por administradores.
- [x] A empresa só terá acesso a documentação dos seus empregados;

## RNF

- [x] A senha de todos os usuários do sistema precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT;
- [x] Adicionar uma coluna para verificar se o usuário está ativo ou inativo;
