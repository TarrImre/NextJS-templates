# Next.js SSR cPanel Deploy Template (App Route Based)

This template provides a guide for deploying a Next.js application on cPanel with server-side rendering (SSR) support, using an App Route-based approach.

## 🛠️ Development

### Local Development

```bash
npm run dev
```

### Production Build and Run

```bash
npm run build
npm start
```

## 📦 cPanel Deployment

### 1. Set Up Node.js App

1. Create a **Setup Node.js App** application in cPanel.
2. **Important:** The path name must match the project name! In this case: `nextjs-ssr-cpanel-deploy-template`.
3. Start and then stop the application.

### 2. Upload Files

#### What NOT to upload:
- `node_modules/` folder, unless the server cannot install dependencies.
- `.git/` folder  
- `README.md` file
- `.gitignore` file

#### Packaging Steps:
1. After building, select all necessary files and folders.
2. If hidden files are not visible, enable their display.
3. Exclude the items listed above.
4. Create a ZIP file from the selected items.

### 3. Finalize Deployment

1. Upload and extract the ZIP file into the appropriate directory.
2. Press **F5** on the Node.js setup page to trigger `npm install`.
3. Start the application.

## 💡 Tips

- **Path Name:** Always ensure the Setup Node.js App path matches the project name.
- **Dependencies:** `npm install` runs automatically during deployment in cPanel.

## 📋 Requirements

- Node.js
- TypeScript
- cPanel hosting with SSI/Node.js support

## 🚀 Create a New Project

```bash
npx create-next-app@latest
```

**Important:** Choose TypeScript support during setup!

## 📖 Useful Resources

- [cPanel Next.js Deployment Guide](https://www.gonlinesites.com/web-hosting-tips/how-to-deploy-next-js-app-to-cpanel/)

## ⚙️ Configuration

### 1. App Route-Based Configuration

This Next.js project uses an App Route-based approach for handling dynamic routes. Ensure you use the `app` directory instead of the `pages` directory in your project.

### 2. Create a Server.js File

Create a `server.js` file in the root directory of your project:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
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

### 3. Modify Package.json

Add the following script to your `package.json` file:

```json
{
     "scripts": {
            "start": "NODE_ENV=production node server.js"
     }
}
```

### Troubleshooting High Number of Processes in cPanel

If you notice an unusually high "Number of Processes" in cPanel, follow these steps to investigate and resolve the issue:

1. **Check Running Processes**:
   Open the terminal and run the following command to list all running processes:
   ```bash
   ps aux
   ```

2. **Identify the Problematic Process**:
   Look through the output to identify the process(es) consuming excessive resources or causing the issue.

3. **Terminate the Process**:
   Once you have identified the Process ID (PID) of the problematic process, terminate it using the following command:
   ```bash
   kill <pid>
   ```
   Replace `<pid>` with the actual Process ID.

   **Note**: Use this command cautiously, as terminating critical processes may disrupt your application or server.

By following these steps, you can effectively manage and reduce the number of processes in cPanel.

### Using .env Files

If your project uses a `.env` file to store environment variables, you must manually add these variables in the **Setup Node.js App** section of cPanel. Follow these steps:

1. Open the **Setup Node.js App** interface in cPanel.
2. Locate the **Environment Variables** section.
3. Add each variable from your `.env` file manually, ensuring the key-value pairs match exactly.

This step is crucial to ensure your application functions correctly in the production environment.
