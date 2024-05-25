// #1 : Create 'li' elements
const steps = ["one", "two", "three"];
const listTemplate = (step) => {
  return `<li>${step}</li>`
}
const stepsHtml = steps.map((item) => listTemplate(item))
document.querySelector("#myList").innerHTML = stepsHtml.join("")

// #2 : Convert Grade to Points
const grades = ['A', 'B', 'A']

const convertGradeToPoints = (letter) => {
  let points = 0;
  if (letter === 'A') {
    points = 4;
  } else if (letter === 'B') {
    points = 3;
  }
  return points;
}

const gradePoints = grades.map(convertGradeToPoints);
console.log(`Grade Points: ${gradePoints}`);

// #3 : Calculate GPA
const totalPoints = gradePoints.reduce((acum, current) => acum + current);
const gpa = totalPoints / gradePoints.length;
console.log(`Total Points: ${totalPoints}, GPA: ${gpa}`)

// #4 : Only fruit with more than 6 characters
const fruits = ["watermelon", "peach", "apple", "tomato", "grape"];
const fruitsLonger = fruits.filter((fruit) => fruit.length > 6);
console.log(`Fruits Available: ${fruits}`);
console.log(`Fruits with more than 6 characters: ${fruitsLonger.join(" - ")}`);

const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyNumberIndex = numbers.indexOf(luckyNumber);
const noLuckyNumber = 39;
const noLuckyNumberIndex = numbers.indexOf(noLuckyNumber);;

console.log(`Array of Numbers Available: ${numbers}`);
console.log(`Lucky Number: ${luckyNumber} -> Index in Array: ${luckyNumberIndex}`)
console.log(
  `NO Lucky Number: ${noLuckyNumber} -> Index in Array: ${noLuckyNumberIndex}`
);