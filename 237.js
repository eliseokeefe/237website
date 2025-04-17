document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".loginButton button");

    loginButton.addEventListener("click", () => {
        const clientId = "YOUR_CLIENT_ID"; //  GitHub OAuth app client ID
        const redirectUri = "http://localhost:3000/callback"; // update w/ callback URL
        const scope = "read:user user:email";

        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

        window.location.href = githubAuthUrl;
    });
});


if (window.location.pathname === "/callback") {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
        // Exchange code for an access token (do on backend)
        fetch("http://localhost:3000/exchange-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        })
            .then((response) => response.json())
            .then((data) => {
                const accessToken = data.access_token;

                
                return fetch("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            })
            .then((response) => response.json())
            .then((user) => {
                // Save the username 
                localStorage.setItem("username", user.login);
                console.log("Logged in as:", user.login);
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
    }
}
  