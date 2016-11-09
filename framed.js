'use strict'

const [, , ...args] = process.argv;

let getWordLengths = (wordArray) => {
	return wordArray.map(word => {
		return word.length
	})
}

let getLongestWord = (wordLengthArray) => {
	return Math.max(...wordLengthArray)
}

let buildHorizontalDivider = (longestWordLength) => {
	return Array(longestWordLength + 3).join('*')
}

let runFramedProgram = (userInput) => {
	let wordArray = userInput
	let wordLengthArray = getWordLengths(userInput)
	let longestWordLength = getLongestWord(wordLengthArray)
	let horiziontalDividor buildHorizontalDivider(longestWordLength)
	// console.log(longestWordLength)
}

runFramedProgram(args)