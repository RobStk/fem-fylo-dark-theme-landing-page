import IInputValidator from "./interfaces/IInputValidator";
import ITypeableInputFactory from "./interfaces/ITypeableInputFactory";

export const SUCCESS_MSG = "Validation successful";
export const FAIL_MSG = "Validation failed";
export const FORM_ERROR_MSG = "Invalid form type";

/**
 * A class that handles HTML form events.
 */
class FormManager {
	/**
	 * @param form - HTML form to manage.
	 * @param inputFactory - A factory to create manageable inputs based on form elements.
	 * @param inputValidator - Validator used to handle inputs.
	 */
	constructor(private form: HTMLFormElement, private inputFactory: ITypeableInputFactory, private inputValidator: IInputValidator) {
		if(!(form instanceof HTMLFormElement)) throw new Error(FORM_ERROR_MSG);
		
		this.form.addEventListener("submit", (event) => this.handleSubmit(event));
	}

	/**
	 * A method that handles the form's submit.
	 * @param event - The submit event object provided by the DOM.
	 */
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