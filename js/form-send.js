document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll("._form");
    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                formSubmit(e, form);
            });

            // Add event listener to the submit button to check if the form has _form_calc class
            document.addEventListener('click', function(e){
                if(!e.target.matches('.js-form-submit')){}
                else{
                    e.preventDefault(); 
                    var closestForm = e.target.closest(".frame").querySelector("._form");
                    formSubmit(e, closestForm);
                }
            })

            async function formSubmit(e, form) {
                e.preventDefault(); 
                let error = formValidate(form);
                if (error != 0) {
                    // "Form has errors";
                    if (window.matchMedia('(max-width: 767px)').matches) {
                        const firstErrorElement = form.querySelector('.req_error, .error_error');
                        if (firstErrorElement) {
                            firstErrorElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }
                    
                } else {
                    // "Form is valid";
                    form.submit(); // Submit the form
                }
            }
        }
    });

    function formValidate(form) {
        let error = 0;
        let formReq = form.querySelectorAll('._req'); 

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemove_Req_Error(input); 

            if (input.classList.contains('_email')) {
                if (input.value.trim() == '') {
                    formAddReq(input);
                    error++;
                } else if (emailTest(input)) {
                    formAddError(input); 
                    error++;
                }
            }
            else if (input.classList.contains('_phone')) {
                if (input.value.trim() == '') {
                    formAddReq(input);
                    error++;
                } else if (!isPhoneLengthValid(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else {
                if (input.value === '') {
                    formAddReq(input); 
                    error++;
                }
            }
        }

        return error; 
    }

    function isPhoneLengthValid(input) {
        return input.value.replace(/\D/g, '').length === 11;
    }

    function formAddReq(input) {
        input.parentElement.classList.add('req_error');
    }

    function formAddError(input) {
        input.parentElement.classList.add('error_error');
    }

    function formRemove_Req_Error(input) {
        input.parentElement.classList.remove('req_error');
        input.parentElement.classList.remove('error_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // Phone mask 
    const inputPhoneMask = document.querySelectorAll(".phone-mask");
    inputPhoneMask.forEach((input) => {
        const prefixNumber = (str) => {
            if (str === "7") {
                return "7 (";
            }
            if (str === "8") {
                return "8 (";
            }
            if (str === "9") {
                return "7 (9";
            }
            return "7 (";
        };
        input.addEventListener("input", (e) => {
            const value = input.value.replace(/\D+/g, "");
            const numberLength = 11;

            let result;
            if (input.value.includes("+8") || input.value[0] === "8") {
                result = "";
            } else {
                result = "+";
            }
            for (let i = 0; i < value.length && i < numberLength; i++) {
                switch (i) {
                    case 0:
                        result += prefixNumber(value[i]);
                        continue;
                    case 4:
                        result += ") ";
                        break;
                    case 7:
                        result += "-";
                        break;
                    case 9:
                        result += "-";
                        break;
                    default:
                        break;
                }
                result += value[i];
            }
            input.value = result;
        });
    });
});
