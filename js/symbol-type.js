var symbolType = {
	NUMBERS: 0,
	LETTERS: 1,
	SYMBOLS: 2,
	OTHER: 3
};

/** Узнать к какому словарю принадлежит символ */
function FindSymbolType(symb) {

	if (!isNaN(parseInt(symb))) {
		return symbolType.NUMBERS;
	}

	if ("abcdefghijklmnopqrstuvwxyz".lastIndexOf(symb) != -1) {
		return symbolType.LETTERS;
	}

	if ("~!@#$%^&*()-_+=[];',./{}:\"<>?".lastIndexOf(symb) != -1) {
		return symbolType.SYMBOLS;
	}

	else {
		console.log("Fail to find the symbol type in FindSymbolType()");
		return symbolType.OTHER;
	}

}