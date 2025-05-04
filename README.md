### Overview
Country Explorer is a React-based web application that allows users to explore information about countries worldwide using data from the REST Countries API. The application features search, filtering, detailed country views, and user authentication for saving favorite countries.


### Live Demo
View the Hosted App Here -> 


### Features
* Country Browsing: View a comprehensive list of all countries with key information
* Detailed Country View: Click on any country to view in-depth details
* Search Functionality: Find countries by name
* Multiple Filtering Options: Filter countries by region and language
* User Authentication: Register, login, and maintain a personalized session
* Favorites System: Save your favorite countries for quick access (requires login)
* Responsive Design: Seamless experience across all device sizes
* Dark/Light Mode: Toggle between visual themes


### Technologies Used
## Frontend
React
Vite
Material UI
Axios (for API calls)
React Router DOM (for routing)

## Backend
Node.js with Express
MongoDB (for user data storage)
JWT (for authentication)

## Testing
Jest
React Testing Library

## Deployment
Frontend: Render
Backend: Render


### API Endpoints Used
The application consumes the following endpoints from REST Countries API (v3.1):

* GET /all - Fetch all countries
* GET /name/{name} - Search by country name
* GET /region/{region} - Filter by region (Africa, Americas, Asia, Europe, Oceania)
* GET /alpha/{code} - Get country details by alpha code


### Getting Started
## Prerequisites
Node.js (v18 or higher)
npm or yarn
MongoDB (for local development)

## Installation
# Clone the repository
```
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-JanudiAdhikari.git
cd af-2-JanudiAdhikari
```

# Install dependencies
Install frontend dependencies
```
cd frontend
npm install
```

Install backend dependencies
```
cd backend
npm install
```

## Environment setup
Create .env files in both frontend and backend directories.
# frontend .env
```
VITE_API_URL=http://localhost:5000/api
```

# backend .env
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
```


### Running the application
## Start backend server
```
cd backend
npm run dev
```

## In a new terminal, start frontend
```
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.


### Testing
## Run frontend tests
```
cd frontend
npm test
```
