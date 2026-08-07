# 🛠️ Trouve ton artisan API

This is a **back-end REST API** made with **Express** to connect homeowners with craftsmen from the **Auvergne-Rhône-Alpes** region. It exposes the artisans and categories catalog, handles the contact form emails, and provides comprehensive API documentation with Swagger UI.

## 🖥️ Tech Stack

**Backend:**
- **Node.js + Express** — Web framework, REST routes, JSON APIs
- **Sequelize** — ORM for MySQL
- **MySQL 8** — Production database
- **Nodemailer** — Email sending (Ethereal test SMTP in development)
- **Swagger (swagger-jsdoc + swagger-ui-express)** — Interactive API documentation

**DevOps:**
- **Render** — Server hosting
- **Git / GitHub** — Version control
- **env-cmd + nodemon** — Environment files & auto-restart during development

## 🚀 Setup

### Prerequisites

- **Node.js** (>= 18)
- **MySQL** running locally

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/loickcherimont/api-trouve-ton-artisan-express.git
cd api-trouve-ton-artisan-express

# 2. Install dependencies
npm install

# 3. Create the database and seed it
mysql -u root < scripts/schema.sql
mysql -u root < scripts/data.sql

# 4. Start the API (development)
npm run dev

# API is now running on http://127.0.0.1:3000
```

**Access the API:**
- **Swagger UI (interactive docs)** → http://127.0.0.1:3000/api-docs
- **API Root** → http://127.0.0.1:3000/api

## ⚙️ Environment Variables

The environment files are located in the `env/` folder (`npm run dev` loads `env/.env.dev`, `npm run prod` loads `env/.env.prod`).

```bash
NODE_ENV=template
APP_NAME=API Trouve ton artisan
DB_HOST=127.0.0.1
DB_NAME=trouve_ton_artisan

# To modify for production
DB_USERNAME=root
DB_PASSWORD=''
WEB_APP_HOST=http://localhost:5173,http://localhost:4173
```

- **`WEB_APP_HOST`** — comma-separated list of allowed CORS origins: `http://localhost:5173` (**Vite dev server**) and `http://localhost:4173` (**`vite preview` — the port changes to 4173 after the build**).

## ▶️ Usage

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | List all professional categories | ✅ Public |
| GET | `/api/artisans` | List all artisans (filters: `est_en_top_trois`, `nom`) | ✅ Public |
| GET | `/api/artisans/{id}` | Get a single artisan by id | ✅ Public |
| POST | `/api/contact` | Submit the contact form (sends an email to the artisan) | ✅ Public |

### 1. List All Categories

```bash
curl http://localhost:3000/api/categories
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nom": "Bâtiment",
    "slug": "batiment"
  }
]
```

### 2. List All Artisans

```bash
curl http://localhost:3000/api/artisans
```

**With filters — only the top 3 artisans of the home page:**

```bash
curl "http://localhost:3000/api/artisans?est_en_top_trois=true"
```

**Search by name:**

```bash
curl "http://localhost:3000/api/artisans?nom=vallis"
```

### 3. Get a Single Artisan

```bash
curl http://localhost:3000/api/artisans/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nom": "Vallis Bellemare",
  "note": 4,
  "ville": "Vienne",
  "a_propos": "Artisan passionné...",
  "email": "v.bellemare@exemple.fr",
  "site_web": null,
  "est_en_top_trois": false,
  "specialites_id": 1
}
```

**Response (404 Not Found):** `{ "error": 404, "message": "Artisan introuvable" }`

### 4. Submit the Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jeanne Dupont",
    "email": "jeanne.dupont@mail.fr",
    "objet": "Devis plomberie",
    "message": "Bonjour, j'aimerais un devis pour...",
    "to": "v.bellemare@exemple.fr"
  }'
```

**Response (200 OK):**
```json
{
  "message": "Merci pour votre message. Vous recevrez une réponse sous 48h.",
  "previewUrl": "https://ethereal.email/message/xxxx"
}
```

> [!NOTE]
> In development, emails are sent through **Ethereal** (fake SMTP). They are not delivered, but can be previewed in a browser using the returned `previewUrl`.

## 📄 API Documentation

**Full interactive documentation on Render** with request/response examples:
→ https://api-trouve-ton-artisan-express.onrender.com/api-docs

![Preview API documentation](.github/endpoints-docs.png 'API docs with Swagger UI | Trouve ton artisan API')

## 🔗 Related Project

Frontend React application consuming this API:
→ [devoir-trouve-ton-artisan-reactjs](https://github.com/loickcherimont/devoir-trouve-ton-artisan-reactjs)

## 🔑 License

<div align="center">Copyright &copy; 2026 | Loick CHERIMONT | All Rights Reserved.</div>
