import * as http from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import process from 'node:process';

const PORT: number = Number(process.env.PORT) || 3000;
const VERSION: string = process.env.APP_VERSION || '1.0.0';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', uptime: process.uptime() }));
    return;
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from a 2-stage Docker container!',
      runtime: 'Node.js Alpine',
      language: 'TypeScript',
      version: VERSION,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (Version: ${VERSION})`);
});