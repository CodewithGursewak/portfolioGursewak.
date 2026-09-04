# ⚡ React + Vite Portfolio & Admin Dashboard

Modern, fast, and modular React application built with **Vite 5 and React 18**.

---

## 🚀 How to Run

### 1. Open Terminal in this folder:
```bash
cd react-portfolio
```

### 2. Install Dependencies (`node_modules`):
```bash
npm install
```

### 3. Start the Development Server:
```bash
npm run dev
```

Open your browser at:
👉 **`http://localhost:5173/`**

---

## 🧱 Component Hierarchy

```text
src/
├── main.jsx              # React DOM entry
├── App.jsx               # Master state & view switcher (Portfolio vs Admin)
├── index.css             # Global dark purple glassmorphism tokens
└── components/
    ├── Navbar.jsx        # Frosted glass navbar with mobile menu
    ├── Hero.jsx          # Typewriter effect & avatar ring with purple turban
    ├── About.jsx         # Philosophy and developer highlight cards
    ├── Skills.jsx        # Animated progress bars & technology pills
    ├── Projects.jsx      # Project showcase with hover action buttons
    ├── Contact.jsx       # Controlled form with Web3Forms email integration
    ├── Footer.jsx        # Navigation, copyright, and admin login launcher
    ├── AdminLoginModal.jsx # ID (admin) & Password (admin123) modal
    └── AdminDashboard.jsx  # Full inbox, metrics, search, and REST API modal
```

---

## 🔐 Admin Dashboard Login Credentials

- **Admin ID**: `admin`
- **Password**: `admin123`

---

## 📦 Production Build
To create an optimized production build for deployment (Netlify, Vercel, or GitHub Pages):
```bash
npm run build
```
The compiled files will be output into the `dist/` directory.

