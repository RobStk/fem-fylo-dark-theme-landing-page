import EmailValidator from "./modules/EmailValidator";
import FormManager from "./modules/FormManager";
import InputValidator from "./modules/InputValidator";
import TypeableInputFactory from "./modules/TypeableInputFactory";

const form = document.querySelector("#early-access-form") as HTMLFormElement;
const inputFactory = new TypeableInputFactory();
const emailValidator = new EmailValidator();
const inputValidator = new InputValidator(emailValidator);
new FormManager(form, inputFactory, inputValidator);