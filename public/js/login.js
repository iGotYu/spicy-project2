document.querySelector("#loginForm").addEventListener("submit", event=>{
event.preventDefault();

const fetchObj = {
    email:document.querySelector("#loginEmail").value,
    password:document.querySelector("#loginPassword").value
};
console.log(fetchObj);

fetch("/login", {
    method: "POST",
    body:JSON.stringify(fetchObj),
    headers:{
        "Content-Type": "application/json"
    }
}).then(res=>{
    console.log(res);
    if(res.ok){
        console.log("Logged In successfully!");
        location.replace("/dashboard");
    } else {
        alert("Login failed!");
        location.reload();
    }
})
});

document.querySelector("#signUpForm").addEventListener("submit", event=>{
    event.preventDefault();

    const fetchObj = {
        email:document.querySelector("#signUpEmail").value,
        //userName:document.querySelector("#signUpName").value,
        password:document.querySelector("#signUpPassword").value
    };
    console.log(fetchObj);

    fetch("/signup", {
        method: "POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("Signed up successfully!");
            location.replace("/dashboard");
        } else {
            alert("Signup failed!");
            location.reload();
        }
    })
});
