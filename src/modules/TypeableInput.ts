import IInputValidator from "./interfaces/IInputValidator";
import ITypeableInput from "./interfaces/ITypeableInput";

/**
 * A class that is a container that provides a set of functionalities 
 * for inputs containing string values.
 */
class TypeableInput implements ITypeableInput {
	/**
	 * @param inputContainer - HTML element that is a container for controlled input.
	 * @param inputValidator - Validator for controlled input.
	 */
	constructor(private inputContainer: HTMLElement, private inputValidator: IInputValidator) {}

	validate(): boolean {
		const inputElement = this.inputContainer.querySelector("input") as HTMLInputElement || null;
		if (!inputElement) return true;
		if (!inputElement.required && !inputElement.value) return true;
		const errors = this.inputValidator.validate(inputElement);
		const isValid = !errors.length;
		if (isValid) this.unsetErrorState(); else this.setErrorState(errors[0]);
		return isValid;
	}

	//========================================
	// Private methods
	//========================================

	/**
	 * A method that sets the error state on the input container.
	 * @param errorMsg - Error message.
	 */
	private setErrorState(errorMsg: string) {
		this.inputContainer.classList.add("invalid");
		this.inputContainer.dataset.error = errorMsg;
	}

	// -------------------------

	/**
	 * A method that removes the error state from the input container.
	 */
	private unsetErrorState() {
		this.inputContainer.classList.remove("invalid");
		this.inputContainer.dataset.error = "";
	}

	// -------------------------
}

export default TypeableInput;