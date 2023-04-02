/**
 * @jest-environment jsdom
 */

import InputValidator from "../InputValidator";
import IEmailValidator from "../interfaces/IEmailValidator";

describe("validate", () => {
	const input = document.createElement("input");
	const fakeEmailValidator: IEmailValidator = {
		validate: jest.fn()
	};
	console.log = jest.fn();
	const inputValidator = new InputValidator(fakeEmailValidator);

	beforeEach(jest.clearAllMocks);

	test("should call 'validate' on EmailValidator when input type is an 'email'", () => {
		input.type = "email";
		
		inputValidator.validate(input);
		
		expect(fakeEmailValidator.validate).toBeCalledTimes(1);
	});

	test("should return error msg from the specific validator called", () => {
		input.type = "email";
		const errorMsg = "error msg";
		fakeEmailValidator.validate = jest.fn().mockReturnValue(errorMsg);

		const returnedValue = inputValidator.validate(input);

		expect(returnedValue).toBe(errorMsg);
	});

	test("should not call 'validate' on EmailValidator when input type is not 'email'", () => {
		input.type = "not email";

		inputValidator.validate(input);

		expect(fakeEmailValidator.validate).not.toBeCalled();
	});

	test("should log when input type is not supported", () => {
		input.type = "unsupported";
		const expectedLogMsg = `${input.type} type validation is not supported`;

		inputValidator.validate(input);

		expect(console.log).toBeCalledTimes(1);
		expect(console.log).toBeCalledWith(expectedLogMsg);
	});

});