# Next.js SSR cPanel Deploy Template (App Route alapú)

Ez a template egy Next.js alkalmazás cPanel telepítésének útmutatója server-side rendering (SSR) támogatással, App Route alapú megközelítéssel.

## 🛠️ Fejlesztés

### Helyi futtatás

```bash
npm run dev
```

### Production build és futtatás

```bash
npm run build
npm start
```

## 📦 cPanel telepítés

### 1. Node.js App beállítása

1. Hozz létre egy **Setup Node.js App** alkalmazást a cPanel-ben
2. **Fontos:** Az elérési út neve egyezzen meg a projekt nevével! Jelen esetben: `nextjs-ssr-cpanel-deploy-template`
3. Indítsd el, majd állítsd le az alkalmazást

### 2. Fájlok feltöltése

#### Mit NE tölts fel:
- `node_modules/` mappa, csak abban az esetben, ha a szerver nem képes telepíteni
- `.git/` mappa  
- `README.md` fájl
- `.gitignore` fájl

#### Becsomagolás lépései:
1. A build után válaszd ki az összes szükséges fájlt és mappát
2. Ha nem látod a rejtett fájlokat, kapcsold be a megjelenítésüket
3. Hagyj ki a fenti listában szereplő elemeket
4. Hozz létre egy ZIP fájlt a kiválasztott elemekből

### 3. Telepítés finalizálása

1. Töltsd fel és csomagold ki a ZIP fájlt a megfelelő könyvtárba
2. Nyomd meg az **F5**-öt a Node.js setup oldalon, hogy az `npm install` le tudjon futni
3. Indítsd el az alkalmazást

## 💡 Tippek

- **Elérési út:** Mindig figyelj arra, hogy a Setup Node.js App elérési útja megegyezzen a projekt nevével
- **Függőségek:** Az `npm install` automatikusan lefut a telepítés során a cPanel-ben

## 📋 Követelmények

- Node.js
- TypeScript
- cPanel hosting SSI/Node.js támogatással

## 🚀 Projekt létrehozása

```bash
npx create-next-app@latest
```

**Fontos:** TypeScript támogatást válassz a telepítés során!

## 📖 Hasznos források

- [cPanel Next.js telepítési útmutató](https://www.gonlinesites.com/web-hosting-tips/how-to-deploy-next-js-app-to-cpanel/)

## ⚙️ Konfiguráció

### 1. App Route alapú konfiguráció

A Next.js App Route alapú megközelítést használja a dinamikus útvonalak kezelésére. Győződj meg róla, hogy a `pages` könyvtár helyett az `app` könyvtárat használod a projektedben.

### 2. Server.js fájl létrehozása

Hozz létre egy `server.js` fájlt a projekt gyökérkönyvtárában:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      
      /*
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
      */
     
      // App Router handles all routing automatically
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

### 3. Package.json módosítása

Add hozzá a következő script-et a `package.json` fájlhoz:

```json
{
     "scripts": {
            "start": "NODE_ENV=production node server.js"
     }
}
```
