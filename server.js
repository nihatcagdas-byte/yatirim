const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const HOST = '127.0.0.1';
const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const ROOT = __dirname;
const INDEX_PATH = path.join(ROOT, 'index.html');

function send(res, status, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function parseRequestUrl(req) {
  return new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
}

function isAllowedTefasUrl(target) {
  try {
    const u = new URL(target);
    return u.protocol === 'https:' && u.hostname === 'www.tefas.gov.tr';
  } catch (e) {
    return false;
  }
}

async function handleTefasProxy(req, res, reqUrl) {
  const target = reqUrl.searchParams.get('url');
  if (!target || !isAllowedTefasUrl(target)) {
    send(res, 400, 'Geçersiz url. Sadece https://www.tefas.gov.tr adresine izin verilir.');
    return;
  }

  try {
    const upstream = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 temettu-takip local proxy',
        'Accept': '*/*',
      },
      signal: AbortSignal.timeout(15000),
    });

    const contentType = upstream.headers.get('content-type') || 'text/plain; charset=utf-8';
    const body = await upstream.text();
    send(res, upstream.status, body, contentType);
  } catch (err) {
    send(res, 502, `TEFAS proxy hatası: ${err.message}`);
  }
}

function serveIndex(res) {
  try {
    const html = fs.readFileSync(INDEX_PATH, 'utf8');
    send(res, 200, html, 'text/html; charset=utf-8');
  } catch (err) {
    send(res, 500, `index.html okunamadı: ${err.message}`);
  }
}

function serveStatic(reqUrl, res) {
  const safePath = path.normalize(decodeURIComponent(reqUrl.pathname)).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT, safePath);
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, 'Erişim reddedildi.');
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    send(res, 404, 'Dosya bulunamadı.');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
  };
  const contentType = types[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);
  send(res, 200, data, contentType);
}

const server = http.createServer(async (req, res) => {
  const reqUrl = parseRequestUrl(req);

  if (reqUrl.pathname === '/api/tefas') {
    await handleTefasProxy(req, res, reqUrl);
    return;
  }

  if (reqUrl.pathname === '/' || reqUrl.pathname === '/index.html') {
    serveIndex(res);
    return;
  }

  serveStatic(reqUrl, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Sunucu hazır: http://${HOST}:${PORT}`);
  console.log('TEFAS proxy endpoint: /api/tefas?url=https://www.tefas.gov.tr/...');
});
