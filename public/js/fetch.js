const urlToFetch = 'https://api.pokemontcg.io/v2/cards?q=name:"Aggron"';

fetch(urlToFetch, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "7397e20d-407f-4487-b7a4-e70011172529"
  },
})
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.data.length; i++) {
      const pokemonData = data.data[i];
    //   console.log(pokemonData)
      const fetchObj = {
        name: pokemonData.name,
        subtype1: pokemonData.subtypes[0],
        subtype2: pokemonData.subtypes[1],
        image_url: pokemonData.images.small,
        tcgplayer_url: pokemonData.tcgplayer.url,
        priceLow: pokemonData.tcgplayer.prices.holofoil.low,
        priceMed: pokemonData.tcgplayer.prices.holofoil.mid,
        priceHigh: pokemonData.tcgplayer.prices.holofoil.high,
        type1: pokemonData.types[0],
        type2: pokemonData.types[1],
      };
      console.log(fetchObj);
    }
  });