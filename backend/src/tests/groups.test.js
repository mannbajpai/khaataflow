import { describe, it, expect } from 'vitest';
import app from '../index.js';
import request from 'supertest';

describe('Group API Routes', () => {
    let token;
    let groupId;
    let groupCode;

    beforeAll(async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: "testuser000@test.com",
          password: "test"
        });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body).toHaveProperty('token');
      token = res.body.token; // Store the token
    });

  // Test createGroup route
  it('should create a new group', async () => {
    const groupData = { name: 'Test Group', description: 'This is a test group' };
    const response = await request(app)
      .post('/api/group/')
      .set("Authorization", `Bearer ${token}`) // Replace with a valid token
      .send(groupData);
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body).toHaveProperty('data');
    groupId=response.body.data.group.id;
  },10000);

  // Test getGroup route
  it('should get a group by ID', async () => {
    const response = await request(app)
      .get(`/api/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  // Test getAllGroups route
  it('should get all groups for a user', async () => {
    const response = await request(app)
      .get('/api/group/')
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  // Test getMembers route
  it('should get members of a group', async () => {
    const response = await request(app)
      .get(`/api/group/${groupId}/members`)
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  // Test isGroupMember route
  it('should check if a user is a member of a group', async () => {
    const response = await request(app)
      .get(`/api/group/${groupId}/member`)
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  // Test leaveGroup route
  it('should leave a group', async () => {
    const response = await request(app)
      .delete(`/api/group/${groupId}/leaveGroup`)
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    console.log("respone to call : ",response);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

    // Test createGroup route
    it('should create an another group to test', async () => {
      const groupData = { name: 'Test Group', description: 'This is a test group' };
      const response = await request(app)
        .post('/api/group/')
        .set("Authorization", `Bearer ${token}`) // Replace with a valid token
        .send(groupData);
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('data');
      groupId=response.body.data.group.id;
    },10000);


  // Test updateGroup route
  it('should update a group', async () => {
    const groupData = { name: 'Updated Group Name' };
    const response = await request(app)
      .patch(`/api/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`) // Replace with a valid token
      .send(groupData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  // Test deleteGroup route
  it('should delete a group', async () => {
    const response = await request(app)
      .delete(`/api/group/${groupId}`)
      .set("Authorization", `Bearer ${token}`); // Replace with a valid token
    expect(response.status).toBe(204);
  });
});