require('dotenv').config({ path: '../.env' });
const myVariable = process.env.TEST;
if (!myVariable) {
  console.error('environment variable is missing or empty');
} else {
  console.log(myVariable)
}