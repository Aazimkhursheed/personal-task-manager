# Assignment Notes

## 1. Why did you choose this architecture and tech stack for the project?
I chose the MERN stack with a decoupled frontend and backend because it cleanly separates the user interface from the API and database logic. Vite was selected for the frontend to enable fast development with modern React, while Express and Mongoose provide a lightweight and structured way to handle REST endpoints and schema validation. This modular architecture keeps each component easy to understand, maintain, and explain.

## 2. What technical challenge did you encounter during development, and how did you resolve it?
While connecting to MongoDB Atlas, Node.js failed to resolve the SRV connection record with an ECONNREFUSED error due to the local DNS resolver. I resolved this by importing Node.js's built-in dns module and calling `dns.setServers(['1.1.1.1'])` in `config/db.js` before initiating the Mongoose connection. This allowed Node.js to resolve the Atlas cluster shards reliably without requiring third-party packages or modifying system settings.

## 3. What would you improve or add to this application if you had more time?
If given more time, I would implement user authentication using JSON Web Tokens (JWT) so multiple users can maintain private task boards securely. I would also add drag-and-drop support between the status columns to make moving tasks more intuitive, along with search and pagination for larger task lists. Additionally, I would write automated integration tests using Jest and Supertest to verify API routes continuously.
