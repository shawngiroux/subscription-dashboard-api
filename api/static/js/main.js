function submitLoginForm(username, password) {
    let url = "/AccountServices/authenticate";
    let body = {
        username: username,
        password: password
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // TODO redirect user with token
            console.log(response);
        });
}

function submitRegistrationForm(username, password) {
    let url = "/AccountServices/register";
    let body = {
        username: username,
        password: password
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (response.status === 400) {
                return response.json().then(err => Promise.reject(err));
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

function validateForm(type) {
    let usernameEle = document.getElementById("username"),
        passwordEle = document.getElementById("password"),
        confirmEle = document.getElementById("confirm");

    let username = usernameEle.value.trim(),
        password = passwordEle.value.trim(),
        confirm = confirmEle !== null ? confirmEle.value.trim() : null;

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
    if (confirm !== null && password !== confirm) {
        invalidateField(confirmEle, "Confirmation password does not match");
        return false;
    } else {
        clearValidationField(confirmEle);
    }

    if (type === "login") {
        submitLoginForm(username, password);
    } else if (type == "register") {
        submitRegistrationForm(username, password);
    }
}

function invalidateField(ele, error) {
    ele.setCustomValidity(error);
    ele.reportValidity();
}

function clearValidationField(ele) {
    if (ele !== null) {
        ele.setCustomValidity("");
    }

}
