const saveCardsForm = document.querySelectorAll(".card-save-form");
saveCardsForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(form.querySelector("input[type=text]").value);
    console.log(form.querySelector("input[type=hidden]").value);

    const fetchObj = {
      grade: form.querySelector("input[type=text]").value,
      tcg_id: form.querySelector("input[type=hidden]").value,
    };
    console.log(fetchObj);
    fetch("/api/connecter", {
      method: "POST",
      body: JSON.stringify(fetchObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log("Saved Card Successfully");
      } else {
        alert("Save failed!");
      }
    });
  });
});
