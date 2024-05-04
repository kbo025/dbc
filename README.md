
# DBC Project

API que consta de 4 enpoints de duas entidades Person e Address, continua um manual de intalação local para testar: 

## Tech Stack

**Server:** NodeJs 18.18.2, postgres 14.11.0


## Run Locally

Clone the project

```bash
  git clone https://github.com/kbo025/dbc.git
```

Go to the project directory

```bash
  cd teste
```

Rename the file .env.exaple to .env and fill the database information

```bash
API_KEY=2155625863545
POSTGRES_DATABASE_URL="postgresql://postgres:11111@localhost:5432/dbname?schema=public"
```

Install dependencies

```bash
  npm install
```

Create the postgres database

```bash
  npx prisma migrate dev
```

Start the server

```bash
  npm run start:dev
```


## Documentation

[Documentation](https://localhost:8080/docs)


## Appendix

Não foi incluido nesta entrega mas esta na branch master:

- Json file para importar uma collection de postman com os testes dos enpoints
- Unit test

