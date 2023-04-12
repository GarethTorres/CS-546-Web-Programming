//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import express from 'express';
import axios from 'axios';

const apiKey = 'xEB1NL4PVUUvY4kxEPoO0z0afuXuetBh';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.route('/searchvenues').post( async (req, res) => {
  const searchVenueTerm = req.body.searchVenueTerm;
  console.log(searchVenueTerm);
  if (!searchVenueTerm) {
    console.log("error")
    res.render('error', { class: 'searchvenues', error: 'You must provide a search term.' });
    res.status(400);
    
  }
    try{
      const apiUrl = `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${apiKey}&countryCode=US`;
      const response = await axios.get(apiUrl);
      const venues = response.data._embedded ? response.data._embedded.venues.slice(0, 10) : [];
      console.log(venues);
      res.render("./venueSearchResults", { searchVenueTerm: searchVenueTerm, venuesFound: venues });
    }
    catch(e){
      console.log(e);
    }
    
  // try {
  //   const apiUrl = `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${apiKey}&countryCode=US`;
  //   const response = await axios.get(apiUrl);
  //   const venues = response.data._embedded ? response.data._embedded.venues.slice(0, 10) : [];
  //   console.log(venues);
  //   // if (venues.length === 0) {
  //   //   res.render('venueNotFound', { hasError: true, searchVenueTerm });
  //   //   res.status(404);
  //   //   return;
  //   // } else {
  //     console.log(venues);
  //     res.render("venueSearchResults", { searchVenueTerm: searchVenueTerm, venuesFound: venues });
  //   // }
  // } catch (e) {
  //   res.status(500).render('error', { class: 'searchvenues', error: 'Error fetching data from Ticketmaster API' });
  //   return;
  // }
});

router.get('/venuedetails/:id', async (req, res) => {
  const venueId = req.params.id;

  try {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/venues/${venueId}?&apikey=${apiKey}&countryCode=US`;
    const response = await axios.get(apiUrl);

    //res.render('venueByID', { venue: response.data });
    console.log(response.data);
    let images;
    if(response.data.images){
      images = response.data.images[0].url;
    } else {
      images = false;
    }
    res.render('venueByID', { venue: response.data, images:images });
  } catch (e) {
    res.status(404).render('error', { class: 'venueByID', error: 'No venue found with the provided ID' });
  }
});

export default router;
