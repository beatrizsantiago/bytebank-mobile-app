<h1 align="center">ByteBank - App</h1>

### ✨ Sobre

<h4>Aplicativo feito em react native para o Tech Challenge da Pós Tech FIAP - Fase 3</h4>

<b>Versão:</b> 1.0.0

### 📌 Stack de Desenvolvimento

- [expo](https://expo.dev/);
- [styled-components](https://styled-components.com/) para estilização de componentes;
- [firebase](https://firebase.google.com) para armazenamento de dados;
- [date-fns](https://date-fns.org/) para lidar com datas;
- [react-navigation](https://reactnavigation.org/) para roteamento da aplicação;

### 🛠 Ferramentas
- IDE: [VSCode](https://code.visualstudio.com/);
- [Android Studio](https://developer.android.com/studio);

### 🔧 Configurações do Firebase

<b>1. Criar conta</b>

  - Crie uma conta ou [acesse o console](https://console.firebase.google.com/) do Firebase usando sua conta Google.

<b>2. Criar um novo projeto no Firebase</b>

  - Siga este [guia oficial](https://firebase.google.com/docs/web/setup) para criar um novo projeto.
  - Após criar o projeto, acesse a aba Configurações do Projeto (ícone de engrenagem no menu lateral).
  - Na seção Suas Apps, clique em "Web" para registrar uma nova aplicação Web.
  - Ao finalizar o registro, o Firebase irá exibir o seu Firebase Config — um objeto contendo informações como apiKey, projectId, storageBucket, entre outros.
  - Cole o conteúdo da configuração dentro de ```/firebase/config.ts```:
   ```js
    // /firebase/config.ts

    const firebaseConfig = {
      apiKey: "API_KEY",
      authDomain: "DOMINIO.firebaseapp.com",
      projectId: "PROJECT_ID",
      storageBucket: "BUCKET.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID"
    };
  ```

<b>3. Habilitar Autenticação, Firestore e Storage</b>

  No console do Firebase, acesse:

  - [Autenticação](https://firebase.google.com/docs/auth/web/email-link-auth): Habilite o método de email/senha para autenticação.
  - [Firestore](https://firebase.google.com/docs/firestore/quickstart): Crie um banco de dados Firestore.
  - [Storage](https://firebase.google.com/docs/storage/web/start): Ative o armazenamento de arquivos.

<b>4. Configurar regras do Firestore</b>

  No Firestore, adicione as [regras de acesso](https://firebase.google.com/docs/firestore/security/get-started) abaixo (configuração disponível na aba de "Regras"):
  ```bash
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if true;
        }
      }
    }
  ```

<b>5. Criar índices para consultas</b>

  - Este projeto utiliza de consultas compostas para os filtros utilizados na tela de transações, por isso você precisará [criar índices](https://firebase.google.com/docs/firestore/query-data/indexing) no Firestore. Isso pode ser feito diretamente pelo console (configuração disponível na aba de "Índices") ou seguindo as mensagens de erro que o Firestore retorna no log da aplicação.
  - Para a utilização dessas consultas avançadas é necessário que a conta do firebase seja <b>nível Blaze</b>. É possível utilizar de forma gratuita com créditos disponibilizados pelo próprio firebase.
  - Este são os índices do projeto:

  <table>
    <thead>
      <tr>
        <th>ID da coleção</th>
        <th>Campos indexados</th>
        <th>Escopo da consulta</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>transactions</td>
        <td>userId (Crescente), date (Crescente), __name__ (Crescente)</td>
        <td>Coleta</td>
        <td>Ativado</td>
      </tr>
      <tr>
        <td>transactions</td>
        <td>userId (Crescente), kind (Crescente), value (Crescente), __name__ (Crescente)</td>
        <td>Coleta</td>
        <td>Ativado</td>
      </tr>
      <tr>
        <td>transactions</td>
        <td>userId (Crescente), date (Decrescente), __name__ (Decrescente)</td>
        <td>Coleta</td>
        <td>Ativado</td>
      </tr>
      <tr>
        <td>transactions</td>
        <td>userId (Crescente), value (Crescente), __name__ (Crescente)</td>
        <td>Coleta</td>
        <td>Ativado</td>
      </tr>
      <tr>
        <td>transactions</td>
        <td>kind (Crescente), userId (Crescente), date (Decrescente), __name__ (Decrescente)</td>
        <td>Coleta</td>
        <td>Ativado</td>
      </tr>
    </tbody>
  </table>


### 🎯 Getting Started

- [Instale](https://developer.android.com/studio/install) e configure o Android Studio em seu computador. 

- [Crie um dispositivo virtual](https://developer.android.com/studio/run/managing-avds) no Android Studio para rodar o projeto.

Verificar Instalação do Node.js

- Abra um terminal e execute o comando:
    
  ```bash
  node -v
  ```
    
- Se aparecer uma versão como a listada abaixo significa que o Node.js está instalado corretamente. Caso contrário, baixe e instale-o a partir do [site oficial](https://nodejs.dev/en/learn/) ou procure "Node.js" no Google.
    
  ```bash
  v20.18.0
  ```

Instalar as dependências

```bash
npm install
```

Iniciar projeto para android:

```bash
npm run android
```

Iniciar projeto para ios:

```bash
npm run ios
```

Após os comandos acima, o emulador será iniciado automaticamente e instalará o app Expo para utilizar o projeto.
