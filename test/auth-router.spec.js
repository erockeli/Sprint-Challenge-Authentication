const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

describe('tests server.js', function() {
	beforeEach(async () => {
		await db('users').truncate();
	});

	describe('POST /api/auth/register', function() {
		it('should register a new user and return 201 OK', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'Dre', password: 'broham' })
				.then(res => {
					expect(res.status).toBe(201);
				});
		});

		it('should return JSON', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'Cheryl', password: 'shecray' })
				.then(res => {
					expect(res.type).toMatch(/json/i);
				});
		});
	});
});