# PT. Unggul Mitra Solusi - Sales Projects

This repository contains two sales applications:
- **app-sales**: Next.js web application
- **mobile-sales**: React Native mobile application (Expo)

## Project Structure

```
PT. Unggul Mitra Solusi/
├── app-sales/          # Next.js web application
├── mobile-sales/       # React Native mobile application
├── .gitignore         # Git ignore rules for both projects
└── README.md          # This file
```

## Prerequisites

Before running either project, ensure you have:
- Node.js (v18 or higher)
- npm or yarn package manager

For mobile-sales additional requirements:
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Getting Started

### 1. Web Application (app-sales)

Navigate to the web application directory:

```bash
cd app-sales
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 2. Mobile Application (mobile-sales)

Navigate to the mobile application directory:

```bash
cd mobile-sales
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

This will start the Expo development server and show you options to run the app on:
- Android emulator
- iOS simulator
- Physical device with Expo Go app
- Web browser

## Available Scripts

### app-sales (Next.js)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### mobile-sales (Expo)

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank project template

## Technology Stack

### app-sales
- **Framework**: Next.js 16.1.6
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

### mobile-sales
- **Framework**: Expo 54.0.33
- **Navigation**: Expo Router 6.0.23
- **UI**: React Native 0.81.5
- **Language**: TypeScript

## Development Notes

- Both projects use TypeScript for type safety
- The web app uses Tailwind CSS for styling
- The mobile app uses Expo Router for file-based routing
- Environment variables should be placed in `.env.local` files in each project directory

### Mobile API Configuration

**Important**: The mobile application requires ngrok to be running for API connectivity:

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   # or download from https://ngrok.com/download
   ```

2. **Start your local API server** (your backend application)

3. **Run ngrok to expose your local API**:
   ```bash
   ngrok http 8000  # API runs on port 8000
   ```

4. **Copy the HTTPS URL** from ngrok output (e.g., `https://abc123.ngrok.io`)

5. **Update mobile app environment variables**:
   Create `mobile-sales/.env.local`:
   ```
   EXPO_PUBLIC_API_URL=https://abc123.ngrok.io
   ```

**Why ngrok is required:**
- Mobile devices (physical devices/emulators) cannot access `localhost` from your development machine
- ngrok creates a secure tunnel from the internet to your local development server
- HTTPS URLs are required by some mobile platforms for API security
- Prevents CORS issues and network connectivity problems

**Alternative**: If you have a staging/production API server, you can use that URL instead of ngrok.

## Deployment

### app-sales
The easiest way to deploy the Next.js app is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### mobile-sales
For mobile deployment, you can use:
- [Expo Application Services (EAS)](https://expo.dev/eas)
- [Google Play Store](https://play.google.com/console/)
- [Apple App Store](https://appstoreconnect.apple.com/)

## Support

For project-specific documentation:
- See [app-sales/README.md](./app-sales/README.md) for Next.js specific information
- See [mobile-sales/README.md](./mobile-sales/README.md) for Expo specific information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both applications if applicable
5. Submit a pull request
