import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    console.error("[Upwork OAuth] Error from Upwork:", error);
    return new NextResponse(
      renderHTML(
        "Authorization Failed",
        `Upwork returned an error: ${error}. Please try again or contact support.`,
        true
      ),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    console.error("[Upwork OAuth] No authorization code received");
    return new NextResponse(
      renderHTML(
        "Authorization Failed",
        "No authorization code was received from Upwork. Please try again.",
        true
      ),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const clientId = process.env.UPWORK_CLIENT_ID;
    const clientSecret = process.env.UPWORK_CLIENT_SECRET;
    const redirectUri =
      process.env.UPWORK_REDIRECT_URI ||
      "https://xencolabs.com/api/upwork/callback";

    if (!clientId || !clientSecret) {
      console.error("[Upwork OAuth] Missing UPWORK_CLIENT_ID or UPWORK_CLIENT_SECRET");
      return new NextResponse(
        renderHTML(
          "Configuration Error",
          "OAuth credentials are not configured. Please contact the administrator.",
          true
        ),
        { status: 500, headers: { "Content-Type": "text/html" } }
      );
    }

    const tokenResponse = await fetch(
      "https://www.upwork.com/api/v3/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        }).toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("[Upwork OAuth] Token exchange failed:", tokenData);
      return new NextResponse(
        renderHTML(
          "Authorization Failed",
          "Failed to exchange the authorization code for tokens. Please try again.",
          true
        ),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    // Log tokens for now — proper secure storage will be added later
    console.log("[Upwork OAuth] Token exchange successful:", {
      access_token: tokenData.access_token ? "***received***" : "missing",
      refresh_token: tokenData.refresh_token ? "***received***" : "missing",
      expires_in: tokenData.expires_in,
      token_type: tokenData.token_type,
    });

    return new NextResponse(
      renderHTML(
        "Authorization Successful!",
        "Your Upwork account has been connected successfully. You can close this window.",
        false
      ),
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("[Upwork OAuth] Unexpected error:", err);
    return new NextResponse(
      renderHTML(
        "Authorization Failed",
        "An unexpected error occurred. Please try again or contact support.",
        true
      ),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}

function renderHTML(title: string, message: string, isError: boolean): string {
  const color = isError ? "#ef4444" : "#22c55e";
  const icon = isError ? "✕" : "✓";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - Xenco Labs</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0a0a0a; color: #fafafa; }
    .card { text-align: center; padding: 3rem; max-width: 480px; }
    .icon { width: 64px; height: 64px; border-radius: 50%; background: ${color}; color: white; font-size: 32px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
    p { color: #a1a1aa; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
