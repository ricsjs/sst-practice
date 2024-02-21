# App

SST Practice

## RF

- [ ] Deve ser possível se autenticar no sistema (administrador e cliente);
- [ ] Deve ser possível um administrador cadastrar outro administrador;
- [ ] Deve ser possível um administrador cadastrar um cliente;
- [ ] Deve ser possível um administrador visualizar todos os clientes;
- [ ] Deve ser possível um administrador criar um card para um cliente;
- [ ] Deve ser possível um administrador criar um prontuário para um cliente;
- [ ] Deve ser possível um cliente acessar seus cards;
- [ ] Deve ser possível um cliente checar andamento da documentação.

## RN

- [ ] O sistema deve notificar updates de cards no e-mail do cliente;
- [ ] Não pode haver e-mails duplicados no sistema;
- [ ] Clientes e outros administradores só podem ser cadastrados por administradores.

## RNF

- [ ] A senha do administrador precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT;
- [ ] O administrador deverá fazer login por uma rota /dashboard e o usuário na rota /login;
- [ ] O administrador poderá assinar um documento digitalmente por meio da API de assinatura digital do Gov.