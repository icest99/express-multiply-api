# Express Multiply API

This is a simple Express API that multiplies two numbers together. It includes authentication using a bearer token and validation of request payloads. The API documentation is available using Swagger.

## Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/icest99/express-multiply-api.git
   cd express-multiply-api
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Start the server:**

   ```
   npm start
   ```

   The server will start running on http://localhost:5000.

## API Documentation

The API documentation is available using Swagger. You can access it at http://localhost:5000/api-docs.

## Requests and Responses

### POST /multiply

Multiply two numbers together.

**Request Payload:**

```json
{
  "a": 10,
  "b": 6
}
```

**Response:**

```json
{
  "result": 60
}
```

### Error Responses:

- **Unauthorized (401):**
  - If the request does not contain the correct bearer token or is missing altogether.
  - Response:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

- **Unsupported data format (422):**
  - If the request payload is missing `a` or `b` properties, or if they are not numbers.
  - Response:
    ```json
    {
      "error": "Unsupported data format"
    }
    ```

- **Invalid JSON syntax (400):**
  - If the request body contains invalid JSON syntax.
  - Response:
    ```json
    {
      "error": "Invalid JSON syntax"
    }
    ```

- **Internal Server Error (500):**
  - If an unexpected error occurs on the server.
  - Response:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

