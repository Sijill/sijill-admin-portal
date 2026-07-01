<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=3000&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Sijill+Admin+Portal+%F0%9F%8F%A5;Healthcare+Management+System;Powered+by+React+%2B+Vite" alt="Typing SVG" />

<br/>

<img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
<img src="https://img.shields.io/badge/Status-Active-22C55E?style=for-the-badge&logo=statuspage&logoColor=white" alt="Status" />

<br/><br/>

> 🏥 **A modern, full-featured Admin Portal for managing healthcare providers, patients, sessions, and operations — built with React & Vite.**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700" alt="Animated Divider"/>

</div>

---

## 🌟 Overview

**Sijill Admin Portal** is a comprehensive healthcare administration system designed to streamline provider management, patient workflows, and operational oversight. It provides administrators with powerful tools to monitor, control, and manage every aspect of the healthcare network.

<div align="center">
<table>
<tr>
<td align="center">🏥<br/><b>Provider Management</b></td>
<td align="center">👥<br/><b>Patient Records</b></td>
<td align="center">📋<br/><b>Session Tracking</b></td>
<td align="center">🔐<br/><b>Secure Auth</b></td>
<td align="center">📊<br/><b>Analytics Dashboard</b></td>
</tr>
</table>
</div>

---

## ✨ Key Features

- 🔐 **Authentication & Authorization** — Role-based access control for admin users
- 🏥 **Provider Management** — Full CRUD for healthcare providers and their sessions
- 🧑‍⚕️ **Patient Management** — View, track, and manage patient medical identities
- 📅 **Session Scheduling** — Monitor and manage provider-patient session workflows
- 📊 **Dashboard Analytics** — Real-time stats and operational insights
- 🌍 **Multi-language Ready** — Internationalization support built-in
- 📱 **Fully Responsive** — Optimized for all screen sizes and devices
- ⚡ **Lightning Fast** — Powered by Vite's blazing-fast HMR

---

## 📂 Project Structure

```bash
📦 sijill-admin-portal
┣ 📁 src
┃ ┣ 📁 Components              # 🧩 Reusable UI components
┃ ┃ ┣ 📁 provider              #    ↳ Provider-specific layouts & components
┃ ┃ ┗ 📁 shared                #    ↳ Shared UI elements (Navbar, Sidebar, etc.)
┃ ┣ 📁 Pages                   # 📄 Application pages/views
┃ ┃ ┣ 📁 provider              #    ↳ Provider management pages
┃ ┃ ┗ 📁 patient               #    ↳ Patient medical identity pages
┃ ┣ 📁 hooks                   # 🪝 Custom React hooks
┃ ┣ 📁 context                 # 🌐 React Context providers
┃ ┣ 📁 services                # 🔌 API service layer
┃ ┣ 📁 utils                   # 🛠️ Helper utilities
┃ ┣ 📁 assets                  # 🖼️ Static assets & images
┃ ┣ 📄 App.jsx                 # 🏠 Root application component
┃ ┗ 📄 main.jsx                # 🚀 Entry point
┣ 📄 index.html                # 📋 HTML template
┣ 📄 vite.config.js            # ⚙️ Vite configuration
┣ 📄 package.json              # 📦 Dependencies & scripts
┗ 📖 README.md                 # 📚 You are here!
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
| :---: | :---: | :--- |
| ⚛️ **Frontend Framework** | React 18 | Component-based UI architecture |
| ⚡ **Build Tool** | Vite 5 | Fast dev server & optimized builds |
| 🎨 **Styling** | TailwindCSS / CSS | Utility-first styling & custom design |
| 🔀 **Routing** | React Router v6 | Client-side navigation |
| 🌐 **HTTP Client** | Axios | REST API communication |
| 🪝 **State** | React Context + Hooks | Lightweight state management |
| 🔍 **Linting** | ESLint | Code quality enforcement |

</div>

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** `v18+`
- **npm** `v9+` or **yarn** `v1.22+`
- Access to the **Sijill Backend API**

### ⚡ Quick Start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-org/sijill-admin-portal.git
cd sijill-admin-portal

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
cp .env.example .env
# → Edit .env with your API base URL and credentials

# 4️⃣ Start the development server
npm run dev
```

> 🌐 The app will be available at **`http://localhost:5173`**

### 🏗️ Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=https://api.sijill.com/v1

# App Configuration
VITE_APP_NAME=Sijill Admin Portal
VITE_APP_VERSION=1.0.0
```

> [!IMPORTANT]
> Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

## 🧩 Core Modules

<details>
<summary><b>🏥 Provider Management</b></summary>
<br/>

Manage healthcare providers end-to-end:
- View all registered providers
- Create, update, and deactivate provider accounts
- Assign and manage provider sessions
- Track provider-patient interaction history

</details>

<details>
<summary><b>🧑‍⚕️ Patient Medical Identity</b></summary>
<br/>

Comprehensive patient record management:
- Search and filter patient records
- View complete medical identity profiles
- Monitor patient session history
- Manage patient status and flags

</details>

<details>
<summary><b>📅 Session Management</b></summary>
<br/>

Full session lifecycle management:
- View upcoming and past sessions
- Assign providers to patient sessions
- Track session status and outcomes
- Generate session reports

</details>

<details>
<summary><b>📊 Admin Dashboard</b></summary>
<br/>

Operational intelligence at a glance:
- Real-time provider and patient statistics
- Session volume and trends
- System health indicators
- Quick-action shortcuts

</details>

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| 🚀 **Dev Server** | `npm run dev` | Start development server with HMR |
| 🏗️ **Build** | `npm run build` | Create optimized production bundle |
| 👁️ **Preview** | `npm run preview` | Preview the production build locally |
| 🔍 **Lint** | `npm run lint` | Run ESLint across the codebase |

---

## 🔮 Future Enhancements

- [ ] 🌙 Dark Mode toggle across all pages
- [ ] 📲 Push notification support for critical alerts
- [ ] 📈 Advanced analytics with chart.js/recharts
- [ ] 🌐 Full RTL & Arabic language support
- [ ] 🧪 Unit & integration test coverage with Vitest
- [ ] 🐳 Dockerize the frontend for containerized deployments
- [ ] 📤 Export reports as PDF and Excel

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

> [!NOTE]
> Please follow conventional commits and make sure ESLint passes before submitting a PR.

---

## 📄 License

This project is proprietary software. All rights reserved © Sijill Healthcare Systems.

---

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400" alt="Animated Footer"/>

<br/>

**Built with ❤️ by the Sijill Engineering Team**

📅 **Last Updated:** July 2026

<br/>

<img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=for-the-badge&logo=vite" />

</div>
