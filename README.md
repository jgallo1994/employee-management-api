## Employee Management API

This project is a RESTful API for managing employees, roles, and permissions. Built with TypeScript, Node.js, and Prisma, it leverages modern software design principles including Domain-Driven Design (DDD) and the Repository Pattern. The API provides endpoints for CRUD operations on employees and roles, supports role-based access control, and integrates with MySQL for data persistence. The codebase is structured for maintainability and scalability, with comprehensive unit testing using Jest.

**Features:**

- CRUD operations for employees and roles
- Role-based access control
- TypeScript for type safety
- Prisma for database interaction
- Jest for unit testing
- Organized with DDD and Repository Pattern

**Getting Started:**

1. Clone the repository:
   ```bash
   git clone git@github.com:jgallo1994/my-simple-api.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migrations (if needed):
   ```bash
   npx prisma migrate dev
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run the server in development mode:
   ```bash
   npm run start-dev
   ```
6. Run tests:

   ```bash
   npm run test
   ```

7. Format the code:
   ```bash
   npm run format
   ```
