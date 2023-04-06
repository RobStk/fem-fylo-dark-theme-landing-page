/**
 * @jest-environment jsdom
*/
import { fireEvent } from "@testing-library/dom";
import IInputValidator from "../interfaces/IInputValidator";
import FormManager, { FAIL_MSG, FORM_ERROR_MSG, SUCCESS_MSG } from "../FormManager";
import ITypeableInputFactory from "../interfaces/ITypeableInputFactory";
import ITypeableInput from "../interfaces/ITypeableInput";

const inputContainer1 = document.createElement("div");
inputContainer1.classList.add("input-container");
const inputContainer2 = document.createElement("div");
inputContainer2.classList.add("input-container");
const form = document.createElement("form");
form.appendChild(inputContainer1);
form.appendChild(inputContainer2);

const fakeInputValidator: IInputValidator = {
	validate: jest.fn()
};
const fakeInvalidTypeableInput: ITypeableInput = {
	validate: jest.fn().mockReturnValue(false)
};
const fakeValidTypeableInput1: ITypeableInput = {
	validate: jest.fn().mockReturnValue(true)
};
const fakeValidTypeableInput2: ITypeableInput = {
	validate: jest.fn().mockReturnValue(true)
};
const fakeInputsFactory: ITypeableInputFactory = {
	create: jest.fn()
};

const submit = new Event("submit");
submit.preventDefault = jest.fn();
console.log = jest.fn();

describe("Form Manager", () => {
	beforeEach(jest.clearAllMocks);

	test("should throw an error if the form type IS NOT HTMLFormElement", () => {
		const div = document.createElement("div");
		div.classList.add("div");
		document.body.appendChild(div);
		const testForm1 = document.querySelector(".div") as HTMLFormElement;
		const testForm2 = document.querySelector(".nonexistent") as HTMLFormElement;

		expect(()=>new FormManager(testForm1, fakeInputsFactory, fakeInputValidator)).toThrowError(FORM_ERROR_MSG);
		expect(()=>new FormManager(testForm2, fakeInputsFactory, fakeInputValidator)).toThrowError(FORM_ERROR_MSG);
	});

	test("should NOT throw an error if the form type IS HTMLFormElement", () => {
		const div = document.createElement("form");
		document.body.appendChild(div);
		const testForm = document.querySelector("form") as HTMLFormElement;

		expect(() => new FormManager(testForm, fakeInputsFactory, fakeInputValidator)).not.toThrowError();
	});
	
	test("should prevent default on submit", () => {
		const testForm = form.cloneNode(true) as HTMLFormElement;
		fakeInputsFactory.create = jest.fn()
			.mockImplementationOnce(() => fakeInvalidTypeableInput)
			.mockImplementationOnce(() => fakeValidTypeableInput1);
		new FormManager(testForm, fakeInputsFactory, fakeInputValidator);

		fireEvent(testForm, submit);

		expect(submit.preventDefault).toBeCalledTimes(1);
	});

	test("should call validate method on each input on form submit", () => {
		const testForm = form.cloneNode(true) as HTMLFormElement;
		fakeInputsFactory.create = jest.fn()
			.mockImplementationOnce(() => fakeInvalidTypeableInput)
			.mockImplementationOnce(() => fakeValidTypeableInput1);
		new FormManager(testForm, fakeInputsFactory, fakeInputValidator);

		fireEvent(testForm, submit);
		expect(fakeInvalidTypeableInput.validate).toBeCalledTimes(1);
		expect(fakeValidTypeableInput1.validate).toBeCalledTimes(1);
	});

	test("should log message in console if validation is failed", () => {
		const testForm = form.cloneNode(true) as HTMLFormElement;
		fakeInputsFactory.create = jest.fn()
			.mockImplementationOnce(() => fakeInvalidTypeableInput)
			.mockImplementationOnce(() => fakeValidTypeableInput1);
		new FormManager(testForm, fakeInputsFactory, fakeInputValidator);

		fireEvent(testForm, submit);
		expect(console.log).toBeCalledTimes(1);
		expect(console.log).toBeCalledWith(FAIL_MSG);
	});

	test("should log message in console if validation is successful", () => {
		const testForm = form.cloneNode(true) as HTMLFormElement;
		fakeInputsFactory.create = jest.fn()
			.mockImplementationOnce(() => fakeValidTypeableInput1)
			.mockImplementationOnce(() => fakeValidTypeableInput2);
		new FormManager(testForm, fakeInputsFactory, fakeInputValidator);

		fireEvent(testForm, submit);

		expect(console.log).toBeCalledTimes(1);
		expect(console.log).toBeCalledWith(SUCCESS_MSG);
	});
});