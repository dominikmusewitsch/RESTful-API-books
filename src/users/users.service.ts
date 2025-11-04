import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  users = [
    {
      id: '1a2b3c4d-0001-1111-2222-333344445555',
      username: 'alice_wonder',
      email: 'alice@example.com',
      password: 'password123',
    },
    {
      id: '2b3c4d5e-0002-1111-2222-333344445555',
      username: 'bob_builder',
      email: 'bob@example.com',
      password: 'securepass456',
    },
    {
      id: '3c4d5e6f-0003-1111-2222-333344445555',
      username: 'charlie_day',
      email: 'charlie@example.com',
      password: 'mySecret789',
    },
    {
      id: '4d5e6f7g-0004-1111-2222-333344445555',
      username: 'diana_ross',
      email: 'diana@example.com',
      password: 'moonlight42',
    },
    {
      id: '5e6f7g8h-0005-1111-2222-333344445555',
      username: 'ethan_hunt',
      email: 'ethan@example.com',
      password: 'missionImpossible',
    },
    {
      id: '6f7g8h9i-0006-1111-2222-333344445555',
      username: 'fiona_green',
      email: 'fiona@example.com',
      password: 'greendragon!',
    },
    {
      id: '7g8h9i0j-0007-1111-2222-333344445555',
      username: 'george_bluth',
      email: 'george@example.com',
      password: 'bananaStand$',
    },
    {
      id: '8h9i0j1k-0008-1111-2222-333344445555',
      username: 'hannah_smith',
      email: 'hannah@example.com',
      password: 'helloWorld22',
    },
    {
      id: '9i0j1k2l-0009-1111-2222-333344445555',
      username: 'ian_curtis',
      email: 'ian@example.com',
      password: 'loveWillTearUsApart',
    },
    {
      id: '0j1k2l3m-0010-1111-2222-333344445555',
      username: 'julia_child',
      email: 'julia@example.com',
      password: 'bonAppetit99',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: { username: string; email: string; password: string }) {
    const newUser = {
      id: uuidv4(), // generiert eine eindeutige UUID
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: string,
    updatedUser: { username?: string; email?: string; password?: string },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
