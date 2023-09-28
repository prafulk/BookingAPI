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
