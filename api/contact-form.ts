import type { VercelRequest, VercelResponse } from '@vercel/node';

const HTTP_METHODS = {
    POST: 'POST',
    GET: 'GET'
};

export default function handler(request: VercelRequest, response: VercelResponse) {
    // block all non POST requests
    if (request.method !== HTTP_METHODS.POST)
        response.status(504).json({ error: 'Bad Request Type' });
}
