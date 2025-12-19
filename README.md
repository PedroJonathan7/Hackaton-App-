# Fitness App - App de Exercícios Físicos

Um website responsivo de exercícios físicos construído com React, Next.js, Firebase e Tailwind CSS.

## 🚀 Tecnologias

- **React** / **Next.js 16** - Framework JavaScript
- **Firebase Authentication** - Autenticação com email e senha
- **Firebase Firestore** - Banco de dados para usuários e exercícios
- **Tailwind CSS v4** - Estilização moderna e responsiva
- **TypeScript** - Tipagem estática

## 🎨 Design

- Paleta de cores vinho/marrom (tons quentes)
- Design mobile-first
- Interface moderna e intuitiva
- Componentes reutilizáveis com shadcn/ui

## 📱 Funcionalidades

### ✅ Autenticação
- Tela de cadastro (nome, email, senha)
- Tela de login (email, senha)
- Redirecionamento automático após login

### 🏠 Tela Inicial
- Lista de exercícios em cards clicáveis
- 5 exercícios iniciais:
  - Abdominal
  - Flexão
  - Prancha
  - Agachamento
  - Corrida estacionária
- Modal com detalhes de cada exercício

### 👤 Perfil
- Exibição de nome e email do usuário
- Opção de logout

## 🔧 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Firebase

**Opção A: No v0 (Recomendado)**
Adicione as variáveis de ambiente na seção **Vars** da barra lateral:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

**Opção B: Localmente**
Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 3. Criar projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **Adicionar projeto**
3. Siga as instruções para criar o projeto
4. No painel do projeto, clique no ícone web (`</>`) para adicionar um app web
5. Copie as credenciais do Firebase para as variáveis de ambiente

### 4. Habilitar autenticação no Firebase

1. No Firebase Console, acesse **Authentication**
2. Clique em **Começar**
3. Vá em **Sign-in method**
4. Habilite **Email/Password**
5. Clique em **Salvar**

### 5. Criar banco de dados Firestore

1. No Firebase Console, acesse **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Iniciar no modo de teste** (recomendado para desenvolvimento)
4. Selecione a localização do banco de dados
5. Clique em **Ativar**

### 6. Rodar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura de Pastas

```
├── app/
│   ├── login/          # Tela de login
│   ├── cadastro/       # Tela de cadastro
│   ├── home/           # Tela inicial com exercícios
│   ├── perfil/         # Tela de perfil
│   ├── layout.tsx      # Layout principal com AuthProvider
│   ├── page.tsx        # Página de redirecionamento
│   └── globals.css     # Estilos globais com tema vinho/marrom
├── components/
│   ├── ui/             # Componentes shadcn/ui
│   └── exercise-modal.tsx  # Modal de detalhes dos exercícios
└── lib/
    ├── firebase.ts     # Configuração do Firebase
    ├── auth-context.tsx # Context de autenticação React
    └── utils.ts        # Utilitários (cn function)
```

## 🎯 Como Usar

1. **Cadastro**: Acesse `/cadastro` e crie uma conta com nome, email e senha
2. **Login**: Faça login com suas credenciais em `/login`
3. **Exercícios**: Navegue pelos cards de exercícios na tela inicial
4. **Detalhes**: Clique em qualquer exercício para ver mais informações
5. **Perfil**: Acesse seu perfil no canto superior direito

## 🚀 Próximos Passos

- Adicionar mais exercícios personalizados
- Implementar histórico de treinos
- Sistema de cronômetro para exercícios
- Metas e conquistas
- Compartilhamento de progresso
- Modo escuro/claro

## 📝 Notas Importantes

- As senhas devem ter no mínimo 6 caracteres
- Os dados do usuário são salvos no Firestore automaticamente
- O app é totalmente responsivo para mobile e desktop
- Firebase Authentication gerencia sessões automaticamente

## 🐛 Troubleshooting

**Erro de autenticação:**
- Verifique se as variáveis de ambiente do Firebase estão corretas
- Confirme que Email/Password está habilitado no Firebase Console

**Erro no Firestore:**
- Certifique-se de que o Firestore Database foi criado
- Verifique as regras de segurança (modo de teste permite leitura/escrita)

**App não carrega:**
- Execute `npm install` para garantir que todas as dependências estão instaladas
- Verifique se está usando Node.js 18+ 

## 📄 Licença

Este projeto foi criado com v0.dev
