/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const areObjectsEqual = (...args) => {

      for (let test of args) {
            if (Array.isArray(test)) {
                  throw new Error("That input should be a proper type (an Object)");
                  //That is proper type (an Object). If not, throw an error. 
            }

            else if (typeof test !== "object") {
                  throw new Error("That input exists and is of proper type (an Object)");
                  //That input exists. If not, throw an error. 
            }
      }

      if (args.length < 2) {
            throw new Error("There should be at least two objects passed into the function");
            //There are at least two objects passed into the function, if not, throw an error
      }

      const object_versus = (obj1, obj2) => {
            // Check that both objects have the same number of keys
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                  return false;
            }

            // Check that all keys in obj1 are present in obj2, and that their values are equal
            for (let key in obj1) {
                  if ((key in obj2) !== true) {
                        return false;
                  }
                  else if (equal_test(obj1[key], obj2[key]) !== true) {
                        return false;
                  }
            }

            return true;
      };

      const equal_test = (case1, case2) => {
            if (typeof case1 === "object" && typeof case2 === "object") {
                  return object_versus(case1, case2);
                  //special case
                  //Using recursion is the best way to solve this one.
            }

            return case1 === case2;
            // normal case
      };

      for (let i = 0; i < args.length - 1; i++) {
            // objects compare
            for (let m = i + 1; m < args.length; m++) {
                  if (object_versus(args[i], args[m]) !== true) {
                        return false;
                  }
            }
      }

      return true;
};






let calculateObject = (object, funcs) => {

      //condition below

      if (object === null) {
            throw new Error('That the object shoulde exists and is of proper type (an object)');
            //That the object exists and is of proper type (an object).  If not, throw an error. 
      }
      else if (typeof object !== 'object') {
            throw new Error('That the object shoulde exists and is of proper type (an object)');
            //That the object exists and is of proper type (an object).  If not, throw an error. 
      }
      else if (Array.isArray(object)) {
            throw new Error('That the object shoulde exists and is of proper type (an object)');
            //That the object exists and is of proper type (an object).  If not, throw an error. 
      }
      else if (Array.isArray(funcs) !== true) {
            throw new Error('That funcs should exists and is of proper type (an array).');
            //That funcs exists and is of proper type (an array). If not, throw an error. 
      }

      const values = Object.values(object);

      for (let i = 0; i < values.length; i++) {
            const value = values[i];

            if (typeof value !== 'number') {
                  throw new Error('That the object values should be all numbers (positive, negative, decimal)');
                  //That the object values are all numbers (positive, negative, decimal).  If not, throw an error.
            }
      }

      if (funcs.length === 0) {
            throw new Error('Funcs parameter must contain at least one function.');
            //That the funcs array has at least one element and that the elements are of proper type (functions). If not, throw an error.
      }

      else {
            for (let i = 0; i < funcs.length; i++) {
                  if (typeof funcs[i] !== 'function') {
                        throw new Error('Funcs parameter must contain only functions.');
                        //That the funcs array has at least one element and that the elements are of proper type (functions). If not, throw an error.
                  }
            }
      }

      //condition over 
      //function below

      let input = object;
      let final_result = {};


      for (let i = 0; i < funcs.length; i++) {

            const item = funcs[i];
            const output = {};

            for (const [key, value] of Object.entries(input)) {
                  const num = Number(value);
                  if (isNaN(num)) {
                        //Not a Number
                        throw new Error('That the object values are all numbers (positive, negative, decimal)');
                        //That the object values are all numbers (positive, negative, decimal).  If not, throw an error.
                  }
                  output[key] = item(num).toFixed(2);
                  //Note, on the result, please use the toFixed(2) function to only display 2 decimal places rounded.
            }

            final_result = output;
            input = output;
      }

      return final_result;
};






let combineObjects = (...args) => {

      if (args.length < 2) {
            throw new Error('That args should has at least two objects');
            //That args has at least two objects.  If not, throw an error
      }

      for (const obj of args) {
            if (typeof obj !== 'object') {
                  throw new Error('That each object in args should be a proper type (an object), has at least 1 key');
                  //That each object in args is of proper type (an object), has at least 1 key.  If not, throw an error.
            }
            else if (obj === null) {
                  throw new Error('That each object in args should be a proper type (an object), has at least 1 key');
                  //That each object in args is of proper type (an object), has at least 1 key.  If not, throw an error.
            }
            else if (Object.keys(obj).length === 0) {
                  throw new Error('That each object in args should be a proper type (an object), has at least 1 key');
                  //That each object in args is of proper type (an object), has at least 1 key.  If not, throw an error.
            }
      }


      const final_result = {};
      const Counting = {};
      const first_obj = args[0];


      for (const key of Object.keys(first_obj)) {

            Counting[key] = 1;
            final_result[key] = first_obj[key];

      }

      for (let i = 1; i < args.length; i++) {

            const obj = args[i];

            for (const key of Object.keys(obj)) {
                  if (Counting[key]) {
                        continue;
                        // Skip keys that have already been added
                  }

                  let found = false;
                  for (let j = 0; j < i; j++) {

                        const last_item = args[j];
                        if (last_item.hasOwnProperty(key)) {

                              // Key found in previous object case
                              Counting[key] = 1;
                              final_result[key] = last_item[key];
                              found = true;
                              break;
                        }
                  }
                  if (found === false) {

                        // Key not found in previous object case
                        Counting[key] = 1;
                        final_result[key] = obj[key];
                  }
            }
      }

      return final_result;
};

export {
      areObjectsEqual,
      calculateObject,
      combineObjects
};



