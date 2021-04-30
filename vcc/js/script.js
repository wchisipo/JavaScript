const isValidEmail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
};

const isValidPhone = (mobile) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(mobile).toLowerCase());
};

const isNumberValid = (field) => {

    let re = /^[0-9]+$/;

    if (!re.test(field)) {
        return false;
    }
    return true;
}

function _id(name) { return document.querySelector(name); }
function _class(name) { return document.querySelectorAll(name); }

let formEl = _id("#form");

// INPUT FIELDS

// Person Details
let persons = [],
	fname = _id("#fname"), sname = _id("#sname"), email = _id("#email"),
    phone = _id("#phone"), position = _id("#phone"),
    choice = _id("#challengePillarType");

// Application Fields
const problem = _id("#problem"), companyReason = _id("#companyReason"),
    whyCompany = _id("#whyCompany"), idealCustomer = _id("#idealCustomer"),
    companyStart = _id("#companyStart"), traction = _id("#traction"),
    revenue = _id("#revenue"), team = _id("#team"), customerAcqusition = _id("#customerAcqusition"),
    whyParticipate = _id("#whyParticipate"), margin = _id("#margin"),
    competitors = _id("#competitors"), competitiveness = _id("#competitiveness"),
    webLink = _id("#webLink"), additional = _id("#additional");

let inputs  = [fname, email, phone, choice];
let numberInputs = [margin, traction, revenue];
let txtAreaMessages = _class(".txtArea");
let inputTxtMessages = _class(".inputText");

txtAreaMessages.forEach((txtMsg) => {inputs.push(txtMsg);});
inputTxtMessages.forEach((inputMsg) => {inputs.push(inputMsg);});

let valid = false;
let isValidOn = false;
let errorHint = _id("#errorHint");

function resetElem(elem){
	elem.classList.remove("invalid");
	elem.nextElementSibling.classList.add("hidden");

}

function invalidate(elem, msg){
	elem.classList.add("invalid");
	elem.nextElementSibling.innerHTML = msg;
	elem.nextElementSibling.classList.remove("hidden");
}
function validate() {
    
    resetElem(choice);
    valid = true;

    inputs.forEach((input) => {
        resetElem(input, "This field can not be empty");
        input.classList.remove("invalid");
        valid = true;

        if (!input.value.trim()) {
            invalidate(input, "This input cannot be empty");
            valid = false;
        }
    });

    numberInputs.forEach((numberInput) => {
        if (!isNumberValid(numberInput.value.trim())) {
            invalidate(numberInput, "Enter numbers only");
            valid = false;
        }
    })

	if (!isValidPhone(phone.value.trim())) {
		invalidate(phone, "Enter valid phone number");
		valid = false;
	}

    if (!isValidEmail(email.value.trim())) {
		invalidate(email, "Enter valid email");
		valid = false;
	}

    txtAreaMessages.forEach((msg) => {
        if (parseInt(msg.value.length) < 200) {
            invalidate(msg, "Message cannot be less 200 characters.");
            valid = false;
        }
    })

    choice.classList.remove("invalid");

    if (choice.value === "Select Challenge Pillar Type") {
        invalidate(choice, "Please Select Challenge Pillar Type")
        valid = false;
    }
    return valid;
}

// Application Array and its object
const apps = [];
function addApp() {
    const app = {
        fname: fname.value, sname: sname.value, email: email.value,
        phone: phone.value, position: position.value,
        challengePillarType: choice.value, problem: problem.value,
        companyReason: companyReason.value, whyCompany: whyCompany.value,
        idealCustomer: idealCustomer.value, companyStart: companyStart.value,
        traction: traction.value, revenue: revenue.value, team: team.value,
        customerAcqusition: customerAcqusition.value,
        whyParticipate: whyParticipate.value, margin: margin.value,
        competitors: competitors.value, competitiveness: competitiveness.value,
        webLink: webLink.value, additional: additional.value
    }

    apps.push(app);

    _id("#apps").textContent = '\n' + JSON.stringify(apps, '\t', 2);
}

formEl.addEventListener("submit", (el) => {
    el.preventDefault();

	isValidOn = true;
    if (validate()) {

        addApp();
        form.reset();
    }
});

choice.addEventListener("change", () => {
    if (!(choice.value === "Select Challenge Pillar Type")) {
        choice.classList.remove("invalid");
        choice.nextElementSibling.classList.add("hidden");
        choice.nextElementSibling.innerHTML = "";
        valid = true;
    }else{
        invalidate(choice, "Please Select Challenge Pillar Type")
        valid = false;
    }
});
_id("button[type='reset']").addEventListener("submit", () => {form.reset();});
inputs.forEach((element) => {
    element.addEventListener("input",() => {
        if (!isValidOn) return;
        resetElem(element);
    });
});