import EmailValidator, { DEFAULT_ERR_MSG } from "../EmailValidator";

describe("validate", () => {
	const errorMsg = DEFAULT_ERR_MSG;
	const emailValidator = new EmailValidator();

	test("should return error msg if email is invalid", () => {
		expect(emailValidator.validate("")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email@")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email@host")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email.host")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("@")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("@host")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("@host.com")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("@host@com")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate(".com")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email@host.123")).toStrictEqual([errorMsg]);
		expect(emailValidator.validate("email@email@host.com")).toStrictEqual([errorMsg]);
	});

	test("should return empty array if email is valid", () => {
		expect(emailValidator.validate("email@host.com")).toStrictEqual([]);
	});

	test("should return custom error msg if email is invalid", () => {
		const customErrorMsg = "Custom";
		const emailValidator = new EmailValidator(customErrorMsg);
		expect(emailValidator.validate("")).toStrictEqual([customErrorMsg]);
	});
});