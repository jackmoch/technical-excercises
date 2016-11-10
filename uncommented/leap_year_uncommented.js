'use strict'

const [ , , ...args] = process.argv
const parseStringToNumber = string => parseInt(string, 10)
const getCurrentYear = () => new Date().getFullYear()
const isLeapYear = year => ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
const convertArrayOfIntegersToArrayOfStrings = arrayOfIntegers => arrayOfIntegers.map(integer => integer.toString())
const buildStringFromArrayOfStrings = stringArray => stringArray.reduce((a, b) => a + '\n' + b)
const printString = string => process.stdout.write(string + '\n')

const handleUserInput = (userInput) => {
	if (userInput.length === 0) {
		return getCurrentYear() + 1 
	} else if (userInput.length === 1) {
		return parseStringToNumber(userInput[0]) + 1 
	} else {
		process.stdout.write('Usage: program [-n number] \n') 
		process.exit() 
	}
}

const determineClosestFutureLeapYear = year => {
	if(!isLeapYear(year)) {
		return determineClosestFutureLeapYear(year + 1) 
	} else {
		return year 
	}
}

const determineNextLeapYearGivenCurrentLeapYear = leapYear => {
	const potentialNextLeapYear = leapYear + 4 
	if(!isLeapYear(potentialNextLeapYear)) {
		return determineNextLeapYearGivenCurrentLeapYear(potentialNextLeapYear)
	} else {
		return potentialNextLeapYear 
	}
}

const pushLeapYearToLeapYearArray = ({currentLeapYear, leapYearArray}) => {
	leapYearArray.push(currentLeapYear)
	return leapYearArray
}

const buildLeapYearArray = (currentLeapYear, leapYearArray = []) => {
	if(pushLeapYearToLeapYearArray({currentLeapYear, leapYearArray}).length !== 20) { 
		const nextLeapYear = determineNextLeapYearGivenCurrentLeapYear(currentLeapYear)
		return buildLeapYearArray(nextLeapYear, leapYearArray) 
	} else {
		return leapYearArray 
	}
}

const runLeapYearProgram = userInput => {
	const upcomingYear = handleUserInput(userInput) 
	const firstLeapYear = determineClosestFutureLeapYear(upcomingYear)
	const leapYearIntegerArray = buildLeapYearArray(firstLeapYear) 
	const leapYearStringArray = convertArrayOfIntegersToArrayOfStrings(leapYearIntegerArray)
 	const leapYearString = buildStringFromArrayOfStrings(leapYearStringArray)
	printString(leapYearString) 
}

runLeapYearProgram(args)