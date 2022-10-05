let params = new URLSearchParams(document.location.search);
let id = params.get("id");

/* Récupérer info produit de l'API par son id */
fetch('http://localhost:3000/api/products/' + id)
.then(function(response) {
    if(response.ok) {
        return response.json()
    }
})
.then(function(canape) {

        let title = document.getElementById('title');
        title.textContent = canape.name;
        /* Récupérer nom du produit par l'id title*/

        let price = document.getElementById('price');
        price.textContent = canape.price;
        /* Récupérer prix du produit par l'id price*/

        let description = document.getElementById('description');
        description.textContent = canape.description;
        /* Récupérer description du produit par l'id description*/

        let img = document.createElement('img')
        img.src = canape.imageUrl
        img.alt = canape.altTxt

        //getElementById() return Element
        //getElementsByClassName return Array
        document.getElementsByClassName('item__img')[0].appendChild(img)

        canape.colors.map(function(color) {
            
            let option = document.createElement('option')
            option.textContent = color
            option.value = color
            
            document.getElementById('colors').appendChild(option)
        })
    
})
.catch(function(error) {
    console.log(error)
})

document.getElementById('quantity').value = 1

/**
 * AJOUT AU PANIER
 * 1. Il faut attacher un evenement click au bouton id addToCart
 * voir la function addEventListner
 */
 const ajouterPanierBouton = document.querySelector("#addToCart")
 ajouterPanierBouton.addEventListener("click", ajouterPanier)


 function ajouterPanier()
 {
    /*
    * 2. sur le click
    * - verifier que l'utilisateur à selectionner une option (sinon afficher un message avec alert())
    * - verifier que l'utilisateur à mis une quantité (min 1 / max 100)
    */
   let color = document.getElementById('colors').value
    if(color == '')
    {
        alert("Veuillez sélectionner une couleur.")
        return
    }

    let quantity = parseInt(document.getElementById('quantity').value)
    if(quantity < 1 || quantity > 100)
    {
        alert("La quantité est incorrect.")
        return
    }
    
    /**
    * 3. Ajouter dans le localStorage les informations de la ligne de panier
    * - une ligne de panier comprend:
    *  - un _id de canape
    *  - une option
    *  - une quantité
    */
    // on compose notre clef (identifiant unique de la ligne de panier) par l'id de canap et sa couleur
    let key = id + color
    let item = localStorage.getItem(key)

    let ligne_de_panier = null
    if(item == null) { //si existe pas dans localstorage
        ligne_de_panier = {
            id: id,
            couleur: color,
            quantite: quantity 
        }
        localStorage.setItem(key, JSON.stringify(ligne_de_panier))
    }
    else { //si existe dans localStorage
        ligne_de_panier = JSON.parse(item)
        ligne_de_panier.quantite += quantity // "1" + "1" = "11"  1 + 1 = 2
        localStorage.setItem(key, JSON.stringify(ligne_de_panier))
    }

    alert("Le canapé est dans la boite !")
 }
