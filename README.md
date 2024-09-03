# KhaataFlow - Expense Management Application

![KhaataFlow Logo](frontend/src/assets/logo-2.png)

KhaataFlow is an expense management application inspired by Splitwise. It allows users to track personal expenses, manage group expenses, and easily split bills among friends and family. This project uses the PERN stack (PostgreSQL, Express.js, React, Node.js) and is deployed on AWS.

## Table of Contents

- ### [Features](#features)
- ### [Tech Stack](#tech-stack)
- ### [Project Architecture](#architecture)
- ### [Setup](#setup)

## Features

- **User Authentication**: Secure login and signup with JWT and cookie-parser.
- **Expense Management**: Add, edit, delete, and track personal expenses.
- **Group Expenses**: Create groups, manage members, and split expenses using different methods (equal, exact, percentage).
- **Profile Management**: View and update profile information, including username and profile photo.
- **Responsive Design**: User-friendly interface built with React and styled with Tailwind CSS and Daisy UI.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Daisy UI
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Deployment**: AWS (ASG, NLB, RDS, S3, CloudFront)

## Project Architecture

![KhaataFlow Logo](frontend/public/Project%20Architecture.png)

- ### *Components*
    1. **VPC** with public and private subnet
    2. **S3** bucket to store React app build files
    3. **CloudFront Distribution** to make react website highly available and accessible
    4. **Network Load Balancer** with TCP 5000 to balance load on running backend servers
    5. **Auto Scaling Group** to launch/terminate EC2 running our express app on demand
    6. **SNS** to send email notification about launch and termination of instances
    7. **RDS** for the PostgreSQL database instance
- ### *Interactions*:
    * CloudFront makes API calls to Network Load Balancer.
    * Load Balancer routes to Auto Scaling Group instances.
    * Instances connect to PostgreSQL RDS for queries.
- ### *Security*:
    * CloudFront exposed to the internet.
    * Other components secured by security groups.

## Setup

- Clone the repository
    ```bash
    git clone https://github.com/mannbajpai/khaataflow.git
    ```
- Install all the dependencies
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```
- Make the environment variables available
    ```env
    NODE_ENV = "development"
    PORT = 5000

    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=password
    DB_NAME=db_name
    DB_PORT=5432

    ORIGIN=http://localhost:5173

    JWT_SECRET=secret
    JWT_EXPIRES_IN=2d

    VITE_API_BASE_URL=http://localhost:5000/api

    ```
- Run the tests
    ```bash
    cd frontend
    npm test
    cd backend
    npm test
    ```
- Run the Application
    ```bash
    cd backend
    npm start
    cd frontend
    npm run dev
    ```
