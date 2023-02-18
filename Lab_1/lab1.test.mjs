import * as lab1 from "./lab1.mjs";

// make 5 calls to questionOne
console.log(lab1.questionOne([5, 3, 10]));  // Returns and then outputs {'1152': false}
console.log(lab1.questionOne([2, 1, 2])); // Returns and then outputs {'17': true} 
console.log(lab1.questionOne([512, 1007, 17389])); //Returns and then outputs {'5259194599940': false}
console.log(lab1.questionOne([0, 14159, 785])); //Returns and then outputs {'2839041558304', false} 
console.log(lab1.questionOne([11, 4])); //Returns and then outputs {'1395': false}


// make 5 calls to questionTwo
console.log(lab1.questionTwo([1, 2, 4, 3])); //Returns and then outputs [false, 2, 3]
console.log(lab1.questionTwo([1, 2, 3, 4, 5, 6, 7]));  // Returns and then outputs [true] 
console.log(lab1.questionTwo([1, 2, 4, 3])); // Returns and then outputs [false, 2, 3]
console.log(lab1.questionTwo([10, 7, 6, 11])); //Returns and then outputs [false, 0, 1]
console.log(lab1.questionTwo([28, 45, 1002, 10000])); //Returns and then outputs [true]


// make 5 calls to questionThree
console.log(lab1.questionThree({ a: 1, b: 2, c: 3 }, { c: 10, a: 20, b: 30 })); //Returns and then outputs {a: true, b:true, c:true}
console.log(lab1.questionThree({ a: 1, b: 2, c: 3, d: 4 }, { f: 10, b: 20, e: 30, d: 40, c: 50, a: 60 })); // Returns and then outputs {a:true, b:true, c:true, d:true, e:false, f:false} 
console.log(lab1.questionThree({ foo: "I'm foo", bar: "I'm bar", fizz: "I'm fizz", buzz: "I'm buzz" }, { fizz: "I'm not buzz", foo: "I'm not bar", buzz: "I'm not fizz", bar: "I'm not foo", c: 50, a: 60 })); // Returns and then outputs {foo:true, bar: true, fizz: true, buzz: true, c:false, a:false}
console.log(lab1.questionThree({ a: 10, b: 20, c: 30, d: 40, e: 50, f: 60 }, { a: 1, b: 2, c: 3 })); //Returns and then outputs {a: true, b: true, c:true, d: false, e: false, f: false}
console.log(lab1.questionThree({ a: 10, c: 30, d: 40, e: 50, f: 60 }, { a: 1, b: 2, c: 3, u: 9 })); //Returns and then outputs {a: true, c: true, d: false, e: false, f: false b: false, u:false}


// make 5 calls to questionFour
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)); //Returns and then outputs [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]
console.log(lab1.questionFour(`Jackson,Herro,cs574
Amy,Anderson,BIA660
Song,Han,cs590`)); //Returns and then outputs [["Jackson", "Herro", "cs574"],["Amy", "Anderson", "BIA660"], ["Song", "Han", "cs590"]]
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)); //Returns and then outputs [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)); //Returns and then outputs [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)); //Returns and then outputs [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]