// TODO: Export and implement the following functions in ES6 format
/*
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
*/


import { bands } from '../config/mongoCollections.js';

import { ObjectId } from 'mongodb';

const create = async (name, genre, website, recordCompany, groupMembers, yearBandWasFormed) => {

  //conditions below

  if (!name || typeof name !== 'string') {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (name.trim().length === 0) {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (!genre || genre.length === 0) {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (!genre.every(g => typeof g === 'string' && g.trim().length > 0)) {
    throw new Error('All fields need to have valid values');
    //use the every() to check if all elements are valid strings
  }

  else if (!website || typeof website !== 'string') {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (website.trim().length === 0 || !/^http:\/\/www\..{5,}\.com$/.test(website)) {
    //Use regular expression to test if the website string starts with "http://www." and ends with ".com", and has at least 5 characters in between.
    throw new Error('All fields need to have valid values');
    //If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com this method will throw.
  }

  else if (!recordCompany || typeof recordCompany !== 'string') {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (recordCompany.trim().length === 0) {
    throw new Error('All fields need to have valid values');
  }

  else if (!groupMembers || !Array.isArray(groupMembers)) {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
  }

  else if (groupMembers.length === 0) {
    throw new Error('All fields need to have valid values');
  }

  else if (!groupMembers.every(m => typeof m === 'string' && m.trim().length > 0)) {
    //use the every() to check if all elements are valid strings
    throw new Error('All fields need to have valid values');
    //If genre, groupMembers are not arrays and if they do not have at least one element in each of them that is a valid string, or are empty strings the method should throw. (each element should be a valid string but the arrays should contain at LEAST one element that's a valid string.
  }

  else if (!yearBandWasFormed || typeof yearBandWasFormed !== 'number' || yearBandWasFormed < 1900 || yearBandWasFormed > 2023) {
    throw new Error('All fields need to have valid values');
    //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
    //If yearBandWasFormed is not a number, or if yearBandWasFormed is less than 1900 or greater than the current year (2023) the the method should throw. (so only years 1900-2023 are valid values)
  }

  const bandCollection = await bands();

  const newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed
  };

  const insertInfo = await bandCollection.insertOne(newBand);

  if (insertInfo.insertedCount === 0) {
    throw new Error('Please add a vaild band.');
    //If the band cannot be created, the method should throw.
  }

  const newId = insertInfo.insertedId.toString();
  const band = await get(newId);

  return band;
};



const getAll = async () => {
  const bandCollection = await bands();

  const bandsList = await bandCollection.find({}).toArray();

  if (bandsList.length === 0) {
    return [];
    //If there are no bands in your DB, this function will return an empty array
  }

  return bandsList.map((band) => {
    const { _id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = band;
    return {
      id: _id.toString(),
      name: name,
      genre: genre,
      website: website,
      recordCompany: recordCompany,
      groupMembers: groupMembers,
      yearBandWasFormed: yearBandWasFormed
    };
  });
};


const get = async (id) => {

  if (!id) {
    throw new Error('Please provide an id for the band.');
    //If no id is provided, the method should throw.
  }

  else if (typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('Please provide an id for the band.');
    //If the id provided is not a string, or is an  empty string, the method should throw.
  }

  else if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId provided.');
    //If the id  provided is not a valid ObjectId, the method should throw
  }

  const bandCollection = await bands();

  const band = await bandCollection.findOne({ _id: new ObjectId(id) });

  if (!band) {
    throw new Error('No Band found.');
    //If the no band exists with that id, the method should throw.
  }

  band._id = band._id.toString();
  return band;

};





const remove = async (id) => {
  if (!id) {
    throw new Error('Please provide an id for the band.');
    //If no id is provided, the method should throw.
  }

  else if (typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('The provided id must be a non-empty string.');
    //If the id provided is not a string, or is an empty string the method should throw.
  }
  else if (!ObjectId.isValid(id)) {
    throw new Error('The provided id is not a valid ObjectId.');
    //If the id provided is not a valid ObjectId, the method should throw
  }

  const parsedId = ObjectId(id);

  const bandCollection = await bands();

  const deleteResult = await bandCollection.deleteOne({ _id: parsedId });

  if (deleteResult.deletedCount === 0) {
    throw new Error('Could not remove the band.');
    //If the band cannot be removed (does not exist), the method should throw.
  }

  const band = await bandCollection.findOne({ _id: parsedId });

  return `${band.name} has been successfully deleted!`;
  //If the removal succeeds, return the name of the band and the text " has been successfully deleted!"
};





const rename = async (id, newName) => {
  if (!id) {
    throw new Error('Please provide an id for the band.');
    //If no id is provided, the method should throw.
  }

  else if (typeof id !== 'string' || id.trim().length === 0) {
    throw new Error('Please provide an id for the band.');
    //If the id provided is not a string, or is an empty string the method should throw.
  }

  else if (!ObjectId.isValid(id)) {
    throw new Error('The provided id is not a valid ObjectId.');
    //If the id provided is not a valid ObjectId, the method should throw
  }

  else if (!newName) {
    throw new Error('Please provide a valid name for the band.');
    //If newName is not provided, the method should throw.
  }

  else if (typeof newName !== 'string') {
    throw new Error('Please provide a valid name for the band.');
    //If newName  is not a string, or an empty string, the method should throw.
  }

  else if (newName.trim().length === 0) {
    throw new Error('Please provide a valid name for the band.');
  }

  const bandCollection = await bands();

  const updateInfo = await bandCollection.updateOne({ _id: new ObjectId(id) }, { $set: { name: newName } });

  if (updateInfo.modifiedCount === 0) {
    throw new Error('The band can not be updated');
    //If the band cannot be updated (does not exist), the method should throw.
  }

  const updatedBand = await get(id);
  // Get the updated band object
  const { _id, ...rest } = updatedBand;
  // Destructure the updatedBand object to remove the _id field
  return { id: _id.toString(), ...rest };
  // Create a new object with the desired format
};

export {
  create,
  getAll,
  get,
  remove,
  rename
};

