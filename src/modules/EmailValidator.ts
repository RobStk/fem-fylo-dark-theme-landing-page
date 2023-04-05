import IValidator from "./interfaces/IValidator";

export const DEFAULT_ERR_MSG = "Please enter a valid email address";
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class EmailValidator implements IValidator {
	private regex: RegExp;

	constructor(private errorMsg = DEFAULT_ERR_MSG) {
		this.regex = regex;
	}

	validate(value: string): string[] {
		const errorArr = [];
		const isValid = this.regex.test(value);
		if (!isValid) errorArr.push(this.errorMsg);
		return (errorArr);
	}
}

export default EmailValidator;