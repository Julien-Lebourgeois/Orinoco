// ::::::::::::::::::::::    Récupération du localstorage    ::::::::::::::::::::::::::

const articles = JSON.parse(localStorage.getItem("panier"));


// variable pour calculer le total du panier
var totalPrix = 0;


// :::::::::::::::::::::::    Boucle pour ajout des produits ajoutés au panier    ::::::::::::::::::::::::::::::::
articles.forEach(function(element, index, array) {
    var item;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            item = JSON.parse (this.responseText);
        }
    };

    xhttp.open("GET", "http://localhost:3000/api/cameras/" + element , false);
    xhttp.send();


    // Récapitulatif des objets ajoutés au panier

    var container = document.getElementById("containerpanier");

    var containerProduit = document.createElement("div");
    containerProduit.setAttribute("class", "container_produit");
    container.appendChild(containerProduit);


    // Création du container pour y loger l'image

    var article = document.createElement("div");
    containerProduit.appendChild(article);
    
    var img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    article.appendChild(img);

    
    // Création du container pour y loger le nom et descriptif

    var info = document.createElement("div");
    containerProduit.appendChild(info);

    var name = document.createElement("h2");
    info.appendChild(name);
    name.innerHTML = item.name;

    var descriptif = document.createElement("p");
    info.appendChild(descriptif);
    descriptif.innerHTML = item.description;


    // Création du container pour y loger le prix

    var cout = document.createElement("div");
    containerProduit.appendChild(cout);

    var prix = document.createElement("p");
    prix.setAttribute("id", "prix");
    cout.appendChild(prix);
    prix.innerHTML = item.price/100 + " €";


    // Création du boutton supprimer

    var supprimer = document.createElement("div");
    supprimer.setAttribute("id", "sup_container")
    containerProduit.appendChild(supprimer);

    var btnSupprimer = document.createElement("input");
    btnSupprimer.setAttribute("id", "btn_sup");
    btnSupprimer.setAttribute("value", "Supprimer");
    btnSupprimer.setAttribute("type", "button");
    supprimer.appendChild(btnSupprimer);
    
    // Calcul du montant total du panier

    totalPrix = totalPrix += item.price/100;
    

    // :::::::::::::::::    Boutton supprimer un item    ::::::::::::::::::::::

    btnSupprimer.addEventListener ("click", function(){
        articles.splice(index, 1);
        var panierString = JSON.stringify(articles);
        localStorage.setItem("panier", panierString);
        location.reload()
    });

});


// :::::::::::::::::    Afficher le total du prix dans le panier    ::::::::::::::::::::::

var container = document.getElementById("containerpanier");

var containerPrix = document.createElement("div");
container.appendChild(containerPrix);

var affichagePrix = document.createElement ("p");
affichagePrix.setAttribute("id", "totalPrix");
containerPrix.appendChild(affichagePrix);
affichagePrix.innerHTML = "Total de votre panier : " + totalPrix + " €";


// ::::::::::::::::::::    partie du formulaire    ::::::::::::::::::::::::::

submit.addEventListener("click", function(event){

    event.preventDefault();

    var valNom = document.getElementById("nom").value;
    var valPrenom = document.getElementById("prenom").value;
    var valAdresse = document.getElementById("adresse").value;
    var valCP = document.getElementById("codePostal").value;
    var valVille = document.getElementById("ville").value;
    var valEmail = document.getElementById("email").value;


    //REGEX

    var nomRegex = /^[a-zA-Z]/;
    var prenomRegex = /^[a-zA-Z]/;
    var adresseRegex = /([0-9]*) ?([a-zA-Z,\. ]*)/g;
    var CPRegex = /([0-9]{5})/;
    var villeRegex = /^[a-zA-Z]/;
    var emailRegex = /.+@.+\..+/;

    if(nomRegex.test(valNom) == false) {
        alert ("veuillez entrer un nom valide");
        return false;
    }
    if(prenomRegex.test(valPrenom) == false) {
        alert ("veuillez entrer un prénom valide");
        return false;
    }
    if(adresseRegex.test(valAdresse) == false) {
        alert ("veuillez entrer une adresse valide");
        return false;
    }
    if(CPRegex.test(valCP) == false) {
        alert ("veuillez entrer un code postal valide");
        return false;
    }
    if(villeRegex.test(valVille) == false) {
        alert ("veuillez entrer une ville valide");
        return false;
    }
    if(emailRegex.test(valEmail) == false) {
        alert ("veuillez entrer un E-mail valide");
        return false;
    }

    var InfoForm = {
        "address": document.getElementById("adresse").value,
        "CP": document.getElementById("codePostal").value,
        "city": document.getElementById("ville").value,
        "email": document.getElementById("email").value,
        "firstName": document.getElementById("prenom").value,
        "lastName": document.getElementById("nom").value,
    };
    

    // Création de la variable contact contenant les infos du formulaire & articles
    
    var contact = {
        "contact" : InfoForm,
        "products": articles
    };


    // Envoi de la requette AJAX POST asynchrone

    var response;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            response = this.responseText;
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/cameras/order", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(contact));


    // Récupération de la réponse, passage au format JS et ajout orderId à localStorage
    
    var responseJS = JSON.parse(response);
    var numCmd = responseJS.orderId;
    var numCmdString = JSON.stringify(numCmd);
    localStorage.setItem("panier", numCmdString);


    // Redirection sur la page de confirmation

    window.location.href = "confirmation.html";
});