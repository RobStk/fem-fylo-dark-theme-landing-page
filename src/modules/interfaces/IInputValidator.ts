interface IInputValidator {
	/**
	 * Validates the passed input and returns an array of error messages 
	 * or an empty array if none were found.
	 * 
	 * @param input - HTML input for validation.
	 * 
	 * @returns Errors array.
	 */
	validate(input: HTMLInputElement): string[];
}

export default IInputValidator;