/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, afterAll, expect } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { graphql } from 'graphql';
import { Roles } from '../../src/entities/user';
import { schema } from '../../src/schema';

const prisma = new PrismaClient();
const userEmail = `lettuce${new Date()}@king.com`;

afterAll(() => {
  prisma.$disconnect();
});

describe('Auth resolver', () => {
  describe('signUp', () => {
    it('should return errors if no parameters are passed', async () => {
      const query = `
        mutation signUp {
          signUp {
            hash
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors).toBeDefined();
      // one error for each missing field
      expect(result.errors).toHaveLength(6);
    });

    it('should return errors if an input type does not match', async () => {
      const query = `
        mutation signUp {
          signUp(
            firstName: "lettuce"
            lastName: "king"
            email: 0
            password: "asdf"
            loginMode: "default"
            role: "donor"
          ) {
            hash
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toMatch('String cannot represent a non string value: 0');
    });

    it('should register a new user and return a verification hash', async () => {
      const query = `
        mutation signUp {
          signUp(
            firstName: "lettuce"
            lastName: "king"
            email: "${userEmail}"
            password: "asdf"
            loginMode: "default"
            role: "donor"
          ) {
            hash
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma, userRole: Roles.GUEST });

      expect(result.errors).not.toBeDefined();
      expect(result.data).toBeDefined();
      expect(typeof result.data.signUp.hash).toBe('string');
    });
  });

  describe('login', () => {
    it('should return errors if no parameters are passed', async () => {
      const query = `
        mutation login {
          login {
            token
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toMatch(
        'Field "login" argument "password" of type "String!" is required, but it was not provided.',
      );
    });

    it('should return errors if on parameter is missing', async () => {
      const query = `
        mutation login {
          login(email: "${userEmail}") {
            token
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma });

      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toMatch(
        'Field "login" argument "password" of type "String!" is required, but it was not provided.',
      );
    });

    it('should return errors if params are not correct', async () => {
      const query = `
        mutation login {
          login(email: "${userEmail}", password: "qwer") {
            token
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma, userRole: Roles.GUEST });

      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toMatch('');
    });

    it('should return errors if the user is already logged in', async () => {
      const query = `
        mutation login {
          login(email: "${userEmail}", password: "asdf") {
            token
          }
        }
      `;

      // mock logged in mode with applying a role other than guest
      const result = await graphql(schema, query, undefined, { prisma, userRole: Roles.ADMIN });

      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toMatch('');
    });

    it('should return a jwt token on successful login', async () => {
      const query = `
        mutation login {
          login(email: "${userEmail}", password: "asdf") {
            token
          }
        }
      `;

      const result = await graphql(schema, query, undefined, { prisma, userRole: Roles.GUEST });

      expect(result.errors).not.toBeDefined();
      expect(result.data.login.token).toBeDefined();
      expect(typeof result.data.login.token).toBe('string');
    });
  });
});
