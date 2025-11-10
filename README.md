# KhaataFlow - Expense Management Application

![KhaataFlow Logo](frontend/src/assets/logo-2.png)

KhaataFlow is an expense management application inspired by Splitwise. It allows users to track personal expenses, manage group expenses, and easily split bills among friends and family. This project uses the PERN stack (PostgreSQL, Express.js, React, Node.js) and is deployed on AWS.

## Table of Contents

- ### [Features](#features)
- ### [Tech Stack](#tech-stack)
- ### [Project Architecture](#project-architecture)
- ### [Quick Start with Docker](#quick-start-with-docker)
- ### [Manual Setup](#manual-setup)

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

## Quick Start with Docker

The easiest way to run KhaataFlow is using Docker Compose, which sets up all services (frontend, backend, and database) automatically.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run the Application
1. Clone the repository
    ```bash
    git clone https://github.com/mannbajpai/khaataflow.git
    cd khaataflow
    ```

2. Start all services
    ```bash
    docker-compose up --build
    ```

3. Access the application
    - **Frontend**: http://localhost:5173
    - **Backend API**: http://localhost:5000/api
    - **Database**: localhost:5432 (internal only)

### Observability Stack

KhaataFlow includes a local observability stack with Prometheus and Grafana for monitoring application metrics.

#### Access Monitoring Services
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

#### Metrics Endpoints
- **Health Check**: http://localhost:5000/healthz
- **Readiness Check**: http://localhost:5000/readyz
- **Metrics**: http://localhost:5000/metrics

### Stop the Application
```bash
docker-compose down
```

### Run Tests
```bash
# Backend tests (runs during Docker build)
docker-compose build backend

# Frontend tests (runs during Docker build)  
docker-compose build frontend
```

### Development Commands

Use the provided Makefile for common development tasks:

```bash
make help          # Show available commands
make build         # Build all Docker images
make up            # Start all services
make down          # Stop all services
make test          # Run all tests
make lint          # Run linting
make format        # Format code
make seed          # Seed database with demo data
make dev-setup     # Full development setup
```

## Seed Data

KhaataFlow includes a comprehensive seed script that populates the database with realistic demo data for testing and development purposes.

### What the Seed Data Includes

The seed script creates:

#### 👥 **Users (4 total)**
- **Alice Johnson** (`alice@example.com`) - Password: `password123`
- **Bob Smith** (`bob@example.com`) - Password: `password123`
- **Charlie Brown** (`charlie@example.com`) - Password: `password123`
- **Diana Prince** (`diana@example.com`) - Password: `password123`

#### 👨‍👩‍👧‍👦 **Groups (3 total)**
- **Weekend Trip** - Trip to mountains (Code: `GRP1`)
- **Dinner Club** - Monthly dinner outings (Code: `GRP2`)
- **Game Night** - Board games and fun (Code: `GRP3`)

*All users are members of all groups.*

#### 💰 **Personal Expenses**
- **12 months** of historical data (past year)
- **3-7 expenses per user per month**
- **Amount range**: $5 - $55 per expense
- **Categories**: Food, Transport, Entertainment, Accommodation, Shopping
- **Examples**: Lunch at restaurant, Bus tickets, Movie tickets, Groceries, Coffee

#### 🤝 **Group Expenses**
- **1-3 group expenses per group per month**
- **Amount range**: $10 - $110 per expense
- **Split method**: Equal splits among all group members
- **Settlement status**: ~30% of splits are marked as settled
- **Examples**: Hotel booking, Concert tickets, Group dinner

### How to Use Seed Data

#### Using Docker (Recommended)
```bash
# Start services
make up

# Seed the database
make seed

# Or run directly
docker-compose exec backend npm run seed
```

#### Manual Setup
```bash
cd backend
npm run seed
```

### Example Usage Scenarios

#### **Login and Explore**
```bash
# Login with any user
Email: alice@example.com
Password: password123

# Or use the web interface at http://localhost:5173
```

#### **View Personal Expenses**
- Login as Alice → Navigate to "My Expenses"
- See 12 months of personal spending data
- Filter by category, date range, or amount

#### **Group Expense Management**
- Login as Alice → Navigate to "Groups"
- Join existing groups using codes: `GRP1`, `GRP2`, `GRP3`
- View group expenses and settlement status
- See who owes what and who has paid

#### **Analytics and Insights**
- View spending patterns over time
- Analyze category-wise expenses
- Track group expense settlements
- Monitor personal vs group spending ratios

### Data Volume Summary
- **Total Users**: 4
- **Total Groups**: 3
- **Total Group Members**: 12 (4 users × 3 groups)
- **Personal Expenses**: ~720 (4 users × 12 months × 4.5 avg expenses)
- **Group Expenses**: ~108 (3 groups × 12 months × 3 avg expenses)
- **Expense Splits**: ~432 (108 group expenses × 4 members each)

### Resetting Data
To clear and reseed the database:
```bash
make db-reset  # Stops containers, clears volumes, rebuilds, and reseeds
```

This seed data provides a realistic testing environment with sufficient data to demonstrate all application features and test various scenarios.

## Manual Setup

If you prefer to run the application without Docker, follow these steps:

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
