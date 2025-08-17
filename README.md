# Apartment-Management-System (AptEase)
Overview

AptEase is a web application to manage apartment operations. It allows admins to manage flats, track maintenance requests, and streamline housing operations. The project integrates with JIRA for task tracking and GitHub Actions for CI/CD.

Features

    Add, view, update, delete flats

    Add, view, update, delete maintenance requests

Tech Stack

    Frontend: React.js, TailwindCSS, Axios

    Backend: Node.js, Express.js, MongoDB

CI/CD: GitHub Actions, AWS (PM2 deployment)

Setup

Clone repo:

git clone https://github.com/kushal1206/Apartment-Management-System.git


Backend setup:

cd backend && npm install && npm start


Configure .env with MongoDB URI and PORT.

Frontend setup:

cd frontend && npm install && npm run dev

CI/CD

CI: GitHub Actions run tests on each push/PR

CD: Deploys to AWS with PM2