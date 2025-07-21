# Video Library Dashboard - Server API

A Node.js/Express API server for the Video Library Dashboard application, providing RESTful endpoints for video management.

## 🚀 Quick Start

### Prerequisites

- Node.js (v22)
- yarn

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start:dev

# Build for production
yarn build

# Start production server
yarn start
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `9999` | Server port |

## 📋 API Documentation

### Base URL

```text
http://localhost:9999
```

### Health Check

#### GET `/`

Returns server status.

**Response:**

```text
"Your server is running!"
```

---

## 🎬 Videos API

### Get Videos

#### GET `/videos`

Retrieves a list of videos with optional filtering and sorting.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search videos by title | `?search=tutorial` |
| `tag` | string | Filter videos by tag | `?tag=analytics` |
| `sort` | enum | Sort order (`asc` or `desc`) | `?sort=desc` |

**Example Request:**

```http
GET /videos?search=tutorial&tag=instructional&sort=asc
```

**Example Response:**

```json
[
  {
    "id": "v-036",
    "title": "Video Analytics and Performance",
    "thumbnail_url": "https://picsum.photos/seed/video36/300/200",
    "created_at": "2024-11-18T12:54:36Z",
    "duration": 474,
    "views": 8765,
    "tags": ["analytics", "performance", "data"]
  },
  {
    "id": "v-037",
    "title": "Creating Tutorial Videos",
    "thumbnail_url": "https://picsum.photos/seed/video37/300/200",
    "created_at": "2025-01-27T15:36:21Z",
    "duration": 612,
    "views": 21345,
    "tags": ["tutorial", "instructional", "how-to"]
  }
]
```

### Create Video

#### POST `/videos`

Creates a new video entry.

**Request Body:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Video title (min 3 characters) |
| `tags` | string[] | ❌ | `[]` | Array of tags |
| `thumbnail_url` | string (URL) | ❌ | Random placeholder | Video thumbnail URL |
| `duration` | number | ❌ | `42` | Video duration in seconds |
| `views` | number | ❌ | `501` | View count |

**Example Request:**

```json
{
  "title": "My Awesome Video Tutorial",
  "tags": ["tutorial", "javascript", "coding"],
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "duration": 300,
  "views": 0
}
```

**Example Response:**

```json
{
  "message": "Video created successfully",
  "video": {
    "id": "v-1642763852000",
    "title": "My Awesome Video Tutorial",
    "thumbnail_url": "https://example.com/thumbnail.jpg",
    "created_at": "2025-07-21T10:30:52.000Z",
    "duration": 300,
    "views": 0,
    "tags": ["tutorial", "javascript", "coding"]
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid video format or validation error
- `500 Internal Server Error` - Database or server error

## 🛠 Development

### Project Structure

```text
server/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── index.ts            # Server entry point
│   ├── controllers/
│   │   └── videoController.ts  # Video business logic
│   └── routes/
│       └── videoRoutes.ts      # Video route definitions
├── tests/
│   └── videoRoute.test.ts      # API tests
├── package.json
├── tsconfig.json
├── jest.config.js
├── nodemon.json
└── eslint.config.mjs
```