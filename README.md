# User Management System

This is a web application where users can register, log in, and access different functionality based on their roles. The system supports two types of accounts: users and admins. Users can view their personal dashboard, while admins can view all registered users. This application uses **bcrypt** for password hashing and **express-session** for session management.

## Features

- **Home Page**:  
  - Contains "Login" and "Sign Up" buttons.  
  - After successful login, users are redirected to their respective dashboards.

- **Registration Page**:  
  - Users can create an account with a username, email, and password.  
  - Passwords are securely hashed using bcrypt before storage.

- **Login Page**:  
  - Users log in with their email and password.  
  - Passwords are checked against hashed values to ensure authenticity.

- **Landing Page**:  
  - **For users**: Displays a simple dashboard with their username.  
  - **For admins**: Displays a list of all registered users, their emails, and roles.

- **Logout**:  
  - Users can log out, which destroys their session and redirects them to the home page.

## Setup Instructions

### Prerequisites

Before you start, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org)  
- A code editor, such as [VSCode](https://code.visualstudio.com/)

### How to Set Up the Project

1. **Clone your repository** to your local machine:  
    ```bash
    git clone <your-new-repo-url>
    ```

2. **Navigate to the project directory and install dependencies**:  
    ```bash
    cd <your-new-repo-name>  
    npm install
    ```

3. **Run the app**:  
    ```bash
    npm start
    ```  
    This will start the server at `http://localhost:3000/`.

4. Begin developing and committing changes to the project:
    ```bash
    git add .
    git commit -m "First commit"
    git push origin main
    ```

## Development Guidelines

1. **Authentication**:
   - Uses `express-session` for session management.
   - Hashes all passwords with bcrypt before storing them.
   - Authenticates users by comparing hashed passwords during login.

2. **Role-Based Access Control (RBAC)**:
   - Allows only **admin** users to view all registered users.
   - Ensures **regular users** can only access their own dashboard.

3. **Error Handling**:
   - Displays appropriate error messages for invalid login or signup attempts.

4. **Security**:
   - Does not store or transmit plaintext passwords. Always hashes passwords with bcrypt.

5. **Data Storage**:
   - Uses an in-memory array to store user accounts (persistent storage is not required).


## License

This project is provided for **personal use only**. Redistribution, modification, or commercial use in any form is strictly prohibited without prior written permission from the author.

For detailed license terms, refer to the [LICENSE](./LICENSE.md) file.

## Author
**[Stephen Crocker](https://github.com/SearchingSteve)** 
