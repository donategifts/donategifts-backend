/* eslint-disable import/no-extraneous-dependencies */
import * as faker from 'faker';
import { agency_roles, roles } from '@prisma/client';
import prisma from '../src/db/prisma';

faker.setLocale('en_US');

(async () => {
  await prisma.$connect();
  // --------------- internal user setup ---------------
  const generateInternalUsers = () => ({
    data: [
      {
        firstName: 'Stacy',
        lastName: 'Lee',
        email: 'stacy@donategifts.com',
        uid: '',
        role: roles.ADMIN,
      },
      {
        firstName: 'Patric',
        lastName: 'Hoffmann',
        email: 'patric@donategifts.com',
        uid: '',
        role: roles.ADMIN,
      },
      {
        firstName: 'Ivan',
        lastName: 'Repusic',
        email: 'tokikko@donategifts.com',
        uid: '',
        role: roles.ADMIN,
      },
      {
        firstName: 'Marco',
        lastName: 'Schuster',
        email: 'marco@donategifts.com',
        uid: '',
        role: roles.ADMIN,
      },
      {
        firstName: 'Jacob',
        lastName: 'Jeevan',
        email: 'jacob@donategifts.com',
        uid: '',
        role: roles.ADMIN,
      },
    ],
  });

  // --------------- random user setup ---------------
  const generateRandomUsers = () => {
    const data = [];
    const mockroles = { ...roles };
    // no admin allowed for random user data, only our users are admins
    delete mockroles.ADMIN;

    for (let index = 0; index < 200; index++) {
      // get a random role for each user
      const rand = Math.floor(Math.random() * Object.keys(mockroles).length);
      const randomRole = mockroles[Object.keys(mockroles)[rand]];

      data.push({
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        email: faker.internet.email,
        uid: '',
        role: randomRole,
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
        address1: faker.address.streetAddress,
        city: faker.address.city,
        country: faker.address.country,
        state: faker.address.state,
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
      name: faker.company.companyName,
      bio: faker.company.catchPhrase,
      isVerified: true,
      phone: faker.phone.phoneNumber,
      website: faker.internet.url,
      createdBy: 1,
      addressId: Math.floor(Math.random() * 200),
    });

    // patric
    data.data.push({
      name: faker.company.companyName,
      bio: faker.company.catchPhrase,
      isVerified: true,
      phone: faker.phone.phoneNumber,
      website: faker.internet.url,
      createdBy: 2,
      addressId: Math.floor(Math.random() * 200),
    });

    // ivan
    data.data.push({
      name: faker.company.companyName,
      bio: faker.company.catchPhrase,
      isVerified: true,
      phone: faker.phone.phoneNumber,
      website: faker.internet.url,
      createdBy: 3,
      addressId: Math.floor(Math.random() * 200),
    });

    // marco
    data.data.push({
      name: faker.company.companyName,
      bio: faker.company.catchPhrase,
      isVerified: true,
      phone: faker.phone.phoneNumber,
      website: faker.internet.url,
      createdBy: 4,
      addressId: Math.floor(Math.random() * 200),
    });

    // jacob
    data.data.push({
      name: faker.company.companyName,
      bio: faker.company.catchPhrase,
      isVerified: true,
      phone: faker.phone.phoneNumber,
      website: faker.internet.url,
      createdBy: 5,
      addressId: Math.floor(Math.random() * 200),
    });

    return data;
  };

  const generateAgencyMembers = () => {
    const data = {
      data: [],
      skipDuplicates: true,
    };

    const internalUsers = [1, 2, 3, 4, 5];

    for (let i = 0; i < 5; i++) {
      // add 20 members for each of our agencies
      for (let j = 0; j < 20; j++) {
        if (internalUsers.length) {
          data.data.push({
            userId: internalUsers[0],
            agencyId: internalUsers[0],
            agencyRole: agency_roles.OWNER,
          });

          internalUsers.shift();
        }

        data.data.push({
          userId: Math.floor(Math.random() * 200) + 10,
          agencyId: Math.floor(Math.random() * 5),
        });
      }
    }

    return data;
  };

  const internalUsers = new Promise(() =>
    prisma.user.createMany(generateInternalUsers()),
  );

  const randomUsers = new Promise(() =>
    prisma.user.createMany({
      data: generateRandomUsers(),
      skipDuplicates: true,
    }),
  );

  const randomAddresses = new Promise(() =>
    prisma.address.createMany(generateAddresses()),
  );

  const randomAgencies = new Promise(() =>
    prisma.agency.createMany(generateAgencies()),
  );

  const randomAgencyMembers = new Promise(() =>
    prisma.agencyMember.createMany(generateAgencyMembers()),
  );

  // user -> done
  // address -> done
  // agency -> done
  // agencyMember -> done
  // child
  // animal
  // wishcard
  // images
  // donation
  // message

  try {
    await Promise.all([
      internalUsers,
      randomUsers,
      randomAddresses,
      randomAgencies,
      randomAgencyMembers,
    ]);
    await prisma.$disconnect();
  } catch (e) {
    // flush the database in case something breaks during seeding
    await prisma.$queryRaw`
      DELETE FROM message;
      DELETE FROM donation;
      DELETE FROM images;
      DELETE FROM wishcard;
      DELETE FROM child;
      DELETE FROM agencyMember;
      DELETE FROM agency;
      DELETE FROM user;
    `;
    await prisma.$disconnect();
    console.error(e);
    process.exit(0);
  }
})();
