/**
 * 1. Parcourir les lignes de panier dans le localStorage
 *  a/ On recupere pour chaque ligne de panier les informations depuis l'api
 *  b/ construire dynamiquement les elements HTML avec les informations de l'api
 *  c/ Calcul des totaux = Prix et quantité
 *  d/ Suppression d'une ligne du panier
 *  e/ Modification de la quantité d'une ligne du panier
 */

console.log(localStorage.length)

let total_prix = 0
let total_quantite = 0

for (var i = 0; i < localStorage.length; i++){
    console.log(i)
    console.log(localStorage.key(i))
    let key = localStorage.key(i)
    console.log(localStorage.getItem(key))
    JSON.parse(localStorage.getItem(key))
    console.log(JSON.parse(localStorage.getItem(key)))
    let ligne_de_panier = JSON.parse(localStorage.getItem(key))
    console.log(ligne_de_panier)
    let couleur_canape = ligne_de_panier.couleur
    console.log(couleur_canape)
    let identifiant = ligne_de_panier.id
    console.log(identifiant)
    let quantity = ligne_de_panier.quantite
    console.log("qty "+ quantity)

    fetch('http://localhost:3000/api/products/' + identifiant)
    .then(function(response) {
     if(response.ok) {
         return response.json()
        }
    })
    .then(function(canape) {
        console.log(canape)

        let article = document.createElement('article')
        article.className = 'cart__item'
        article.dataset.id = identifiant
        article.dataset.color = couleur_canape
    
        let div_1 = document.createElement('div')
        div_1.className = 'cart__item__img'
        article.appendChild(div_1)
    
        let img = document.createElement('img')
        img.src = canape.imageUrl
        img.alt = canape.altTxt
        div_1.appendChild(img)
    
        let div_2 = document.createElement('div')
        div_2.className = 'cart__item__content'
    
        article.appendChild(div_2)

        let div_3 = document.createElement('div')
        div_3.className = 'cart__item__content__description'
        div_2.appendChild(div_3)
    
        let titre_h2 = document.createElement('h2')
        titre_h2.textContent = canape.name
        div_3.appendChild(titre_h2)
    
        let p_1= document.createElement('p')
        p_1.textContent = couleur_canape
        div_3.appendChild(p_1)
    
        let p_2 = document.createElement('p')
        p_2.textContent = canape.price + '€'
        div_3.appendChild(p_2)
    
        let div_4 = document.createElement('div')
        div_4.className = 'cart__item__content__settings'
    
         div_2.appendChild(div_4)

        let div_5 = document.createElement('div')
        div_5.className = 'cart__item__content__settings__quantity'
        div_4.appendChild(div_5)
    
        let p_3 = document.createElement('p')
        p_3.textContent = 'Qté : '
        div_5.appendChild(p_3)
    
        let input = document.createElement('input')
        input.className = ('itemQuantity')
        input.setAttribute('value', quantity)
        input.setAttribute('name', 'itemQuantity')
        input.setAttribute('min', 1)
        input.setAttribute('max', 100)
        input.setAttribute('type', 'number')
        div_5.appendChild(input)
        
        input.addEventListener('click', modifierQuantiteLigneDePanier)

        let div_6 = document.createElement('div')
        div_6.className = ('cart__item__content__settings__delete')
        div_4.appendChild(div_6)

        let p_4 = document.createElement('p')
        p_4.className=('deleteItem')
        p_4.textContent = "Supprimer"
        div_6.appendChild(p_4)

        document.getElementById("cart__items").appendChild(article)

        p_4.addEventListener('click', supprimerLigneDePanier)

        total_prix     = total_prix     + ligne_de_panier.quantite * canape.price   
        total_quantite = total_quantite + ligne_de_panier.quantite

        document.getElementById('totalQuantity').textContent = total_quantite
        document.getElementById('totalPrice').textContent = total_prix

        function supprimerLigneDePanier(event){   
        
        let key = identifiant + couleur_canape

        event.target.closest('article').dataset.id
        event.target.closest('article').dataset.color
        console.log("OK !")

        localStorage.removeItem(key)

        article.remove

        }

   /**
    * 1. Supprimer la ligne de panier depuis le localStorage
    * 2. Supprimer l'élement article du document
    * 3. Mettre à jour les total_prix et total_quantite
    */

        function modifierQuantiteLigneDePanier(_event){
            
            _event.target.closest('article').dataset.id
            _event.target.closest('article').dataset.color

            let key = identifiant + couleur_canape

            let ligne_de_panier = JSON.parse(localStorage.getItem(key))

            let quantiteFinale = _event.target.closest('input').value
            quantiteFinale = parseInt(document.getElementsByClassName('itemQuantity')[0].value)
            
            if(quantiteFinale < 1 || quantiteFinale > 100)
            {
                alert("Veuillez saisir une quantité correcte")
                return
            }
            else {
            ligne_de_panier.quantite = quantiteFinale
            localStorage.setItem(key, JSON.stringify(ligne_de_panier))
            }

             /*
            * 1. Récupérer la ligne de panier dans le localStorage
            * 2. Modifier la quantité
            * 3. Sauvegarder les modifications dans le localStorage
            * 4. Mettre à jour les totaux
            */
        }

            /*
            1. Récupérer et analyser données saisies par l'utilisateur dans le formulaire
            2. Afficher un message d'erreur si besoin (par ex pour l'email)
            3. Constituer un object Contact à partir des données du formulaire
            4. Constituer un tableau de produits
            */

        function formulaire(utilisateur){

            console.log(utilisateur)

            let prenom = document.getElementById('firstName')
            localStorage.setItem(key, (prenom))

            let nom = document.getElementById('lastName')
            localStorage.setItem(key, (nom))

            let adresse = document.getElementById('address')
            localStorage.setItem(key, (adresse))

            let ville = document.getElementById('city')
            localStorage.setItem(key, (ville))

            let mail = document.getElementById('email')
            localStorage.setItem(key, (mail))
        }


     })

}


 