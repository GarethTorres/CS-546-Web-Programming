export const questionOne = (arr) => {

  let sum_the_cube = 0;

  for (let m = 0; m < arr.length; m++) {
    sum_the_cube += arr[m] * arr[m] * arr[m];
    //calculate the cube
  };

  let prime_identify = true;

  if (sum_the_cube <= 1) {
    prime_identify = false;
    //sum of the cube <= 1 means is not prime
  }
  else {
    for (let n = 2; n < Math.sqrt(sum_the_cube); n++) {
      if (sum_the_cube % n === 0)
        prime_identify = false;
    }
  }
  return { [sum_the_cube]: prime_identify };//return result
};

export const questionTwo = (numArray) => {

  let sort_identify = true;
  let beginning = 0;
  let ending = 0;

  for (let m = 0; m < numArray.length - 1; m++) {
    //find the fisrt number which is not sorted from the beginning of the array
    if (numArray[m] > numArray[m + 1]) {
      sort_identify = false;
      beginning = m;
      break;
    }
  }

  if (sort_identify === false) {
    for (let n = numArray.length - 1; n >= 0; n--) {
      //find the last number which is not sorted from the ending of the array
      if (numArray[n] < numArray[n - 1]) {
        ending = n;
        break;
      }
    }
  }

  if (sort_identify === true) {
    return [true];
  } else {
    return [false, beginning, ending];//return result
  }
};

export const questionThree = (obj1, obj2) => {

  let output = {};

  for (let key in obj1) {
    output[key] = (key in obj2);
  }

  for (let key in obj2) {
    if (output.hasOwnProperty(key) === false) {
      //use built-in method .hasOwnProperty to determine if the key in the obj2 appears in obj1
      output[key] = false;
    }
  }
  return output; //return result
};

export const questionFour = (string) => {

  let output = string.split('\n');

  for (let m = 0; m < output.length; m++) {
    output[m] = output[m].split(',');
    //use built-in method .split to convert a comma-separated value (CSV) string to an array of arrays where a new line in the string indicates a new row in the array. 
  }
  return output;//return result
}

export const studentInfo = {
  firstName: 'Guizhi',
  lastName: 'Xu',
  studentId: '20008770'
};
