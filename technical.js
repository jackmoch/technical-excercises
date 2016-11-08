'use strict'

const [, , ...args] = process.argv;

function returnUpcomingYear(userInput) {
	if (userInput.length === 0) {
		return getCurrentYear() + 1
	} else {
		return parseStringToNumber(userInput[0]) + 1
	}
}

function parseStringToNumber(string) {
	return parseInt(string, 10)
}

function getCurrentYear() {
	const currentDate = new Date()
	return currentDate.getFullYear()
}

function isLeapYear(year) {
	return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
}

function determineClosestLeapYear(year) {
	if(!isLeapYear(year)) {
		return determineClosestLeapYear(year + 1)
	} else {
		return year
	}
}

function determineNextLeapYear(year) {
	let nextLeapYear = year + 4
	if(!isLeapYear(nextLeapYear)) {
		return determineNextLeapYear(nextLeapYear)
	} else {
		return nextLeapYear
	}
}

function pushYearToLeapYearArray(year, leapYearArray) {
	leapYearArray.push(year)
	return leapYearArray
}

function determineWhenToPrint(year, leapYearArray = []) {
	if(pushYearToLeapYearArray(year, leapYearArray).length !== 20) {
		let nextLeapYear = determineNextLeapYear(year)
		determineWhenToPrint(nextLeapYear, leapYearArray)
	} else {
		printNextTwentyLeapYears(leapYearArray)
	}
}

function printNextTwentyLeapYears(leapYearArray) {
	console.log(leapYearArray)
}

function runLeapYearProgram(userInput) {
	const upcomingYear = returnUpcomingYear(userInput)
	const firstLeapYear = determineClosestLeapYear(upcomingYear)
	determineWhenToPrint(firstLeapYear)
}

runLeapYearProgram(args)