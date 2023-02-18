/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
// import * as lab2_1 from "./arrayUtils.js";
// import * as lab2_2 from "./stringUtils.js";
// import * as lab2_3 from "./objectUtils.js";

//const arrayUtils = require('./arrayUtils');
// const stringUtils = require('./stringUtils.js');
// const objUtils = require('./objUtils.js');

import {
    sortAndFilter,
    merge,
    matrixMultiply
} from './arrayUtils.js';

import {
    palindromes,
    censorWords,
    distance
} from './stringUtils.js';

import {
    areObjectsEqual,
    calculateObject,
    combineObjects
} from './objUtils.js';

let people = [
    { name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student' },
    { name: 'Mat', age: '21', location: 'New York', role: 'Student' },
    { name: 'Mtt', age: '19', location: 'New Jersey', role: 'Student' },
    { name: 'Greg', age: '26', location: 'New York', role: 'Student' },
    { name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher' }];

// sortAndFilter Tests
try {
    // Should Pass
    const sortAndFilterOne = sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Student');
    console.log('sortAndFilter passed successfully', sortAndFilterOne);
} catch (e) {
    console.error('sortAndFilter failed test case', e);
}


try {
    // Should Fail
    const sortAndFilterTwo = sortAndFilter(people, ['ssn', 'asc'], ['name', 'asc'], 'age', '22');
    console.log('sortAndFilter passed successfully', sortAndFilterTwo);
} catch (e) {
    console.error('sortAndFilter failed test case', e);
}

// merge Tests
try {
    // Should Pass
    const mergeOne = merge(["bar", 0, 1, [[[5, "pooso"]]]], [6, "buzz", ["fizz", 8]]);
    console.log('last passed successfully', mergeOne);
} catch (e) {
    console.error('last failed test case', e);
}

try {
    // Should Fail
    const mergeTwo = merge([])
    console.error('last did not error', mergeTwo);
} catch (e) {
    console.log('last failed successfully', e);
}

// matrixMultiply Tests
try {
    // Should Pass
    const matrixMultiplyOne = matrixMultiply([[2, 3], [3, 4], [4, 5]], [[1, 2, 1], [2, 2, 2]], [[3], [2], [1]]);
    console.log('remove([2, 3, 4], 1) passed successfully', matrixMultiplyOne);
} catch (e) {
    console.error('remove failed test case', e);
}

try {
    // Should Fail
    const matrixMultiplyTwo = matrixMultiply([[1, 2], [2, 2]]);
    console.log('remove did not error', matrixMultiplyTwo);
} catch (e) {
    console.error('remove failed successfully', e);
}



// palindromes Tests
try {
    // Should Pass
    const palindromesOne = palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope"]);
    console.log('range passed successfully', palindromesOne);
} catch (e) {
    console.error('range failed test case', e);
}

try {
    // Should Fail
    const palindromesTwo = palindromes("hey");
    console.log('range passed successfully', palindromesTwo);
} catch (e) {
    console.error('range failed test case', e);
}


// censorWords test
let badWords = ["bread", "chocolate", "pop"];

try {
    // Should Pass
    const censorWordsOne = censorWords("I like bread that has chocolate chips in it but I do not like lollipops", badWords);
    console.log('countElements passed successfully', censorWordsOne);
} catch (e) {
    console.error('countElements failed test case', e);
}

try {
    // Should Fail
    const censorWordsTwo = censorWords("     ", badWords);
    console.log('countElements passed successfully', censorWordsTwo);
} catch (e) {
    console.error('countElements failed test case', e);
}



// distance test

try {
    // Should Pass
    const distanceOne = distance("The brown fox jumped over the lazy dog", "fox", "dog");
    console.log('isEqual passed successfully', distanceOne);
} catch (e) {
    console.error('isEqual failed test case', e);
}

try {
    // Should Fail
    const distanceTwo = distance([], true)
    console.log('isEqual passed successfully', distanceTwo);
} catch (e) {
    console.error('isEqual failed test case', e);
}



// areObjectsEqual Test

const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };

try {
    // Should Pass
    const areObjectsEqualOne = areObjectsEqual(first, second, third);
    console.log('capitalize passed successfully', areObjectsEqualOne);
} catch (e) {
    console.error('capitalize failed test case', e);
}

try {
    // Should Fail
    const areObjectsEqualTwo = areObjectsEqual([1, 2, 3], [1, 2, 3]);
    console.log('capitalize passed successfully', areObjectsEqualTwo);
} catch (e) {
    console.error('capitalize failed test case', e);
}



// calculateObject Tests
try {
    // Should Pass
    const calculateObjectOne = calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]);
    console.log('repeat passed successfully', calculateObjectOne);
} catch (e) {
    console.error('repeat failed test case', e);
}

try {
    // Should Fail
    const calculateObjectTwo = calculateObject({ a: 'Hello', b: 7, c: false }, [(n => n * n)]);
    console.log('repeat passed successfully', calculateObjectTwo);
} catch (e) {
    console.error('repeat failed test case', e);
}


// combineObjects Test
try {
    // Should Pass
    const combineObjectsOne = combineObjects(
        { a: 3, b: 7, c: 5 },
        { d: 4, e: 9 },
        { a: 8, d: 2 }
    );
    console.log('countChars passed successfully', combineObjectsOne);
} catch (e) {
    console.error('countChars failed test case', e);
}

try {
    // Should Fail
    const combineObjectsTwo = combineObjects(
        { wow: 'crazy', super: 'duper' },
        false
    );
    console.log('countChars passed successfully', combineObjectsTwo);
} catch (e) {
    console.error('countChars failed test case', e);
}

