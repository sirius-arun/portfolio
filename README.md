# arunanshu.pm

A product-management-themed portfolio. The whole site is a PM workspace:

| Section | What it looks like |
|---|---|
| Hero | Your PRD: status, owner, problem / proposed fix / success metrics |
| Career + education | A roadmap that scrolls sideways, then release notes per role |
| Skills | A backlog of tickets with priority and story points, plus your toolbox |
| Work | Shipped tickets that stack on top of each other as you scroll |
| Older case studies | An archive of Notion links |
| Testimonials | User-interview notes with tagged themes |
| Contact | A go / no-go launch review |

There's also a floating avatar that comments as you scroll, an onboarding checklist with XP and hidden bugs to squash, a `dark_mode` feature-flag toggle for light and dark themes, and a ⌘K command menu.

No build step and no dependencies: plain HTML, CSS and JS.

## Edit content

All text, links and image paths live in **`assets/js/content.js`**.

## Files

```
assets/
├── Arunanshu_Sinha_Resume.pdf   ← still to add
├── css/styles.css
├── js/content.js                ← all text + links
├── js/main.js
└── img/
    ├── avatar.jpg               (your photo, also the link preview)
    ├── logos/   vmock.jpg  languify.jpg  monetizely.jpg  iitbhu.jpg  tpf.png
    ├── people/  ajit-ghuman.jpg  jitendra-gokhale.jpg
    └── tools/   claude, python, postgresql, figma, mixpanel, googleanalytics, qiskit, notion (.svg)
```

**Naming rule for new images:** lowercase, no spaces (`new-logo.png`, not `New Logo.PNG`). GitHub Pages is case-sensitive, so a path that works on your Mac can break once it's online if the case doesn't match exactly.

Still to do:
- Add the resume PDF at `assets/Arunanshu_Sinha_Resume.pdf`.
- Set `links.x` in `content.js`.
- Add case study URLs in `shipped[].link.url` (empty shows "Write-up coming soon").

## Preview locally

Open `index.html` in a browser. Or run `npx serve .` and visit the URL it prints.

## Publish on GitHub Pages

1. Create a repo on GitHub, ideally named `sirius-arun.github.io` (that gives you the root URL).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio v3.0"
   git branch -M main
   git remote add origin https://github.com/sirius-arun/sirius-arun.github.io.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. The site goes live at `https://sirius-arun.github.io` in about a minute.
5. Optional custom domain: add a `CNAME` file containing your domain, and point the domain's DNS at GitHub Pages.
