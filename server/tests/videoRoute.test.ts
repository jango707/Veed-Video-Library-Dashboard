// API tests

import videoDatabase from '../../database/index';
import request from 'supertest';
import app from '../src/app';

jest.mock('../../database/index');

const mockedVideoDatabase = videoDatabase as jest.Mocked<typeof videoDatabase>;

describe('GET /videos', () => {
  it('should return videos', async () => {
    mockedVideoDatabase.findMany.mockResolvedValue([
      {
        id: 'v-036',
        title: 'Video Analytics and Performance',
        thumbnail_url: 'https://picsum.photos/seed/video36/300/200',
        created_at: '2024-11-18T12:54:36Z',
        duration: 474,
        views: 8765,
        tags: ['analytics', 'performance', 'data'],
      },
      {
        id: 'v-037',
        title: 'Creating Tutorial Videos',
        thumbnail_url: 'https://picsum.photos/seed/video37/300/200',
        created_at: '2025-01-27T15:36:21Z',
        duration: 612,
        views: 21345,
        tags: ['tutorial', 'instructional', 'how-to'],
      },
      {
        id: 'v-038',
        title: 'Video Copyright and Fair Use',
        thumbnail_url: 'https://picsum.photos/seed/video38/300/200',
        created_at: '2024-12-10T09:47:15Z',
        duration: 528,
        views: 7896,
        tags: ['copyright', 'legal', 'fair use', 'data'],
      },
    ]);

    const res = await request(app).get('/videos');

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(3);
  });

  it('should return an error message when something went wrong', async () => {
    mockedVideoDatabase.findMany.mockRejectedValue({ message: 'OOPS' });
    const res = await request(app).get('/videos');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to get videos' });
  });
});

describe('POST /videos', () => {
  it('should create a new video when input params are appropriate', async () => {
    const mockVideo = {
      title: 'Video Copyright and Fair Use',
      thumbnail_url: 'https://picsum.photos/seed/video38/300/200',
      duration: 528,
      views: 7896,
      id: 'mock-id',
      created_at: 'now',
    };
    mockedVideoDatabase.createOne.mockResolvedValue(mockVideo);

    const res = await request(app).post('/videos').send(mockVideo);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Video created successfully',
      video: { ...mockVideo, id: expect.any(String), created_at: expect.any(String) },
    });
  });

  it('should return an error message when something went wrong', async () => {
    mockedVideoDatabase.createOne.mockRejectedValue({ message: 'OOPS' });
    const res = await request(app).post('/videos').send({ title: 'Test' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to create video', error: { message: 'OOPS' } });
  });

  it('should return an error if the mandatory inputs are not given', async () => {
    const res = await request(app).post('/videos').send({});

    expect(res.status).toBe(500);
    expect(res.body.message).toEqual('Failed to create video');
    expect(res.body.error.name).toEqual('ZodError');
  });
});
