import IInputValidator from "./IInputValidator";
import ITypeableInput from "./ITypeableInput";

interface ITypeableInputFactory {
	/**
	 * Producing method.
	 * 
	 * @param inputContainer - Input container for the produced object.
	 * @param inputValidator - Input validator for the produced object.
	 */
	create(inputContainer: HTMLElement, inputValidator: IInputValidator): ITypeableInput;
}

export default ITypeableInputFactory;