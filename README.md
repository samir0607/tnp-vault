# 🛠️ T&P Vault Admin Dashboard

This is a secure **Admin Dashboard** for generating and managing shareable tokens/links for T&P Vault. These tokens can be used to share private pages with expiry handling, access control, and simple user-friendly features.

## 📦 Features

- 🔐 **Admin Login** with secure token-based authentication (Access + Refresh tokens).
- 🔗 **Generate Share Links** with automatic expiry checks.
- 🧾 **Save and Manage Tokens** via localStorage with UI actions (Copy/Delete).
- 📊 **Responsive UI** with table view and modern TailwindCSS styling.
- 🖼️ **Custom Branding** (e.g. DTU logo) and professional layout.

---

## 📁 Tech Stack

| Tech             | Usage                                    |
|------------------|------------------------------------------|
| **Next.js 14**   | App routing, SSR                         |
| **React**        | UI framework                             |
| **TailwindCSS**  | Styling                                  |
| **Zod + React Hook Form** | Form validation and state       |
| **TypeScript**   | Type safety                              |
| **LocalStorage** | Client-side persistence of share tokens  |

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/samir0607/tnp-vault
cd tnp-vault
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

## 🧠 Usage Guide
### 🔐 Admin Login
1. Visit /admin/login
2. Enter valid username and password
3. On success, access token and refresh token are stored in localStorage

### 🔗 Generate Share Link
1. Enter a label name (e.g., “XYZ company”)
2. Click “Generate”
3. Token is generated via API (generateShareToken) and saved to localStorage

**Link is shown in a table with:**

📋 Copy button (copies to clipboard)

🗑️ Delete button (removes from UI and storage)

## Folder Structure
```
src/
│
├── app/                             # App Router structure (Next.js 13+)
│   ├── page.tsx                     # Root landing page (/)
│   ├── layout.tsx                   # Root layout with global styling
│   ├── globals.css                  # Tailwind & global CSS variables
│   ├── favicon.ico                  # Site favicon
│   │
│   ├── admin/                       # Admin section routing
│   │   ├── page.tsx                 # Admin dashboard (/admin)
│   │   └── login/                  
│   │       └── page.tsx             # Admin login page (/admin/login)
│   │
│   └── share/                       
│       └── [token]/                
│           └── page.tsx             # Public token share page (/share/[token])
│
├── components/                     # Reusable UI components
│   ├── SearchBar.tsx               # Search input component
│   └── StudentTable.tsx            # Table component to render shared data
│
├── hooks/                          # Custom React hooks
│   └── useAuth.ts                  # Hook to fetch & validate auth token
│
├── lib/                            # Shared utility functions and API logic
│   ├── api.ts                      # API wrappers (login, share token generation)
│   └── auth.ts                     # Token validation and decoding utilities

```
### ✅ Link Format
```pgsql
{window.location.origin}/share/{token}
```

### 📅 Token Expiry
On page load, expired tokens (based on payload.exp) are removed automatically.

## 🛡️ Security Note
This app stores tokens client-side for simplicity. In production:

1. Use secure HTTP-only cookies
2. Move share token validation logic to backend
3. Add rate limiting & audit logging

## 🧩 Summary Flow
- User visits /admin/login, logs in → Tokens saved
- Redirected to /admin, sees dashboard
- Can generate share tokens, which are saved in localStorage and shown in a table
- Public can visit /share/[token] to see shared page
- Global layout + styles are managed in layout.tsx and globals.css
