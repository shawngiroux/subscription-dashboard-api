function submitRegistrationForm(username, password) {
    let url = "/AccountServices/register";
    let body = {
        username: username,
        password: password
    };
    // TODO do something here to show user that form is being submitted
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        redirect: "follow"
    })
        .then((response) => {
            if (response.status === 400) {
                return response.json().then(err => Promise.reject(err));
            }
            if (response.redirected) {
                window.location.href = response.url;
            }
            return response.json();
        })
        .then(() => {
            let domain = document.domain;
            window.location.href = domain + "/AccountServices/authenticate";
        })
        .catch((err) => {
            let usernameEle = document.getElementById("username");
            invalidateField(usernameEle, err.error);
        });
}

function validateForm() {
    let usernameEle = document.getElementById("username"),
        passwordEle = document.getElementById("password"),
        confirmEle = document.getElementById("confirm");

    let username = usernameEle.value.trim(),
        password = passwordEle.value.trim(),
        confirm = confirmEle.value.trim();

    // Username Validation
    if (username === "") {
        invalidateField(usernameEle, "Please enter in a username");
        return false;
    } else {
        clearValidationField(usernameEle);
    }

    // Password Validation
    if (password === "") {
        invalidateField(passwordEle, "Please enter in a password");
        return false;
    } else {
        clearValidationField(passwordEle);
    }

    // Confirmation Validation
    if (password !== confirm) {
        invalidateField(confirmEle, "Confirmation password does not match");
        return false;
    } else {
        clearValidationField(confirmEle);
    }

    submitRegistrationForm(username, password);
}

function invalidateField(ele, error) {
    ele.setCustomValidity(error);
    ele.reportValidity();
}

function clearValidationField(ele) {
    ele.setCustomValidity("");
}