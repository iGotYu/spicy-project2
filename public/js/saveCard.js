//this script will get called from the search page, we need to listen for submit events that come from each modal
const saveCardsForm = document.querySelectorAll(".card-save-form");
saveCardsForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //creat an object with the data we need to build a connecter between the user and the selected card
    const fetchObj = {
      grade: form.querySelector("input[type=text]").value,
      tcg_id: form.querySelector("input[type=hidden]").value,
    };
    //send the object to our POST route to create a connecter
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
        //let the user know what happened with their request
        console.log("Saved Card Successfully");
        document.location.replace(`/dashboard`);
      } else {
        alert("Save failed!");
      }
    });
  });
});
