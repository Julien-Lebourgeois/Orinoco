// Construction de la requête AJAX pour la page produit

const ajax = {

  oneitem : function(id) {

    var item;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            item = JSON.parse (this.responseText);
        }
    };

    xhttp.open("GET", "http://localhost:3000/api/cameras/" + id , false);
    xhttp.send();

    return item;
  }
};

export {ajax};