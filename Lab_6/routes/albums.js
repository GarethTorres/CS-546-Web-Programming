// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();
import { albumsData } from '../data/index.js';

router
  .route('/:bandId')
  .get(async (req, res) => {
    const { bandId } = req.params;

    // Check if bandId is a valid ObjectId
    if (!ObjectId.isValid(bandId)) {
      return res.status(400).json({ message: 'Invalid bandId' });
    }

    const albums = await albumsData.getAll(bandId);

    // Check if any albums are found
    if (albums.length === 0) {
      return res.status(404).json({ message: 'No albums found for bandId' });
    }

    return res.status(200).json(albums);
  })

  .post(async (req, res) => {
    const { bandId } = req.params;
    const { title, releaseDate, tracks, rating } = req.body;

    // validate inputs
    if (!bandId || !title || !releaseDate || !tracks) {
      return res.status(400).send('Missing required field(s)');
    }

    if (
      typeof bandId !== 'string' ||
      typeof title !== 'string' ||
      typeof releaseDate !== 'string' ||
      !Array.isArray(tracks)
    ) {
      return res.status(400).send('Invalid input type');
    }

    if (bandId.length !== 24 || !ObjectId.isValid(bandId)) {
      return res.status(400).send('Invalid bandId');
    }

    if (!tracks.every((track) => typeof track === 'string' && track !== '')) {
      return res.status(400).send('Invalid tracks input');
    }

    const releaseYear = new Date(releaseDate).getFullYear();
    const currentYear = new Date().getFullYear();

    if (
      isNaN(releaseYear) ||
      releaseYear < 1900 ||
      releaseYear > currentYear + 1
    ) {
      return res.status(400).send('Invalid releaseDate');
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).send('Invalid rating');
    }

    try {
      await albumsData.create(bandId, title, releaseDate, tracks, rating);
      const band = await albumsData.getAll(bandId);
      res.status(200).json(band);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    const albumId = req.params.albumId;

    // Check if albumId is a valid ObjectId
    if (!isValidObjectId(albumId)) {
      return res.status(400).json({ message: 'Invalid albumId' });
    }

    // Get the album by albumId
    const album = await albumsData.get(albumId);

    // Check if album exists
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Return the album
    return res.status(200).json(album);
  })

  .delete(async (req, res) => {
    const { albumId } = req.params;

    // Check if albumId is a valid ObjectId
    if (!isValidObjectId(albumId)) {
      return res.status(400).json({ message: 'Invalid album ID' });
    }

    try {
      const deletedAlbum = await albumsData.remove(albumId);

      // Check if album exists before deleting
      if (!deletedAlbum) {
        return res.status(404).json({ message: 'Album not found' });
      }

      // Recalculate the average for the overallRating field in the main band document
      const updatedBand = await bandsData.updateOverallRating(deletedAlbum.bandId);

      return res.json({ albumId, deleted: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

export default router;

/*
GET /albums/{bandId}
getAll

POST /albums/{bandId}
create
getAll

GET /albums/album/{albumId)
get

Delete /albums/album/{albumId)
remove
*/