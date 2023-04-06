/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/EmailValidator.ts":
/*!***************************************!*\
  !*** ./src/modules/EmailValidator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_ERR_MSG": () => (/* binding */ DEFAULT_ERR_MSG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DEFAULT_ERR_MSG = "Please enter a valid email address";
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class EmailValidator {
    constructor(errorMsg = DEFAULT_ERR_MSG) {
        this.errorMsg = errorMsg;
        this.regex = regex;
    }
    validate(value) {
        const errorArr = [];
        const isValid = this.regex.test(value);
        if (!isValid)
            errorArr.push(this.errorMsg);
        return (errorArr);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailValidator);


/***/ }),

/***/ "./src/modules/FormManager.ts":
/*!************************************!*\
  !*** ./src/modules/FormManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FAIL_MSG": () => (/* binding */ FAIL_MSG),
/* harmony export */   "FORM_ERROR_MSG": () => (/* binding */ FORM_ERROR_MSG),
/* harmony export */   "SUCCESS_MSG": () => (/* binding */ SUCCESS_MSG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const SUCCESS_MSG = "Validation successful";
const FAIL_MSG = "Validation failed";
const FORM_ERROR_MSG = "Invalid form type";
class FormManager {
    constructor(form, inputFactory, inputValidator) {
        this.form = form;
        this.inputFactory = inputFactory;
        this.inputValidator = inputValidator;
        if (!(form instanceof HTMLFormElement))
            throw new Error(FORM_ERROR_MSG);
        this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    }
    handleSubmit(event) {
        event.preventDefault();
        const inputContainers = [...this.form.querySelectorAll(".input-container")];
        const inputs = inputContainers.map(inputContainer => this.inputFactory.create(inputContainer, this.inputValidator));
        let allValid = true;
        inputs.forEach(input => {
            const isValid = input.validate();
            if (!isValid)
                allValid = false;
        });
        const resultMsg = allValid ? SUCCESS_MSG : FAIL_MSG;
        console.log(resultMsg);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormManager);


/***/ }),

/***/ "./src/modules/InputValidator.ts":
/*!***************************************!*\
  !*** ./src/modules/InputValidator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class InputValidator {
    constructor(emailValidator) {
        this.emailValidator = emailValidator;
    }
    validate(input) {
        return this.useValidatorOnInput(input);
    }
    useValidatorOnInput(input) {
        switch (input.type) {
            case "email":
                return this.emailValidator.validate(input.value);
            default:
                console.log(`${input.type} type validation is not supported`);
                return [];
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputValidator);


/***/ }),

/***/ "./src/modules/TypeableInput.ts":
/*!**************************************!*\
  !*** ./src/modules/TypeableInput.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TypeableInput {
    constructor(inputContainer, inputValidator) {
        this.containerElement = inputContainer;
        this.inputValidator = inputValidator;
    }
    validate() {
        const inputElement = this.containerElement.querySelector("input") || null;
        if (!inputElement)
            return true;
        if (!inputElement.required && !inputElement.value)
            return true;
        const errors = this.inputValidator.validate(inputElement);
        const isValid = !errors.length;
        if (isValid)
            this.unsetErrorState();
        else
            this.setErrorState(errors[0]);
        return isValid;
    }
    setErrorState(errorMsg) {
        this.containerElement.classList.add("invalid");
        this.containerElement.dataset.error = errorMsg;
    }
    unsetErrorState() {
        this.containerElement.classList.remove("invalid");
        this.containerElement.dataset.error = "";
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypeableInput);


/***/ }),

/***/ "./src/modules/TypeableInputFactory.ts":
/*!*********************************************!*\
  !*** ./src/modules/TypeableInputFactory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TypeableInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TypeableInput */ "./src/modules/TypeableInput.ts");

class TypeableInputFactory {
    create(inputContainer, inputValidator) {
        return new _TypeableInput__WEBPACK_IMPORTED_MODULE_0__["default"](inputContainer, inputValidator);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypeableInputFactory);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_EmailValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/EmailValidator */ "./src/modules/EmailValidator.ts");
/* harmony import */ var _modules_FormManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/FormManager */ "./src/modules/FormManager.ts");
/* harmony import */ var _modules_InputValidator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/InputValidator */ "./src/modules/InputValidator.ts");
/* harmony import */ var _modules_TypeableInputFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/TypeableInputFactory */ "./src/modules/TypeableInputFactory.ts");




