var x = 15;

{
    let x = 5;
    console.log(x);

    // x = 6;
    // console.log(x); --> through error.
}
console.log(x);





var x = function (x, y) {
    return x + y;
};



const x = (x, y) => {
    return x + y;
};

console.log(x(20, 90));



const q1 = ["Jan", "Feb", "March"];
const q2 = ["April", "May", "June"];
const q3 = ["July", "Aug", "Sept"];
const q4 = ["Oct", "Nov", "Dec"];

const year = [...q1, ...q2, ...q3, ...q4];
console.log(year);





const myNumbers = [25, 67, 56, 22, -19];

let maxValue = Math.min(...myNumbers);
console.log(maxValue);

let sum = 0;
for (let num of myNumbers) {
    sum = sum + num;
}
console.log(sum);



const fruits = new Map([["apples", 500], ["bananas", 300], ["Grapes", 399]]);

console.log(fruits);
console.log(fruits.get("Grapes"));


const letters = new Set();

letters.add("a");
letters.add("b");
letters.add("c");
letters.add("d");
letters.add("e");
letters.add("a");      It won't print repeated elements
letters.add("d");

console.log(letters);







class car {
    constructor(name, mfgYear) {
        this.name = name;
        this.mfgYear = mfgYear;
    }
}

const myCar1 = new car("Mercedes", 2020);
const myCar2 = new car("Porsche", 2023);
console.log(myCar1);
console.log(myCar2);




const myFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("This is inside Promise");
            resolve();
        }, 2000);
    });
};

myFunction()
    .then(() => {
        console.log("Resolved :)");
    })
    .catch(() => {
        console.log("Rejected :(");
    });


const person = {
    FirstName: "Saqib",
    LastName: "Dar",
    age: "20",
    eyecolor: "Brown"
};

let id = ("id");
person[id] = 12218938;

console.log(person);





const addNumbers = (...args) => {
    let sum = 0;
    for (let arg of args) {
        sum += arg;
    }
    return sum;
};


console.log(addNumbers(10, 12, 3, 4, 5, 76));