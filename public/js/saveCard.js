
const sellCardsForm = document.querySelectorAll(".card-save-form");
sellCardsForm.forEach(form=>{
    form.addEventListener("submit", event=>{
        event.preventDefault();
        console.log(form.querySelector("input[type=text]").value);
        console.log(form.querySelector("input[type=hidden]").value);
    });
})