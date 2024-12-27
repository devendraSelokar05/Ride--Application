import http from "http"
import app from "./app.js"
import {InitalizeSocket} from "./socket.js"


const server = http.createServer(app);

InitalizeSocket(server);
// Fixing the port configuration
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const shutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });
  
    // Force close connections after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown...');
      process.exit(1);
    }, 10000);
  };
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
