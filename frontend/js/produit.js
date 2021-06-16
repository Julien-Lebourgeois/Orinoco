import {ajax} from "/js/modules/ajax.js";


// récupération de l'ID dans l'URL //

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// récupération des données du produits via l'ID //

var item = ajax.oneitem(id);


// céation des variables pour afficher les données dans le HTML //

var titreProduit = document.getElementById ("titre_produit");
var imgProduit = document.getElementById ("img_produit");
var description = document.getElementById ("description");
var lentilles = document.getElementById ("choix");
var prix = document.getElementById ("prix");


// intégrations des données dans le HTML via les variables ci-dessus //

titreProduit.innerHTML = item.name;
imgProduit.setAttribute ("src", item.imageUrl);
description.innerHTML = item.description;
prix.innerHTML = item.price/100 + " €";


// boucle pour intégrer les lentilles dans les options de personnalisation //
for (var i = 0; i < item.lenses.length; i++) {
    var option = document.createElement("option");
    lentilles.appendChild(option);
    option.textContent = item.lenses[i];
    option.value = item.lenses[i];
}


// Partie localStorage pour la fonction d'ajout des produits au panier //

document.getElementById("ajout_panier").addEventListener("click", function() {
    if(localStorage.getItem("panier") == null) {
        var panier = [id];
        var panierString = JSON.stringify(panier);
        localStorage.setItem("panier", panierString); 
    }
    else{
        var local = localStorage.getItem("panier");
        var unString = JSON.parse(local);
        unString.push(id);
        var panierString = JSON.stringify(unString);
        localStorage.setItem("panier", panierString); 
    }
});