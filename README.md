# 🕉️ PanditJi Frontend

A web app for spiritual practitioners to create profiles and upload documents. Built with React + TypeScript + Tailwind.

## 🚀 Quick Start

```bash
npm install
npm run dev          # Development (port 3000)
npm run build        # Production build
npm run preview:3000 # Preview build (port 3000)
```

## 🌍 Environment Setup

### Development
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8000/api
```

### Production  
```bash
# .env.production
VITE_API_BASE_URL=https://your-production-api.com/api
```

## ✨ What it does

- **Login/Logout** - Simple auth system
- **Profile Creation** - Multi-select forms for expertise, languages, etc.
- **Document Upload** - Photo ID, address proof, passport photo + optional certificates
- **File Validation** - 5MB max, JPG/PNG/PDF only

## 🛠️ Tech

- React 18 + TypeScript
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

## 🚀 Deploy to Server

```bash
git clone <your-repo>
cd panditji-frontend
npm install
npm run build
npm run preview:3000  # Production on port 3000
```
