// eslint-disable-next-line import/no-extraneous-dependencies
import { jest, describe, expect, it, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';
import { authMiddleware } from '../src/helper/authMiddleware';
import { CustomError } from '../src/helper/customError';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    verifyIdToken: jest.fn().mockReturnValue({
      email: 'potter@hogwarts.com',
      uid: '1',
      role: 'donor',
    }),
  })),
}));

beforeEach(() => {});
describe('Helper', () => {
  describe('authMiddleware', () => {
    let mockRequest: Request;
    let mockResponse: Response;

    const nextFunction = jest.fn();

    beforeEach(() => {
      mockRequest = { headers: {} } as unknown as Request;
      mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
    });

    it('should set a user object with a role as guest if no authorization is provided', async () => {
      await authMiddleware(mockRequest, mockResponse, nextFunction);

      expect(mockRequest.user).toHaveProperty('role');
    });

    it('should populate a full user object if authorization is provided', async () => {
      mockRequest = {
        headers: {
          authorization: `bla`,
        },
      } as Request;

      const expectedResponse = {
        email: 'potter@hogwarts.com',
        role: 'donor',
        uid: '1',
      };

      await authMiddleware(mockRequest, mockResponse, nextFunction);

      expect(mockRequest.user).toMatchObject(expectedResponse);
    });
  });

  describe('customError', () => {
    it('should throw a custom error object if thrown', () => {
      const expectedResult: CustomError = {
        name: 'TestError',
        message: 'Test Error',
        code: 'TestErrorCode',
        status: 400,
      };

      const throwing = (): CustomError => {
        throw new CustomError(expectedResult);
      };

      expect(throwing).toThrowError(CustomError);
      expect(throwing).toThrow(expectedResult);
    });
  });
});
