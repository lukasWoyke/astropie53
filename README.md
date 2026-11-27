# AstroPIE-53 project page

Static paper page for GitHub Pages. No build step, nothing is loaded from third parties.

| File | Purpose |
|---|---|
| `index.html` | Paper page: title, authors, buttons, abstract, figures, results, BibTeX, contact |
| `download.html` | Application download with Terms of Use |
| `legal.html` | Imprint and privacy policy |
| `config.js` | All links. An empty link shows "Coming soon". |

Preview: run `python3 -m http.server 8000` here, then open http://localhost:8000

---

## Part 1: Publish the website on your GitHub account

Result: `https://lukaswoyke.github.io/astropie-53/`
Free of charge: GitHub Pages costs nothing for public repositories (limits: 1 GB per site, about 100 GB of traffic per month).

### Step 1: Prepare the files

1. `legal.html`: replace every yellow `[...]` placeholder. The imprint names whoever is responsible for the page. On your own
   account that is you, unless the chair agrees that its imprint is used. Do not publish before this is done.
2. `config.js`: the arXiv and PDF links are set. Leave `codeUrl`, `dataUrl` and `releaseUrl` empty until those exist.
3. Check the page locally: in this folder run `python3 -m http.server 8000` and open http://localhost:8000

### Step 2: Create the repository

Either in the browser: https://github.com/new → name `astropie-53`, **Public**, no README, no .gitignore, no licence → *Create repository*.

Or in the terminal (the `gh` tool is already logged in as `lukasWoyke`):

```bash
gh repo create lukasWoyke/astropie-53 --public --description "Project page: AstroPIE-53 (SPAICE 2026)"
```

### Step 3: Upload the website

In this folder, run:

```bash
git init -b main
git add .
git commit -m "Add AstroPIE-53 project page"
git remote add origin https://github.com/lukasWoyke/astropie-53.git
git push -u origin main
```

### Step 4: Turn on GitHub Pages

1. Open https://github.com/lukasWoyke/astropie-53/settings/pages
2. *Build and deployment → Source*: **Deploy from a branch**.
3. *Branch*: **main**, folder **/ (root)** → *Save*.
4. After 1–2 minutes the address appears at the top of that page: `https://lukaswoyke.github.io/astropie-53/`

Or in the terminal:

```bash
gh api -X POST repos/lukasWoyke/astropie-53/pages -f "source[branch]=main" -f "source[path]=/"
```

### Step 5: Finish the repo page (optional)

On https://github.com/lukasWoyke/astropie-53, click the gear next to *About* and tick *Use your GitHub Pages website*.
The link then shows at the top right of the repo.

### Step 6: Updating the page

Edit the files, then:

```bash
git add .
git commit -m "Update page"
git push
```

The live page updates within 1–2 minutes. Reload with Cmd+Shift+R if you still see the old version.

### Note

If you move the repo to another account or organisation later, GitHub redirects the repo link but not the website address,
so old links to the page break. Share the link (e.g. in the arXiv comments or on the chair website) once you're sure where it stays.

---

## Part 2: Publish the application

The app is attached to a Release of this website repository. Your source code stays private: the *Source code* archives that
GitHub adds to a release contain only this website.

**1. Build the app on each system.** In `standalone-annotation-app`, run `npm install` once, then:

| On | Command | Files in `release/` |
|---|---|---|
| Linux | `npm run dist:linux` | `.AppImage`, `.deb` |
| macOS | `npm run dist:mac` | `.dmg` |
| Windows | `npm run dist:win` | Installer and portable `.exe` |

Each one has to be built on its own system.

**2. Test each build** on its own system: install it, open a workspace and annotate one video.

**3. Create the checksums.** Copy all installers from the three systems into `release/` on one computer. There, run:

```bash
node scripts/release-checksums.cjs release
```

This writes `release/SHA256SUMS.txt`. Use this command while there is no dataset: `npm run release:checksums` also expects a
`release/paper-dataset` folder and fails without it.

**4. Create the release.** In the repository, go to *Releases → Draft a new release*. Create the tag `v1.0.0`, then upload `SHA256SUMS.txt`
and every file it lists (this includes the macOS `.zip`). Don't upload any dataset zips. Click *Publish release*.

**5. Turn on the button.** In `config.js`, set:

```js
releaseUrl: "https://github.com/lukasWoyke/astropie-53/releases/download/v1.0.0",
```

**6. Compare the file names.** The `file` names under `downloads` in `config.js` must match the uploaded names exactly. Change or remove any
that differ, for example a system you did not build. Push the change.

**7. Test it.** Open the page, click *Application*, tick the box and download each file.

---

## Part 3: Add the rest later

| When you have | Do this |
|---|---|
| The public code | Set `codeUrl` in `config.js` |
| Approval for videos and data | Set `dataUrl` in `config.js` |
| The teaser video | Put the file in `assets/` (under 100 MB) and set `videoFile: "assets/teaser.mp4"` |

Each file on a GitHub Release must stay under 2 GiB. A Pages site may be at most 1 GB, so large files always go on the Release.
