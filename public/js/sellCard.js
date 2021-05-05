const saveTheForms = document.querySelectorAll(".card-sell-form");
saveTheForms.forEach(form=>{
    form.addEventListener("submit", event=>{
        event.preventDefault();
        console.log(form.querySelector("input[type=text]").value);
        console.log(form.querySelector("input[type=hidden]").value);
        console.log(form.querySelector("input[type=date]").value);
    });
})