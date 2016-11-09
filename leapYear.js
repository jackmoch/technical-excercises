'use strict'

// Using spread operator to pull user input from process.argv
// First two commas are node execution point and file execution point
// respectivley, neither of which are used in this program

const [ , , ...args] = process.argv;

// Checks how many arguments were passed and gathers current year
// or renders usage message if arguments passed incorrectly
// Both returns increment year by 1 to avoid including current year in list

const handleUserInput = (userInput) => {
	if (userInput.length === 0) {
		return getCurrentYear() + 1 // Returns getCurrentYear function if no year is passed as an argument
	} else if (userInput.length === 1) {
		return parseStringToNumber(userInput[0]) + 1 // Returns parseStringToNumber with first argument if an argument is passed
	} else {
		process.stdout.write('Usage: program [-n number] \n') // Indicates to call program and pass optional argument as a number
		process.exit() // Ends node program
	}
}

// A function that accepts a string as an argument and returns it as an integer

const parseStringToNumber = (string) => {
	return parseInt(string, 10)
}

// A function that gets the current Date using the Javascript new Date() method
// and returns the current year using the getFullYear method

const getCurrentYear = () => {
	const currentDate = new Date()
	return currentDate.getFullYear()
}

// A function that accepts a year as an argument, returns true if it is a leap year
// or returns false if it is not a leap year

const isLeapYear = (year) => {
	return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
}

// A function that accepts a year and returns the closest future leap year

const determineClosestFutureLeapYear = (year) => {
	if(!isLeapYear(year)) {
		return determineClosestFutureLeapYear(year + 1) // If the year passed as an argument is not a leap year, increment and call recursively 
	} else {
		return year // If the year passed as an argument is a leap year return the year
	}
}

// A function that accepts a leap year an argument and returns the upcoming leap year

const determineNextLeapYearGivenCurrentLeapYear = (leapYear) => {
	const potentialNextLeapYear = leapYear + 4 // Declares the potential next leap year by incrementing the passed year by four
	if(!isLeapYear(potentialNextLeapYear)) {
		return determineNextLeapYearGivenCurrentLeapYear(potentialNextLeapYear) // If the potentialLeapYear is not a leap year, the function is called again
	} else {
		return potentialNextLeapYear // If the potentialLeapYear is indeed a leap year it is returned
	}
}

// A function that accepts a leap year and a leap year array, pushes the leap year into the leap year array,
// and returns the leap year array

const pushLeapYearToLeapYearArray = (leapYear, leapYearArray) => {
	leapYearArray.push(leapYear)
	return leapYearArray
}

// A function that accpets a leap year and a leap year array and builds a leap year array with a lenght of 20

const buildLeapYearArray = (currentLeapYear, leapYearArray = []) => {
	if(pushLeapYearToLeapYearArray(currentLeapYear, leapYearArray).length !== 20) { // Checks if the array returned from calling the pushToLeapYearArray function has a length 																																										 of 20
		const nextLeapYear = determineNextLeapYearGivenCurrentLeapYear(currentLeapYear) // Defines the next leap year using the determineNextLeapYearGivenCurrentLeapYear function
		return buildLeapYearArray(nextLeapYear, leapYearArray) // Calls itself recursively until the leap year array has a length of 20
	} else {
		return leapYearArray // If the leap year array has a length of 20 it is returned from the buildLeapYearArray function
	}
}

// A function that accepts an array of integers as an argument and returns an array of strings

const convertArrayOfIntegersToArrayOfStrings = (arrayOfIntegers) => {
	return arrayOfIntegers.map((integer) => {
		return integer.toString()
	})
}

// A function that builds a single string from an array of strings

const buildStringFromArrayOfStrings = (stringArray) => {
	return stringArray.reduce((a, b) => {
		return a + '\n' + b // Concatenates two strings, seperated by a new line character
	})
}

// A function that prints a string with an ending new line character

const printString = (string) => {
	process.stdout.write(string + '\n')
}

// A function accepts a user input and runs a program that prints out the next twenty leap years
// based on the the user's input

const runLeapYearProgram = (userInput) => {
	const upcomingYear = handleUserInput(userInput) // Determines the upcoming year, based on the user's input
	const firstLeapYear = determineClosestFutureLeapYear(upcomingYear) // Determines the first leap year in the leap year array based on the upcoming year
	const leapYearIntegerArray = buildLeapYearArray(firstLeapYear) // Creates an array of leap years as integers using the buildLeapYearArray function with the first leap year 																																	of the array as its initial argument
	const leapYearStringArray = convertArrayOfIntegersToArrayOfStrings(leapYearIntegerArray) // Converts the array of leap year integers to an array of leap year strings
 	const leapYearString = buildStringFromArrayOfStrings(leapYearStringArray) // Converts an array of leap year strings into a single string, with leap years seperated by a 																																								 newline character
	printString(leapYearString) // Prints the leap year string
}

// Initiates the Leap Year Program

runLeapYearProgram(args)