# Raghav Khanna — Portfolio

Complete, portable source for the redesigned mechanical design portfolio.

## Included
- Responsive portfolio with projects, certifications, hackathons and contact links.
- Interactive Three.js ring assembly with rotation, exploded view and reduced-motion support.
- Static image fallback when 3D is unavailable.
- Scroll-driven typography and navigation.
- Pre-rendered homepage content with React hydration.
- Netlify deployment configuration.

## Upload to GitHub
1. Extract this ZIP on your computer.
2. Create an empty GitHub repository, for example `raghav-portfolio`.
3. Choose **uploading an existing file**, or **Add file → Upload files**.
4. Upload the extracted files and folders, then commit the upload.
5. Ensure `package.json`, `package-lock.json`, `index.html`, and `netlify.toml` are at the repository root.

Upload the extracted source files, not the ZIP itself. Keep `.gitignore` and `.nvmrc` when uploading with Git. No credentials, API keys or hosting-account files are included.

## Publish on Netlify
1. Sign in to Netlify.
2. Add a project by importing an existing GitHub repository.
3. Select this repository.
4. Netlify reads `netlify.toml`. If settings are requested, use:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node.js: `22`
5. Deploy. Netlify provides the live URL.

This is a static website. It needs no database, server functions, API keys or ChatGPT account. The contact links open email and LinkedIn; no form backend is required.

## Run locally — Windows PowerShell
Install Node.js 22.13 or later, then open PowerShell inside the extracted folder:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Check and build
```powershell
npm run typecheck
npm run build
npm run preview
```

The deployable site is generated in `dist/`. For Netlify Drop, upload the contents of that folder, or use the separately provided ready-to-upload ZIP.

## Edit the portfolio
| File | Purpose |
| --- | --- |
| `app/page.tsx` | Name, project, certificates, hackathons, education and contact details |
| `app/globals.css` | Layout, colors, typography and responsive styling |
| `app/assembly.tsx` | Interactive 3D form study and controls |
| `app/motion.tsx` | Scroll effects and navigation state |
| `public/` | Image and favicon |
| `index.html` | Browser title and search description |
| `netlify.toml` | Netlify build configuration |

The ring assembly and its fallback image are visual studies, not renders of the exoskeleton project. Project performance claims remain design goals. The two other recently mentioned hackathons have not been named because their details were not supplied.

## References
- GitHub file uploads: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Netlify Git deployment: https://docs.netlify.com/start/quickstarts/deploy-from-repository/
