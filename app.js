const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Helper function to check for prime numbers
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2, limit = Math.sqrt(n); i <= limit; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Helper function to check for perfect numbers
function isPerfect(n) {
  if (n <= 1) return false;
  let sum = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      sum += i;
      const complement = n / i;
      if (complement !== i && complement !== n) {
        sum += complement;
      }
    }
  }
  return sum === n;
}

// Helper function to check for Armstrong numbers
function isArmstrong(n) {
  const absoluteNumber = Math.abs(n);
  const str = absoluteNumber.toString();
  const power = str.length;
  
  // Exclude single-digit numbers
  if (power === 1) return false;

  const sum = str.split('').reduce((acc, digit) => 
    acc + Math.pow(parseInt(digit, 10), power), 0);
  return sum === absoluteNumber;
}

// Helper function to calculate the sum of digits
function digitSum(n) {
  const absoluteNumber = Math.abs(n); // Add this line
  return absoluteNumber.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

// Add this route BEFORE the /api/classify-number endpoint
app.get("/get", (req, res) => {
  console.log("Test endpoint hit!");
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Test endpoint working!");
});

app.get("/api/classify-number", async (req, res) => {
  const numParam = req.query.number;

  // Check if the number parameter is present
  if (numParam === undefined) {
    return res.status(400).json({ number: null, error: true });
  }

  // Check if the parameter is a string
  if (typeof numParam !== "string") {
    return res.status(400).json({ number: numParam, error: true });
  }

  // Validate the number parameter format (optional sign followed by digits)
  if (!/^[+-]?\d+$/.test(numParam)) {
    return res.status(400).json({ number: numParam, error: true });
  }

  const number = parseInt(numParam, 10);

  // Compute properties
  const prime = isPrime(number);
  const perfect = isPerfect(number);
  const armstrong = isArmstrong(number);
  const sumOfDigits = digitSum(number);
  const parity = number % 2 === 0 ? "even" : "odd";

  // Determine the properties array
  const properties = armstrong ? ["armstrong", parity] : [parity];

  // Fetch fun fact from Numbers API
  let funFact = "Could not retrieve fun fact.";
  try {
    const response = await axios.get(
      `http://numbersapi.com/${number}/math?json`
    );
    funFact = response.data.text || "No fun fact available.";
  } catch (error) {
    console.error("Error fetching fun fact:", error.message);
  }

  // Construct the response object
  const result = {
    number: number,
    is_prime: prime,
    is_perfect: perfect,
    properties: properties,
    digit_sum: sumOfDigits,
    fun_fact: funFact,
  };

  return res.status(200).json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
