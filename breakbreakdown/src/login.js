handleGoogleLogin() {
    loginWithGoogle()
        .catch(function (error) {
            alert(error); // or show toast
            localStorage.removeItem(firebaseAuthKey);
        });
    localStorage.setItem(firebaseAuthKey, "1");
}

firebaseAuth().onAuthStateChanged(user => {
    if (user) {
        console.log("User signed in: ", JSON.stringify(user));

        localStorage.removeItem(firebaseAuthKey);

        // here you could authenticate with you web server to get the
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem(appTokenKey, user.uid);

        // store the token
        this.props.history.push("/app/home")
    }
});
