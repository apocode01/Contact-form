const form = document.getElementById(`form`);
const queryButtons = form.querySelectorAll(`.query`);

queryButtons.forEach(queryBtn => {
    queryBtn.addEventListener('click', () => {
        queryButtons.forEach(qBtn => {
            qBtn.classList.remove(`active`);
        })

        const radioBtn = queryBtn.querySelector(`input[type="radio"]`);
        radioBtn.checked = true;
        queryBtn.classList.add(`active`);
    })
})

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const data = {};
    const fields = event.target.querySelectorAll(`input[type="text"], input[type="email"], input[type="checkbox"], textarea`);
    
    let validForm = true;

    for (const field of fields) {
        if (field.type === "checkbox") {
            const errorMessage = field.parentElement.querySelector('.errorMessage');
            if (!field.checkValidity()) {
                errorMessage.classList.add("active");
            }
            else {
                errorMessage.classList.remove("active");
            }
        } 
        else if (field.type === "email") {
            const errorMessage = field.parentElement.querySelectorAll('.errorMessage');
            if (!field.value.trim()) {
                validForm = false;
                errorMessage[0].classList.add("active"); 
                errorMessage[1].classList.remove("active");
            }
            else if (!field.checkValidity()) {
                validForm = false;
                errorMessage[0].classList.remove("active");
                errorMessage[1].classList.add("active"); 
            }
            else {
                errorMessage[0].classList.remove("active");
                errorMessage[1].classList.remove("active"); 
            }
            data[field.name] = field.value;
        } 
        else {
            const errorMessage = field.parentElement.querySelector('.errorMessage');
            if (!field.checkValidity()) {
                validForm = false;
                errorMessage.classList.add("active");
            }
            else {
                errorMessage.classList.remove("active");
            }
            data[field.name] = field.value;
        }
    }

    const queryContainer = event.target.querySelector(`.queryContainer`);
    const radios = queryContainer.querySelectorAll(`input[type="radio"]`);
    let selectedQuery = false;

    for (const radio of radios) {
        if (radio.checked) {
            selectedQuery = true;
            data[radio.name] = radio.value;
        }
    }

    const queryErrorMessage = queryContainer.querySelector(`.errorMessage`);
    if (!selectedQuery) {
        validForm = false;
        queryErrorMessage.classList.add("active");
    }
    else {
        queryErrorMessage.classList.remove("active");
    }
    
    console.log(`valid form: ${validForm}`);
    if (validForm) {
        console.log(data);
    }
});