const form = document.querySelector("#early-access-form");
const inputFactory = new _modules_TypeableInputFactory__WEBPACK_IMPORTED_MODULE_3__["default"]();
const emailValidator = new _modules_EmailValidator__WEBPACK_IMPORTED_MODULE_0__["default"]();
const inputValidator = new _modules_InputValidator__WEBPACK_IMPORTED_MODULE_2__["default"](emailValidator);
new _modules_FormManager__WEBPACK_IMPORTED_MODULE_1__["default"](form, inputFactory, inputValidator);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmVtLWZ5bG8tZGFyay10aGVtZS1sYW5kaW5nLXBhZ2UvLi9zcmMvbW9kdWxlcy9FbWFpbFZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly9mZW0tZnlsby1kYXJrLXRoZW1lLWxhbmRpbmctcGFnZS8uL3NyYy9tb2R1bGVzL0Zvcm1NYW5hZ2VyLnRzIiwid2VicGFjazovL2ZlbS1meWxvLWRhcmstdGhlbWUtbGFuZGluZy1wYWdlLy4vc3JjL21vZHVsZXMvSW5wdXRWYWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vZmVtLWZ5bG8tZGFyay10aGVtZS1sYW5kaW5nLXBhZ2UvLi9zcmMvbW9kdWxlcy9UeXBlYWJsZUlucHV0LnRzIiwid2VicGFjazovL2ZlbS1meWxvLWRhcmstdGhlbWUtbGFuZGluZy1wYWdlLy4vc3JjL21vZHVsZXMvVHlwZWFibGVJbnB1dEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vZmVtLWZ5bG8tZGFyay10aGVtZS1sYW5kaW5nLXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmVtLWZ5bG8tZGFyay10aGVtZS1sYW5kaW5nLXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZlbS1meWxvLWRhcmstdGhlbWUtbGFuZGluZy1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmVtLWZ5bG8tZGFyay10aGVtZS1sYW5kaW5nLXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mZW0tZnlsby1kYXJrLXRoZW1lLWxhbmRpbmctcGFnZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSVZhbGlkYXRvciBmcm9tIFwiLi9pbnRlcmZhY2VzL0lWYWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VSUl9NU0cgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcIjtcclxuY29uc3QgcmVnZXggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cclxuY2xhc3MgRW1haWxWYWxpZGF0b3IgaW1wbGVtZW50cyBJVmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIHJlZ2V4OiBSZWdFeHA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZXJyb3JNc2cgPSBERUZBVUxUX0VSUl9NU0cpIHtcclxuXHRcdHRoaXMucmVnZXggPSByZWdleDtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblx0XHRjb25zdCBlcnJvckFyciA9IFtdO1xyXG5cdFx0Y29uc3QgaXNWYWxpZCA9IHRoaXMucmVnZXgudGVzdCh2YWx1ZSk7XHJcblx0XHRpZiAoIWlzVmFsaWQpIGVycm9yQXJyLnB1c2godGhpcy5lcnJvck1zZyk7XHJcblx0XHRyZXR1cm4gKGVycm9yQXJyKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVtYWlsVmFsaWRhdG9yOyIsImltcG9ydCBJSW5wdXRWYWxpZGF0b3IgZnJvbSBcIi4vaW50ZXJmYWNlcy9JSW5wdXRWYWxpZGF0b3JcIjtcclxuaW1wb3J0IElUeXBlYWJsZUlucHV0RmFjdG9yeSBmcm9tIFwiLi9pbnRlcmZhY2VzL0lUeXBlYWJsZUlucHV0RmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNVQ0NFU1NfTVNHID0gXCJWYWxpZGF0aW9uIHN1Y2Nlc3NmdWxcIjtcclxuZXhwb3J0IGNvbnN0IEZBSUxfTVNHID0gXCJWYWxpZGF0aW9uIGZhaWxlZFwiO1xyXG5leHBvcnQgY29uc3QgRk9STV9FUlJPUl9NU0cgPSBcIkludmFsaWQgZm9ybSB0eXBlXCI7XHJcblxyXG5jbGFzcyBGb3JtTWFuYWdlciB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsIHByaXZhdGUgaW5wdXRGYWN0b3J5OiBJVHlwZWFibGVJbnB1dEZhY3RvcnksIHByaXZhdGUgaW5wdXRWYWxpZGF0b3I6IElJbnB1dFZhbGlkYXRvcikge1xyXG5cdFx0aWYoIShmb3JtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSkgdGhyb3cgbmV3IEVycm9yKEZPUk1fRVJST1JfTVNHKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZVN1Ym1pdChldmVudCkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVTdWJtaXQoZXZlbnQ6IFN1Ym1pdEV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0Y29uc3QgaW5wdXRDb250YWluZXJzID0gWy4uLnRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLmlucHV0LWNvbnRhaW5lclwiKV0gYXMgSFRNTEVsZW1lbnRbXTtcclxuXHRcdGNvbnN0IGlucHV0cyA9IGlucHV0Q29udGFpbmVycy5tYXAoaW5wdXRDb250YWluZXIgPT4gdGhpcy5pbnB1dEZhY3RvcnkuY3JlYXRlKGlucHV0Q29udGFpbmVyLCB0aGlzLmlucHV0VmFsaWRhdG9yKSk7XHJcblx0XHRsZXQgYWxsVmFsaWQgPSB0cnVlO1xyXG5cdFx0aW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG5cdFx0XHRjb25zdCBpc1ZhbGlkID0gaW5wdXQudmFsaWRhdGUoKTtcclxuXHRcdFx0aWYgKCFpc1ZhbGlkKSBhbGxWYWxpZCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCByZXN1bHRNc2cgPSBhbGxWYWxpZCA/IFNVQ0NFU1NfTVNHIDogRkFJTF9NU0c7XHJcblx0XHRjb25zb2xlLmxvZyhyZXN1bHRNc2cpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybU1hbmFnZXI7IiwiaW1wb3J0IElWYWxpZGF0b3IgZnJvbSBcIi4vaW50ZXJmYWNlcy9JVmFsaWRhdG9yXCI7XHJcbmltcG9ydCBJSW5wdXRWYWxpZGF0b3IgZnJvbSBcIi4vaW50ZXJmYWNlcy9JSW5wdXRWYWxpZGF0b3JcIjtcclxuXHJcbmNsYXNzIElucHV0VmFsaWRhdG9yIGltcGxlbWVudHMgSUlucHV0VmFsaWRhdG9yIHtcclxuXHRwcml2YXRlIGVtYWlsVmFsaWRhdG9yOiBJVmFsaWRhdG9yO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihlbWFpbFZhbGlkYXRvcjogSVZhbGlkYXRvcikge1xyXG5cdFx0dGhpcy5lbWFpbFZhbGlkYXRvciA9IGVtYWlsVmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGUoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmdbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy51c2VWYWxpZGF0b3JPbklucHV0KGlucHV0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXNlVmFsaWRhdG9yT25JbnB1dChpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xyXG5cdFx0c3dpdGNoIChpbnB1dC50eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJlbWFpbFwiOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmVtYWlsVmFsaWRhdG9yLnZhbGlkYXRlKGlucHV0LnZhbHVlKTtcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coYCR7aW5wdXQudHlwZX0gdHlwZSB2YWxpZGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWRgKTtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFZhbGlkYXRvcjsiLCJpbXBvcnQgSUlucHV0VmFsaWRhdG9yIGZyb20gXCIuL2ludGVyZmFjZXMvSUlucHV0VmFsaWRhdG9yXCI7XHJcbmltcG9ydCBJVHlwZWFibGVJbnB1dCBmcm9tIFwiLi9pbnRlcmZhY2VzL0lUeXBlYWJsZUlucHV0XCI7XHJcblxyXG5jbGFzcyBUeXBlYWJsZUlucHV0IGltcGxlbWVudHMgSVR5cGVhYmxlSW5wdXQge1xyXG5cdHByaXZhdGUgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBpbnB1dFZhbGlkYXRvcjogSUlucHV0VmFsaWRhdG9yO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihpbnB1dENvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGlucHV0VmFsaWRhdG9yOiBJSW5wdXRWYWxpZGF0b3IpIHtcclxuXHRcdHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGlucHV0Q29udGFpbmVyO1xyXG5cdFx0dGhpcy5pbnB1dFZhbGlkYXRvciA9IGlucHV0VmFsaWRhdG9yO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGUoKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBpbnB1dEVsZW1lbnQgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfHwgbnVsbDtcclxuXHRcdGlmICghaW5wdXRFbGVtZW50KSByZXR1cm4gdHJ1ZTtcclxuXHRcdGlmICghaW5wdXRFbGVtZW50LnJlcXVpcmVkICYmICFpbnB1dEVsZW1lbnQudmFsdWUpIHJldHVybiB0cnVlO1xyXG5cdFx0Y29uc3QgZXJyb3JzID0gdGhpcy5pbnB1dFZhbGlkYXRvci52YWxpZGF0ZShpbnB1dEVsZW1lbnQpO1xyXG5cdFx0Y29uc3QgaXNWYWxpZCA9ICFlcnJvcnMubGVuZ3RoO1xyXG5cdFx0aWYgKGlzVmFsaWQpIHRoaXMudW5zZXRFcnJvclN0YXRlKCk7IGVsc2UgdGhpcy5zZXRFcnJvclN0YXRlKGVycm9yc1swXSk7XHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0RXJyb3JTdGF0ZShlcnJvck1zZzogc3RyaW5nKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XHJcblx0XHR0aGlzLmNvbnRhaW5lckVsZW1lbnQuZGF0YXNldC5lcnJvciA9IGVycm9yTXNnO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1bnNldEVycm9yU3RhdGUoKSB7XHJcblx0XHR0aGlzLmNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XHJcblx0XHR0aGlzLmNvbnRhaW5lckVsZW1lbnQuZGF0YXNldC5lcnJvciA9IFwiXCI7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUeXBlYWJsZUlucHV0OyIsImltcG9ydCBUeXBlYWJsZUlucHV0IGZyb20gXCIuL1R5cGVhYmxlSW5wdXRcIjtcclxuaW1wb3J0IElJbnB1dFZhbGlkYXRvciBmcm9tIFwiLi9pbnRlcmZhY2VzL0lJbnB1dFZhbGlkYXRvclwiO1xyXG5pbXBvcnQgSVR5cGVhYmxlSW5wdXRGYWN0b3J5IGZyb20gXCIuL2ludGVyZmFjZXMvSVR5cGVhYmxlSW5wdXRGYWN0b3J5XCI7XHJcblxyXG5jbGFzcyBUeXBlYWJsZUlucHV0RmFjdG9yeSBpbXBsZW1lbnRzIElUeXBlYWJsZUlucHV0RmFjdG9yeSB7XHJcblx0Y3JlYXRlKGlucHV0Q29udGFpbmVyOiBIVE1MRWxlbWVudCwgaW5wdXRWYWxpZGF0b3I6IElJbnB1dFZhbGlkYXRvcikge1xyXG5cdFx0cmV0dXJuIG5ldyBUeXBlYWJsZUlucHV0KGlucHV0Q29udGFpbmVyLCBpbnB1dFZhbGlkYXRvcik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUeXBlYWJsZUlucHV0RmFjdG9yeTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWFpbFZhbGlkYXRvciBmcm9tIFwiLi9tb2R1bGVzL0VtYWlsVmFsaWRhdG9yXCI7XHJcbmltcG9ydCBGb3JtTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL0Zvcm1NYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnB1dFZhbGlkYXRvciBmcm9tIFwiLi9tb2R1bGVzL0lucHV0VmFsaWRhdG9yXCI7XHJcbmltcG9ydCBUeXBlYWJsZUlucHV0RmFjdG9yeSBmcm9tIFwiLi9tb2R1bGVzL1R5cGVhYmxlSW5wdXRGYWN0b3J5XCI7XHJcblxyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlYXJseS1hY2Nlc3MtZm9ybVwiKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbmNvbnN0IGlucHV0RmFjdG9yeSA9IG5ldyBUeXBlYWJsZUlucHV0RmFjdG9yeSgpO1xyXG5jb25zdCBlbWFpbFZhbGlkYXRvciA9IG5ldyBFbWFpbFZhbGlkYXRvcigpO1xyXG5jb25zdCBpbnB1dFZhbGlkYXRvciA9IG5ldyBJbnB1dFZhbGlkYXRvcihlbWFpbFZhbGlkYXRvcik7XHJcbm5ldyBGb3JtTWFuYWdlcihmb3JtLCBpbnB1dEZhY3RvcnksIGlucHV0VmFsaWRhdG9yKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=