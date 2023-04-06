import IInputValidator from "./interfaces/IInputValidator";
import ITypeableInput from "./interfaces/ITypeableInput";

class TypeableInput implements ITypeableInput {
	private containerElement: HTMLElement;
	private inputValidator: IInputValidator;

	constructor(inputContainer: HTMLElement, inputValidator: IInputValidator) {
		this.containerElement = inputContainer;
		this.inputValidator = inputValidator;
	}

	validate(): boolean {
		const inputElement = this.containerElement.querySelector("input") as HTMLInputElement || null;
		if (!inputElement) return true;
		if (!inputElement.required && !inputElement.value) return true;
		const errors = this.inputValidator.validate(inputElement);
		const isValid = !errors.length;
		if (isValid) this.unsetErrorState(); else this.setErrorState(errors[0]);
		return isValid;
	}

	private setErrorState(errorMsg: string) {
		this.containerElement.classList.add("invalid");
		this.containerElement.dataset.error = errorMsg;
	}

	private unsetErrorState() {
		this.containerElement.classList.remove("invalid");
		this.containerElement.dataset.error = "";
	}
}

export default TypeableInput;