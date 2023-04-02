import IEmailValidator from "./interfaces/IEmailValidator";
import IInputValidator from "./interfaces/IInputValidator";

class InputValidator implements IInputValidator {
	private emailValidator: IEmailValidator;

	constructor(emailValidator: IEmailValidator) {
		this.emailValidator = emailValidator;
	}

	validate(input: HTMLInputElement): string[] {
		return this.useValidatorOnInput(input);
	}

	private useValidatorOnInput(input: HTMLInputElement) {
		switch (input.type) {
			case "email":
				return this.emailValidator.validate(input.value);

			default:
				console.log(`${input.type} type validation is not supported`);
				return [];
		}
	}
}

export default InputValidator;