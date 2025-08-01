frontend:
    @echo "Starting webapp..."
    cd webapp && yarn start:dev

backend:
    @echo "Starting server..."
    cd server && yarn start:dev

frontend-test:
    @echo "Testing frontend..."
    cd webapp && yarn test --watchAll=false

backend-test:
    @echo "Testing backend..."
    cd server && yarn test

test: 
    @echo "Running all tests..."
    just frontend-test backend-test

install:
    @echo "Installing dependencies for both frontend and backend..."
    cd server && yarn install && cd ../webapp && yarn install && cd ../

lint:
    @echo "Linting both frontend and backend..."
    cd server && yarn lint && cd ../webapp && yarn lint

format:
    @echo "Formatting both frontend and backend..."
    cd server && yarn format && cd ../webapp && yarn format

all:
    @echo "Runs everything"
    just install format lint test