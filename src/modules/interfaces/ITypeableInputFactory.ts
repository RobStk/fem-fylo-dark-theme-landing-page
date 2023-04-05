import IInputValidator from "./IInputValidator";
import ITypeableInput from "./ITypeableInput";

interface ITypeableInputFactory {
	create(inputContainer: HTMLElement, inputValidator: IInputValidator): ITypeableInput;
}

export default ITypeableInputFactory;