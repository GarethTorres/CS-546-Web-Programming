//import mongo collections, bcrypt and implement the following data functions
import bcrypt from 'bcrypt';
//import {ObjectId} from 'mongodb';
import {users} from '../config/mongoCollections.js';

//function: createUser(firstName, lastName, emailAddress, password, role)

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw 'All fields must be provided';
  }

  const usersCollection = await users();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashedPassword,
    role: role,
  };

  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw 'Could not add user';

  const newId = insertInfo.insertedId;
  const user = await usersCollection.findOne({_id: newId});

  return user;
};

//function: checkUser(emailAddress, password)

export const checkUser = async (emailAddress, password) => {
  if (!emailAddress || !password) {
    throw 'Both email address and password must be provided please';
  }

  const usersCollection = await users();

  const user = await usersCollection.findOne({emailAddress: emailAddress});
  if (!user) throw 'User were not found';

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw 'Password incorrect';

  return user;
};

