/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let sortAndFilter = (array, [sortByField1, order1], [sortByField2, order2], filterBy, filterByTerm) => {
  //Conditions below

  if (Array.isArray(array) === false) {
    throw new Error('The array parameter is not an array');
    //The array parameter exists
    //The array parameter is an array
  }

  else if (array.length < 2) {
    throw new Error('The array must have at least two objects');
    //The array parameter is not empty
    //At least two objects supplied in the array parameter. 
  }

  for (let i = 0; i < array.length; i++) {

    if (typeof array[i] !== 'object') {
      throw new Error('Each element in the array parameter must be an object')
    }
    //Each element in the array parameter must be an object.
    else if (Object.keys(array[i]).length === 0) {
      throw new Error('Each element in the array must be an object with at least one key')
    }
    //Each object in the array parameter is not an empty object
    else if (Array.isArray(array[i]) === true) {
      throw new Error('Each element of the array should not be an array')
    }
    //The element at index i of the array should not be an array

    for (let key in array[i]) {
      if (typeof array[i][key] !== 'string') {
        throw new Error('Each values in every object must be strings')
      }
    }
  }

  if (typeof sortByField1 !== 'string') {
    throw new Error('sortByField1 should be a string');
    //Each element in the 2nd array parameter sortByField1 are strings (not just empty spaces)
  }

  else if (sortByField1.trim().length === 0) {
    throw new Error('sortByField1 is invalid');
    //the 2nd array parameter sortByField1 exists.
  }

  else if (typeof sortByField2 !== 'string') {
    throw new Error('sortByField1 should be a string');
    //Each element in the 3rd array parameter sortByField2 are strings (not just empty spaces)
  }

  else if (sortByField2.trim().length === 0) {
    throw new Error('sortByField2 is invalid');
    //the 3rd array parameter sortByField2 exists.
  }

  else if (order1 !== 'asc' && order1 !== 'desc') {
    throw new Error('Index 1 should be "asc" for ascending');
    //the 2nd array parameter [sortByField1, order1] index 1 is either one of these values "asc" for ascending or "desc" for descending. This element can ONLY have a value of "asc" or "desc"
  }

  else if (order2 !== 'asc' && order2 !== 'desc') {
    throw new Error('Index 1 should be "asc" for ascending');
    //the 3rd array parameter [sortByField1, order2] index 1 is either one of these values "asc" for ascending or "desc" for descending. This element can ONLY have a value of "asc" or "desc"
  }

  else if (array[0].hasOwnProperty(sortByField1) !== true) {
    throw new Error('the 2nd array parameter [sortByField1, order1] should not be empty.');
    //the 2nd array parameter [sortByField1, order1] is not empty.
  }

  else if (array[0].hasOwnProperty(sortByField2) !== true) {
    throw new Error('the 3rd array parameter [sortByField2, order2] should not be empty.');
    //the 2nd array parameter [sortByField2, order2] is not empty.
  }

  else if (typeof filterBy !== 'string' && filterBy !== null && filterBy !== undefined) {
    throw new Error('filterBy key exists in the objects passed in the array of objects');
    //the filterBy key exists in the objects passed in the array of objects
  }

  else if (array[0].hasOwnProperty(filterBy) !== true) {
    throw new Error('filterByTerm should be exists')
    //the filterByTerm exists (meaning there is at least one object that has that value and is a string (not just empty spaces) 
  }

  else if (typeof filterByTerm !== 'string' && filterByTerm !== null && filterByTerm !== undefined) {
    throw new Error('filterByTerm parameter must be a string');
  }

  //Condition finished

  //function below

  let array_after_filtered = array.filter(obj => obj[filterBy] === filterByTerm);

  let array_after_filtered_final_result = array_after_filtered.slice().sort((a, b) => {
    //I'm using slice method to sort objects, here's the stackoverflow link:
    //https://stackoverflow.com/questions/30359681/javascript-object-sort-and-slice
    if (a[sortByField1] < b[sortByField1]) {
      if (order1 === 'asc') {
        return -1;
      } else {
        return 1;
      }
    } else if (a[sortByField1] > b[sortByField1]) {
      if (order1 === 'asc') {
        return 1;
      } else {
        return -1;
      }
    }
    else {
      if (a[sortByField2] < b[sortByField2]) {
        if (order2 === 'asc') {
          return -1;
        } else {
          return 1;
        }
      } else if (a[sortByField2] > b[sortByField2]) {
        if (order2 === 'asc') {
          return 1;
        } else {
          return -1;
        }
      }
      else {
        return 0;
      }
    }
  });

  return array_after_filtered_final_result;

};




