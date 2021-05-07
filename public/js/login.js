//this script will run on the homepage, and listen for form submissions

//listen for user submitting the login form
document.querySelector("#loginForm").addEventListener("submit", event=>{
event.preventDefault();

//grab the user data from the form and create an object
const fetchObj = {
    email:document.querySelector("#loginEmail").value,
    password:document.querySelector("#loginPassword").value
};
//send the object to the login route
fetch("/login", {
    method: "POST",
    body:JSON.stringify(fetchObj),
    headers:{
        "Content-Type": "application/json"
    }
}).then(res=>{
    console.log(res);
    if(res.ok){
        //let the user know what happened with their request
        console.log("Logged In successfully!");
        location.replace("/dashboard");
    } else {
        alert("Login failed!");
        location.reload();
    }
})
});

//listen for user submitting the sign up form
document.querySelector("#signUpForm").addEventListener("submit", event=>{
    event.preventDefault();

    //create an object with the new user details
    const fetchObj = {
        email:document.querySelector("#signUpEmail").value,
        password:document.querySelector("#signUpPassword").value
    };
    //send the object to the signup route to create a new User
    fetch("/signup", {
        method: "POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            //let the user know what happened with their request and send them to correct page
            console.log("Signed up successfully!");
            location.replace("/dashboard");
        } else {
            alert("Signup failed!");
            location.reload();
        }
    })
});
