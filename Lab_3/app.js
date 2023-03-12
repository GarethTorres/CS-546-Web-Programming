/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

import {
  getUsers,
  getMovies,
  getUserById,
  sameGenre,
  moviesReviewed,
  referMovies
} from './users.js';


import {
  //getMovies,
  findMoviesByDirector,
  findMoviesByCastMember,
  getOverallRating,
  getMovieById
} from './movies.js';


async function main() {
  try {
    const userdata = await getUsers();
    console.log(userdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const moviedata = await getMovies();
    console.log(moviedata);
  } catch (e) {
    console.log(e);
  }

  // getUserById Tests

  try {
    // Should Pass
    const getUserByIdOne = await getUserById(-1); // Throws Error
    console.log('last passed successfully', getUserByIdOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  // sameGenre Tests

  try {
    // Should Pass
    const sameGenreOne = await sameGenre("Action"); // Returns:['Shay Claydon', 'Merridie Confort', 'Bent Crowest', 'Shurlocke Cull', 'Lonny Dechelle', 'Olia Shefton']  
    console.log('last passed successfully', sameGenreOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  // moviesReviewed Tests

  try {
    // Should Pass
    const moviesReviewedOne = await moviesReviewed('64035fad-a5b7-48c9-9317-3e31e22fe26c'); // Returns: [{'Charlie's Angels': {username:"cfinkle5",rating:4,review:"Solid, good movie."} }, {'Class of 1999 II: The Substitute': {username:"cfinkle5",rating:4,review:"Solid, good movie."} }, {'Terminator 3: Rise of the Machines': {username:"cfinkle5",rating:2,review:"It was meh, plot was very bad."} }]    
    console.log('last passed successfully', moviesReviewedOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  //referMovies Tests

  try {
    // Should Pass
    const referMoviesOne = await referMovies('5060fc9e-10c7-4f38-9f3d-47b7f477568b'); // Returns: ['Fly Me to the Moon', 'Gravity', 'Spiderwick Chronicles, The', 'How to Train Your Dragon', 'Wings of Courage', 'Happy Feet Two']
    console.log('last passed successfully', referMoviesOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  //findMoviesByDirector Tests

  try {
    // Should Pass
    const findMoviesByDirectorOne = await findMoviesByDirector("Fernando Dollimore");//Returns:
    /*    [
          {
            id: '040d7398-136c-45f0-89b8-9b73c67c617e',
            title: 'Company',
            genre: 'Drama|Musical',
            director: 'Fernando Dollimore',
            release_date: '10/27/2020',
            runtime: '1h 14mins',
            mpa_rating: 'PG-13',
            cast: ['Huberto Snoddon', 'Horacio Scoggins'],
            streaming_service: {
              company: 'Netflix',
              link: 'https://Netflix.com/Company'
            },
            reviews: [
              {
                username: 'jsorrelaw',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.'},
              {username: 'egrigolieb', rating: 3, review: 'A very ok movie.'},
              {username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.'}
            ]
          },
          {
            id: 'e8b006a5-8a81-4718-ae52-11b2bd02f741',
            title: 'Flashbacks of a Fool',
            genre: 'Drama',
            director: 'Fernando Dollimore',
            release_date: '07/15/2010',
            runtime: '2h 58mins',
            mpa_rating: 'PG',
            cast: [
              'Iver Hubbucks',
              'Tandi Arminger',
              'Willette Furze',
              'Feliks Edowes',
              'Neddie Ashleigh'
            ],
            streaming_service: {
              company: 'Paramount+',
              link: 'https://Paramount+.com/Flashbacks of a Fool'
            },
            reviews: [
              {
                username: 'tjoice3z',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {
                username: 'lhumpherstonjo',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {username: 'sgiacobo1n', rating: 1, review: 'HORRIBLE MOVIE!!!'},
              {username: 'kcoumbe9m', rating: 3, review: 'A very ok movie.'}
            ]
          },
          {
            id: 'f77972aa-9fdf-4465-9948-ba4acfea4d16',
            title: 'Last Time, The',
            genre: 'Comedy|Drama|Romance',
            director: 'Fernando Dollimore',
            release_date: '05/24/2013',
            runtime: '3h 32mins',
            mpa_rating: 'R',
            cast: ['Isaiah Gabbett', 'Merrili Maud', 'Raynard Tuxsell'],
            streaming_service: {
              company: 'Peacock',
              link: 'https://Peacock.com/Last Time, The'
            },
            reviews: [
              {
                username: 'lbickelll',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {
                username: 'abuttersm2',
                rating: 5,
                review: 'OMG I loved it. AMAZING 10/10!!!!'
              }
            ]
          },
          {
            id: 'bcafe739-d928-4440-b3a9-4cc554a1cb2a',
            title: 'Rambo III',
            genre: 'Action|Adventure|Thriller|War',
            director: 'Fernando Dollimore',
            release_date: '02/11/2020',
            runtime: '1h 16mins',
            mpa_rating: 'R',
            cast: ['Meier Craine', 'Lorrie Yanin', 'Nertie Kadar', 'Pattie Caffin'],
            streaming_service: {
              company: 'HBO Max',
              link: 'https://HBO Max.com/Rambo III'
            },
            reviews: [
              {
                username: 'jjackettcr',
                rating: 5,
                review: 'OMG I loved it. AMAZING 10/10!!!!'
              },
              {
                username: 'bboziermu',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {
                username: 'apergensrj',
                rating: 2,
                review: 'It was meh, plot was very bad.'
              },
              {username: 'cempsbj', rating: 4, review: 'Solid, good movie.'}
            ]
          }
        ];
        */
    console.log('last passed successfully', findMoviesByDirectorOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  //findMoviesByCastMember Tests

  try {
    // Should Pass
    const findMoviesByCastMemberOne = await findMoviesByCastMember("Huberto Snoddon") // Return:
    /*
    [
      {
        id: '040d7398-136c-45f0-89b8-9b73c67c617e',
        title: 'Company',
        genre: 'Drama|Musical',
        director: 'Fernando Dollimore',
        release_date: '10/27/2020',
        runtime: '1h 14mins',
        mpa_rating: 'PG-13',
        cast: ['Huberto Snoddon', 'Horacio Scoggins'],
        streaming_service: {
          company: 'Netflix',
          link: 'https://Netflix.com/Company'
        },
        reviews: [
          {
            username: 'jsorrelaw',
            rating: 2,
            review: 'It was meh, plot was very bad.'
          },
          {username: 'sgiacobo1n', rating: 3, review: 'A very ok movie.'},
          {username: 'egrigolieb', rating: 3, review: 'A very ok movie.'},
          {username: 'lmcinnesmk', rating: 4, review: 'Solid, good movie.'}
        ]
      },
      {
        id: 'ab000bf0-f2e5-4cda-9294-e588a734f0ef',
        title: "Herod's Law (Ley de Herodes, La)",
        genre: 'Comedy|Crime|Mystery',
        director: 'Lise Glanister',
        release_date: '06/13/2003',
        runtime: '1h 57mins',
        mpa_rating: 'NC-17',
        cast: ['Huberto Snoddon', 'Mickie Rankine'],
        streaming_service: {
          company: 'Amazon Prime Video',
          link: "https://Amazon Prime Video.com/Herod's Law (Ley de Herodes, La)"
        },
        reviews: [{username: 'iaistonli', rating: 1, review: 'HORRIBLE MOVIE!!!'}]
      }
    ];
  */
    console.log('last passed successfully', findMoviesByCastMemberOne);
  } catch (e) {
    console.error('last failed test case', e);
  }

  //getOverallRating Tests

  try {
    // Should Pass
    const getOverallRatingOne = await getOverallRating('Asterix and the Vikings (Astérix et les Vikings)');// Returns: 2.2    
    console.log('last passed successfully', getOverallRatingOne);
  } catch (e) {
    console.error('last failed test case', e);
  }


  //getMovieById Tests

  try {
    // Should Pass
    const getMovieByIdOne = await getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2"); // Returns: 
    /*
        {
           id:"38fd6885-0271-4650-8afd-6d09f3a890a2",
           title:"Asterix and the Vikings (Astérix et les Vikings)",
           genre:"Adventure|Animation|Children|Comedy|Fantasy",
           director:"Charissa Edinboro",
           release_date:"06/29/2007",
           runtime:"2h 35mins",
           mpa_rating:"R",
           cast:["Sharl Covert","Ailyn Howcroft","Nissie Henrys"],
           streaming_service:{company:"Disney+",link:"https://Disney+.com/Asterix and the Vikings (Astérix et les Vikings)"},
           reviews:[{username:"afrill27",rating:3,review:"A very ok movie."},
                      {username:"tchedzoy2v",rating:1,review:"HORRIBLE MOVIE!!!"},
                      {username:"ltruckettim",rating:2,review:"It was meh, plot was very bad."},
                      {username:"fgoodale6l",rating:3,review:"A very ok movie."}]
        }    
        */
    console.log('last passed successfully', getMovieByIdOne);
  } catch (e) {
    console.error('last failed test case', e);
  }
}

//call main
main();
