var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var specialCharacters = "~`!@#$%^&*()-_+=";
var digits = "123456789";


function KeyUp() {
	/** Получаем значение пароля */
	var pass = document.getElementById("inputPass").value;

	/** Не пускаем русские символы */
	var reg = /[а-яА-ЯёЁ]/g;
	if (pass.search(reg) != -1) {
		document.getElementById("inputPass").value = pass.replace(reg, '');
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

	var userPassword = new Password(pass); // создаем объект
	userPassword.Analize();

	if(userPassword.lengthErrorCode != 0) {
		AlertMessage(userPassword.lengthErrorCode);
		return;
	}



	MakeFlagesFalse();
	ActivateProperties(userPassword);
	var length = userPassword.GetLength();
	var flagAmount = userPassword.GetSymbolsTypeAmount();

	if (flagAmount >= 4 && length >= 21) {
		SetRaiting("rate-5");
	}

	else if (flagAmount >= 4 && length >= 14) {
		SetRaiting("rate-4");
	}

	else if ((flagAmount >= 3 && length >= 14) ||
					(flagAmount >= 1 && length >= 21)) {
		SetRaiting("rate-3");
	}

	else if ((flagAmount >= 2 && length >= 8) ||
					(flagAmount >= 1 && length >= 14)) {
		SetRaiting("rate-2");
	}

	else if(flagAmount >= 1 && length >= 8) {
		SetRaiting("rate-1");
	}

}

function AlertMessage(code) {
	switch(code) {
		case -1: alert("Please, enter the password!"); break;
		case -8: alert("Password should have at least 8 symbols!"); break;
		case 32: alert("Password can't have more then 32 sybmols!"); break;
	}
}

/** Меняем цвет свойств, которые true. */
function ActivateProperties(userPassword) {
	if(userPassword.fMore14 == true) {
		SetClass("more-14-p", "active");
	}
	if(userPassword.fMore21 == true) {
		SetClass("more-21-p", "active");
	}
	if(userPassword.fDigit == true) {
		SetClass("digits-p", "active");
	}
	if(userPassword.fLowerLetter == true) {
		SetClass("lowercase-p", "active");
	}
	if(userPassword.fUpperLetter == true) {
		SetClass("uppercase-p", "active");
	}
	if(userPassword.fSpecialCharacters == true) {
		SetClass("special-char-p", "active");
	}
}

/*** Функция установки и сброса рейтинга ***/
function SetRaiting(rateClass) {
	// Двигаем спрайт, чтобы он соответсвовал оценке.
	SetClass("result-rate", rateClass);

}

/*** Установка класса через ID элемента ***/
function SetClass(tagID, className) {

	document.getElementById(tagID).className = className;

}
