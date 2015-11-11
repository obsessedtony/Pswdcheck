var passwordBasicInfo = null;
var repetitiveSymbols = null;
var passwordBlocks = null;
var keyboardSequences = null;


/** Функция полного анализа пароля.
 * 1. Узнает кол-во разных типов символов.
 * 2. Разбивает пароль на блоки.
 * 3. Находит повторки.
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
	repetitiveSymbols.FindRepetitiveSymbols();
	// записываем кол-во найденных повторок

	// repetitiveSymbols.FindRepetitiveSymbols(password);


	//console.log("Repetitive symbols amount: " + repetitiveSymbols.repetitiveSymbolsAmount);
	//console.log("Sequences: " + repetitiveSymbols.repetitiveSequences);


	keyboardSequences = new KeyboardSequences();
	keyboardSequences.FindTemplateSequences();

	passwordBasicInfo.templateSymbolsAmount = keyboardSequences.templateSymbolsCounter + repetitiveSymbols.repetitiveSymbolsAmount;
}













