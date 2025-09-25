# Maxy Website Backend

Backend server for handling contact form submissions and storing them in MongoDB.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/maxy_website
```

3. Make sure MongoDB is running on your system or update the connection string to point to your MongoDB instance.

4. Start the server:
```
npm start
```

## API Endpoints

### Contact Form

- **POST /api/contact** - Submit a new contact form
  - Body: `{ fullname, email, subject, description }`
  - Returns: Contact object with success message

- **GET /api/contact** - Get all contact submissions
  - Returns: Array of contact objects

## Models

### Contact

- `fullname` (String, required)
- `email` (String, required)
- `subject` (String, required)
- `description` (String, required)
- `createdAt` (Date, default: current date) 