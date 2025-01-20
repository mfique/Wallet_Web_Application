## Wallet Web Application - Frontend
This is the frontend for the Wallet Web Application, a React-based personal finance management platform. It provides features for managing accounts, tracking transactions, setting budgets, and viewing financial summaries.

## Getting Started
This project was bootstrapped with Create React App.

## Prerequisites
Node.js (v14 or higher)
npm or yarn
Available Scripts
In the project directory, you can run:

### npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The app will reload if you make edits.
You will also see any lint errors in the console.

## npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

## npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.
The app is ready for deployment!

## npm run eject
Note: This is a one-way operation. Once you eject, you can’t go back!
This command will copy all configuration files and dependencies directly into the project, allowing full control over the setup.

## Environment Variables
To configure the app for development and production, create a .env file in the project root. Below are the required environment variables:
.env
REACT_APP_API_URL=http://localhost:5000
Replace the value of REACT_APP_API_URL with the backend URL (e.g., https://your-backend.onrender.com) for production.

## Project Structure
src/
├── api/                    # API integration with Axios
│   ├── account.js          # API methods for accounts
│   ├── transaction.js      # API methods for transactions
│   ├── budget.js           # API methods for budgets
│   ├── notification.js     # API methods for notifications
├── components/             # Reusable components
│   ├── Navbar.js           # Navigation bar
│   ├── Dashboard.js        # Main dashboard
│   ├── ProtectedRoute.js   # Route protection component
├── pages/                  # Page-level components
│   ├── Login.js            # Login page
│   ├── Signup.js           # Signup page
│   ├── Reports.js          # Reports page
│   ├── Notifications.js    # Notifications page
├── context/                # Context API for authentication
├── App.js                  # Main app component
├── index.js                # Entry point
## Key Features
User Authentication: Secure login and signup with token-based authentication.
Accounts Management: View and manage multiple accounts.
Transaction Tracking: Add and categorize income and expenses.
Budget Management: Set and track budget limits.
Notifications: Stay updated with alerts for transactions and budget status.
Data Visualization: Interactive charts for financial summaries using Chart.js.
## Running the Frontend
Clone the repository:
git clone https://github.com/your-username/wallet-web-application.git
cd wallet-web-application/frontend
Install dependencies:
npm install
Set environment variables: Create a .env file in the root directory:

REACT_APP_API_URL=http://localhost:5000
Start the development server:
npm start
Access the app: Open http://localhost:3000 in your browser.

## Deployment
Netlify Deployment
Build the project:

npm run build
Deploy to Netlify:

Drag and drop the build/ folder into the Netlify dashboard.
Set environment variables (REACT_APP_API_URL) in the Netlify settings.
Production URL: Your app will be accessible at the Netlify-provided URL.

## Learn More
To learn more about React, check out the React documentation.

To learn more about Create React App, refer to its documentation.

