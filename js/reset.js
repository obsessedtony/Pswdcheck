function ResetClick() {
	ResetFlags();
	ResetRaiting();
	document.getElementById("inputPass").value = "";
	document.getElementById("pswd-length").innerHTML = "0";
}

function ResetRaiting() {
	SetClass("result-rate", "rate-0");
}

/*** Меняет цвет флагов на нейтральный. ***/
function ResetFlags() {
		document.getElementById("more-14-p").className = "disabled-property";
		document.getElementById("more-21-p").className = "disabled-property";
		document.getElementById("lowercase-p").className = "disabled-property";
		document.getElementById("uppercase-p").className = "disabled-property";
		document.getElementById("digits-p").className = "disabled-property";
		document.getElementById("special-char-p").className = "disabled-property";
		document.getElementById("repetitive-symbols-p").className = "disabled-property";
		document.getElementById("conventional-symbols-p").className = "disabled-property";

}

/*** Делает все флаги красными. Вызывается после нажатия на кнопку проверить ***/
function MakeFlagesFalse() {
	document.getElementById("more-14-p").className = "false";
	document.getElementById("more-21-p").className = "false";
	document.getElementById("lowercase-p").className = "false";
	document.getElementById("uppercase-p").className = "false";
	document.getElementById("digits-p").className = "false";
	document.getElementById("special-char-p").className = "false";
	document.getElementById("repetitive-symbols-p").className = "false";
	document.getElementById("conventional-symbols-p").className = "false";
}