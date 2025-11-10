.PHONY: help build up down restart logs test lint format seed clean

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

# Docker commands
build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## Show logs from all services
	docker-compose logs -f

# Development commands
test: ## Run tests for backend and frontend
	cd backend && npm test
	cd ../frontend && npm test

lint: ## Run linting for backend and frontend
	cd backend && npm run lint
	cd ../frontend && npm run lint

format: ## Format code for backend and frontend
	cd backend && npm run format
	cd ../frontend && npm run format

seed: ## Seed the database with demo data
	cd backend && npm run seed

# Cleanup commands
clean: ## Remove all containers, volumes, and images
	docker-compose down -v --rmi all

# Backend specific
backend-test: ## Run backend tests
	cd backend && npm test

backend-lint: ## Run backend linting
	cd backend && npm run lint

backend-format: ## Format backend code
	cd backend && npm run format

# Frontend specific
frontend-test: ## Run frontend tests
	cd frontend && npm test

frontend-lint: ## Run frontend linting
	cd frontend && npm run lint

frontend-format: ## Format frontend code
	cd frontend && npm run format

# Database commands
db-reset: ## Reset the database (drop and recreate)
	docker-compose down -v
	docker-compose up -d db
	@echo "Waiting for database to be ready..."
	@sleep 10
	cd backend && npm run seed

# Full development setup
dev-setup: ## Full development setup (build, up, seed)
	make build
	make up
	@echo "Waiting for services to be ready..."
	@sleep 15
	make seed
	@echo "Development environment is ready!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:5000"
	@echo "Prometheus: http://localhost:9090"
	@echo "Grafana: http://localhost:3000 (admin/admin)"