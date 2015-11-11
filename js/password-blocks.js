"use strict"

/* Класс, в объекте которого будут содержаться все символьные подстроки.
 * Пример работы : 123asd444@@@ -> 123444 | asd | @@@ */
function PasswordBlocks() {

	var self = this;

	this.digitsSubstring = "";
	this.lettersSubstring = "";
	this.charactersSubstring = "";
	this.dictionaryType = null;

	/** Добавляем блок пароля к нужной подстроке */
	function AddToSubstring(block) {
		if (self.dictionaryType == null) {
			console.log("Не установлен тип словаря в AddToSubstring()");
			return;
		}
		//console.log("Подстрока к добавлению: " + tempSubstring);

		switch (self.dictionaryType) {
			case symbolType.NUMBERS: self.digitsSubstring += block; break;
			case symbolType.LETTERS: self.lettersSubstring += block; break;
			case symbolType.SYMBOLS: self.charactersSubstring += block; break;
			default: console.log("Ошибка в SetSymbolDictionary."); return -1;
		}

		//console.log("Цифровая подстрока: " + digitsSubstring);
		//console.log("Буквенная подстрока: " + lettersSubstring);
		//console.log("Символьная подстрока: " + charactersSubstring);
	}

	/** Разбивает пароль на блоки */
	this.MakeBlocks = function(password) {

		if (password.length < 1) {
			console.log("Empty password in MakeBlocks()");
			return -1;
		}

		// вырезаем пробелы
		password = password.replace(/\s+/g, '');


		/** Проходимся по всему паролю в выделяем блоки символов из разных словарей */
		for (var index = 0; index < password.length;) {
			// узнаем тип символа
			self.dictionaryType = FindSymbolType(password[index]);
			// получаем словарь соответствующий символу
			var dictionary = GetSymbolDictionary(self.dictionaryType);
			// console.log("Номер словаря: " + dictionaryType);
			// console.log("Словарь для символа «" + password[index] + "»:" + dictionary);

			var tempSubstring = "";

			while (dictionary.lastIndexOf(password[index]) != -1) {
				tempSubstring += password[index];
				index++;
			}

			AddToSubstring(tempSubstring);
		}

		console.log("Пароль быт разбит на блоки.\n" + self.GetBlocks());
	}

	/** Можно вызвать только после MakeBlocks() */
	this.GetBlocks = function() {
		var blocks = "";

		blocks = self.digitsSubstring != "" ? ("Цифры: " + self.digitsSubstring + "\n") : "";
		blocks +=	self.lettersSubstring != "" ? ("Буквы: " + self.lettersSubstring + "\n") : "";
		blocks +=	self.charactersSubstring != "" ? ("Специальные символы: " + self.charactersSubstring) : "";

		return blocks;
	}
}