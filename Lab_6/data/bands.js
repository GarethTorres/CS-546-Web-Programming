// This data file should export all functions using the ES6 standard as shown in the lecture code
import { bands } from '../config/mongoCollections.js';

import { ObjectId } from 'mongodb';


//1 method create()
const exportedMethods = {
  async create(
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
  ) {

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
    else if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(gm => typeof gm === 'string')) {
      throw new Error('Invalid group members');
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
      name: name.trim(),
      genre: genre.map(g => g.trim()),
      website: website.trim(),
      recordCompany: recordCompany.trim(),
      groupMembers: groupMembers.map(m => m.trim()),
      yearBandWasFormed: yearBandWasFormed,
      overallRating: 0,
      albums: []
    };

    const insertInfo = await bandCollection.insertOne(newBand);
    if (insertInfo.insertedCount === 0) {
      throw new Error('Could not add band');
    }

    const newId = insertInfo.insertedId.toString();
    const band = await get(newId);
    return band;
  },

  //2 method getAll()
  async getAll() {
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
  },

  //3 method get(id)
  async get(id) {
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

  },

  //4 method remove
  async remove(id) {
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

    const band = await get(id);

    const parsedId = ObjectId(id);

    const bandCollection = await bands();

    const deleteResult = await bandCollection.deleteOne({ _id: parsedId });

    if (deleteResult.deletedCount === 0) {
      throw new Error('Could not remove the band.');
      //If the band cannot be removed (does not exist), the method should throw.
    }

    return `${band.name} has been successfully deleted!`;
    //If the removal succeeds, return the name of the band and the text " has been successfully deleted!"
  },

  //5 method update
  async update(
    id,
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed
  ) {
    // conditions below

    if (!id || !name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
      throw new Error("id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided.(All fields need to have valid values)");
      //If id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the method should throw. (All fields need to have valid values);
    }

    else if (typeof id !== 'string' || typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string') {
      throw new Error('id, name, website, recordCompany are not strings');
      //If id, name, website, recordCompany are not strings or are empty strings, the method should throw.
    }

    else if (id.trim().length === 0 || name.trim().length === 0 || website.length === 0 || recordCompany.length === 0) {
      throw new Error('id, name, website, recordCompany are not valid input');
      //If id, name, website, recordCompany are not strings or are empty strings, the method should throw.
    }

    else if (!ObjectId.isValid(id)) {
      throw new Error('id is not  a valid ObjectId');
      //If id is not  a valid ObjectId, the method should throw.
    }

    else if (website.trim().length === 0 || !/^http:\/\/www\..{5,}\.com$/.test(website)) {
      //Use regular expression to test the input
      throw new Error('website does not contain http://www. and end in a .com, or have at least 5 characters in-between the http://www. and .com');
      //If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com this method will throw.
    }

    else if (!Array.isArray(genre) || genre.length === 0 || !genre.every(e => typeof e === "string" && e.length > 0)) {
      throw new Error('genre must be a non-empty array of strings');
      //If genre, groupMembers are not arrays and if they do not have at least one element in each of them that is a valid string, or are empty strings the method should throw. (all elements must be strings as well)
    }

    else if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(e => typeof e === "string" && e.length > 0)) {
      throw new Error('groupMembers must be a non-empty array of strings');
      //If genre, groupMembers are not arrays and if they do not have at least one element in each of them that is a valid string, or are empty strings the method should throw. (all elements must be strings as well)
    }

    else if (!yearBandWasFormed || typeof yearBandWasFormed !== 'number' || yearBandWasFormed < 1900 || yearBandWasFormed > 2023) {
      throw new Error('yearBandWasFormed must be a number between 1900 and 2023');
      //If yearBandWasFormed is not a number, or if yearBandWasFormed is less than 1900 or greater than the current year (2023) the method should throw. (so only years 1900-2023 are valid values)
    }

    const bandCollection = await bands();
    const updatedBand = {
      name,
      genre,
      website,
      recordCompany,
      groupMembers,
      yearBandWasFormed,
    };
    const result = await bandCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedBand });
    if (result.modifiedCount === 0) {
      throw new Error(`Could not update band with ID ${id}`);
    }
    const updatedBandObject = await get(id);
    return updatedBandObject;
    // If the update succeeds, return the entire band object as it is after it is updated.
  }
};

export default exportedMethods;
/*
create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed)
getAll()
get(id)
remove(id)
update(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed)  Note: this is the new function you will create
*/