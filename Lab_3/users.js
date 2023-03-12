//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from 'axios';

async function getUsers() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json')
    return data // this will be the array of user objects
}
async function getMovies() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data // this will be the array of user objects
}

const getUserById = async (id) => {

    //conditions below
    if (!id) {
        throw new Error('missing id parameter');
        //That the id  parameter exists and is of proper type (string). If not, throw an error.
    }

    else if (typeof id !== 'string') {
        throw new Error('Invalid id parameter');
        //That the id  parameter exists and is of proper type (string). If not, throw an error.
    }

    else if (id.trim() === '') {
        throw new Error('id parameter is missing or invalid');
    }

    //conditions over

    id = id.trim();
    // Trim any leading or spaces in id

    const result = await getUsers();
    //user object for the specified id within the users.json array

    const user = result.find((user) => user.id === id);

    if (!user) {
        throw new Error('User not found');
        //If the id exists and is in the proper type but  the id is not found in the array of users, throw a 'user not found' error.
    }

    return user;
    // Return the user object for the specified id within the users.json array
};



const sameGenre = async (genre) => {

    //conditions below
    if (!genre) {
        throw new Error('the genre parameter should exists');
        //That the genre parameter exists and is of proper type (string). If not, throw an error.
    }

    else if (typeof genre !== 'string') {
        throw new Error('The genre parameter should be proper type (string)');
        //That the genre parameter exists and is of proper type (string). If not, throw an error.
    }

    else if (genre.trim() === '') {
        throw new Error('Genre should not be just empty spaces');
        //if genre is just empty spaces, throw an error. 
    }

    //conditions over

    const users = await getUsers();

    const favorite_genre = users.filter(
        (user) => user.genre && user.genre.toLowerCase() === genre.toLowerCase()
    );
    //The genre parameter must be case in-sensitive i.e. sameGenre("action") should return the same results as passing sameGenre("ACTION")

    if (favorite_genre.length < 2) {
        throw new Error('There are not at least two users that have the same favorite genre');
    }
    //If there are not at least two users that have the same favorite genre as the genre provided , you will throw an error.


    // Sort users by last name and return first 50
    const sortedUsers = favorite_genre.sort(
        (a, b) => a.last_name.localeCompare(b.last_name)
        //sorted alphabetically by last name
    );
    const user_result = sortedUsers.slice(0, 50);

    // Map users to "firstName lastName" format and return as array
    const final_user = user_result.map(
        (user) => `${user.first_name} ${user.last_name}`
    );
    return final_user;
};


const moviesReviewed = async (id) => {

    //conditions below

    if (typeof id !== 'string') {
        throw new Error('The id  parameter should exists and is of proper type (string)');
        //That the id  parameter exists and is of proper type (string).  If not, throw an error.
    }

    else if (id.trim().length === 0) {
        throw new Error('the id parameter should not just empty spaces');
        //if the id  parameter is just empty spaces, throw an error.
    }

    id = id.trim();
    // Trim any leading or spaces in id

    const users = await getUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
        throw new Error('User not found');
        //If the id exists and is in the proper type but the id is not found in the array of users, throw a 'user not found' error.
    }

    //conditions over

    const movies = await getMovies();

    const movies_left_review = movies.filter((movie) =>
        movie.reviews.some((review) => review.username === user.username)
        // Get movies that the user reviewed wwith filter()
        // The some() method is used to check if at least one of the reviews in the movie.reviews array has a username field that matches the username of the specified user.
    );

    const final_result = movies_left_review.map((movie) => {
        const review = movie.reviews.find((review) => review.username === user.username);
        // Create an array of movies with map()
        // The map() method is used to list each movie in the movies_left_review array.
        return { [movie.title]: review };
    });

    return final_result;
};



const referMovies = async (id) => {
    //conditions below

    if (!id) {
        throw new Error('Invalid id parameter');
        //That the id  parameter exists.  If not, throw an error.
    }


    else if (typeof id !== 'string') {
        throw new Error('Invalid id parameter');
        //That the id  parameter should be a proper type (string).  If not, throw an error.
    }

    else if (id.trim().length === 0) {
        throw new Error('Invalid id parameter');
        //if the id  parameter is just empty spaces, throw an error
    }

    //conditions over

    const users = await getUsers();
    const movies = await getMovies();

    const user = users.find((u) => u.id === id);
    //Note: The id is case-sensitive.

    if (!user) {
        throw new Error('User not found');
        //If the id exists and is in the proper type but the id is not found in the array of users, throw a 'user not found' error.
    }

    const user_favorite_genre = user.favorite_genre;
    // Get the favorite genre of the user

    const refer_movies = movies.filter(
        // use filter() to get all the movies that match that user's favorite genre that they have NOT reviewed previously
        (movie) =>
            movie.genre.split("|").some((genre) =>
                // Use split() to split the "genre" string of a movie.
                // Use some() to checks if at least one element in the user.reviews array satisfies the condition
                genre === user_favorite_genre || genre.includes(user_favorite_genre)
                // Use includes() to check if the user's favorite genre is included in the movie's genre array.
            ) && (!user.reviews || !user.reviews.some((review) => review.movieId === movie.id))
    );

    const movie_name = refer_movies.map((movie) => movie.title);
    // Use the map() method to list every movie in the refer_movies array.

    return movie_name;
}

export {
    getUsers,
    getMovies,
    getUserById,
    sameGenre,
    moviesReviewed,
    referMovies
};

