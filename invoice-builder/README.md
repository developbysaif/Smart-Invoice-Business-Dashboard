# Free Invoice Builder — Next.js

A full conversion of the vanilla HTML/Tailwind/JS invoice builder into a Next.js 14 App Router project with TypeScript and React state management.

---

## Project Structure

```
invoice-builder/
├── app/
│   ├── layout.tsx          # Root layout (font-awesome CDN, global CSS)
│   ├── page.tsx            # Entry point — routes between views
│   └── globals.css         # Tailwind + custom animations
├── components/
│   ├── auth/
│   │   ├── HomePage.tsx    # Landing page (converted from index.html home section)
│   │   ├── LoginPage.tsx   # Login form
│   │   ├── SignupPage.tsx  # Signup form
│   │   └── ClientForm.tsx  # Standalone sender/client form (from client.html)
│   ├── dashboard/
│   │   └── DashboardPage.tsx  # Dashboard with invoice table
│   └── invoice/
│       ├── InvoicePage.tsx    # Full invoice builder
│       ├── ContactModal.tsx   # Sender/Receiver modal
│       └── CustomFieldModal.tsx
├── lib/
│   └── AuthContext.tsx     # Global auth + view state (React Context)
├── types/
│   └── index.ts            # Shared TypeScript types
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## What Changed (HTML → Next.js)

| Before (HTML/JS)                        | After (Next.js)                              |
|-----------------------------------------|----------------------------------------------|
| Single `index.html` with `hidden` divs | Separate page components, view router        |
| `document.getElementById` everywhere   | React `useState` / `useRef` hooks            |
| `localStorage` checked on load         | `AuthContext` with `useEffect` hydration     |
| Inline `<script>` blocks               | TypeScript modules with proper imports       |
| `class` toggling for show/hide         | Conditional rendering (`&&`, `switch`)       |
| Global `window.showDashboard()`        | `useAuth().goTo()` from context              |
| `html2pdf` via CDN script tag          | Dynamic `import('html2pdf.js')` on demand    |
| `client.html` as separate file         | `ClientForm.tsx` component                   |

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Features

- ✅ Login / Signup / Guest access
- ✅ Dark mode toggle (persists via Tailwind `dark` class)
- ✅ Invoice builder with live totals
- ✅ Sender & Receiver modals
- ✅ Logo upload (click or drag & drop)
- ✅ Optional sections: Company Info, Client Info, Description, Payment Methods
- ✅ Custom fields (text, number, date, textarea)
- ✅ Multi-currency support (USD, PKR, EUR, GBP)
- ✅ PDF download via html2pdf.js
- ✅ Invoice save to localStorage
- ✅ Delete / reset invoice

---

## Notes

- `html2pdf.js` is loaded dynamically (client-side only) to avoid SSR issues.
- `AuthContext` handles all view routing — no Next.js router pages needed since this is a SPA-style app.
- To add real auth, replace the `login()` function in `lib/AuthContext.tsx` with your API call.
