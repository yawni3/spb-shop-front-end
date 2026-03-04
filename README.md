# 🧁 Sleepy pie bakery 

## 1️⃣ Project Description

**🥐 Sleepy Pie Bakery**: Web-based asset & content platform.


- Users: visitor / member / buyer
- Admin: content and asset management
- Purpose: asset sales + supporting the ecosystem of projects

---

## 2️⃣ Technologies Used

| Layer | Technology |
| --- | --- |
| Frontend | React (Netlify deploy) |
| Backend | Node.js / Express (MongoDB) |
| Admin Panel | Electron build (Dashboard) |
| Database | MongoDB |
| Deployment | Frontend: Netlify / Backend: Own server |

---

## 3️⃣ Architecture

```
SPB/
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable React Components
│ │ ├── pages/ # Page Components
│ │ ├── assets/ # Static assets (images, icons)
│ │ ├── hooks/ # Custom React hooks
│ │ ├── context/ # Global state management
│ │ ├── utils/ # Helper functions
│ │ └── App.js
│   └── package.json
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # API logic
│ │ ├── routes/ # API routes
│ │ ├── models/ # MongoDB schemas
│ │ ├── middleware/ # Auth / validation
│ │ └── server.js # Entry point
│ └── package.json
│
├── admin-dashboard/
│ ├── src/
│ │   ├── components/
│ │ ├── pages/
│ │ └── main.js # Electron main process
│ └── package.json
│
├── docs/
│ └── README.md
└── .gitignore
```

---

## 4️⃣ Workflow

1. Frontend and Backend separation → Sending and receiving data via REST API
2. Admin Dashboard → Will be built via Electron, connecting to the backend API
3. MongoDB → User, asset, and sales data
4. Deployment → Frontend Netlify, Backend's own server
5. Asset pack → Will be published via SPB, seasonal logic will be applied

---

## 5️⃣ Upcoming Improvements

- User authentication can be integrated with Firebase
- Premium content / payment system (Stripe / Gumroad API)
- Analytics (user engagement, asset sales)
