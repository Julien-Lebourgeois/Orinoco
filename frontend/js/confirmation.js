// ::::::::::::::::::::::    Récupération du localstorage    ::::::::::::::::::::::::::
const numCmd = JSON.parse(localStorage.getItem("panier"));


// ::::::::::::::::::::::    Affichage du numéro de commande ::::::::::::::::::::::::::
if (numCmd == null) {
    var erreur = document.getElementById("h1");
    erreur.innerHTML = "Une erreur s'est produite, votre commande n'a pas été prise en compte.";
}
else {
    var merci = document.getElementById("h1");
    merci.innerHTML = "Votre commande :" + " " + numCmd + " a bien été prise en compte.";
}


// ::::::::::::::::::::    Vidage du localStorage    :::::::::::::::::::::::::::::::

localStorage.clear();


