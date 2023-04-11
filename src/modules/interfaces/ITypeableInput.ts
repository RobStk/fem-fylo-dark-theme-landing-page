interface ITypeableInput {
	/**
	 * Validation method.
	 * @returns Validation result: `true` if validation was successful, `false` otherwise.
	 */
	validate(): boolean;
}

export default ITypeableInput;