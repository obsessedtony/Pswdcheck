"use sctrict"

/** Класс. Анализирует пароль на наличие разных типов символов.
 * Адекватно работает, если есть только:
 * 1. Cимволы английского алфавита,
 * 2. Цифры
 * 3. Специальные символы.
 */
function PasswordBasicInfo(pass) {

	var self = this;
	var passwordValue = pass;
	var passwordLength = pass.length;


	this.lengthErrorCode = -1; // если не 0, то длина не подходит

	this.fMore14 = false;
	this.fMore21 = false;
	this.fDigit = false;
	this.fLowerLetter = false;
	this.fUpperLetter = false;
	this.fSpecialCharacters = false;
	this.symbolsTypeAmount = 0; // общее кол-во символов различного типа

	/** Получить длину пароля */
	this.GetLength = function () {
		return passwordLength;
	}

	/** Получить значение пароля */
	this.GetPasswordValue = function (pass) {
		return passwordValue;
	}

	/** Получить значение общего кол-во различных символов */
	this.GetSymbolsTypeAmount = function () {
		return self.symbolsTypeAmount;
	}



	/** Анализирует длину и ищет кол-во различных типов символов */
	this.Analize = function () {

		// Если длина не проходит критерии, завершаем проверку с кодом ошибки.
		self.lengthErrorCode = AnalizeLength();
		if (self.lengthErrorCode != 0) return -1;

		AnalizeSymbols(); // поиск кол-ва различных типов символов
		return 0;

	} // конец for



	/** Анализирует длину на допустимость и выставляет флаги */
	function AnalizeLength() {

		if (passwordLength < 1) {
			return -1;
		}
		if (passwordLength < 8) {
			return -8;
		}
		if (passwordLength > 32) {
			return 32;
		}

		if (passwordLength >= 14) {
			self.fMore14 = true;
		}
		if (passwordLength >= 21) {
			self.fMore21 = true;
		}

		return 0;
	}



	/** Анализируем на наличие разного типа символов и устанавливаем флаги. */
	function AnalizeSymbols() {

		/** Анализируем каждый символ и устанавливаем соответствующие флаги **/
		for (var i = 0; i < passwordLength; i++) {

			var char = passwordValue.charAt(i); // вытягиваем символ

			if (lowercaseLetters.indexOf(char) != -1) {
				self.fLowerLetter = true;
			}

			else if (uppercaseLetters.indexOf(char) != -1) {
				self.fUpperLetter = true;
			}

			else if (digits.indexOf(char) != -1) {
				self.fDigit = true;
			}

			else if (specialCharacters.indexOf(char) != -1) {
				self.fSpecialCharacters = true;
			}

		} // конец for

		/** Получаем сумму флагов */
		self.symbolsTypeAmount = self.fLowerLetter
										+ self.fUpperLetter
										+ self.fSpecialCharacters
										+ self.fDigit;
	} // конец функции Analize

} // конец класса

