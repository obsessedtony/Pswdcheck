var dictionary = {
	lettersSequences: ["abcdefghijklmnopqrstuvwxyz",
	"zyxwvutsrqponmlkjihgfedcba",
	"qwertyuiopasdfghjklzxcvbnm",
	"mnbvcxzlkjhgfdsapoiuytrewq",
	"poiuytrewqlkjhgfdsamnbvcxz",
	"zxcvbnmasdfghjklqwertyuiop"],

	numberSequences: ["~!@#$%^&*()-_+=",
	"=+_-)(*&^%$#@!~",
	"[];',./",
	"/.,';][",
	"{}:\"<>?",
	"?><\":}{"],

	digitsSequence: "0123456789876543210",
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