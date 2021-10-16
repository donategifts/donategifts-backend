/* eslint-disable import/no-extraneous-dependencies */
import * as faker from 'faker';
import { v4 as uuidV4 } from 'uuid';
import {
  agency_roles,
  animal_type,
  donation_status,
  gender,
  roles,
  wishcard_status,
} from '@prisma/client';
import prisma from '../src/db/prisma';
import { logger } from '../src/helper/logger';

faker.setLocale('en_US');

(async () => {
  try {
    // --------------- internal user setup ---------------
    const generateInternalUsers = () => ({
      data: [
        {
          firstName: 'Stacy',
          lastName: 'Lee',
          email: 'stacy@donategifts.com',
          uid: uuidV4(),
          role: roles.ADMIN,
        },
        {
          firstName: 'Patric',
          lastName: 'Hoffmann',
          email: 'patric@donategifts.com',
          uid: uuidV4(),
          role: roles.ADMIN,
        },
        {
          firstName: 'Ivan',
          lastName: 'Repusic',
          email: 'tokikko@donategifts.com',
          uid: uuidV4(),
          role: roles.ADMIN,
        },
        {
          firstName: 'Marco',
          lastName: 'Schuster',
          email: 'marco@donategifts.com',
          uid: uuidV4(),
          role: roles.ADMIN,
        },
        {
          firstName: 'Jacob',
          lastName: 'Jeevan',
          email: 'jacob@donategifts.com',
          uid: uuidV4(),
          role: roles.ADMIN,
        },
      ],
    });

    // --------------- random user setup ---------------
    const generateUsers = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };
      const mockroles = { ...roles };
      // no admin allowed for random user data, only our users are admins
      delete mockroles.ADMIN;

      for (let index = 0; index < 200; index++) {
        data.data.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          uid: uuidV4(),
          // get a random role for each user
          role: mockroles[
            Object.keys(mockroles)[
              Math.floor(Math.random() * Object.keys(mockroles).length)
            ]
          ],
        });
      }

      return data;
    };

    // --------------- random addresses setup ---------------
    const generateAddresses = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      for (let index = 0; index < 100; index++) {
        data.data.push({
          address1: faker.address.streetAddress(),
          city: faker.address.city(),
          country: faker.address.country(),
          state: faker.address.state(),
        });
      }

      return data;
    };

    // --------------- random agency setup ---------------
    const generateAgencies = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      // stacy
      data.data.push({
        name: faker.company.companyName(),
        bio: faker.company.catchPhrase(),
        isVerified: true,
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        createdBy: 1,
        addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
      });

      // patric
      data.data.push({
        name: faker.company.companyName(),
        bio: faker.company.catchPhrase(),
        isVerified: true,
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        createdBy: 2,
        addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
      });

      // ivan
      data.data.push({
        name: faker.company.companyName(),
        bio: faker.company.catchPhrase(),
        isVerified: true,
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        createdBy: 3,
        addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
      });

      // marco
      data.data.push({
        name: faker.company.companyName(),
        bio: faker.company.catchPhrase(),
        isVerified: true,
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        createdBy: 4,
        addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
      });

      // jacob
      data.data.push({
        name: faker.company.companyName(),
        bio: faker.company.catchPhrase(),
        isVerified: true,
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        createdBy: 5,
        addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
      });

      return data;
    };

    const generateAgencyMembers = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      const usedUsers = new Set<number>();

      for (let i = 0; i < 5; i++) {
        data.data.push({
          userId: i + 1,
          agencyId: i + 1,
          agencyRole: agency_roles.OWNER,
        });
        // add 10 members for each of our agencies
        for (let j = 0; j < 10; j++) {
          const userId = faker.datatype.number({
            min: 10,
            max: 200,
            precision: 1,
          });
          const agencyId = faker.datatype.number({
            min: 1,
            max: 5,
            precision: 1,
          });

          const checkIfValidUserInAgency = (user: number, agency: number) => {
            if (usedUsers.has(user)) {
              checkIfValidUserInAgency(
                faker.datatype.number({
                  min: 10,
                  max: 200,
                  precision: 1,
                }),
                agency,
              );
            }

            usedUsers.add(user);
            return user;
          };

          data.data.push({
            userId: checkIfValidUserInAgency(userId, agencyId),
            agencyId,
          });
        }
      }

      return data;
    };

    const generateChildren = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      for (let i = 0; i < 400; i++) {
        data.data.push({
          birthday: faker.date.between('2003-01-01', '2021-01-01'),
          // random gender
          gender:
            gender[
              Object.keys(gender)[
                Math.floor(Math.random() * Object.keys(gender).length)
              ]
            ],
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          interest: faker.lorem.sentence(),
          bio: faker.lorem.paragraph(),
        });
      }

      return data;
    };

    const generateAnimals = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      for (let i = 0; i < 400; i++) {
        data.data.push({
          name: faker.name.firstName(),
          // random gender
          gender:
            gender[
              Object.keys(gender)[
                Math.floor(Math.random() * Object.keys(gender).length)
              ]
            ],
          // random type
          type: animal_type[
            Object.keys(animal_type)[
              Math.floor(Math.random() * Object.keys(animal_type).length)
            ]
          ],
          breed: faker.lorem.word(),
          age: faker.datatype.number({
            min: 10,
            max: 50,
            precision: 1,
          }),
          bio: faker.lorem.paragraph(),
        });
      }

      return data;
    };

    const generateWishCards = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      for (let i = 0; i < 300; i++) {
        data.data.push({
          itemPrice: parseFloat(faker.commerce.price()),
          itemUrl: faker.image.imageUrl(),
          entityId: faker.datatype.number({
            min: 1,
            max: 400,
            precision: 1,
          }),
          agencyId: faker.datatype.number({
            min: 1,
            max: 5,
            precision: 1,
          }),
          createdBy: faker.datatype.number({
            min: 1,
            max: 5,
            precision: 1,
          }),
          addressId: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
          // random status
          status:
            wishcard_status[
              Object.keys(wishcard_status)[
                Math.floor(Math.random() * Object.keys(wishcard_status).length)
              ]
            ],
        });
      }

      return data;
    };

    const generateImages = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      for (let i = 0; i < 100; i++) {
        data.data.push({
          wishcardId: faker.datatype.number({
            min: 1,
            max: 300,
            precision: 1,
          }),
          path: faker.internet.avatar(),
        });
      }

      return data;
    };

    const generateDonations = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      const donatedCards = [];

      for (let i = 0; i < 100; i++) {
        const checkIfUsed = (id: number) => {
          if (donatedCards.includes(id)) {
            checkIfUsed(
              faker.datatype.number({
                min: 1,
                max: 300,
                precision: 1,
              }),
            );
          }

          return id;
        };

        const cardId = faker.datatype.number({
          min: 1,
          max: 300,
          precision: 1,
        });

        donatedCards.push(cardId);
        data.data.push({
          wishcardId: checkIfUsed(cardId),
          userId: faker.datatype.number({
            min: 1,
            max: 205,
            precision: 1,
          }),
          donationPrice: faker.datatype.number({
            min: 1,
            max: 100,
            precision: 1,
          }),
          status:
            donation_status[
              Object.keys(donation_status)[
                Math.floor(Math.random() * Object.keys(donation_status).length)
              ]
            ],
        });
      }

      return data;
    };

    const generateMessages = () => {
      const data = {
        data: [],
        skipDuplicates: true,
      };

      const assignedMessages = [];

      for (let i = 0; i < 100; i++) {
        const checkIfUsed = (id: number) => {
          if (assignedMessages.includes(id)) {
            checkIfUsed(
              faker.datatype.number({
                min: 1,
                max: 50,
                precision: 1,
              }),
            );
          }

          return id;
        };

        data.data.push({
          userId: faker.datatype.number({
            min: 1,
            max: 205,
            precision: 1,
          }),
          wishcardId: checkIfUsed(
            faker.datatype.number({
              min: 1,
              max: 50,
              precision: 1,
            }),
          ),
          message: faker.lorem.paragraph(),
        });
      }

      return data;
    };

    logger.info('--------------- start seeding ---------------');

    await prisma.user.createMany(generateInternalUsers());
    await prisma.user.createMany(generateUsers());
    await prisma.address.createMany(generateAddresses());
    await prisma.agency.createMany(generateAgencies());
    await prisma.agencyMember.createMany(generateAgencyMembers());
    await prisma.child.createMany(generateChildren());
    await prisma.animal.createMany(generateAnimals());
    await prisma.wishcard.createMany(generateWishCards());
    await prisma.images.createMany(generateImages());
    await prisma.donation.createMany(generateDonations());
    await prisma.message.createMany(generateMessages());

    logger.info('--------------- done ---------------');
    process.exit(0);
  } catch (e) {
    logger.error(e);
    // flush the database in case something breaks during seeding
    for (const {
      tablename,
    } of (await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) as any) {
      if (tablename !== '_prisma_migrations') {
        try {
          await prisma.$queryRaw`TRUNCATE TABLE "${tablename}" CASCADE`;
          if (tablename !== 'agencyMember') {
            await prisma.$queryRaw`ALTER SEQUENCE ${tablename}_id_seq RESTART WITH 1`;
          }
        } catch (error) {
          logger.error({ error });
        }
      }
    }
    await prisma.$disconnect();
    process.exit(0);
  }
})();
