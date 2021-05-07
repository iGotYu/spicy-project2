const sellCardsForm = document.querySelectorAll(".card-sell-form");

//this script will get called for the modals in the user dashboard, we need to listen for possible submits on every modal
sellCardsForm.forEach(form=>{
    form.addEventListener("submit", event=>{
        event.preventDefault();

        //create an object containing all the data we need to update the correct Connecter 
        const fetchObj = {
            sale: form.querySelector("input[type=text]").value,
            pokemon_id: form.querySelector("input[type=hidden]").value,
            sold: true,
            saleDate: form.querySelector("input[type=date]").value,
          };
          //call our put route and give it our update data
          fetch("/api/connecter", {
            method: "PUT",
            body: JSON.stringify(fetchObj),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            //let the user now if the update was successful
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