let users = [];

let userName = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("firstPassword");
let confirmPassword = document.getElementById("confirmPassword");
let registerBtn = document.getElementById("registerBtn");
let policyImage = document.getElementById("privacyPolicyImage");

async function registerInit() {
    loadUsers();
}

/**
 * Control the register and load User
 *
 * @param {string} ok - string from the function in the registry
 */
async function loadUsers(ok) {
    try {
        users = JSON.parse(await getItem("users"));
        if (ok === "successfully") {
            openRegistrationModal();
        }
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Registration
 *
 */
async function register() {
    if (password.value === confirmPassword.value) {
        registerBtn.disabled = true;
        generateArrayUsers();
        console.log(users);
        await setItem("users", JSON.stringify(users));
        await loadUsers("successfully");
        resetForm();
    } else {
        document.getElementById("fail-confirm-password").style.color = "#FF8190";
    }
}

function generateArrayUsers() {
    return users.push({
        name: userName.value,
        email: email.value,
        password: password.value,
    });
}

/**
 * Deletet the value of the inputfields
 *
 */
function resetForm() {
    userName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    registerBtn.disabled = false;
    policyImage.src = "assets/img/Desktop/login_signup/checkbox/empty.svg";
}

/**
 * HandleImageFocus of the two Inputfields
 *
 * @param {HTMLElement} passwordField - This is the ID for the respective passwordfield
 * @param {String} imageId - This is the ID for the Image
 */
function handleImageFocus(passwordField, imageId) {
    let passwordImage = document.getElementById(imageId);

    passwordField.addEventListener("click", function () {
        if (passwordField.value === "") {
            passwordImage.src = "./assets/img/Desktop/login_signup/visibility_off.svg";
        }
    });

    passwordField.addEventListener("blur", function () {
        if (passwordField.value === "") {
            passwordImage.src = "./assets/img/Desktop/login_signup/lock.svg";
        }
    });
}
handleImageFocus(password, "imagePassword");
handleImageFocus(confirmPassword, "imageConfirmPassword");

/**
 * Images of visibility - transfer with onclick
 *
 * @param {string} Which - the first letter is capitalized
 * @param {string} which - normaly string
 */
function visibilityOnOffImage(Which, which) {
    let passwordImage = document.getElementById(`image${Which}Password`);
    let password = document.getElementById(`${which}Password`);

    if (password.type === "password") {
        passwordImage.src = "./assets/img/Desktop/login_signup/visibility_on.svg";
        password.type = "text";
    } else {
        password.type = "password";
        passwordImage.src = "./assets/img/Desktop/login_signup/visibility_off.svg";
    }
}

/**
 * Checked the Passwords
 *
 */
function checkConfirmPassword() {
    let firstPassword = password.value.trim();
    let secondPassword = confirmPassword.value.trim();
    let failConfirmPassword = document.getElementById("fail-confirm-password");

    if (!firstPassword.startsWith(secondPassword)) {
        failConfirmPassword.style.color = "#FF8190";
    } else {
        failConfirmPassword.style.color = "transparent";
    }
}

/**
 * Checked confirm Privacy Policy and enabled Button
 *
 */
function confirmPrivacyPolicy() {
    let emptyImagePath = "assets/img/Desktop/login_signup/checkbox/empty.svg";

    if (policyImage.src.endsWith(emptyImagePath)) {
        policyImage.src = "assets/img/Desktop/login_signup/checkbox/hover_checked.svg";
        registerBtn.disabled = false;
    } else {
        policyImage.src = emptyImagePath;
        registerBtn.disabled = true;
    }
}

/**
 * Successfully Registration
 *
 */
function openRegistrationModal() {
    let modal = document.getElementById("registrationModal");
    modal.style.display = "block";

    setTimeout(function () {
        window.location.href = "index.html";
    }, 2000);
}
