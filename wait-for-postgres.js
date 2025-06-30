const net = require('net');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;

const retryInterval = 1000;

function waitForPostgres() {
  const socket = net.createConnection({ host, port });

  socket.on('connect', () => {
    console.log('✅ PostgreSQL está disponible. Continuando...');
    socket.end();
    process.exit(0);
  });

  socket.on('error', () => {
    console.log('⏳ Esperando a PostgreSQL...');
    setTimeout(waitForPostgres, retryInterval);
  });
}

waitForPostgres();
