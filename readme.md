# Task Manager Django + Vite Project

A full-stack Task Manager application built using:

* Django (Backend)
* Vite + Frontend UI
* SQLite Database

This project is designed for students to learn full-stack development using Django and modern frontend tooling.

---

# Repository

[taskmanager-django Repository](https://github.com/mrinal0g/taskmanager-django?utm_source=chatgpt.com)

---

# Features

* User Authentication
* Task Management
* Create / Update / Delete Tasks
* Django Backend
* Modern Frontend using Vite
* REST-style project structure
* SQLite Database
* Beginner Friendly

---

# Tech Stack

## Backend

* Python
* Django

## Frontend

* Vite
* HTML
* CSS
* JavaScript

## Database

* SQLite3

---

# Project Structure

```text id="8n2mzs"
taskmanager-django/
│
├── frontend/          # Vite frontend
├── login/             # Authentication app
├── practice/          # Django project settings
├── manage.py
├── db.sqlite3
└── requirements.txt
```

---

# Prerequisites

Install these before running the project:

* Python 3.x
* Node.js
* Git

Downloads:

* [Python](https://www.python.org/downloads/?utm_source=chatgpt.com)
* [Node.js](https://nodejs.org/?utm_source=chatgpt.com)
* [Git](https://git-scm.com/downloads?utm_source=chatgpt.com)

---

# Clone the Repository

```bash id="cb8if3"
git clone https://github.com/mrinal0g/taskmanager-django.git
```

Move into project folder:

```bash id="3v7zyh"
cd taskmanager-django
```

---

# Backend Setup (Django)

## 1. Create Virtual Environment

### Windows

```bash id="y3c26u"
python -m venv env
```

---

## 2. Activate Virtual Environment

### Windows

```bash id="a6vg5u"
env\Scripts\activate
```

---

## 3. Install Dependencies

```bash id="z9zjlwm"
pip install -r requirements.txt
```

If requirements file does not work:

```bash id="l0v6qy"
pip install django
```

---

## 4. Run Database Migrations

```bash id="2kq7hn"
python manage.py makemigrations
python manage.py migrate
```

---

## 5. Create Admin User (Optional)

```bash id="f3g2gv"
python manage.py createsuperuser
```

---

## 6. Run Django Server

```bash id="4dlt6m"
python manage.py runserver
```

Backend runs at:

```text id="jsdr9f"
http://127.0.0.1:8000/
```

---

# Frontend Setup (Vite)

Open a new terminal.

Move into frontend folder:

```bash id="88vd4y"
cd frontend
```

Install node modules:

```bash id="mjlwm8"
npm install
```

Start Vite server:

```bash id="lq0fxd"
npm run dev
```

Frontend runs at:

```text id="f5lkw3"
http://localhost:5173/
```

---

# Running Full Project

## Terminal 1

Run Django backend:

```bash id="wm1u4w"
python manage.py runserver
```

## Terminal 2

Run Vite frontend:

```bash id="9d7x1l"
cd frontend
npm run dev
```

---

# Admin Panel

Open:

```text id="63sl20"
http://127.0.0.1:8000/admin/
```

Login using superuser credentials.

---

# Common Errors

## Virtual Environment Not Activated

```bash id="xgt4sh"
env\Scripts\activate
```

---

## Django Not Installed

```bash id="d2tt8u"
pip install django
```

---

## Node Modules Missing

```bash id="kkcqzv"
npm install
```

---

## Port Already in Use

### Django

```bash id="0e8mmo"
python manage.py runserver 8001
```

### Vite

```bash id="fdtqow"
npm run dev -- --port 5174
```

---

# Learning Objectives

Students will learn:

* Django Basics
* Project Structure
* Django Apps
* URL Routing
* Authentication
* CRUD Operations
* Frontend + Backend Integration
* Vite Setup
* API Communication
* Database Migrations

---

# Author

Mrinal Sarkar

GitHub:
[mrinal0g GitHub Profile](https://github.com/mrinal0g?utm_source=chatgpt.com)
