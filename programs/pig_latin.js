'use strict'

// Using spread operator to pull user input from process.argv
// First two commas are node execution point and file execution point
// respectivley, neither of which are used in this program

const [ , , ...args] = process.argv;

// accepts an array of words and returns an array of the same words translated into pig latin

const buildArrayOfPigLatinWord = wordArray => 
	wordArray.map(word => {
		const firstLetterOfWordAsArray = word.split('').slice(0, 1) // stores the first letter of the word in an array
		const remainderOfWordAsArray = word.split('').slice(1) // stores all letters after the first in an array
		const reorderedWordAsArray = remainderOfWordAsArray.concat(firstLetterOfWordAsArray) // concatenates the first letter to the end of the remainder word array
		const reorderedWordAsString = reorderedWordAsArray.reduce((a, b) => a + b) // reduces reordered word array to a single string
		return reorderedWordAsString + 'ay' // adds 'ay' to end of string and returns string
	})

// accpets an array of strings and returns a single string, with each original string seperated by a space

const buildStringFromArrayOfStrings = stringArray => stringArray.reduce((a, b) => a + ' ' + b) // Concatenates two strings, seperated by a space

// accepts a string and prints it to the terminal

const printString = string => process.stdout.write(string + '\n')

// accepts an array of words and prints out the original set of words followed by the words 
// translated into pig latin

const runPigLatinTranslator = wordArray => {
	const pigLatinWordArray = buildArrayOfPigLatinWord(wordArray) // builds the pig latin words array
	const pigLatinWordString = buildStringFromArrayOfStrings(pigLatinWordArray) // converts the pig latin word array into a string
	const originalWordString = buildStringFromArrayOfStrings(wordArray) // converts the original word array into a string
	printString(originalWordString) // prints the original word string
	printString(pigLatinWordString) // prints the pig latin word string
}

runPigLatinTranslator(args)