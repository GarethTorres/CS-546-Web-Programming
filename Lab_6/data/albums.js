// This data file should export all functions using the ES6 standard as shown in the lecture code

import { bands } from '../config/mongoCollections.js';

import { ObjectId } from 'mongodb';

const exportedMethods = {
  async create(
    bandId,
    title,
    releaseDate,
    tracks,
    rating
  ) {
    // Check if all required fields are supplied and are of the correct type
    if (!bandId || !title || !releaseDate || !tracks || rating === null) {
      //If bandId, title, releaseDate, tracks, rating are not provided at all, the method should throw. (All fields need to have valid values);
      throw new Error('Please provide valid inputs');
    }
    else if (
      typeof bandId !== 'string' || typeof title !== 'string' || typeof releaseDate !== 'string'
      //If bandId, title, releaseDate are not strings or are empty strings, the method should throw.
    ) {
      throw new Error('bandId, title, releaseDate are no all strings or some of them are empty strings');
    }
    else if (!bandId.trim() || !title.trim() || !releaseDate.trim()) {
      throw new Error('Fields cannot be empty');
    }
    else if (!ObjectId.isValid(bandId)) {
      //If the bandId  provided is not a valid ObjectId, the method should throw
      throw new Error('The bandId  provided is not a valid ObjectId');
    }

    // Check if band exists with the provided bandId
    const bandCollection = await bands();

    const band = await bandCollection.findOne({ _id: ObjectId(bandId) });

    if (!band) {
      //If the band  doesn't exist with that bandId, the method should throw
      throw new Error(`Band with bandId not found`);
      //
    }

    // Access the albums collection of the band
    const db = await bandCollection.db;
    const albumCollection = db.collection('albums');
    // Check if tracks is an array with at least 3 valid string elements

    if (!Array.isArray(tracks) || tracks.length < 3 || !tracks.every((track) => typeof track === 'string' && track.trim())) {
      //If tracks is not an array and if it does not have at least 3 elements in the array that is are valid strings, or are empty strings the method should throw. (all elements must be strings as well, but there must be AT LEAST 3)
      throw new Error('Please provide a valid tracks input');
    }

    const date = new Date(releaseDate);
    if (isNaN(Date.parse(releaseDate))) {
      //If releaseDate is not a valid date string, the method will throw.
      throw new Error('ReleaseDate is not a valid date string');
    }
    const minDate = new Date('1900-01-01');
    const maxDate = new Date(new Date().getFullYear() + 1, 0, 1);
    //If releaseDate is < 1900 or is > the current year + one year, the method should throw.  

    if (date < minDate || date > maxDate) {
      throw new Error('ReleaseDate should be between 1900 and next year');
    }

    else if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      //If rating is not a number from 1 to 5, the method will throw. (floats will be accepted as long as they are formatted like 1.5 or 4.8 for example. We will only use one decimal place)
      throw new Error('Invalid rating input');
    }

    // Create the album object and insert into the database
    const album = {
      bandId: ObjectId(bandId),
      title,
      releaseDate,
      tracks,
      rating,
    };
    const result = await albumCollection.insertOne(album);

    // Return the newly created album object
    return { id: result.insertedId.toString(), ...album };
  },

  async getAll(bandId) {
    if (!bandId || typeof bandId !== 'string' || !bandId.trim()) {
      //If the bandId is not provided, the method should throw.
      //If the bandId  provided is not a string, or is an empty string, the method should throw.
      throw new Error('The bandId is not provided or is not a string');
    }
    if (!ObjectId.isValid(bandId)) {
      //If the bandId  provided is not a valid ObjectId, the method should throw
      throw new Error('Invalid bandId');
    }

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(bandId) });

    if (!band) {
      throw new Error(`Band with id ${bandId} not found`);
      //If the band doesn't exist with that bandId, the method should throw.
    }

    //Access the albums collection of the band
    const albumCollection = bandCollection.db.collection('albums');

    //Get all albums for the band
    const albums = await albumCollection.find({ bandId: ObjectId(bandId) }).toArray();

    //Return the albums array
    return albums;
  },

  async get(albumId) {
    if (!albumId || typeof albumId !== 'string' || !albumId.trim()) {
      //If the albumId is not provided, the method should throw.
      //If the albumId provided is not a string, or is an empty string, the method should throw.
      throw new Error('The albumId is not provided or is not a string');
    }

    if (!ObjectId.isValid(albumId)) {
      //If the album doesn't exist with that albumId, the method should throw.
      throw new Error("The album doesn't exist with that albumId");
    }

    const bandsCollection = await bands();

    // Check if album exists with that albumId
    const band = await bandsCollection.findOne({
      'albums._id': ObjectId(albumId),
    });
    if (!band) {
      throw new Error(`Album with id ${albumId} not found.`);
    }

    // Find the album with that albumId and return it
    const album = band.albums.find((album) => album._id.toString() === albumId);
    return album;
  },


  async remove(albumId) {
    if (!albumId || typeof albumId !== 'string' || !albumId.trim()) {
      //If the albumId is not provided, the method should throw.
      //If the albumId provided is not a string, or is an empty string, the method should throw.
      throw new Error('The albumId is not provided or is not a string');
    }

    // check if albumId is a valid ObjectId
    if (!ObjectId.isValid(albumId)) {
      //If the album doesn't exist with that albumId, the method should throw.
      //If the albumId provided is not a valid ObjectId, the method should throw
      throw new Error('The albumId provided is not a valid ObjectId');
    }

    const bandsCollection = await bands();

    // remove album from band's albums array
    const updateResult = await bandsCollection.updateOne(
      { 'albums._id': ObjectId(albumId) },
      { $pull: { albums: { _id: ObjectId(albumId) } } }
    );
    if (updateResult.modifiedCount === 0) {
      throw new Error(`Could not remove album with albumId ${albumId}.`);
    }

    return updateResult.value;
  }
};

export default exportedMethods;

/*
create(bandId, title, releaseDate, tracks, rating)
getAll(bandId)
get(albumId)
remove(albumId)
*/