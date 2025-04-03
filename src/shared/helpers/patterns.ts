export const patterns = {
	email:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	containUppercase: /[A-Z]/,
	containSpecialCharacter: /[^a-zA-Zа-яА-ЯёЁ\s\d]/,
	containDigits: /\d/,
	containOnlyDigits: /^[0-9]+$/
}