let merge = (...args) => {
  //Conditions below

  if (args.length === 0) {
    throw new Error("At least one array must be supplied as input.");
    //At least one array is supplied as input
    //Each array is not empty and has at least one element
  }

  for (let i = 0; i < args.length; i++) {
    if (Array.isArray(args[i]) !== true) {
      throw new Error('That each input should be an array');
      //That each input is an array
    }

    else if (args[i].length === 0) {
      throw new Error('Each array should not be empty and has at least one element');
      //Each array is not empty and has at least one element
    }
  }

  //Conditions over

  //Flatten the array first
  const flat = flatten(args);

  const sorted = flat.sort((a, b) => {
    // Sort that array numerically first, and then alphabetically
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    else if (typeof a === "string" && typeof b === "string") {
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
          if (a.charCodeAt(i) < b.charCodeAt(i)) {
            return -1;
          } else {
            return 1;
          }
        }
      }
      if (a.length < b.length) {
        return -1;
      } else if (a.length > b.length) {
        return 1;
      } else {
        return 0;
      }
    }

    else {
      // If the types are different, sort by type
      if (typeof a < typeof b) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  return sorted;
};

function flatten(ary) {
  //I used recursion to flatten the array, here's the link for stackoverflow below
  //https://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#:~:text=The%20array%20method%20accepts%20an,flattened%20(default%20to%201%20).&text=So%20to%20flatten%20an%20array,call%20flat%20method%20with%20Infinity%20.
  let final_result = [];

  for (var i = 0; i < ary.length; i++) {

    if (Array.isArray(ary[i]) === true) {
      final_result = final_result.concat(flatten(ary[i]));
      //I used the concat() method to merge arrays
      //recursion happens here
    } else {
      if (typeof ary[i] !== "string" && typeof ary[i] !== "number") {
        throw new Error("Each array element is either a string,  number or an array that has either strings or numbers as elements. ");
        //Each array element is either a string,  number or an array that has either strings or numbers as elements. 
      }
      final_result.push(ary[i]);
      //push out result
    }
  }
  return final_result;
}




let matrixMultiply = (...args) => {
  //Conditions below

  if (args.length === 0) {
    throw new Error("One input is invalid");
    //There are at least two inputs
  }
  else if (args.length < 2) {
    throw new Error("There should be at least two inputs");
    //There are at least two inputs
  }
  for (const i of args) {
    if (Array.isArray(i) !== true) {
      throw new Error("Each input should be an array");
      //Each input is an array
    }
    if (i.length === 0) {
      throw new Error("Each array should not be empty");
      //Each array is not empty
    }

    for (const array_within of i) {
      if (!Array.isArray(array_within)) {
        throw new Error("Each inner array must be an array");
      }
      if (array_within.length === 0) {
        throw new Error("Each inner array must not be empty");
      }
      if (array_within.some((elem) => typeof elem !== "number")) {
        throw new Error("The inner arrays must only have numbers as elements");
        //The inner arrays must only have numbers as elements
      }
      if (array_within.length !== i[0].length) {
        throw new Error("Each inner array should be the same length");
        //Each inner array is of the same length
      }
    }
  }
  //Conditions over

  let final_result = args[0];

  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (final_result[0].length !== a.length) {
      throw new Error("Invalid matrices inputs");
    }

    let compareobj = [];

    for (let d = 0; d < final_result.length; d++) {
      //nested loop implementation of the matrix multiplication
      let row = [];

      for (let f = 0; f < a[0].length; f++) {
        let sum = 0;

        for (let s = 0; s < a.length; s++) {
          sum += final_result[d][s] * a[s][f];
        }
        row.push(sum);
      }
      compareobj.push(row);
    }
    final_result = compareobj;
  }
  return final_result;
};

export {
  sortAndFilter,
  merge,
  matrixMultiply
};



