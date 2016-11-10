'use strict'

const [ , , ...args] = process.argv;
const buildStringFromArrayOfStrings = stringArray => stringArray.reduce((a, b) => a + ' ' + b) 
const printString = string => process.stdout.write(string + '\n')

const buildArrayOfPigLatinWord = wordArray => 
	wordArray.map(word => {
		const firstLetterOfWordAsArray = word.split('').slice(0, 1) 
		const remainderOfWordAsArray = word.split('').slice(1) 
		const reorderedWordAsArray = remainderOfWordAsArray.concat(firstLetterOfWordAsArray) 
		const reorderedWordAsString = reorderedWordAsArray.reduce((a, b) => a + b) 
		return reorderedWordAsString + 'ay' 
	})
	
const runPigLatinTranslator = wordArray => {
	const pigLatinWordArray = buildArrayOfPigLatinWord(wordArray) 
	const pigLatinWordString = buildStringFromArrayOfStrings(pigLatinWordArray) 
	const originalWordString = buildStringFromArrayOfStrings(wordArray) 
	printString(originalWordString) 
	printString(pigLatinWordString) 
}

runPigLatinTranslator(args)