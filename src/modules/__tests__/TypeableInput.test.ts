/**
 * @jest-environment jsdom
 */
import TypeableInput from "../TypeableInput";
import IInputValidator from "../interfaces/IInputValidator";

describe("validate", () => {
	const input = document.createElement("input");
	const inputContainer = document.createElement("div");
	inputContainer.appendChild(input);

	const fakeInputValidator: IInputValidator = {
		validate: jest.fn()
	};
	
	test("should return true if there is no input", () => {
		jest.clearAllMocks();
		const emptyContainer = document.createElement("div");
		const typeableInput = new TypeableInput(emptyContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeTruthy();
	});
	
	test("should return false if required input value is empty", () => {
		jest.clearAllMocks();
		input.required = true;
		input.value = "";
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeFalsy();
	});

	test("should return true if not-required input value is empty", () => {
		jest.clearAllMocks();
		input.required = false;
		input.value = "";
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeTruthy();
	});

	test("should use input validator if required input value is not empty", () => {
		jest.clearAllMocks();
		input.required = true;
		input.value = "value";
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);
		
		typeableInput.validate();

		expect(fakeInputValidator.validate).toBeCalledTimes(1);
	});

	test("should return false if input validator returns one error", () => {
		jest.clearAllMocks();
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue(["error"]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeFalsy();
	});

	test("should return false if input validator returns many errors", () => {
		jest.clearAllMocks();
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue(["error1", "error2", "error3"]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeFalsy();
	});

	test("should return true if input validator returns no errors", () => {
		jest.clearAllMocks();
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeTruthy();
	});

	test("should return true if input validator returns errors", () => {
		jest.clearAllMocks();
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		const validation = typeableInput.validate();

		expect(validation).toBeTruthy();
	});

	test("should set invalid class on container if input validator returns errors", () => {
		jest.clearAllMocks();
		inputContainer.classList.remove("invalid");
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue(["error"]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		typeableInput.validate();

		expect(inputContainer.classList).toContain("invalid");
	});

	test("should remove invalid class from container if input validator returns no errors", () => {
		jest.clearAllMocks();
		inputContainer.classList.add("invalid");
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		typeableInput.validate();

		expect(inputContainer.classList).not.toContain("invalid");
	});

	test("should add first error msg to container if input validator returns errors", () => {
		jest.clearAllMocks();
		inputContainer.dataset.dataError = "";
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue(["first error", "second error"]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		typeableInput.validate();

		expect(inputContainer.dataset.dataError).toBe("first error");
	});

	test("should remove error msg from container if input validator returns no errors", () => {
		jest.clearAllMocks();
		inputContainer.dataset.dataError = "error";
		input.required = true;
		fakeInputValidator.validate = jest.fn().mockReturnValue([]);
		const typeableInput = new TypeableInput(inputContainer, fakeInputValidator);

		typeableInput.validate();

		expect(inputContainer.dataset.dataError).toBe("");
	});
});