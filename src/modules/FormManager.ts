import IInputValidator from "./interfaces/IInputValidator";
import ITypeableInputFactory from "./interfaces/ITypeableInputFactory";

export const SUCCESS_MSG = "Validation successful";
export const FAIL_MSG = "Validation failed";

class FormManager {
	constructor(private form: HTMLFormElement, private inputFactory: ITypeableInputFactory, private inputValidator: IInputValidator) {
		this.form.addEventListener("submit", (event) => this.handleSubmit(event));
	}

	private handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const inputContainers = [...this.form.querySelectorAll(".input-container")] as HTMLElement[];
		const inputs = inputContainers.map(inputContainer => this.inputFactory.create(inputContainer, this.inputValidator));
		let allValid = true;
		inputs.forEach(input => {
			const isValid = input.validate();
			if (!isValid) allValid = false;
		});
		const resultMsg = allValid ? SUCCESS_MSG : FAIL_MSG;
		console.log(resultMsg);
	}
}

export default FormManager;