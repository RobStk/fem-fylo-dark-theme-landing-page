import TypeableInput from "./TypeableInput";
import IInputValidator from "./interfaces/IInputValidator";
import ITypeableInputFactory from "./interfaces/ITypeableInputFactory";

/**
 * A factory class that produces objects of the ITypeableInput type.
 */
class TypeableInputFactory implements ITypeableInputFactory {
	create(inputContainer: HTMLElement, inputValidator: IInputValidator) {
		return new TypeableInput(inputContainer, inputValidator);
	}
}

export default TypeableInputFactory;