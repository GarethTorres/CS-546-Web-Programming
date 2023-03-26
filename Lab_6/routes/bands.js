// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
const router = Router();
import { bandsData } from '../data/index.js';
import { isValidObjectId } from 'mongoose';

router
  .route('/')
  .get(async (req, res) => {
    //[{ "_id": "603d965568567f396ca44a72","name": "Pink Floyd"},{ "_id": "704f456673467g306fc44c34","name": "Linkin Park"},.....]
    try {
      const bands = await bandsData.getAll();
      const bandsFormatted = bands.map(({ _id, name }) => ({ _id, name }));
      res.status(200).json(bandsFormatted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error occour' });
    }
  })

  .post(async (req, res) => {
    const {
      name,
      genre,
      website,
      recordCompany,
      groupMembers,
      yearBandWasFormed,
    } = req.body;

    // Check if all required fields are present and have valid values
    if (
      !name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed ||
      //If name, genre, website, recordCompany, groupMembers, yearBandWasFormed are not provided at all, the route should issue a 400 status code and end the request. (All fields need to have valid values);
      typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string' || typeof yearBandWasFormed !== 'number' ||
      //If name, website, recordCompany are not strings or are empty strings, the route should issue a 400 status code and end the request.
      !Array.isArray(genre) || !Array.isArray(groupMembers) ||
      //If genre, groupMembers are not arrays and if they do not have at least one element in each of them that is a valid string, or are empty strings the route should issue a 400 status code and end the request.
      !/^http:\/\/www\.[a-zA-Z0-9]{5,}\.com$/.test(website) ||
      //If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com the route should issue a 400 status code and end the request.
      genre.length === 0 || groupMembers.length === 0 ||
      name.trim() === '' || website.trim() === '' || recordCompany.trim() === '' ||
      yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear()
      //If yearBandWasFormed is not a number, or if yearBandWasFormed is less than 1900 or greater than the current year (2023) the route should issue a 400 status code and end the request.  (so only years 1900-2023 are valid values)
    ) {
      return res.status(400).json({ error: '400 status code issued and end the request' });
    }

    /*    const websiteRegex = /^http:\/\/www\..+\.com$/;
        if (!websiteRegex.test(website)) {
          //If website does not contain http://www. and end in a .com, and have at least 5 characters in-between the http://www. and .com the route should issue a 400 status code and end the request.
          return res.status(400).json({ error: 'Invalid website input' });
        }
    */
    // Create a new band object with default values for the optional fields
    const newBand = {
      name: name.trim(),
      genre: genre.filter((g) => typeof g === 'string' && g.trim() !== ''),
      website: website.trim(),
      recordCompany: recordCompany.trim(),
      groupMembers: groupMembers.filter(
        (m) => typeof m === 'string' && m.trim() !== ''
      ),
      yearBandWasFormed,
      albums: [],
      overallRating: 0,
    };

    // Insert the new band into the database
    try {
      const result = await bandsData.create(newBand);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error occured' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const band = await bandsData.get(id);
      if (!band) {
        res.status(404).send('Band not found');
      } else {
        const { _id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed, albums, overallRating } = band;
        res.status(200).json({ _id: _id.toString(), name, genre, website, recordCompany, groupMembers, yearBandWasFormed, albums, overallRating });
      }
    } catch (error) {
      if (error.name === 'CastError') {
        res.status(400).send('Invalid band ID');
      } else {
        res.status(500).send('Internal server error');
      }
    }
  })


  .delete(async (req, res) => {
    const bandId = req.params.id;

    if (!isValidObjectId(bandId)) {
      //if the id url parameter is not a valid ObjectId, you will issue a 400 status code and end the request
      return res.status(400).json({ error: 'Invalid ID' });
    }

    // Find the band by ID and delete it
    const deletedBand = await bandsData.remove(bandId);

    // If no band was found with the given ID, return 404
    if (!deletedBand) {
      //If no bands exists with an _id of {id}, return a 404 and end the request.
      return res.status(404).json({ error: 'Band not found' });
    }

    // Return the deleted band ID and a boolean flag indicating successful deletion
    return res.status(200).json({ bandId: deletedBand._id.toString(), deleted: true });
    //Deletes the bands, sends a status code 200 and returns:
  })



  .put(async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ObjectId' });
    }

    const { name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = req.body;

    // Check that all required fields are provided
    if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check that name, website and recordCompany are valid strings
    if (typeof name !== 'string' || name.trim() === '' || typeof website !== 'string' || website.trim() === '' || typeof recordCompany !== 'string' || recordCompany.trim() === '') {
      return res.status(400).send({ message: 'Invalid inputs for name, website, or recordCompany' });
    }

    // Check that website is valid
    if (!/^http:\/\/www\..+\.com$/.test(website)) {
      return res.status(400).send({ message: 'Invalid website format' });
    }

    // Check that genre and groupMembers are valid arrays
    if (!Array.isArray(genre) || genre.length === 0 || !genre.every(elem => typeof elem === 'string' && elem.trim() !== '') || !Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(elem => typeof elem === 'string' && elem.trim() !== '')) {
      return res.status(400).send({ message: 'Invalid inputs for genre or groupMembers' });
    }

    // Check that yearBandWasFormed is valid
    const currentYear = new Date().getFullYear();
    if (typeof yearBandWasFormed !== 'number' || yearBandWasFormed < 1900 || yearBandWasFormed > currentYear) {
      return res.status(400).send({ message: 'Invalid year for yearBandWasFormed' });
    }

    try {
      const oldBand = await bandsData.get(id);
      if (!oldBand) {
        return res.status(404).send({ message: `No band found with id ${id}` });
      }

      const updatedBand = { ...req.body };
      updatedBand._id = id;
      updatedBand.albums = oldBand.albums;
      updatedBand.overallRating = oldBand.overallRating;

      const result = await bandsData.update(id, updatedBand);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }

  });

export default router;
/*
GET /bands
getAll

POST /bands
create

GET /bands/{id}
get(id)

PUT /bands/{id}
get(id)
update

DELETE /bands/{id}
remove
*/
