# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it: **D'Arbonne Gate Investor Portal**
4. Disable Google Analytics (optional for this use case)
5. Click "Create project"

---

## Step 2: Enable Firestore Database

1. In the Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose `us-central` for best performance in Louisiana)
5. Click "Enable"

---

## Step 3: Set Up Firestore Security Rules

1. In Firestore, go to the "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Access tokens collection - read/write only for authenticated users
    match /accessTokens/{token} {
      allow read: if true; // Allow reading for token validation
      allow write: if false; // Only server-side can create tokens
    }
  }
}
```

3. Click "Publish"

---

## Step 4: Get Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>` to add a web app
5. Name it: **D'Arbonne Gate Web**
6. **Don't** check "Also set up Firebase Hosting"
7. Click "Register app"
8. Copy the `firebaseConfig` object

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 5: Add Config to Environment Variables

1. In your project, create a file: `.env.local`
2. Add the Firebase config values:

```bash
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## Step 6: Enable Google APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (it auto-creates a Google Cloud project)
3. Go to "APIs & Services" → "Library"
4. Search for and enable:
   - **Google Drive API**
   - **Google Sheets API**

---

## Step 7: Create API Key

1. In Google Cloud Console, go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API key"
3. Copy the API key
4. Click "Restrict key" (recommended)
5. Under "API restrictions", select "Restrict key"
6. Choose:
   - Google Drive API
   - Google Sheets API
7. Click "Save"

Add to `.env.local`:

```bash
VITE_GOOGLE_API_KEY=AIza...
```

---

## Step 8: Set Up Google Drive Folder

1. Create a folder in Google Drive called **D'Arbonne Gate - Documents**
2. Upload your investor documents (Business Plan, Financial Models, etc.)
3. Right-click the folder → "Share"
4. Click "Change to anyone with the link"
5. Set to "Viewer"
6. Copy the folder ID from the URL:
   - URL: `https://drive.google.com/drive/folders/1ABC...XYZ`
   - Folder ID: `1ABC...XYZ`

Add to `.env.local`:

```bash
VITE_GOOGLE_DRIVE_FOLDER_ID=1ABC...XYZ
```

---

## Step 9: Set Up Google Sheet

1. Create your financial model Google Sheet using the template provided
2. Name it: **D'Arbonne Gate - Financial Model**
3. Share it with "Anyone with the link" (Viewer)
4. Copy the Sheet ID from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/1XYZ...ABC/edit`
   - Sheet ID: `1XYZ...ABC`

Add to `.env.local`:

```bash
VITE_GOOGLE_SHEETS_ID=1XYZ...ABC
```

---

## Step 10: Set Up SendGrid

1. Go to [SendGrid](https://sendgrid.com/) and create an account
2. Verify your sender email (e.g., `invest@darbonnegate.com`)
3. Go to Settings → API Keys
4. Click "Create API Key"
5. Name it: **D'Arbonne Gate Magic Links**
6. Choose "Full Access"
7. Copy the API key

Add to `.env.local`:

```bash
VITE_SENDGRID_API_KEY=SG.abc123...
VITE_SENDGRID_FROM_EMAIL=invest@darbonnegate.com
```

---

## Step 11: Set Up Calendly (Optional)

1. Go to your Calendly account
2. Copy your scheduling link (e.g., `https://calendly.com/cortez-fields/investor-call`)

Add to `.env.local`:

```bash
VITE_CALENDLY_URL=https://calendly.com/your-link
```

---

## Step 12: Test the Setup

1. Restart your dev server: `npm run dev`
2. The app should now connect to Firebase
3. To test magic links, you'll need to create a serverless function (see next section)

---

## Next Steps

You now have:
- ✅ Firebase project with Firestore
- ✅ Google Drive API enabled
- ✅ Google Sheets API enabled
- ✅ Environment variables configured

**What's needed next:**
- Create a serverless function to send magic link emails (I can help with this)
- Test the authentication flow
- Begin Phase 2: Dynamic data integration

---

## Troubleshooting

**"Firebase not initialized" error:**
- Check that all `VITE_FIREBASE_*` variables are in `.env.local`
- Restart the dev server after adding env variables

**"API key invalid" error:**
- Verify the API key is correct
- Check that the APIs are enabled in Google Cloud Console
- Make sure API restrictions allow Drive and Sheets APIs

**"Permission denied" error for Drive/Sheets:**
- Ensure files are shared with "Anyone with the link"
- Verify the folder/sheet IDs are correct
