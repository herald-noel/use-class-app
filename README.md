# 🚀 useClass Application

UseClass is a web application that streamlines the process of converting Use-Case Diagrams into Class Diagrams. Simply input your Use-Case Diagram in PlantUML format, and UseClass automatically generates the corresponding Class Diagram using Mermaid, saving time and effort in system design.

# 📚 Technology Stack

### Frontend

| Technology   | Version   | Logo                                                                                                                    |
| ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| React        | `^18.3.1` | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)                      |
| TypeScript   | `^5.5.4`  | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)       |
| Vite         | `^5.3.4`  | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         |
| Tailwind CSS | `^3.4.7`  | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |

### Diagramming Tools

| Technology       | Version   | Logo                                                                                                               |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| Mermaid          | `^10.9.3` | ![Mermaid](https://img.shields.io/badge/Mermaid-FF3670?style=for-the-badge&logo=markdown&logoColor=white)          |
| PlantUML Encoder | `^1.4.0`  | ![PlantUML](https://img.shields.io/badge/PlantUML-6DB33F?style=for-the-badge&logo=semanticuireact&logoColor=white) |

### Backend

| Technology | Version   | Logo                                                                                                              |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| Node.js    | `*`       | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        |
| Express    | `^4.19.2` | ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)          |
| TypeScript | `^5.4.5`  | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |

# 🔧 Prerequisites

- Node.js (version 18 or later)
- npm (version 9 or later)

# 🛠️ Installation

## Server Setup

1. Clone the repository

   ```bash
   git clone https://github.com/herald-noel/use-class-app.git
   cd use-class-app/server
   ```

2. Install dependencies

   ```bash
   npm install
   ```

### 🔑 Groq API Key Setup

### Step 1: Create or Log in to Your Groq Account

1. Visit the Groq website: [https://console.groq.com/](https://console.groq.com/)
2. Click on "Sign Up" if you don't have an account
3. If you already have an account, click "Log In"

### Step 2: Obtain the Groq API Key

1. After logging in, navigate to the API Keys section
2. Click on "Create API Key"
3. Give your API key a descriptive name (e.g., "UseClassApp")
4. Copy the generated API key
   - **Important:** Store this key securely and do not share it publicly

### Step 3: Configure API Key in Your Project

1. Create a `.env` file in the server directory with the following variables:

   ```
   PORT=3000
   GROQ_API_KEY_1=your_copied_api_key_here
   GROQ_API_KEY_2=optional_api_key
   ```

2. Replace `your_copied_api_key_here` with the actual API key you copied
### Run the server

   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm start
     ```

## Client Setup

### 🔥 Firebase Project Setup Guide

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name
4. (Optional) Enable Google Analytics if desired
5. Click "Create project"

### Step 2: Add Firebase to Your Web App

1. In the Firebase Console, click the web icon (`</>`) to add a new web app
2. Register your app by providing an app nickname
3. (Optional) Set up Firebase Hosting
4. Click "Register app"

### Step 3: Retrieve Firebase Configuration

After registering the app, you'll see a configuration object. This is where you'll get the values for your `.env` file.

### Locating Firebase Configuration Values

1. In the Firebase Console, go to Project Settings (gear icon next to "Project Overview")
2. Scroll to the "Your apps" section and select your web app
3. Look for the Firebase configuration object

### Step 4: Configure Environment Variables

Create a `.env` file in your project root and fill in the following:

```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# API Base URL (if applicable)
VITE_API_BASE_URL=https://your-api-domain.com

# Environment
VITE_ENV=development
```

1. Navigate to client directory

   ```bash
   cd ../client
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the client
   ```bash
   npm run dev
   ```

## 📖 User Instructions

### Login

1. Navigate to the login page
2. Enter your email and password
3. Click "Login"

### Dashboard Navigation

- Use the sidebar to access different sections

### Diagramming Features

- Mermaid and PlantUML are integrated for creating and rendering diagrams
- Use the plantUML use-case diagram syntax to generate class diagram using mermaid.
- Diagrams are rendered in real-time within the application

### Feature Usage

- Refer to guided tours for detailed feature explanations

## 🚨 Important Notes

- Always use strong, unique passwords
- Change default credentials after first login
- Keep your `.env` files secure and do not commit them to version control
