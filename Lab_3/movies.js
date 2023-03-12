//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from 'axios';

async function getMovies() {
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data // this will be the array of user objects
}


const findMoviesByDirector = async (directorName) => {

    //conditions below

    if (!directorName) {
        throw new Error('DirectorName parameter should exists')
        //That directorName  parameter exists and is of the proper type (string). If not, throw an error.
    }
    else if (typeof directorName !== 'string') {
        throw new Error('DirectorName parameter should be the proper type (string)')
        //That directorName parameter should be the proper type (string). If not, throw an error.
    }

    else if (!directorName.trim()) {
        throw new Error('directorName must not be empty or contain only spaces');
        // Check the directorName parameter is not just empty spaces
    }

    //conditions below
    const movies = await getMovies();

    const movies_director = movies.filter(movies => movies.director === directorName);

    if (movies_director.length === 0) {
        throw new Error('No movies can be found in movies.json')
        //If the no movies can be found in movies.json for the directorName provided, then throw an error.
    }

    return movies_director;
};


const findMoviesByCastMember = async (castMemberName) => {

    //conditions below
    if (!castMemberName) {
        throw new Error('That castMemberName parameter should exists');
        // /That castMemberName  parameter exists and is of the proper type (string). If not, throw an error.
    }

    else if (typeof castMemberName !== 'string') {
        throw new Error('That castMemberName parameter should be proper type (string)');
        // /That castMemberName parameter should be proper type (string). If not, throw an error.
    }

    else if (!castMemberName.trim()) {
        throw new Error('castMemberName must not be empty or contain only spaces');
        //You must check to make sure the castMemberName parameter is not just empty spaces:  If it is, throw an error.
    }

    const cast_member_name = await getMovies();

    const member_name_list = cast_member_name.filter(cast_member_name => {
        return cast_member_name.cast.includes(castMemberName);
    })

    if (member_name_list.length === 0) {
        throw new Error('no movies can be found in movies.json  for the castMemberName provided');
        //If the no movies can be found in movies.json  for the castMemberName provided, then throw an error.
    }
    return member_name_list;
}


const getOverallRating = async (title) => {

    //conditions below

    if (!title) {
        throw new Error('That getOverallRating parameter should exists');
        // /That getOverallRating  parameter exists and is of the proper type (string). If not, throw an error.
    }

    else if (typeof title !== "string") {
        throw new Error('That getOverallRating parameter should be proper type (string)');
        // /That getOverallRating parameter should be proper type (string). If not, throw an error.
    }

    else if (!title.trim()) {
        throw new Error('getOverallRating must not be empty or contain only spaces');
        //You must check to make sure the getOverallRating parameter is not just empty spaces:  If it is, throw an error.
    }

    const movies = await getMovies();

    const movie = movies.find((m) => m.title === title);

    if (!movie) {
        throw new Error('the movie cannot be found in movies.json for the supplied title parameter');
        //If the movie cannot be found in movies.json for the supplied title parameter, then throw an error.
    }

    const user_Rating = movie.reviews.map((review) => review.rating);

    const average_rate =
        Math.floor((user_Rating.reduce((total, rating) =>
            //Use reduce to sum up all the user ratings 
            total + rating, 0) / user_Rating.length) * 10) / 10;
    // The result is multiplied by 10 and then passed to Math.floor() to round down to the nearest integer,
    // Then divided by 10 to get the result to one decimal place
    return average_rate;

};


const getMovieById = async (id) => {

    //conditions below

    if (!id) {
        throw new Error('That getMovieById parameter should exists');
        // /That getMovieById  parameter exists and is of the proper type (string). If not, throw an error.
    }

    else if (typeof id !== "string") {
        throw new Error('That getMovieById parameter should be proper type (string)');
        // /That getMovieById parameter should be proper type (string). If not, throw an error.
    }

    else if (!id.trim()) {
        throw new Error('getMovieById must not be empty or contain only spaces');
        //You must check to make sure the getMovieById parameter is not just empty spaces:  If it is, throw an error.
    }

    //conditions end

    const movies = await getMovies();

    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
        throw new Error('Movie not found');
    }

    return movie;
};


export {
    getMovies,
    findMoviesByDirector,
    findMoviesByCastMember,
    getOverallRating,
    getMovieById
};
