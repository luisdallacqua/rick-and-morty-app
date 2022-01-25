# Bem vindo ao aplicativo do Rick and Morty

Esse projeto tem como ideia colocar em prática vários tópicos que venho estudando há meses, como forma de consolidar e demonstrar o conhecimento adquirido. Basicamente, a ideia dessa aplicação é criar usuários os quais poderão logar no sistema (através de um sistema de autenticação) e navegar pelos personagens de Rick and Morty (para isso eu utilizei uma [API externa](https://rickandmortyapi.com/)) podendo escolher seus usuários favoritos.

## Tech Stack
---
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-Ui](https://mui.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [React-Hook-Form +  YUP](https://react-hook-form.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MongoDb Atlas](https://www.mongodb.com/atlas/database)
- [Next-Auth](https://next-auth.js.org/)
- [Cloudinary](https://cloudinary.com/)

Escolhi o NextJs pela praticidade (como diz a documentação: "um framework pronto para produção") com sistemas de rotas por aquivos, a possibilidade de criar rotas de apis simplesmente criando um arquivo, além da possibilidade de gerar páginas server side e/ou estáticas, conforme a necessidade. Então, achei uma excelente opção para esse projeto;

Typescript foi uma escolha por dois motivos: o primeiro para aprender melhor e sedimentar os conhecimentos já adquiridos, e para testar a questão da melhor legibilidade, e para minha supresa eu gostei muito da legibilidade que typescript dá para o projeto, facilitando muito na manutenção e utilização do VSCode (IDE que utilizei para escrever o projeto).

Material-UI escolhi por uma questão de curiosidade sobre as bibliotecas de UI e decidi aprender essa biblioteca, e achei muito interessante como várias coisas já vem prontas, economizando bastante tempo.

React hook form foi por questão de curiosidaded de como uma biblioteca de validação funciona, e eu acho que apesar de acrescentar muita complexidaded a um formulário pequeno (como é o caso do projeto), traz algumas vantagens também como a não necessidade de preocupação com o estado do formulário.

MongoDB Atlas foi a forma que escolhi para salvar dados na nuvem, e quando eu fizer o deploy da aplicação os dados persistirem.

Next-auth foi escolhido por ter sido desenhada para ser utilizada com NextJS e é flexível e fácil de utilzar.

Cloudinary foi mais ou menos a mesma ideia do MongoDB Atlas, uma maneira de facilitar o armazenamento de imagens no banco de dados. E achei super fácil de utilizar.


### Features
---
🚧Rick and morty app 🚀 in progress... 🚧

 - [X] Página com todo os personagens de rick and Morty
 - [X] Paginação dos personagens
 - [X] Procurar por um personagem específico
 - [X] Possibilidade de criar um novo usuário com foto
 - [X] Possibilidade de favoritar um personagem e ele persistir no Banco de dados
 - [X] Lista de Usuários com os respectivos personagens favoritos
 - [X] Sessão de usuário e autenticação
 - [X] Vincular o personagem favorito ao usuário da sessão
 - [ ] Testes Unitários


## Como rodar o projeto depois de cloná-lo

Neste [artigo](https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/) você consegue saber como conseguir as duas primeiras variáveis de ambiente. E o JWT Secret é apenas a string de codificação do seu token JWT.

Váriavéis de ambiente:

```bash
Crie um arquivo .env.local com as seguintes variáveis

MONGODB_URI=
MONGODB_DB=
JWT_SECRET=
```



Primeiro, instalar as dependências:

```bash
npm install
# or
yarn
```

Após isso, rodar os seguintes comandos:

```bash
npm run build && npm start
# or
yarn build && yarn start
```


Abra [http://localhost:3000](http://localhost:3000) no seu Browser e veja o resultado


