export async function GoogleToken(code: string): Promise<string | null | undefined> {
  const params = new URLSearchParams({
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
    grant_type: 'authorization_code',
  });

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the token');
    }

    const data = await response.json();

    const idToken = data.id_token;
    console.log(idToken);

    return idToken;
  } catch (error) {
    console.error('Error fetching Google ID token:', error);
  }
}
