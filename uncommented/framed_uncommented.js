'use strict'

const [, , ...args] = process.argv;
const buildArrayOfWordLengths = wordArray => wordArray.map(word => word.length)
const determineLargestNumberInArray = wordLengthArray => Math.max(...wordLengthArray)
const buildStringOfAsterisks = longestWordLength => Array(longestWordLength + 5).join('*')
const buildWordRowsArray = ({wordArray, longestWordLength}) => wordArray.map(word => '* ' + word + Array(longestWordLength - word.length + 1).join(' ') + ' *' + '\n')
const buildStringFromArrayOfStrings = stringArray => stringArray.reduce((a, b) => a + b)
const printString = string => process.stdout.write(string + '\n')

const buildFramedWordArray = ({horiziontalDivider, wordRowsString}) => {
	const framedWordArray = []
	framedWordArray.push(horiziontalDivider)
	framedWordArray.push(wordRowsString)
	framedWordArray.push(horiziontalDivider)
	return framedWordArray
}

const runFramedProgram = wordArray => {
	const wordLengthArray = buildArrayOfWordLengths(wordArray) 
	const longestWordLength = determineLargestNumberInArray(wordLengthArray) 
	const horiziontalDivider = buildStringOfAsterisks(longestWordLength) + '\n' 
	const wordRowsArray = buildWordRowsArray({wordArray, longestWordLength}) 
	const wordRowsString = buildStringFromArrayOfStrings(wordRowsArray) 
	const framedWordArray = buildFramedWordArray({wordRowsString, horiziontalDivider}) 
	const framedWordString = buildStringFromArrayOfStrings(framedWordArray) 
	printString(framedWordString) 
}

runFramedProgram(args)