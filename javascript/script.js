let MINIMUM_SIZE = 4;
let MAXIMUM_SIZE = 92;


function getCharTypes() {
    const uppercase = document.querySelector("#include_uppercase").checked;
    const lowercase = document.querySelector("#include_lowercase").checked;
    const number = document.querySelector("#include_numbers").checked;
    const symbol = document.querySelector("#include_symbols").checked;

    const charTypes = [];

    if(uppercase) {
        charTypes.push("QWERTYUIOPLKJHGFDSAMNBVCXZ");
    }

    if(lowercase) {
        charTypes.push("qwertyuioplkjhgfdsazxcvbnm");
    }

    if(number) {
        charTypes.push("0192837465");
    }

    if(symbol) {
        charTypes.push("!@#$%¨&*()-_=+´[]{}~^/?;:.,\\'\"");
    } 

    return charTypes;
}

function getPasswordSize() {
    const size = document.querySelector("#size").value;

    if(checkPasswordSize(size)) {
        return size;
    }

    let errorMessage = `Tamanho inválido, digite um número entre ${MINIMUM_SIZE} e ${MAXIMUM_SIZE}`;
    let backgroundColor = "#warning";
    message(errorMessage, backgroundColor);
}

function checkPasswordSize(size) {
    if(isNaN(size) || size < MINIMUM_SIZE || size > MAXIMUM_SIZE) {
        return false;
    }
    return true;
}

function message(text, status = "success") {
    Toastify({
        text: text,
        duration: 3500,
        style: {
            background: status === "success" ? "#84cc16" : "#dc2626",
            boxShadow: "none"
        }
    }).showToast();
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size, charTypes) {
    let passwordGenerated = "";

    while(passwordGenerated.length < size) {
        passwordGenerated += randomCharType(charTypes);
    }

    return passwordGenerated;
}

document.querySelector("#generate").addEventListener("click", function () {
    const size = getPasswordSize();
    const charTypes = getCharTypes();

    if(!size) {
        return;
    }
    if(!charTypes.length) {
        message("Selecione algum tipo de caractere!", "warning");
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector("#password_container").classList.add("show");
    document.querySelector("#password").textContent = passwordGenerated;
});

document.querySelector("#copy").addEventListener("click", function () {
    let password = document.querySelector("#password").textContent;
    navigator.clipboard.writeText(password);
    message("Senha copiada com sucesso!");
});