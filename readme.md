# 📌 **MyTracker – Job & DSA Problem Tracker**


![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blueviolet?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?logo=postgresql)

# Project intro
> A full-stack web app to track **job applications** and **DSA problems** in one place.  
> Built with **React + Vite**, **Tailwind CSS**, **Node.js (Express)**, and **PostgreSQL**.

---


## ✅ **Features**
- Track job applications with company, role, status, applied date, notes, and contact info
- Track DSA problems with title, difficulty, and status
- Edit, update, and delete entries for jobs and problems
- Responsive design (tables on desktop, cards on mobile)
- Analytics view for job and DSA progress


## 🛠 **Tech Stack**
- **Frontend:** React (Vite),CSS  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL (Supabase for hosting)  
- **API Communication:** Axios  
- **Deployment:** Vercel / Netlify (Frontend), Render / Railway (Backend)  

---

## 🛠 **Database Schema**

### **Table: job_applications**
```sql
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100),
  role VARCHAR(100),
  status VARCHAR(50),
  applied_date DATE,
  notes TEXT,
  contact_name VARCHAR(100),
  contact_email VARCHAR(100)
);
```
### **Table: dsa_problems**
```sql
CREATE TABLE dsa_problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  difficulty VARCHAR(50),
  status VARCHAR(50)
);
```


