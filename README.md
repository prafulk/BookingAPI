# BookingAPI


1. **Client API**:
   
   - **Scheduler**: 
     - **GET** `/scheduler?week=weekdate`: Returns all and user data for that specific week. Accessible by both REGULAR and ADMIN roles.
     
   - **Booking**:
     - **POST** `/booking`: Create a booking for a user which belongs to the current agent. Accessible only by ADMIN.
     - **DELETE** `/booking/:id`: Delete a specific booking. Accessible only by ADMIN.
     
2. **Business API**:

   - **Scheduler**:
     - **GET** `/scheduler?week=weekdate`: Scaffolded route which returns a 200 OK response. The exact functionality is yet to be determined.
     
3. **Common API Endpoints**:

   - **User**:
     - **GET** `/users`: Returns all users associated with a specific Agent. Accessible by both REGULAR and ADMIN roles.
   
   - **Agent**:
     - **GET** `/agents`: Returns all agents. Accessible only by ADMIN.
     
In addition to the specific API endpoints, the system has:

- **Middlewares**:
   - Checking the existence of the "X-Agent-Id" header in every request.
   - Authorizing user based on their roles and endpoint permissions.
   - Advanced error handling for better debugging and informative responses.

- **Database Models**:
   - **User**: Contains attributes like name, email, and bookings.
   - **Booking**: Contains attributes like associated user, booking agent, start and finish times.
   - **Agent**: Contains attributes like name, email, and the bookings they've made, as well as users they're associated with.



Certainly! Here's a basic README template for your Git repository. Feel free to customize it to better fit your project's details and requirements:

---


## Description

A Node.js API project for managing bookings and users with a shared database. This project serves two distinct APIs: Business API and Client API, both sharing the same database and authorization logic.

## Requirements

- Node.js with support for ES6 modules.
- A relational database (MSSQL recommended but can be replaced with any other DB).
- Additional dependencies (see package.json).

## Installation

1. Clone this repository:

   ```bash
   git clone git@github.com:prafulk/BookingAPI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BookingAPI
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

- Access the API using the specified endpoints and follow the API documentation for requests and responses.

## API Specification

- The API has two parts: Business API and Client API, both sharing the same database.
- Endpoints and roles are defined in the API specification.

## Database

- The project uses a relational database (MSSQL recommended) for storing User and Booking data.
- Database schema details are available in the project files.

## Testing

- The project includes tests for important functionalities.
- You can run tests using the following command:

  ```bash
  npm test
  ```

