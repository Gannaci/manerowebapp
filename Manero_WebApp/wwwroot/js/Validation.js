const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);
    const passwordRegExErrorMsg = "8+ characters, 1 uppercase, 1 lowercase."
    const validationOptions = [
        {
            attribute: 'minlength',
            isValid: input =>
                input.value && input.value.length >= parseInt(input.minLength, 10),
            errorMessage: (input, label) =>
                `${label.textContent} needs to be at least ${input.minLength} characters`,
        },
        {
            attribute: 'custommaxlength',
            isValid: input =>
                input.value.length <=
                parseInt(input.getAttribute('custommaxlength'), 10),
            errorMessage: (input, label) =>
                `${label.textContent} needs to be less than ${input.getAttribute(
                    'custommaxlength'
                )} characters`,
        },
        {
            attribute: 'pattern',
            isValid: input => {
                const patternRegex = new RegExp(input.pattern);
                return patternRegex.test(input.value);
            },
            errorMessage: (input, label) => {
                if (label.textContent == "Password") {
                    return `${passwordRegExErrorMsg}`
                } else {
                    return `Not a valid ${label.textContent}`
                }
            }
        },
        {
            attribute: 'match',
            isValid: input => {
                const matchSelector = input.getAttribute('match');
                const matchedElem = document.querySelector(`#${matchSelector}`);
                return matchedElem && matchedElem.value.trim() === input.value.trim();
            },
            errorMessage: (input, label) => {
                return `Password does not match`;
            },
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorMessage: (input, label) => `${label.textContent} is required`,
        },
    ];

    const validateSingleFormGroup = formGroup => {
        const label = formGroup.querySelector('label');
        const input = formGroup.querySelector('input, textarea, select');
        const inputBody = formGroup.querySelector('fieldset');
        const errorContainer = formGroup.querySelector('.errormsg');
        const errorIcon = formGroup.querySelector('.icon-error');
        const successIcon = formGroup.querySelector('.icon-success');
        inputBody.classList.add('border');
        let formGroupError = false;
        for (const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                errorContainer.textContent = option.errorMessage(input, label);
                inputBody.classList.add('border-danger');
                inputBody.classList.remove('border-success')
                errorIcon.classList.remove('d-none')
                successIcon.classList.add('d-none')
                formGroupError = true;
            }
        }

        if (!formGroupError) {
            errorContainer.textContent = '',
            inputBody.classList.add('border-success');
            inputBody.classList.remove('border-danger')
            errorIcon.classList.add('d-none')
            successIcon.classList.remove('d-none')
        }
    };


    Array.from(formElement.elements).forEach(element =>
        element.addEventListener('keyup', event => {
            validateSingleFormGroup(event.srcElement.parentElement.parentElement);
        })
    );
};

validateForm('.validate-form')