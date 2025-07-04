# Banking Application

A full-stack banking application.

## Project Structure

```
banking-app/
├── backend/           # Express.js API server
│   ├── src/
│   │   └── index.ts   # Main server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/          # Frontend application
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

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
   npm start
   ```

   The API server will run on `http://localhost:3001`

### Development

- **Run tests:** `npm test` (in backend directory)
- **Build:** `npm run build` (in backend directory)

### API Endpoints

- `GET /` - Base endpoint with timestamp
- `GET /health` - Health check endpoint

## Environment Variables

Create a `.env` file in the backend directory for environment-specific configuration:

```
PORT=3001
```
