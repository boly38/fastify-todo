import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import startServer from '../src/server.js';

const app =  await startServer();

describe('Todo API', () => {

  it('should fetch todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ task: 'New task' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('task', 'New task');
  });
});
