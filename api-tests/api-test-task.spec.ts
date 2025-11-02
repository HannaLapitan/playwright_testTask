import { test, expect, request } from '@playwright/test';

const API_KEY = process.env.API_KEY || 'YOUR_API_KEY'; // Set your API key in env

test.describe('MCP /ingest API', () => {
    let createdId: string;

    test('POST /ingest - success', async ({ request }) => {
        const response = await request.post('/ingest', {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            data: {
                content: 'Users want dark mode for accessibility.',
                title: 'Dark Mode Request',
                customer_id: 'customer_123',
                source_id: 'call_abc123',
                source_url: 'https://gong.io/calls/abc123',
                timestamp: new Date().toISOString(),
                reporter_name: 'Test User',
                reporter_email: 'testuser@example.com',
                language: 'en',
                metadata: { call_duration: 1200, participants: 2 },
                tags: ['ui', 'feature-request'],
            },
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.id).toBeTruthy();
        createdId = body.data.id;
    });

    test('GET /ingest/{id} - success', async ({ request }) => {
        test.skip(!createdId, 'No ID from previous test');
        const response = await request.get(`/ingest/${createdId}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.id).toBe(createdId);
        expect(body.data.title).toBe('Dark Mode Request');
    });

    test('POST /ingest - missing content (400)', async ({ request }) => {
        const response = await request.post('/ingest', {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            data: {
                title: 'Missing Content',
                customer_id: 'customer_123',
            },
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error || body.code).toBeTruthy();
    });

    test('GET /ingest/{id} - not found (404)', async ({ request }) => {
        const response = await request.get('/ingest/invalid-id-123', {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.error || body.code).toBeTruthy();
    });
});