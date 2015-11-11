"use strict"

/** Класс.
 * Объект позволяет найти повторяющеимся последовательности символов.
 * Считает общую сумму повторок и хранит последовательности. */
function RepetitiveSymbols() {

	/** Открытые переменные */
	this.repetitiveSequences = "";
	this.repetitiveSymbolsAmount = 0;

	// Возвращает процентное соотношение повторяющихся символов.
	this.GetStatistic = function () {
		return Math.round(self.repetitiveSymbolsAmount / passwordBasicInfo.GetLength() * 100);
	}

	/** Закрытые переменные */
	var self = this; // замыкание

	/** Ищет повторяющеися последовательности.
 * Для корректной работы счетчика,
 * нужно чтобы функция использовалась
 * на блоке текста только 1 раз.
 */



	/** Функция. Находит повторяющеися символы во всех блоках.
	 * Адекватно работает, только когда пароль разбит по блокам.
	 * Обращается к объекту passwordBlocks, чтобы получить блоки.
	*/
	this.FindRepetitiveSymbols =  function() {
		if (passwordBlocks.digitsSubstring != "") {
			AnalizeBlock(passwordBlocks.digitsSubstring);
		}

		if (passwordBlocks.lettersSubstring != "") {
			AnalizeBlock(passwordBlocks.lettersSubstring);
		}

		if (passwordBlocks.charactersSubstring != "") {
			AnalizeBlock(passwordBlocks.charactersSubstring);
		}

		passwordBasicInfo.templateSymbolsAmount += self.repetitiveSymbolsAmount;

		console.log("\nПоследовательности повторяющихся символов: " + self.repetitiveSequences + "\n");
		console.log("Общее кол-во повторяющихся символов: " + self.repetitiveSymbolsAmount + "\n");
		console.log("Процентное соотношение: " + self.GetStatistic() + "%\n");
	}

	function AnalizeBlock(block) {

		if (block.length == 0) {
			console.log("Empty string in FindRepetitiveSymbol()");
			return -1;
		}
		// console.log("Блок на проверку повторений:" + block);
		block = block.trim();

		var potentialRepSequence = block[0]; // обнуляется, сюда заптсываем повторяющуюся последовательность
		var potentialRepSymbol = block[0];

		var i = 1; // начинаем проверку с первого символа
		var repetitiveSymbolCounter = 0;

		/** Пока не кончился блок */
		while (i < block.length) {

			/** Если нашли повторяющийся символ */
			if (potentialRepSymbol == block[i]) {
				potentialRepSequence += block[i];
				// console.log("Совпадение! " + potentialRepSequence);
				repetitiveSymbolCounter++;
				i++; // следующий символ на проверку

				// если мы больше не попадем в while, а повторяющяяся последовательность еще не записаны.
				if (i == block.length && potentialRepSequence.length > 1) {
					self.repetitiveSequences += potentialRepSequence + " ";
					self.repetitiveSymbolsAmount += potentialRepSequence.length;
					// console.log("Последняя последовательность: " + potentialRepSequence);
				}

				continue; // начинаем while заново
			}

			/** Если на выходе из While счетик больше нуля, то значит есть последовательности */
			if (repetitiveSymbolCounter > 0) {
				self.repetitiveSequences += potentialRepSequence + " ";
				self.repetitiveSymbolsAmount += potentialRepSequence.length;
			}


			potentialRepSymbol = block[i]; // Берем следующий символ на проверку
			potentialRepSequence = potentialRepSymbol; // Нужно, чтобы правильно записать последовательность
			i++; // переходим к следующему символу
			repetitiveSymbolCounter = 0; // обнуляем счетчик повторов
		}

		return self.repetitiveSequences;
	}
}