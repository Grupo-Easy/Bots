function getLastDate(prefix) {
	var day = new Date().getDate() + 1;
	var mes = new Date().getMonth() + 1;
	var ano = new Date().getFullYear();
	function diasNoMes(mes, ano) {
		var data = new Date(ano, mes, 0);
		return data.getDate();
	}
	for (let i = 7; i > 0; i--) {
		if (day > 0) {
			day--;
		} else {
			if (mes + 1 - 1 === 0) {
				day = diasNoMes(mes + 1, ano - 1);
			} else {
				day = diasNoMes(mes + 1, ano);
			}
			day--;
		}
	}
	if (day.toString().length != 2) {
		if (mes.toString().length != 2) {
			return `${ano}${prefix}0${mes}${prefix}0${day}`;
		}
		return `${ano}${prefix}${mes}${prefix}0${day}`;
	}
	return `${ano}${prefix}${mes}${prefix}${day}`;
}
function getCurrentDay(prefix) {
	var day = new Date().getDate();
	var mes = new Date().getMonth() + 1;
	var ano = new Date().getFullYear();
	if (day.toString().length != 2) {
		if (mes.toString().length != 2) {
			return `${ano}${prefix}0${mes}${prefix}0${day}`;
		}
		return `${ano}${prefix}${mes}${prefix}0${day}`;
	}
	if (mes.toString().length != 2) {
		return `${ano}${prefix}0${mes}${prefix}${day}`;
	}
	return `${ano}${prefix}${mes}${prefix}${day}`;
}
console.log(getLastDate("-"));
console.log(CurrentDay("-"));
