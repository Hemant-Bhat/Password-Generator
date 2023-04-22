const passInput = document.getElementById("password-input");
const chkLength = document.getElementById("chkLength");
const chkNumber = document.getElementById("chkNumber");
const chkLowerCase = document.getElementById("chkLowerCase");
const chkUpperCase = document.getElementById("chkUpperCase");
const chkSymbol = document.getElementById("chkSymbol");
const inputLength = document.getElementById("inputLength");
const spnLength = document.getElementById("spnLength");
const errorText = document.getElementById("error-text");

const btnGenerate = document.getElementById("btnGenerate");
const btnCopyPassword = document.getElementById("copyPassword");

const lnkGererate = document.getElementById("lnkGererate");
const lnkTester = document.getElementById("lnkTester");

const required = [
    {regEx: /[A-Z]/, name: "UpperCase"},    // Checks A-Z capital letters
    {regEx: /[a-z]/, name: "LowerCase"},    // Checks a-z small letters
    {regEx: /[0-9]/, name: "Number"},   // Checks 0-9 numbers
    {regEx: /\w{8}/, name: "Length"},   // Checks value length to 8
    {regEx: /[^A-Za-z0-9]/, name: "Symbol"} // Check any special character +,"-_&^%$#@!
]

function changeCheckboxState(state){
    var checkboxes = document.getElementById("required-list").children;
    [...checkboxes].forEach((i) => {
        i.firstElementChild.disabled = state === "disabled" ? true : false;
    })
}

function generatePassword(length){ 
    errorText.innerText = "";
    if(!chkNumber.checked && !chkUpperCase.checked && !chkLowerCase.checked && !chkSymbol.checked){
        errorText.innerText = "Select at least a rule";
        return "";
    }

    charset = "";
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    symbols = "!@#$%^&*";
    numbers = "1234567890";
    length = 8;
    password = "";



    if(chkLength.checked && inputLength.validity.valid){
        length = Number(inputLength.value);
    }

    while(password.length < length){
        if(chkNumber.checked){
            password += numbers.charAt(Math.floor(Math.random() * numbers.length));
            charset += numbers;
        }

        if(chkUpperCase.checked){
            password += characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase();
            charset += characters.toUpperCase();
        }
    
        if(chkLowerCase.checked){
            password += characters.charAt(Math.floor(Math.random() * characters.length)).toLowerCase();
            charset += characters.toLowerCase();
        }

        if(chkSymbol.checked){
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
            charset += symbols;
        }

        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;

}

btnGenerate.addEventListener("click", function(){
    passInput.value = generatePassword();
    passInput.dispatchEvent(new Event("change"));
})

passInput.addEventListener("input", function(e){

    // console.log(e.target.value);
    required.forEach((d) => {
        var input = e.target.value;
        var isValid = d.regEx.test(input);
        console.log(isValid);
        if(isValid){
            document.getElementById("chk" + d.name).checked = true;
        }else{
            document.getElementById("chk" + d.name).checked = false;
        }
    })
})

passInput.addEventListener("change", function(){
    btnCopyPassword.disabled = this.value ? false : true;
})

lnkGererate.addEventListener("click", function(){
    const tabsList = document.getElementById("tabsList").children;
    [...tabsList].map(element => {
        element.firstElementChild.classList.remove("active");
    })
    this.classList.add("active");
    errorText.innerText = "";
    btnGenerate.style.display = "inline-block";
    inputLength.style.display = "inline-block";
    btnCopyPassword.style.display = "inline-block";
    inputLength.disabled = true;
    btnCopyPassword.disabled = true;
    passInput.disabled = true;
    spnLength.style.display = "none";

    changeCheckboxState("enabled");
})

lnkTester.addEventListener("click", function(){
    const tabsList = document.getElementById("tabsList").children;
    [...tabsList].map(element => {
        element.firstElementChild.classList.remove("active");
    })
    this.classList.add("active");
    errorText.innerText = "";
    btnGenerate.style.display = "none";
    inputLength.style.display = "none";
    spnLength.style.display = "inline-block";
    btnCopyPassword.style.display = "none";
    passInput.disabled = false;
    passInput.focus();



    changeCheckboxState("disabled");
})

chkLength.onchange = function(){
    inputLength.disabled = (this.checked) ? false : true;
}




btnCopyPassword.addEventListener("click", function(){
    if(navigator.clipboard){
        navigator.clipboard.writeText(passInput.value).then((v)=> {
            btnCopyPassword.innerText = "Copied";
            var id = setTimeout(() => {
                btnCopyPassword.innerText = "Copy";
                clearTimeout(id);
            },2000)
        });
    }else{
        errorText.innerText = "Something went wrong";
    }
})


lnkGererate.click();