<h1 align="center">
  BLOG 17
</p>



## Tecnologies Backend


- [NodeJS](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/)


  ## Tecnologies Frontend
  

- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix-UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/)
- [React-Toastify](https://www.npmjs.com/package/react-toastify)
- 

  ## Tecnologies App
  

- [EXPO](https://expo.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux](https://redux-toolkit.js.org/)


## 💻 Requisitos para o projeto rodar

- Install em sua máquina [NodeJS](https://nodejs.org), [Docker](https://www.docker.com/), [DBeaver](https://dbeaver.io/), [Git](https://git-scm.com/), [vsCode](https://code.visualstudio.com/).

- Escolhe uma pasta aonde vai baixar o repositorio, clique com o botão direito do mouse e escolha o (abrir gitbash), após isso, vá ao [Repositório](https://github.com/LeandroSiani/school_fiap_techchallenge2) e clone o repositorio para sua máquina.

### Exemplo

```bash
$ git clone https://github.com/LeandroSiani/school_fiap_techchallenge2
````


## 💻 Iniciar o projeto

- Ok, repositório baixado, agora pode abrir o repositório em seus [vsCode](https://code.visualstudio.com/), e vamos iniciar o projeto.
- Vamos começar pelo projeto do backend, primeiro acesse a pasta "server"
  
### Exemplo

```bash
$ cd server
````

- Dentro da pasta server, vamos instalar as dependencias.

```bash
$ npm install
````

- Na pasta raiz, tem um arquivo chamado ".env.exemple", remove o exemple, deixamos assim ".env", agora abre o arquivo, dentro vai ter preencha ele com os dados abaixo.

### Exemplo

```http  
ENV="development"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="postgres"
PORT="3000"
```

- Agora o projeto backend está pronto para rodar. Com o [Docker](https://www.docker.com/) rodando, vai no terminal, coloque esse comando

```bash
$ docker-compose up --build
````

- Pronto, o projeto backend já deve estar rodando, agora vamos abrir o [DBeaver](https://dbeaver.io/), e vamos configurar, para ficar OK!
- Com o [DBeaver](https://dbeaver.io/) aberto, você vai ver uma tomada com o sinal de mais, que com o mouse emcima está escrito "Nova conexão", também pode usar as teclas de atalho apara abrir, "ctrl+shift+n".
- Após aberto, clique no [Postgresql](https://www.postgresql.org/), e após clique em avançar, adicione os dados que tem no .env para funcionar, após colocar os dados, aperte em concluir.
- Pronto, agora você pode ver os dados no seus banco de dados.

### Obs: 
- Você pode ver como funciona as implementações do backend pela [url](http://localhost:3000/api), vai abrir o swagger e você pode ver como funciona os endpoint.

## Backend já implementado, agora vamos de Frontend
- Com o backend implementado, o frontend é bem simples, primeiro vamos sair da pasta do server e acessar a pasta web.
  
```bash
$ cd ..
$ cd web
````

- Dentro das pasta web, vamos instalar as dependencias do frontend
  
```bash
$ npm install
````

- Agora com tudo instalado, basta acessar o terminal e iniciar o projeto

```bash
$ npm run dev
````

- Projeto frontend, vai abrir na [url](http://localhost:3001).


## Conheça nosso aplicativo em React Native
- Com o backend implementado, acesso ao aplicativo é bem simples, volte para pasta padrão
  
```bash
$ cd app
````

- Dentro das pasta app, vamos instalar as dependencias do aplicativo
  
```bash
$ npm install
````

- Agora com tudo instalado, basta acessar o terminal e iniciar o projeto

```bash
$ npx expo start
````

- Com o projeto de App existe 2 meios de visualizar o projeto, você  pode instalar o App Expo Go no seu celular e apontar a câmera para o qrcode. Segue os links para baixar o app.
  
- [IOS](https://itunes.apple.com/app/apple-store/id982107779)
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

- E direto do site do Expo, você consegue baixar tanto para IOS e Android, quanto para seus desktop ou laptop.

- [EXPO GO](https://expo.dev/go)

### Login de acesso do professor: 
```http  
User: admin
Password: admin@123
```

### E pronto, fique a vontade para testar e brincar.
