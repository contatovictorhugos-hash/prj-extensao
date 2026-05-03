# Aplicativo Oficial - Igreja Metodista (Santana de Parnaíba)

Um aplicativo de conectividade construído com **React Native (Expo)** voltado para engajamento dos membros, informações ao vivo e calendário digital de eventos da congregação.

## Status do Projeto

Este projeto distribui o app como `.apk` direto (SideLoading no Android), sem publicação na Play Store no momento.

---

## Telas Funcionais

| Tela | Descrição |
|---|---|
| **Autenticação** | Registro com foto, máscaras de entrada e login por e-mail |
| **Home Hub** | Avisos dinâmicos em tempo real com níveis de prioridade |
| **Agendamento** | Agenda de cultos e eventos com sincronização instantânea |
| **Células/Rocket** | Dízimos e contribuições com chave PIX editável via nuvem |
| **Informativos** | História, missão e contatos da igreja gerenciáveis pelo admin |
| **Painel Admin** | CRUD completo de avisos, eventos e textos |
| **Perfil** | Edição de dados pessoais e recuperação de senha |

### Credenciais de Administrador (MVP)
- **E-mail:** `admin@admin.com`
- **Senha:** `**`

---

## Stack Tecnológica

- **Frontend:** React Native, Expo SDK 54, React Navigation, Styled-Components, Native-Base
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Build/DevOps:** EAS Build CLI (compilação na nuvem)

---

## ⚙️ Configuração em uma Nova Máquina

### 1. Pré-requisitos

Antes de tudo, verifique se você tem as ferramentas necessárias instaladas:

```bash
# Verifique a versão do Node (precisa ser >= 18)
node -v

# Verifique o npm
npm -v
```

> 💡 Se não tiver o Node instalado, baixe em: https://nodejs.org (escolha a versão LTS)

No **Windows**, pode ser necessário liberar permissões para executar scripts. Abra o **PowerShell como Administrador** e rode:
```powershell
Set-ExecutionPolicy RemoteSigned
```

---

### 2. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd prj_extensao
```

---

### 3. Arquivos Secretos (não estão no Git!)

Alguns arquivos **não são enviados ao repositório** por conterem informações sensíveis. Você precisa recebê-los separadamente (via pendrive, e-mail, Google Drive, etc.) e copiá-los para a **raiz do projeto**.

| Arquivo | Para que serve |
|---|---|
| `.env` | Chaves de acesso ao Firebase (banco de dados e autenticação) |
| `eas.json` | Configurações de build do EAS (geração do APK) |

Após copiar, a raiz do projeto deve conter esses dois arquivos:

```
prj_extensao/
├── .env          ← você copiou manualmente
├── eas.json      ← você copiou manualmente
├── App.js
├── package.json
└── ...
```

> ⚠️ Sem o `.env`, o app vai abrir mas **não vai conectar ao Firebase** (login, dados, etc. não vão funcionar).

---

### 4. Instalar Dependências

```bash
npm install
```

> 💡 O arquivo `.npmrc` já configura `legacy-peer-deps=true` automaticamente, então não é necessário passar a flag manualmente.

Se der algum erro de permissão no Windows, tente:
```bash
npm install --legacy-peer-deps
```

---

## ▶️ Rodando em Desenvolvimento (Expo Go)

Com tudo configurado, suba o servidor local:

```bash
npx expo start
```

Ou, se estiver em redes diferentes (ex: celular com 4G e PC com Wi-Fi), use o modo tunnel:

```bash
npx expo start --tunnel
```

Em seguida:
1. Instale o app **Expo Go** no seu celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
2. Escaneie o QR Code exibido no terminal com o Expo Go

> ✅ **Não precisa de login** para rodar em desenvolvimento.

---

## 📦 Gerando o APK (EAS Build)

Para compilar e gerar o `.apk` instalável, é necessário fazer login com a conta Expo que tem acesso ao projeto.

### Instalar o EAS CLI (se não tiver)

```bash
npm install -g eas-cli
```

### Fazer login

```bash
eas login
```

> 💡 Use a conta que foi adicionada ao projeto no [expo.dev](https://expo.dev). Se não tiver acesso, peça para o responsável do projeto te adicionar como membro.

### Gerar o APK

```bash
eas build --profile preview --platform android
```

Aguarde o build finalizar. O link para download do `.apk` aparecerá no terminal e também no painel do [expo.dev](https://expo.dev).

---

## 🗂️ Resumo: O que precisa ser passado manualmente

| O que | Como obter |
|---|---|
| `.env` | Pedir para o responsável do projeto |
| `eas.json` | Pedir para o responsável do projeto |
| Acesso ao projeto no expo.dev | Pedir para ser adicionado como membro |
| Node.js >= 18 | Instalar em https://nodejs.org |

---

## Stack Completa

- **Frontend:** React Native · Expo SDK 54 · React Navigation · Styled-Components · Native-Base
- **Backend:** Firebase (Auth · Firestore · Storage)
- **Build:** EAS Build CLI
