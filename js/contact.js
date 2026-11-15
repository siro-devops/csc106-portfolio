/* ============================================
   Contact Form Validation
   Demonstrates: event handling, form validation,
   DOM manipulation, dynamic content updates
   ============================================ */

// ---------- DOM references ----------
const form         = document.getElementById('contact-form');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const phoneInput   = document.getElementById('phone');
const messageInput = document.getElementById('message');
const successMsg   = document.getElementById('success-msg');

// ---------- Helper: show / hide an error ----------
function setError(inputEl, errorEl, show) {
    if (show) {
        errorEl.classList.add('show');
        inputEl.style.borderColor = '#d32f2f';
    } else {
        errorEl.classList.remove('show');
        inputEl.style.borderColor = '#ccc';
    }
}

// ---------- Validation rules ----------
function validateName() {
    const ok = nameInput.value.trim().length > 0;
    setError(nameInput, document.getElementById('name-error'), !ok);
    return ok;
}

function validateEmail() {
    // simple but effective email pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = pattern.test(emailInput.value.trim());
    setError(emailInput, document.getElementById('email-error'), !ok);
    return ok;
}

function validatePhone() {
    // digits only, at least 7 digits
    const pattern = /^\d{7,}$/;
    const ok = pattern.test(phoneInput.value.trim());
    setError(phoneInput, document.getElementById('phone-error'), !ok);
    return ok;
}

function validateMessage() {
    const ok = messageInput.value.trim().length > 0;
    setError(messageInput, document.getElementById('message-error'), !ok);
    return ok;
}

// ---------- Live validation: as the user types ----------
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
messageInput.addEventListener('input', validateMessage);

// ---------- Submit handler ----------
form.addEventListener('submit', function (event) {
    event.preventDefault();          // prevent page reload

    // run all validators (don't short-circuit, so all errors show at once)
    const nameOK    = validateName();
    const emailOK   = validateEmail();
    const phoneOK   = validatePhone();
    const messageOK = validateMessage();

    if (nameOK && emailOK && phoneOK && messageOK) {
        successMsg.classList.add('show');
        form.reset();

        // hide success message after 4 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 4000);
    } else {
        successMsg.classList.remove('show');
    }
});