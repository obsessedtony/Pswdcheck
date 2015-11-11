var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var specialCharacters = "~`!@#$%^&*()-_+=";
var digits = "123456789";


function KeyUp() {
	/** Получаем значение пароля */
	var pass = document.getElementById("inputPass").value;

	// не пускаем русские символы
	var reg1 = /[а-яА-ЯёЁ]/g;
	if (pass.search(reg1) != -1) {
		document.getElementById("inputPass").value = pass.replace(reg1, '');
	}

	// вырезаем пробелы
	var reg2 = /\s+/g;
	if (pass.search(reg2) != -1) {
		document.getElementById("inputPass").value = pass.replace(reg2, '');
	}

	/** Обновляем кол-во символов */
	document.getElementById("pswd-length").innerHTML = pass.length;
}

function CheckClick(e) {

	ResetFlags();
	ResetRaiting();

	var pass = document.getElementById("inputPass").value;
	CheckReliability(pass);

}



/*** ОСНОВНАЯ ФУНКЦИЯ. УСТАНАВЛИВАЕТ ФЛАГИ И РЕЙТИНГ. ***/
function CheckReliability(pass) {

	AnalizePassword(pass);


	if(passwordBasicInfo.lengthErrorCode != 0) {
		AlertMessage(passwordBasicInfo.lengthErrorCode);
		return;
	}

	MakeFlagesFalse();
	ActivateProperties(passwordBasicInfo);

	var length = passwordBasicInfo.GetLength();
	var flagAmount = passwordBasicInfo.GetSymbolsTypeAmount();

	CalculateRating(flagAmount, length);
}

function ShowAdditionalInfo() {
		if(document.getElementById("result-rate").className == "rate-0") {
			alert("Сначала введите пароль!");
			return;
		}
		var message = "Шаблонные клавиатурные последовательности: " + keyboardSequences.templateSequences +
		"\nОбщее кол-во символов в клавиатурных последовательностях: " + keyboardSequences.templateSymbolsCounter +
		"\nПроцентное соотношение: " + keyboardSequences.GetStatistic()  +
		"\n\nПоследовательности повторяющихся символов: " + repetitiveSymbols.repetitiveSequences +
		"\nОбщее кол-во повторяющихся символов: " + repetitiveSymbols.repetitiveSymbolsAmount + "\n" +
		"\nПроцентное соотношение: " + repetitiveSymbols.GetStatistic();

		alert(message);
}



function AlertMessage(code) {
	switch(code) {
		case -1: alert("Please, enter the password!"); break;
		case -8: alert("Password should have at least 8 symbols!"); break;
		case 32: alert("Password can't have more then 32 sybmols!"); break;
	}
}

/** Функция. Вычисляет рейтинг.
 * Устанавливает класс в HTML с помощью SetRating().
 * Используется после AnalizePassword().
 */
function CalculateRating(flagAmount, length) {
	passwordBasicInfo.GetStatistic();
	if (passwordBasicInfo.templateSymbolsStatistic < 10 &&
			flagAmount >= 4 && length >= 21) {
		SetRaiting("rate-5");
	}

	else if (passwordBasicInfo.templateSymbolsStatistic < 20 &&
			flagAmount >= 4 && length >= 14) {
		SetRaiting("rate-4");
	}

	else if (passwordBasicInfo.templateSymbolsStatistic < 30 &&
					((flagAmount >= 3 && length >= 14) ||
					(flagAmount == 2 && length >= 21)) ) {
		SetRaiting("rate-3");
	}

	else if (passwordBasicInfo.templateSymbolsStatistic < 70 &&
					((flagAmount >= 2 && length >= 8) ||
					(flagAmount >= 1 && length >= 14)) ) {
		SetRaiting("rate-2");
	}

	else if(passwordBasicInfo.templateSymbolsStatistic >= 70 &&
					(flagAmount >= 1 && length >= 8)) {
		SetRaiting("rate-1");
	}
}


/* Функция. Активирует свойств в HTML.
 * Меняет значение классов с помощью SetClass().
 * Используется после AnalizePassword().
 */
function ActivateProperties(passwordBasicInfo) {

	if(keyboardSequences.templateSymbolsCounter == 0) {
		SetClass("conventional-symbols-p", "active");
	}

	if(repetitiveSymbols.repetitiveSymbolsAmount == 0) {
		SetClass("repetitive-symbols-p", "active");
	}

	if(passwordBasicInfo.fMore14 == true) {
		SetClass("more-14-p", "active");
	}
	if(passwordBasicInfo.fMore21 == true) {
		SetClass("more-21-p", "active");
	}
	if(passwordBasicInfo.fDigit == true) {
		SetClass("digits-p", "active");
	}
	if(passwordBasicInfo.fLowerLetter == true) {
		SetClass("lowercase-p", "active");
	}
	if(passwordBasicInfo.fUpperLetter == true) {
		SetClass("uppercase-p", "active");
	}
	if(passwordBasicInfo.fSpecialCharacters == true) {
		SetClass("special-char-p", "active");
	}




}

/* Функция. Установка и сброс рейтинга.
 * Двигает спрайт, с помощью установки класса.
*/
function SetRaiting(rateClass) {
	SetClass("result-rate", rateClass);
}

/* Функция. Установка класса через ID элемента */
function SetClass(tagID, className) {
	document.getElementById(tagID).className = className;
}
