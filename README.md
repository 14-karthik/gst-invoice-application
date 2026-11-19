# Ledgerly — GST Invoice Management (v2)

A responsive React + Vite + Express + MongoDB GST billing application. The project is rebuilt to replace JSON-file storage with MongoDB and to produce a complete A4 invoice PDF with the information entered in the form.

## Features

- Business profile: shop name, owner, GSTIN, PAN, contact, address, state, bank details and terms.
- Customer directory: create, list and delete customer records.
- Invoice builder: invoice/due date, original/duplicate/triplicate copy, place of supply, reverse charge, buyer details and multiple line items.
- Item fields: description, HSN/SAC, quantity, unit, unit price, discount, GST percentage and calculated line amount.
- Automatic taxable value, CGST + SGST for intra-state, or IGST for inter-state, and grand total.
- Invoice register with search and PDF download.
- A4 PDF includes business and buyer details, invoice metadata, all item rows and amounts, tax summary, amount in words, bank details, terms and authorised-signatory area.
- Responsive layout for desktop, tablet and phone. On mobile, the navigation becomes a slide-out menu and forms stack into a single column.
- MongoDB local development (MongoDB Compass) and MongoDB Atlas deployment support through one environment variable.

## Requirements

- Node.js 20 or later
- npm
- MongoDB Community Server running locally for local development, or a MongoDB Atlas cluster

## 1. Extract and open the project

Extract the ZIP. Open the `GST-Invoice-Pro` folder in VS Code.

## 2. Configure MongoDB locally (Compass)

1. Install and start MongoDB Community Server.
2. Open MongoDB Compass.
3. Connect with `mongodb://127.0.0.1:27017`.
4. The application will create/use the `gst_invoice_pro` database after the first saved business, customer or invoice document. MongoDB does not show an empty database until a document is inserted.

Create `server/.env` by copying `server/.env.example`, then set:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gst_invoice_pro
CLIENT_URL=http://localhost:5173
```

Do not add quotes around the values. `MONGODB_URI` must include the database name.

## 3. Install dependencies

Open a terminal in the root `GST-Invoice-Pro` folder:

```bash
npm install
npm run install:all
```

## 4. Start frontend and backend

From the root folder:

```bash
npm run dev
```

Open the website:

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health (must return `ok: true` and `database: gst_invoice_pro`)

The terminal should show `MongoDB connected`, `Database: gst_invoice_pro`, and the API URL. The server now loads `server/.env` reliably (or the root `.env` if the server-level file does not exist). If your older URI is `mongodb://localhost:27017/` with no database name, the server automatically selects `gst_invoice_pro` instead of silently using `test`.

## 5. Verify that MongoDB is connected

Open `http://localhost:5000/api/health`. A working local connection returns JSON similar to:

```json
{"ok":true,"database":"gst_invoice_pro","readyState":1,"message":"MongoDB connected"}
```

If the website shows **Database offline**, check that MongoDB Community Server is running, then inspect the backend terminal. The backend logs each API request and prints database errors. Save forms only after the health endpoint reports `ok: true`.

## 6. Test the application

1. Open **Store profile** and save the shop name, address, GSTIN, phone, state and optional bank details.
2. Open **Customers** and add a customer.
3. Open **New invoice**, enter buyer details, add one or more products and choose the correct GST treatment.
4. Click **Save invoice to MongoDB**.
5. Open **Invoice register** and download the saved A4 PDF.
6. In Compass, refresh the connection and inspect:
   - `gst_invoice_pro` → `businesses`
   - `gst_invoice_pro` → `customers`
   - `gst_invoice_pro` → `invoices`

## 7. Switch from local MongoDB to MongoDB Atlas

When deploying online, create an Atlas cluster and database user. In Atlas, allow network access only from the IP addresses your hosting provider uses (for a temporary test, Atlas allows `0.0.0.0/0`, but this is less secure). Copy the Atlas connection string and replace `<password>` and the database name.

Set the backend hosting environment variable:

```env
MONGODB_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/gst_invoice_pro?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=https://YOUR-FRONTEND-DOMAIN
```

Set the frontend hosting environment variable:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Deploy `server` as a Node.js web service and `client` as a static Vite site. Build command for the frontend: `npm install && npm run build`; publish directory: `client/dist` (if your host's root directory is `client`, use `dist`). Backend start command: `npm start` (inside `server`). Add all environment variables in the hosting provider dashboard; do not upload `.env` files or commit database credentials.

## Important security and GST notes

- This project is a functional academic/store billing starter, not certified GST, e-invoicing or accounting software. Verify invoice numbering, tax rates, HSN/SAC, place-of-supply rules, mandatory invoice fields and rounding with a qualified accountant before commercial use.
- The starter API does not yet include user login/role permissions. Do not expose real customer or financial records to the public internet until authentication, authorization, HTTPS, rate limiting, backups and appropriate access controls have been added.
- Keep your Atlas credentials private. Never share the connection string in screenshots or public repositories.
- Do not use the sample invoice details in production without replacing them with the store's verified legal details.

## Project structure

```text
GST-Invoice-Pro/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Business.js
│   │   │   ├── Customer.js
│   │   │   └── Invoice.js
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
└── package.json
```

## API endpoints

- `GET /api/health`
- `GET, POST /api/business`
- `GET, POST /api/customers`
- `DELETE /api/customers/:id`
- `GET, POST /api/invoices`
- `GET /api/invoices/:id`
