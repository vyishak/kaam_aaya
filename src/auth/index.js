export const signup = async user => {
    return await fetch('/user/signup', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err));
};

export const signin = async user => {
    return await fetch('/api/signin', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err));
};

// we are storing the token in localstorage of signed in user
export const authenticate = (token, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(token));
        next();
    }
};

export const signout = async (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
    }
    next();
    return await fetch('/api/signout', {
        method: "GET"
    })
    .then(response => {
        console.log('signout', response)
        return response.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

export const forgotPassword = async email => {
    console.log("email: ", email);
    return await fetch('/api/forgot-password/', {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch('/api/reset-password/', {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
