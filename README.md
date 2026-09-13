# KaushalSetu (कौशलसेतु)
### Smart India Hackathon (SIH) Prototype
> **"One Nation, One Prototype, One-Stop Solution for Industry Skill Alignment"**

KaushalSetu bridges the critical gap between academic engineering curriculums and real-time tech industry demand. Powered by **Google Gemini AI (gemini-3.6-flash)**, it delivers dynamic skill gap heatmaps, tailored YouTube learning roadmaps, interactive practice trackers, live job openings, and ATS resume export.

---

## 🚀 Deployment & Setup

### 1. Local Development
```bash
# Install dependencies
npm install

# Start local server
npm start
```
Visit `http://localhost:5000`.

---

## 🌐 Deploying to Netlify via Browser Dashboard

KaushalSetu includes **native Netlify Serverless Functions** (`netlify/functions/api.js` + `netlify.toml`), enabling full-stack execution on Netlify:

1. **Push your code to GitHub** (see instructions below).
2. Go to [https://app.netlify.com/](https://app.netlify.com/) and log in.
3. Click **"Add new site"** → **"Import an existing project"**.
4. Choose **GitHub** and authorize access to select your `kaushalsetu` repository.
5. In the build settings:
   - **Base directory**: Leave blank / root
   - **Build command**: `npm install`
   - **Publish directory**: `public`
   - **Functions directory**: `netlify/functions` (automatically configured by `netlify.toml`)
6. **Environment Variables**:
   Under **Site configuration** → **Environment variables**, add:
   - `GEMINI_API_KEY`: `your_gemini_api_key_here`
   - `GEMINI_MODEL`: `gemini-3.6-flash`
   - `SECONDARY_GEMINI_MODEL`: `gemini-2.5-flash`
7. Click **"Deploy site"**!

---

## 🔐 Environment Configuration (.env)

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
SECONDARY_GEMINI_MODEL=gemini-2.5-flash
```
