interface IValidator {
	/**
	 * validation method.
	 * 
	 * @param value - The value to validate.
	 */
	validate(value: string): string[];
}

export default IValidator;