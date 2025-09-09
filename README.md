Product CRUD App

A simple **React + Vite + TailwindCSS** CRUD application for managing products.  
Data is powered by a [MockAPI backend](https://mockapi.io/).

---

## 🚀 Features
- 📄 List all products
- ➕ Create new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 🖼️ Upload and preview product images
- ✅ Toast notifications for actions

---

## 📂 Project Structure
product-crud-app/
│── src/
│ ├── api.js # API service (Axios)
│ ├── App.jsx # Main app routes
│ ├── main.jsx # Entry point
│ └── components/ # UI Components
│ ├── Product.jsx # Product listing
│ ├── ProductForm.jsx # Add/Edit product form
│ ├── Spinner.jsx # Loading spinner
│
│── package.json
│── tailwind.config.js
│── postcss.config.js
│── README.md

yaml
Copy code

---

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chi-10/product-crud-app.git
   cd product-crud-app
Install dependencies

bash
Copy code
npm install
Start development server

bash
Copy code
npm run dev
The app will be available at http://localhost:5173

⚙️ Build for Production
bash
Copy code
npm run build
