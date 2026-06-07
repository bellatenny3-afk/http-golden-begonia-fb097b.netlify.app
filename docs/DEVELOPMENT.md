# Development Guide

## Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

## Setup

### 1. Clone and Install Dependencies
```bash
git clone <repo-url>
cd facechat
npm run install-all
```

### 2. Configure Environment Variables

#### Server (.env)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Client (.env)
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Start Development Servers

From the root directory:
```bash
npm run dev
```

This will start:
- **Client**: http://localhost:3000
- **Server**: http://localhost:5000

## Project Structure

```
facechat/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── store.js       # Zustand store
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   └── index.js       # Express + Socket.IO server
│   ├── .env.example
│   └── package.json
│
├── docs/                   # Documentation
│   ├── API.md
│   └── DEVELOPMENT.md
│
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts

### Root Level
- `npm run dev` - Start both client and server in watch mode
- `npm run dev:client` - Start client only
- `npm run dev:server` - Start server only
- `npm run build` - Build both client and server
- `npm run start` - Start production server

### Client
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start with auto-reload
- `npm run start` - Start production server

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility CSS framework
- **Socket.IO Client** - Real-time communication
- **Zustand** - State management
- **Axios** - HTTP client
- **date-fns** - Date formatting

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin resource sharing

## Debugging

### Client
- Open browser DevTools (F12)
- Check Console for errors
- Use React DevTools extension for component inspection

### Server
- Check terminal output for logs
- Enable verbose Socket.IO debugging:
  ```javascript
  const io = new Server(httpServer, {
    transports: ['websocket'],
    debug: true
  })
  ```

## Common Issues

### Port Already in Use
If port 3000 or 5000 is already in use:
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Socket.IO Connection Issues
- Ensure server is running on port 5000
- Check CORS configuration matches your frontend URL
- Verify firewall isn't blocking WebSocket connections

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Next Steps

1. **Add Authentication** - Implement JWT token-based auth
2. **Database Integration** - Add MongoDB/PostgreSQL for persistence
3. **Direct Messaging** - Implement 1-on-1 private chats
4. **File Upload** - Add image/file sharing
5. **Typing Indicators** - Show when users are typing
6. **Notifications** - Add sound/desktop notifications
7. **User Profiles** - Add profile pictures and status
