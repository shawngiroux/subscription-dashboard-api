function validateForm() {
    let password = document.getElementById('password').value.trim();
    let confirm = document.getElementById('confirm').value.trim();

    if (password === confirm) {
        return true;
    }

    document.getElementById('confirm').setCustomValidity(
        "Confirmation password does not match"
    );
    return false;
}