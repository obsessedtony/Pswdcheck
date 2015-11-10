var passwordBasicInfo = null;
var repetitiveSymbols = null;
var passwordBlocks = null;


/** Функция полного анализа пароля.
 * 1. Узнает кол-во разных типов символов.
 * 2. Находит повторки.
 * 3. Разбивает пароль на блоки.
 * 5. Находит шаблонные последовательности.
 * 6. Оценивает стойкость на основые вышеперечисленных результатов.
 * Адекватно работает, только если в пароле нет пробелов.
 * Иначе вырезает их сама и продолжает работу.
 */
function AnalizePassword(password) {

	if(password.length < 8) {
		console.log("Less then 8 symbols in the AnalizePassword()");
		return -8;
	}

	// вырезаем пробелы
	password = password.replace(/\s+/g, '');


	// 1. Анализируем на вхождения разного рода символов.
	// Внутри объекта будут установленные флаги.
	passwordBasicInfo = new PasswordBasicInfo(password);
	passwordBasicInfo.Analize();

	// Для дальнеших проверок, нам необходимо привести пароль к одному регистру.
	password = password.toLowerCase();

	// 2. Разбиваем пароль на блоки для удобства следующей проверки.
	passwordBlocks = new PasswordBlocks();
	passwordBlocks.MakeBlocks(password);
	passwordBlocks.GetBlocks();

	// 3. Анализируем на повторки каждый блок.
	// Внутри объекта будет число повторок.
	repetitiveSymbols = new RepetitiveSymbols();
	// repetitiveSymbols.FindRepetitiveSymbols(password);

	if(passwordBlocks.digitsSubstring != "") {
		repetitiveSymbols.FindRepetitiveSymbols(passwordBlocks.digitsSubstring);
	}

	if(passwordBlocks.lettersSubstring != "") {
		repetitiveSymbols.FindRepetitiveSymbols(passwordBlocks.lettersSubstring);
	}

	if(passwordBlocks.charactersSubstring != "") {
		repetitiveSymbols.FindRepetitiveSymbols(passwordBlocks.charactersSubstring);
	}

	console.log("Repetitive symbols amount: " + self.repetitiveSymbolsAmount);
	console.log("Sequences: " + self.repetitiveSequences);







	// ––———––———––———––——— Все, что ниже - к пересмотру



// 	digitsSubstring.trim();
// 	lettersSubstring.trim();
// 	charactersSubstring.trim();
//
// 	if(digitsSubstring != "") {
// 		AnalizeSubstring(digitsSubstring, digitsSequence);
// 	}
//
// 	if(lettersSubstring != "") {
// 		AnalizeSubstring(lettersSubstring, lettersSequence);
// 	}
//
// 	if(charactersSubstring != "") {
// 		AnalizeSubstring(lettersSubstring, lettersSequence);
// 	}
}




function AnalizeSubstring(substring, sequence) {
	substring.trim();
	if (substring.length < 3) return;

	var blocks = substring.split(" ");
	var dictionary = "";
	var templatedSequence = "";
	var repetitiveBlocks = "";

	for (var i = 0; i < sequence.length; i++) {
		dictionary += sequence[i];
	}

	// console.log(blocks);
	// console.log(dictionary);

	for (var index = 0; index < blocks.length; index++) {
		if (blocks[index].length < 1) continue;
		var block = blocks[index];

		repetitiveBlocks += FindRepetitiveSymbols(block) + " ";

		if (dictionary.lastIndexOf(blocks[index]) != -1) {
			templatedSequence += blocks[index] + " ";
		}

	}

	if(repetitiveBlocks != "") console.log(repetitiveBlocks + "повторки");
	if(templatedSequence != "") console.log(templatedSequence, " – последовательная комбинация");

}












