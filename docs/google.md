# Add an Authorized Redirect URI in Google Cloud Console

Follow these steps to allow Google sign-in.

## 1. Open Google Cloud Console

Open [Google Cloud Console](https://console.cloud.google.com) and sign in with the Google account that owns the OAuth credentials.

## 2. Select the correct Google project

Use the project selector in the top navigation bar and choose the Google Cloud project used by this application.

## 3. Open the OAuth client settings

In the left navigation, open:

```text
APIs & Services → Credentials
```

## 4. Select the web OAuth client

Open the **OAuth 2.0 Client ID** used by the application and select **Edit**.

## 5. Add redirect URI

Find **Authorized redirect URIs** and select **Add URI**.

Copy the exact Vercel Preview URL from the browser and append:

```text
/api/auth/callback/google
```

For example:

```text
http://localhost:3000/api/auth/callback/google
```

The URL must match the deployment URL exactly.

## 6. Save the changes

Select **Save**. Google sign-in can now redirect back to both the Vercel Preview deployment and the local application.
