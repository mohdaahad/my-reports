# Medical Report Website (Frontend)

This is a frontend-only React application for a medical report website. The website aims to provide an interface for users to view and manage their medical reports.

## Technologies Used

- React
- Material-UI (MUI)

## Features

- **Dashboard**: Overview of medical reports with filtering options.
- **Report View**: Detailed view of individual medical reports.
- **User Profile**: Manage user information and settings.

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohdaahad/my-reports.git
    ```

2. Navigate to the project directory:

    ```bash
    cd my-reports
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm start



src\
|-- actions\
|   |-- authActions.js
|   |-- userActions.js
|
|-- assets\
|   |-- images\
|   |   |-- logos\
|   |   |   |-- logo-2.png
|   |   |-- i.jpg
|   |   |-- img-7.jpg
|
|-- components\
|   |-- common\
|   |   |-- FormCheckbox.jsx
|   |   |-- FormInput.jsx
|   |   |-- FormPasswordInput.jsx
|   |   |-- SuccessMessage.jsx
|   |   |-- WrongPasswordMessage.jsx
|   |
|   |-- layout\
|       |-- Footer.jsx
|       |-- Navbar.jsx
|
|-- pages\
|   |-- auth\
|   |   |-- ForgotPassword.jsx
|   |   |-- Login.jsx
|   |   |-- OTPVerification.jsx
|   |   |-- PasswordReset.jsx
|   |   |-- Signup.jsx
|   |
|   |-- Home.jsx
|
|-- reducers\
|   |-- authReducer.js
|   |-- index.js
|   |-- userReducer.js
|
|-- services\
|   |-- auth\
|   |   |-- authService.js
|   |   |-- userService.js
|   |
|   |-- interceptors\
|       |-- axios.js
|
|-- App.css
|-- App.js
|-- App.test.js
|-- index.css
|-- index.js
|-- logo.svg
|-- reportWebVitals.js
|-- Routes.js
|-- setupTests.js
|-- store.js
