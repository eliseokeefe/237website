import React from "react";

class App extends React.Component {
  handleGitHubLogin = () => {
    const clientId = "CLIENT_ID"; // replace with GitHub OAuth client ID
    const redirectUri = "http://localhost:3000/callback";
    const scope = "read:user user:email";
    // Update with backend 
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = githubAuthUrl;
  };

  // setUserInfo definition 
  setUserInfo = (
    id,
    username,
    name,
    userToken,
    classes,
    admin,
    disableAudioAlerts
  ) => {
    this.setState({
      id,
      username,
      name,
      userToken,
      tokenTime: Date.now(),
      classes,
      admin,
      disableAudioAlerts,
    });
  };

  // componentDidMount() declaration 
  componentDidMount() {
    if (window.location.pathname === "/callback") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        fetch("http://localhost:3000/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })
          .then((res) => res.json())
          .then((data) => {
            const accessToken = data.access_token;

            return fetch("https://api.github.com/user", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
          .then((res) => res.json())
          .then(async (user) => {
            const username = user.login;

            const response = await fetch("http://localhost:3000/user-info", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username }),
            });

            const userData = await response.json();

            // setUserInfo defined 
            this.setUserInfo(
              userData.id,
              username,
              userData.name,
              userData.token,
              userData.classes || [],
              userData.admin || false,
              userData.disableAudioAlerts || false
            );
          })
          .catch((error) => {
            console.error("GitHub login error:", error);
          });
      }
    }
  }

  // render with login button
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
      </div>
    );
  }
}

export default App;
