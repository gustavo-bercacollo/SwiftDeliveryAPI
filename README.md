
# SwiftDeliveryAPI

A SwiftDeliveryAPI é uma aplicação para gerenciar entregas, usuários, sessões e logs de entregas. Desenvolvida com **Node.js**, **TypeScript** e **Prisma ORM**, utiliza autenticação JWT para garantir a segurança do sistema.

---

## Índice

- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
- [Testes](#testes)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Autor](#autor)
- [Contato](#contato)

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Docker](https://www.docker.com/)

---

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/swift-delivery-api.git
   cd swift-delivery-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

---

## Configuração

1. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Preencha as variáveis de ambiente no arquivo `.env`:

   ```env
   DATABASE_URL="postgresql://<USUARIO>:<SENHA>@localhost:5432/SwiftDeliveryAPI?schema=public"
   JWT_SECRET="<SUA_CHAVE_SECRETA>"
   PORT=3000
   ```

3. Inicie o banco de dados PostgreSQL com Docker:

   ```bash
   docker-compose up -d
   ```

4. Configure o banco de dados com Prisma:

   ```bash
   npx prisma migrate dev
   ```

---

## Execução

1. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Ou inicie em modo de produção:

   ```bash
   npm run build
   npm start
   ```

O servidor estará disponível em `http://localhost:<PORT>`.

---

## Estrutura de Pastas

```plaintext
src/
├── controllers/          # Lógica de negócios
├── database/             # Configuração do Prisma
├── middlewares/          # Middlewares de autenticação e erros
├── routes/               # Rotas da API
├── utils/                # Classes auxiliares (ex: AppError)
├── app.ts                # Configuração principal do Express
└── server.ts             # Ponto de entrada do servidor
```

---

## Rotas da API

### Autenticação

| Método | Rota      | Descrição                  | Autorização          |
|--------|-----------|----------------------------|----------------------|
| POST   | /sessions | Login e geração de token JWT | Nenhuma              |

### Usuários

| Método | Rota      | Descrição            | Autorização          |
|--------|-----------|----------------------|----------------------|
| POST   | /users    | Criar um novo usuário | Nenhuma              |

### Entregas

| Método | Rota                     | Descrição                       | Autorização          |
|--------|--------------------------|---------------------------------|----------------------|
| POST   | /deliveries              | Criar uma nova entrega          | Usuário autenticado  |
| GET    | /deliveries              | Listar todas as entregas        | Usuário autenticado  |
| PATCH  | /deliveries/:id/status   | Atualizar o status de uma entrega | Usuário autenticado |

### Logs de Entregas

| Método | Rota                          | Descrição                           | Autorização             |
|--------|-------------------------------|-------------------------------------|-------------------------|
| POST   | /delivery-logs                | Criar um novo log de entrega        | Usuário com papel de sale |
| GET    | /delivery-logs/:delivery_id/show | Listar logs de uma entrega específica | Usuários `customer` ou `sale` |


---
## Insomnia Export

Este repositório inclui um arquivo de exportação do **Insomnia** que contém todas as requisições configuradas para interagir com a API **SwiftDeliveryAPI**. 

### Como Importar

1. Abra o Insomnia.
2. Clique em **Application** > **Preferences** > **Data** > **Import Data** > **From File**.
3. Selecione o arquivo `SwiftDeliveryAPI_Export.json` incluído neste repositório.

### Detalhes

- O arquivo contém requisições para:
  - **Autenticação** (sessões de usuários)
  - **Gerenciamento de entregas**
  - **Logs de entregas**
  - **Gerenciamento de usuários**
- As variáveis de ambiente já estão configuradas para facilitar o uso em ambientes de desenvolvimento local (`http://localhost:3333`).
---

## Rodar os testes

Para executar os testes, utilize o seguinte comando:

```bash
npm run test:dev
```
### Os testes verificam:

- Criação de usuários
- Autenticação e geração de token
- Restrições de acesso baseadas em papéis
- Validações e erros esperados

---

## Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção.
3. Envie um Pull Request detalhado.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## Autor

Feito com 💻 e ☕ por Gustavo. 🚀
 
---

## Contato
Para dúvidas ou sugestões, entre em contato:   
📩 Email: gustavovilela802@gmail.com. 
💼 Linkedin: https://www.linkedin.com/in/gustavo-ber%C3%A7acollo-vilela-1b899125b/
