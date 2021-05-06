const sellCardsForm = document.querySelectorAll(".card-sell-form");
sellCardsForm.forEach(form=>{
    form.addEventListener("submit", event=>{
        event.preventDefault();

        console.log(form.querySelector("input[type=text]").value);
        console.log(form.querySelector("input[type=hidden]").value);
        console.log(form.querySelector("input[type=date]").value);

        const fetchObj = {
            sale: form.querySelector("input[type=text]").value,
            pokemon_id: form.querySelector("input[type=hidden]").value,
            sold: true,
            saleDate: form.querySelector("input[type=date]").value,
          };
          //console.log(fetchObj);
          fetch("/api/connecter", {
            method: "PUT",
            body: JSON.stringify(fetchObj),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              console.log("Saved Sale Successfully");
              document.location.replace(`/dashboard`);
            } else {
              alert("Sale failed!");
            }
          });
        });
 });


function formatTime(time) {
return time.toLocaleTimeString();
};