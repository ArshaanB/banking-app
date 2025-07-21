# Banking Application

A full-stack banking application.

## Project Structure

```
banking-app/
├── backend/           # Express.js API server
│   ├── src/
│   │   └── index.ts   # Main server entry point
├── frontend/          # Frontend Next.js Application
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Frontend / Backend Setup

Perform the same steps below for the frontend, but replace any mention of `backend` with `frontend`.

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the TypeScript code:

   ```bash
   npm run build
   ```

4. Start the server:

   ```bash
   npm run start
   ```

   The Backend (API server) will run on `http://localhost:3001`. Frontend will run on `http://localhost:3000`.

### Testing

1. Backend Tests

- `npm test` (in /backend directory)

### API Endpoints

- `GET /` - base endpoint with timestamp
- TODO: List other endpoints.

## Environment Variables

Create a `.env` file in the backend directory for environment-specific configuration:

```
PORT=3001
SEED_DATABASE=true
```
