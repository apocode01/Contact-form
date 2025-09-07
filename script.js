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
            if (!field.checkValidity()) {
                validForm = false;
                console.log("no consent");
            }
        } 
        else if (field.type === "email") {
            if (!field.value.trim()) {
                validForm = false;
                console.log("email required");  
            }
            if (!field.checkValidity()) {
                validForm = false;
                console.log("email wrong");
            }
            data[field.name] = field.value;
        } 
        else {
            if (!field.checkValidity()) {
                validForm = false;
                console.log(`${field.name} required`);
            }
            data[field.name] = field.value;
        }
    }

    const radios = event.target.querySelectorAll(`input[type="radio"]`);
    let selectedQuery = false;

    for (const radio of radios) {
        if (radio.checked) {
            selectedQuery = true;
            data[radio.name] = radio.value;
        }
    }

    if (!selectedQuery) {
        console.log("query type not selected")
        validForm = false;
    }
    
    console.log(`valid form: ${validForm}`);
    if (validForm) {
        console.log(data);
    }
});