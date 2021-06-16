// Méthode Fetch pour récupérer les données de l'API

async function myFetch(){
    var data;
    await fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(response => data = JSON.stringify(response));
    return data
}


// Affichage des données récupérées

myFetch().then(function(data) {

    let cameras = JSON.parse(data)

    cameras.forEach(element => {
        
        var container = document.getElementById("container");

        var article = document.createElement("div");
        container.appendChild(article);

        var lien = document.createElement ("a");
        lien.setAttribute ("href", "produit.html?id=" + element._id);
        article.appendChild (lien);
        lien.innerHTML = "Selectionner";

        var titre = document.createElement("h3");
        article.appendChild (titre);
        titre.innerHTML = element.name;
        
        var price = document.createElement ("span");
        article.appendChild (price);
        price.innerHTML = element.price/100 + " " + "€";

        var img = document.createElement ("img");
        img.setAttribute ("src", element.imageUrl);
        img.setAttribute ("class", "imgarticle");
        article.appendChild (img);
    })
});