# Aplicativo Oficial - Igreja Metodista (Santana de Parnaíba)

Um aplicativo de conectividade construído com React Native (Expo) voltado inteiramente para engajamento dos membros, informações ao vivo e calendário digital de eventos da congregação.

## Status do Projeto
Este projeto adota a arquitetura de compilação em `.apk` exclusivo (Distribuição Direta - SideLoading no Android). Não se trata de um projeto destinado a listagem na Play Store no momento.

### Telas Funcionais Principais:
- **Autenticação**: Registro com foto, máscaras de entrada (telefone/data) e identificação baseada em E-mail.
- **Home Hub**: Avisos dinâmicos em tempo real com níveis de prioridade.
- **Agendamento**: Agenda completa de Cultos e Eventos com sincronização instantânea.
- **Células/Rocket**: Aba de dízimos/contribuições com chave PIX editável via nuvem.
- **Informativos (?)**: História, missão e contatos da igreja totalmente gerenciáveis.
- **Painel Administrativo**: Controle total (CRUD) de avisos, eventos e textos para o usuário `admin@admin.com`.
- **Perfil**: Gerenciamento de dados pessoais, edição de perfil e recuperação de senha.

## Stack Tecnológica
- **Frontend**: React Native, Expo (SDK 54), React Navigation, Styled-Components, Native-Base.
- **Backend Service (Projetado)**: Firebase (Auth, Storage, Firestore NoSQL).
- **Builder DevOps**: EAS Build CLI (Nuvem).

## Como Rodar o Projeto Local (Dev/QA)
Para debugar e visualizar no app `Expo Go` no seu próprio telefone via Wi-Fi:

1. Assegure que não hajam restrições de permissões para rodar scripts no Windows (rode PowerShell como Administrador: `Set-ExecutionPolicy RemoteSigned`).
2. Clone o repositório.
3. Instale as dependências essenciais do Expo 54:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Suba o servidor de desenvolvimento do Metro Bundler:
   ```bash
   npx expo start --tunnel
   ```
5. Leia o QR e abra no App Expo Go!

## Como gerar o Instalador (.APK)
Se você precisa compilar o código JavaScript para as máquinas virtuais Java do Android e distribuir o app para uso comercial:

```bash
eas login
eas build -p android --profile preview
```
*(Certifique-se que o perfil Preview no eas.json está configurado como `buildType: apk`)*
