"use strict";
import fetchData from "./fetchdata.js";
import fetchRandom from "./fetchrandom.js";

/**
 * Först deklareras upp en form och lägger till en eventlyssnare på submit knappen, dock används skickas den
 * inte iväg utan istället tas innehållet från sökrutan och skickas vidare till den importerade funktionen fetchData.
 * Fetch data hämtar sökresultat från imdbapi och när den fått det skickas det vidare till displayDrinks.
 */

const form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchTitle = this.elements.query.value;
  if (!searchTitle.length > 0 && !searchTitle.length < 50) {
    window.alert("Titel - får endast innehålla upp till 50 bokstäver");
  } else fetchData(searchTitle).then(displayDrinks);
});

//Skapar en eventlyssnare på knappen som hämtar slumpad drink.
const supriseButton = document.querySelector("#suprise");

supriseButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetchRandom().then(displayDrinks);
});

/**
 * displayDrinks tar datat som hämtats från fetchData/fetchRandom, och i en loop skapar upp p element med tillhörande text
 * för de resultat som funnits. Eller om man fått ett fel skriver den istället det.
 */

const displayDrinks = (response) => {
  const textArea = document.querySelector("#result");

  if (textArea.hasChildNodes()) {
    textArea.replaceChildren();
  }

  if (!response.drinks) {
    const pElement = document.createElement("p");
    const textNode = document.createTextNode("Nothing found");
    pElement.append(textNode);
    textArea.append(pElement);
  } else {
    for (let i = 0; i < response.drinks.length; i++) {
      const pElement = document.createElement("p");
      const textNode = document.createTextNode(response.drinks[i].strDrink);
      pElement.append(textNode);
      textArea.append(pElement);

      const ingredients = [];
      for (const key in response.drinks[i]) {
        if (key.includes("strIngredient") && response.drinks[i][key]) {
          ingredients.push(response.drinks[i][key]);
        }
      }
      const ingredientsStr = ingredients.join(",");
      const pIngredients = document.createElement("p");
      pIngredients.append(ingredientsStr);
      textArea.append(pIngredients);
    }
  }
};

/* Hantera kontaktformulär */

const bokaBord = document.getElementById("bokaBord");
bokaBord.addEventListener("submit", function (event) {
  let namn = this.elements.namn.value;
  let telefon = this.elements.telefon.value;
  let antal = this.elements.antal.value;
  let tid = this.elements.tid.value;
  let dag = this.elements.dag.value;

  console.log(antal);
  event.preventDefault();
  if (namn && telefon && antal && tid && dag) {
    window.alert(
      "Tack, vi kontaktar er inom kort för att bekräfta er förfrågan."
    );
  } else {
    window.alert("Fyll i alla fält");
  }
});
