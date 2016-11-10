'use strict'

// Using spread operator to pull user input from process.argv
// First two commas are node execution point and file execution point
// respectivley, neither of which are used in this program

const [, , ...args] = process.argv;

// accepts an array of words as an argument and returns an array with the lengths of those words

const buildArrayOfWordLengths = wordArray => wordArray.map(word => word.length)

// accepts an array of integers and returns the largest integer in the array

const determineLargestNumberInArray = wordLengthArray => Math.max(...wordLengthArray)

// accepts an integer as it's argument and returns a string of asterisks whose length equals the integer + 4

const buildStringOfAsterisks = longestWordLength => Array(longestWordLength + 5).join('*')

// accepts a word array and the length of the longest word in the array as arguments and returns an array 
// comprised of those words delimited by an asterisk on each side and seperated by a new line character
// Each "word row" will be comprised of the same number of characters, with spaces accounting for differences in word length
// destructures arguments from object passed in so they can be passed in any order

const buildWordRowsArray = ({wordArray, longestWordLength}) => 
	wordArray.map(word => '* ' + word + Array(longestWordLength - word.length + 1).join(' ') + ' *' + '\n')

// builds a single string from an array of strings

const buildStringFromArrayOfStrings = stringArray => stringArray.reduce((a, b) => a + b)

// accepts a horizontal divider and a string of concatenated word rows and returns an array of those arguments
// destructures arguments from object passed in so they can be passed in any order

const buildFramedWordArray = ({horiziontalDivider, wordRowsString}) => {
	const framedWordArray = []
	framedWordArray.push(horiziontalDivider)
	framedWordArray.push(wordRowsString)
	framedWordArray.push(horiziontalDivider)
	return framedWordArray
}

// prints a string with an ending new line character

const printString = string => process.stdout.write(string + '\n')

// a single function that accepts an array of words and prints that array inside a frame of asterisks
// designed to serve as a single function to run the entire program allowing all helper functions to work largely independently of each other

const runFramedProgram = wordArray => {
	const wordLengthArray = buildArrayOfWordLengths(wordArray) // Builds an array used to determine the length of the longest word
	const longestWordLength = determineLargestNumberInArray(wordLengthArray) // Determines the length of the longest word
	const horiziontalDivider = buildStringOfAsterisks(longestWordLength) + '\n' // Builds a horizontal divider made of asterisks and adds a newline character to the end
	const wordRowsArray = buildWordRowsArray({wordArray, longestWordLength}) // Builds an array of the words input by the user, with each row in a frame
	const wordRowsString = buildStringFromArrayOfStrings(wordRowsArray) // Creates a string of the framed word rows
	const framedWordArray = buildFramedWordArray({wordRowsString, horiziontalDivider}) // Builds an array of framed word rows w/ horizontal dividers in first and last positions
	const framedWordString = buildStringFromArrayOfStrings(framedWordArray) // Converts the framed word array into a single string to be printed
	printString(framedWordString) // Prints the finished framedWordString
}

runFramedProgram(args)