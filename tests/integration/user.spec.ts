/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect, afterAll } from '@jest/globals';
import { graphql, GraphQLError } from 'graphql';
import { schema } from '../../src/schema';
import prisma from '../../src/db/prisma';

afterAll(() => {
  prisma.$disconnect();
});

describe('User resolver', () => {
  describe('user', () => {
    it('Should have errors defined if no args are given to the user query', async () => {
      const query = `
          query user {
            user {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query);

      expect(result.errors).toBeDefined();
    });

    it('Should have errors if the permission does not match', async () => {
      const query = `
          {
            user(email: "lkeems0@google.com.br") {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors[0]).toBeInstanceOf(GraphQLError);
      expect(result.errors[0].message).toMatch(
        "Access denied! You don't have permission for this action!",
      );
    });

    it('Should have errors if no user was found', async () => {
      const query = `
          {
            user(email: "john@cena.com") {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query, undefined, {
        prisma,
        userRole: 'admin',
      });

      expect(result.errors[0]).toBeInstanceOf(GraphQLError);
      expect(result.errors[0].message).toMatch('User not found');
    });

    it('Should return a user object', async () => {
      const query = `
          {
            user(email: "lkeems0@google.com.br") {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query, undefined, {
        prisma,
        userRole: 'admin',
      });

      expect(result.data).toMatchObject({
        user: {
          id: '1',
          firstName: 'Loraine',
          lastName: 'Keems',
          email: 'lkeems0@google.com.br',
        },
      });
    });
  });
  describe('allUsers', () => {
    it('Should have errors if the permission does not match', async () => {
      const query = `
          {
            allUsers {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors[0]).toBeInstanceOf(GraphQLError);
      expect(result.errors[0].message).toMatch(
        "Access denied! You don't have permission for this action!",
      );
    });
    it('Should return a user list', async () => {
      const query = `
          {
            allUsers {
              id
              firstName
              lastName
              email
            }
          }
        `;

      const result = await graphql(schema, query, undefined, {
        prisma,
        userRole: 'admin',
      });

      expect(result.data.allUsers).toHaveLength(25);
    });
    it('Should return a user list from given params', async () => {
      const query = `
          {
            allUsers(firstName: "ro") {
              id
            }
          }
        `;

      const result = await graphql(schema, query, undefined, {
        prisma,
        userRole: 'admin',
      });

      expect(result.data.allUsers.length).toBeGreaterThan(1);
    });
  });
});
