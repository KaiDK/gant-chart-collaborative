const http = require('http');
const WebSocket = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');

const port = Number(process.env.PORT) || 1234;
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Gantt collab server (y-websocket) — connect via WebSocket\n');
});

const wss = new WebSocket.Server({ server });
wss.on('connection', (conn, req) => setupWSConnection(conn, req));

server.listen(port, host, () => {
  console.log(`y-websocket listening on ws://${host}:${port}`);
});
