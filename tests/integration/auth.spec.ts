/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, afterAll, expect } from '@jest/globals';
import { roles } from '@prisma/client';
import { graphql } from 'graphql';
import { schema } from '../../src/schema';
import prisma from '../../src/db/prisma';
import { logger } from '../../src/helper/logger';

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
      expect(result.errors[0].message).toMatch(
        'String cannot represent a non string value: 0',
      );
    });

    it('should register a new user and return a firstName', async () => {
      const query = `
        mutation signUp {
          signUp(
            firstName: "Marco"
            lastName: "Schuster"
            email: "lettuce${new Date()}@king.com"
            role: "DONOR"
            uid: "${new Date()}"
          ) {
            firstName
          }
        }
      `;

      const result = await graphql(schema, query, undefined, {
        prisma,
        userRole: roles.GUEST,
      });

      logger.info(result.data);

      expect(result.errors).not.toBeDefined();
      expect(result.data).toBeDefined();
      expect(typeof result.data.signUp.firstName).toBe('string');
    });
  });
});
