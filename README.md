
# Expense Tracker

The **Expense Tracker** is a web application that helps users track their daily expenses. Users can add, edit, delete, and view expenses categorized by type. The app is designed to be user-friendly, allowing users to manage their finances effectively and stay on top of their spending.

## Features

- **User Authentication**: Users can log in using JWT authentication to securely access the app.
- **Add Expense**: Users can add new expenses by specifying the amount, description, and category (e.g., Food, Petrol, etc.).
- **Edit Expense**: Users can update their previously added expenses.
- **Delete Expense**: Users can delete any expense they no longer need.
- **Premium Features**: Users can buy a premium subscription for added benefits.
- **Category Management**: Users can choose from predefined categories or add their custom category (if "Other" is selected).
- **Responsive Design**: The app is optimized for mobile and desktop use.
  
## Tech Stack

- **Frontend**: 
  - HTML, CSS, JavaScript (Vanilla JS)
  - Axios for API requests
  - Razorpay for payment gateway (if premium functionality is included)
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database storage (or any other database solution)
  - JWT (JSON Web Token) for authentication

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [MongoDB](https://www.mongodb.com/) or any other database you use for storage
- [Razorpay Account](https://razorpay.com/) if you are using premium features

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhishektripathi-dev/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env` file. You may need to include:

   ```env
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Open the **frontend** in your browser. You may need to open `index.html` or deploy the frontend via a web server (such as using `live-server` or any other web server tool).

## API Endpoints

### Authentication

- **POST** `/api/auth/login`: Login with credentials and get a JWT token.
- **POST** `/api/auth/register`: Register a new user.

### Expense Management

- **GET** `/api/expenses`: Fetch all expenses for the logged-in user.
- **POST** `/api/expenses`: Add a new expense.
- **PUT** `/api/expenses/{id}`: Update an existing expense by ID.
- **DELETE** `/api/expenses/{id}`: Delete an expense by ID.

### Premium Features

- **GET** `/api/premium`: Get payment options for premium subscription.
- **POST** `/api/premiumverify`: Verify payment after successful transaction.

## Usage

1. Log in using your credentials or register a new account.
2. Once logged in, you can view your expenses or add new ones.
3. Select a category from the dropdown or enter your custom category if needed.
4. Update or delete any expense by clicking the respective buttons.
5. You can buy a premium subscription (if applicable) for more features.

## Contributing

We welcome contributions! To contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to update this README with any additional details about your app or specific installation requirements!