# Metodista

> Provides a mobile community hub for the Methodist Church of Santana de Parnaiba, centralising announcements, events, tithing, and member profiles in a single app.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Ecosystem](#ecosystem)
- [Contributing](#contributing)

## Overview

Metodista is a cross-platform mobile application built with React Native and Expo for the Methodist Church in Santana de Parnaiba. It serves as a digital communication channel between the church leadership and its members. Administrators can publish announcements, manage events, and update institutional content in real time through Firebase. Members access a personalised experience with user profiles, a notice board, an event calendar, a tithing section with PIX key management, and informational pages — all with offline support through Firestore local cache.

## Architecture

The application follows a page-based component architecture with a centralised authentication context:

```
App.js
  └── AuthProvider (Context API)
        └── Routes (React Navigation — Bottom Tabs)
              ├── Login / SignIn / Register   (auth flow — tab bar hidden)
              ├── Home                        (notice board)
              ├── Calendar                    (event listing)
              ├── Rocket                      (PIX / tithing)
              ├── Info                        (institutional pages)
              └── Profile                     (user profile)
```

- **AuthContext** — Manages Firebase Authentication state, Firestore user data listener, and admin detection (based on a predefined email).
- **Pages** — Each screen is a self-contained module with its own `index.js` (logic/JSX) and `styles.js` (Styled Components).
- **Services** — Firebase configuration module initialises Auth, Firestore, and Storage with persistent caching.
- **State Management** — React Context API for global user/session state; component-local state for UI.
- **Data Sync** — Firestore `onSnapshot` listeners provide real-time updates without manual refresh.

### Build and Distribution

The app uses Expo Application Services (EAS) for cloud builds. Android APKs are generated via `eas build -p android --profile preview` for sideloading distribution.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (ES6+) |
| Framework | React Native 0.81 with Expo SDK 54 |
| Navigation | React Navigation (Bottom Tabs + Stack) |
| Styling | Styled Components (CSS-in-JS) |
| UI Library | NativeBase v3 |
| Backend (BaaS) | Firebase v12 (Auth, Firestore, Storage) |
| State Management | React Context API |
| Build / CI | Expo EAS Build |
| Font | Poppins (via @expo-google-fonts) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or Yarn
- Expo CLI (`npx expo`)
- Android Studio / Xcode (for emulators) or the Expo Go app on a physical device

### Installation

```bash
# Clone the repository
git clone https://github.com/contatovictorhugos/prj_extensao.git
cd prj_extensao

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root with your Firebase credentials:

| Variable | Description | Example |
|---|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key | `AIzaSy...` |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain | `myapp.firebaseapp.com` |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `myapp` |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket | `myapp.firebasestorage.app` |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID | `422969540670` |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | `1:422...:web:08e...` |
| `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

### Running locally

```bash
# Start the Expo development server
npm run dev

# Or start with tunnel (useful for physical devices on different networks)
npm run tunnel
```

Scan the QR code with the Expo Go app or press `a` to open on an Android emulator.

## Project Structure

```
prj_extensao/
├── src/
│   ├── components/       # Reusable UI components (Button)
│   ├── context/          # AuthContext — global auth state
│   ├── pages/            # Screen modules (JSX + styles per page)
│   │   ├── Calendar/
│   │   ├── Home/
│   │   ├── Info/
│   │   ├── Login/
│   │   ├── Profile/
│   │   ├── Register/
│   │   ├── Rocket/
│   │   └── SignIn/
│   ├── services/         # Firebase configuration
│   ├── routes.js         # Navigation tree definition
│   └── styles.js         # Global styled-components
├── assets/               # Static images and icons
├── App.js                # Application entry point
├── app.json              # Expo configuration
├── eas.json              # EAS Build profiles
└── package.json
```

## Ecosystem

This project is part of the **Projetcs** suite. The following projects work together:

| Project | Role | Depends On |
|---|---|---|
| **key-management-service** | REST API — cryptographic key lifecycle management | PostgreSQL |
| **mail-notifier-service** | REST API — transactional email delivery with encryption | key-management-service API, PostgreSQL, Brevo |
| **fipe-csv** | REST API — FIPE vehicle pricing table to CSV export | FIPE public API |
| **bko-project** | Server-rendered web app — internal backoffice administration | PostgreSQL |
| **split-csv** | CLI tool — splits large CSV files into smaller parts | — |
| **mergeCSV** | CLI tool — merges multiple CSV files into one | — |
| **prj_extensao** | Mobile app (React Native / Expo) — Methodist church community app | Firebase |

> **This project**: `prj_extensao` (Metodista) is a standalone mobile application. It does not depend on other projects in this suite; it uses Firebase as its backend-as-a-service.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
