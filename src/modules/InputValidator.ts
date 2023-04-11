import IValidator from "./interfaces/IValidator";
import IInputValidator from "./interfaces/IInputValidator";

/**
 * A class for general handling of form input validation.
 */
class InputValidator implements IInputValidator {
	private emailValidator: IValidator;

	/**
	 * @param emailValidator - Validator dedicated to emails.
	 */
	constructor(emailValidator: IValidator) {
		this.emailValidator = emailValidator;
	}

	validate(input: HTMLInputElement): string[] {
		return this.useValidatorOnInput(input);
	}

	/**
	 * A method that uses a dedicated validator selected on the basis of the given input.
	 * 
	 * @param input - Input for validation.
	 * 
	 * @returns The error array provided by the selected validator.
	 */
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