"use strict"

function KeyboardSequences() {
	var self = this;

	this.digitsBlock = "";
	this.lettersBlock = "";
	this.charactersBlock = "";
	this.templateSequences = "";
	this.templateSymbolsCounter = 0;

	// Возвращает процентное соотношение шаблонных клавиатурных последовательностей в пароле.
	this.GetStatistic = function() {
		return Math.round(self.templateSymbolsCounter / passwordBasicInfo.GetLength() * 100);
	}

	/** Функция. Находит все шаблонные последовательности с помощью вспомогательной функции AnalizeBlock().
	 * Адекватно работает, только когда:
	 * 1. Пароль разбит на блоки.
	 * 2. Вычислены повторки и функция может их удалить.
	 */
	this.FindTemplateSequences = function() {
		PutPasswordBlocks(); // получаем блоки из объекта passwordBlocks
		RemoveRepetitiveSequences(); // удаляем повторки в наших блоках

		if(self.digitsBlock != "") {
			AnalizeBlock(self.digitsBlock, dictionary.digitsSequences);
		}

		if(self.lettersBlock != "") {
			AnalizeBlock(self.lettersBlock, dictionary.lettersSequences);
		}

		if(self.charactersBlock != "") {
			AnalizeBlock(self.charactersBlock, dictionary.charactersSequences);
		}

		console.log("Шаблонные клавиатурные последовательности: " + self.templateSequences);
		console.log("Общее кол-во символов в клавиатурных последовательностях: " + self.templateSymbolsCounter);
		console.log("Процентное соотношение: " + self.GetStatistic() + "%\n");
	}




	/* Функция. Находит шаблунные последовательность в блоке символов одного типа.
	Адекватно работает, только когда
	1. Получен блок с символами одного типа.
	2. Получен соответсвующий этому блоку словарь. */
	function AnalizeBlock(block, dictionary) {
		if (block.length < 2) {
			console.log("Блок " + block + " не требует проверки, т.к. он слишком короткий.\n");
			return;
		}

		// получаем кол-во элементов в массиве одной из последовательностей в дневнике
		// Пример: digitsSequence.length = 1
		var dictionaryAmount = dictionary.length;
		var templateSequences = "";


		// проходим по всем строкам-последовтельностям из словаря.
		for (var i = 0; i < dictionaryAmount; i++) {
			var sequence = dictionary[i]; // берем шаблонную последовательность на проверку
			//console.log("Последовательность: " + sequence + "\n");
			var sequencePointer = 0;
			var blockPointer = 0;
			var potentialTemplSequence = "";

			potentialTemplSequence = block[0]; // потенциальный первый символ шаблонной послед.

			// получаем индекс символа, с которого начнем проверку и переходим на следующий

			/** Если словарь не подходит */
			if(sequence.lastIndexOf(block[0]) == -1) continue;

			sequencePointer = sequence.lastIndexOf(block[blockPointer]) + 1;
			// берем первый символ с блока
			blockPointer = 1;

			while (blockPointer < block.length) {

				// Если символ блока совпадает с символом последовательности
				// Пример: символ в блоке - 3971[2]3 и символ в последовательности 01[2]3456789 совпадают
				if (block[blockPointer] == sequence[sequencePointer]) {
					//console.log(block[blockPointer] + " равно " + sequence[sequencePointer]);

					potentialTemplSequence += sequence[sequencePointer];
					//console.log(sequence[sequencePointer] + "добавлено");
					//console.log(potentialTemplSequence + " - потенциальная послед.");
					sequencePointer++;
					blockPointer++;

					// если больше не попадем в while
					if (potentialTemplSequence.length >= 2 && blockPointer == block.length) {
						//console.log(blockPointer + " " + sequencePointer);
						//console.log("Последяя итерация в while.");
						//console.log(potentialTemplSequence + " к записи\n");
						templateSequences += potentialTemplSequence + " ";
						self.templateSymbolsCounter += potentialTemplSequence.length;
					}

					continue;
				}


				if (potentialTemplSequence.length >= 2) {
					//console.log(blockPointer + " " + sequencePointer);
					//console.log(potentialTemplSequence + " к записи\n");
					templateSequences += potentialTemplSequence + " ";
					self.templateSymbolsCounter += potentialTemplSequence.length;
				}

				sequencePointer = sequence.lastIndexOf(block[blockPointer]);
				//potentialTemplSequence = block[blockPointer];
				potentialTemplSequence = "";
				//console.log(block[blockPointer]);
				//console.log(blockPointer + " " + sequencePointer);
				//console.log("Потенциальный символ: " + potentialTemplSequence);
				//console.log("Новый указатель - " + sequencePointer);

			}
		}

		self.templateSequences += templateSequences;
	}




	/* Функция. Получает блоки пароля из объекта passwordBlocks.
	* Адеквано работает только, когда пароль уже был разбит на блоки. */
	function PutPasswordBlocks() {
		self.digitsBlock = passwordBlocks.digitsSubstring;
		self.lettersBlock = passwordBlocks.lettersSubstring;
		self.charactersBlock = passwordBlocks.charactersSubstring;
	}

	/** Функция. Вырезает все повторяющеися последовательности
	 * c помощью вспомогательной функции.
	 *  Вызывается после получения блоков.
	 * */
	function RemoveRepetitiveSequences() {
		var repetitiveSequences = repetitiveSymbols.repetitiveSequences;
		if(self.digitsBlock != "") {
			self.digitsBlock =  CutRepetitiveSymbols(self.digitsBlock, repetitiveSequences);
		}
		if(self.lettersBlock != "") {
			self.lettersBlock = CutRepetitiveSymbols(self.lettersBlock, repetitiveSequences);
		}
		if(self.charactersBlock != "") {
			self.charactersBlock = CutRepetitiveSymbols(self.charactersBlock, repetitiveSequences);
		}

		//console.log(self.GetBlocks());
	}

	/** Вырезает повторяющеися символы из блока.
	 * Первый параметр – блок символов из этого объекта.
	 * Второй параметр – повторяющеяся последовательность из объекта repitivePassword.
	 * Адекватно работает, только если повторки уже были найдены.
	*/
	function CutRepetitiveSymbols(block, repetitiveSymbols) {
		var repetitiveBlocks = repetitiveSymbols.split(" ");
		for (var i = 0; i < repetitiveBlocks.length; i++) {
			//var betterSlugger = slugger.replace("h Hamilton", "e Bautista");
			block = block.replace(repetitiveBlocks[i], "");
		}

		return block;
	}

	/** Возвращает блоки пароля, которые содержит объект. */
	this.GetBlocks = function() {
		var blocks = "Блоки пароля, после удаления повторок:\n";

		blocks += self.digitsBlock != "" ? ("Цифры: " + self.digitsBlock + "\n") : "";
		blocks +=	self.lettersBlock != "" ? ("Буквы: " + self.lettersBlock + "\n") : "";
		blocks +=	self.charactersBlock != "" ? ("Специальные символы: " + self.charactersBlock) : "";

		return blocks;
	}
}

