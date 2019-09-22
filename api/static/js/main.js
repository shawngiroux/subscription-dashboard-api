function validateForm() {
    let usernameEle = document.getElementById('username'),
        passwordEle = document.getElementById('password'),
        confirmEle = document.getElementById('confirm');

    let username = usernameEle.value.trim(),
        password = passwordEle.value.trim(),
        confirm = confirmEle.value.trim();

    // Username Validation
    if (username === '') {
        usernameEle.setCustomValidity(
            "Please fill out this field."
        );
    }

    // Confirmation Validation
    if (password === confirm) {
        return true;
    } else {
        confirmEle.setCustomValidity(
            "Confirmation password does not match."
        );
    }
    return false;
}