var dictionary = {
	lettersSequences: ["abcdefghijklmnopqrstuvwxyz",
	"zyxwvutsrqponmlkjihgfedcba",
	"qwertyuiopasdfghjklzxcvbnm",
	"mnbvcxzlkjhgfdsapoiuytrewq",
	//"poiuytrewqlkjhgfdsamnbvcxz",
	/*"zxcvbnmasdfghjklqwertyuiop"*/],

	charactersSequences: ["~!@#$%^&*()-_+=",
	"=+_-)(*&^%$#@!~",
	"[];',./",
	"/.,';][",
	"{}:\"<>?",
	"?><\":}{"],

	digitsSequences: ["0123456789",
	"9876543210"],
};

/** Получить словарь для символа. */
function GetSymbolDictionary(characterType) {
	switch (characterType) {
		case symbolType.NUMBERS: return "0123456789"; break;
		case symbolType.LETTERS: return "abcdefghijklmnopqrstuvwxyz"; break;
		case symbolType.SYMBOLS: return "~!@#$%^&*()-_+=[];',./{}:\"<>?"; break;
		default: console.log("Can't find characterType in GetSymbolDictionary()"); return -1;
	}
}