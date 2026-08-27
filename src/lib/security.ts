export function checkSameOrigin(request: Request) {
    const authUrl = process.env.AUTH_URL;

    if (!authUrl) {
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

    const expectedOrigin = new URL(authUrl).origin;
    const origin = request.headers.get('origin');

    if (origin !== expectedOrigin) {
        return Response.json(
            { error: 'Forbidden' },
            { status: 403 }
        );
    }

    return null;
}