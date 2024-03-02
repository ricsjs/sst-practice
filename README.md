# App

SST Practice

## RF

- [ ] Deve ser possível um cliente (empresa) ter login próprio;
- [ ] Deve ser possível um cliente (empresa) cadastrar seus empregados;
- [ ] Deve ser possível um empregado ter login próprio;
- [x] Deve ser possível um administrador ter login próprio;
- [ ] Deve ser possível um administrador fazer um crud de clientes (empresas);
- [ ] Deve ser possível um administrador fazer um crud de cards;
- [ ] Deve ser possível um administrador fazer um crud de profissionais de saúde;
- [ ] Deve ser possível um profissional de saúde ter login próprio;
- [ ] Deve ser possível um profissional de saúde fazer um crud de prontuário;
- [ ] Deve ser possível um administrador visualizar todos os clientes;
- [ ] Deve ser possível um cliente (empresa) acessar seus cards;
- [ ] Deve ser possível um cliente (empresa) checar andamento da documentação.

## RN

- [ ] O sistema deve notificar updates de cards no e-mail do cliente;
- [x] Não deve haver e-mails duplicados no sistema;
- [ ] Clientes (empresas), outros administradores e profissionais de saúde só poderão ser cadastrados por administradores.
- [ ] O empregado só terá acesso ao próprio prontuário;

## RNF

- [x] A senha de todos os usuários do sistema precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT;
- [ ] O administrador deverá fazer login por uma rota /dashboard e o usuário na rota /login;
- [ ] O administrador poderá assinar um documento digitalmente por meio da API de assinatura digital do Gov.