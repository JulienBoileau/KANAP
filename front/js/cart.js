/**
 * 1. Parcourir les lignes de panier dans le localStorage
 *  a/ On recupere pour chaque ligne de panier les informations depuis l'api
 *  b/ construire dynamiquement les elements HTML avec les informations de l'api
 *  c/ Calcul des totaux = Prix et quantité
 *  d/ Suppression d'une ligne du panier
 *  e/ Modification de la quantité d'une ligne du panier
 */

//console.log(localStorage.length)

for (var i = 0; i < localStorage.length; i++){
    //console.log(i)
    //console.log(localStorage.key(i))
    let key = localStorage.key(i)
    //console.log(localStorage.getItem(key))
    JSON.parse(localStorage.getItem(key))
    //console.log(JSON.parse(localStorage.getItem(key)))
    let ligne_de_panier = JSON.parse(localStorage.getItem(key))
    //console.log(ligne_de_panier)
    let couleur_canape = ligne_de_panier.couleur
    //console.log(couleur_canape)
    let identifiant = ligne_de_panier.id
    //console.log(identifiant)
    let quantity = ligne_de_panier.quantite
    //console.log("qty "+ quantity)

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
     })
}

MiseAJourTotaux()


function modifierQuantiteLigneDePanier(_event){
            
    let identifiant = _event.target.closest('article').dataset.id
    let couleur_canape = _event.target.closest('article').dataset.color

    let key = identifiant + couleur_canape

    let ligne_de_panier = JSON.parse(localStorage.getItem(key))

    let quantiteFinale = parseInt(_event.target.value)
    
    if(quantiteFinale < 1 || quantiteFinale > 100)
    {
        alert("Veuillez saisir une quantité correcte")
        return
    }
    else {
        ligne_de_panier.quantite = quantiteFinale
        localStorage.setItem(key, JSON.stringify(ligne_de_panier))
        MiseAJourTotaux()
    }
}


function supprimerLigneDePanier(event){   
        
    let article =  event.target.closest('article')
    let identifiant = article.dataset.id
    let couleur_canape = article.dataset.color
    let key = identifiant + couleur_canape

    
    console.log("OK !")

    localStorage.removeItem(key)

    article.remove()
    MiseAJourTotaux()
}


function MiseAJourTotaux()
{
    let total_prix = 0
    let total_quantite = 0
    for (var i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        let ligne_de_panier = JSON.parse(localStorage.getItem(key))
        let identifiant = ligne_de_panier.id
        fetch('http://localhost:3000/api/products/' + identifiant)
        .then(function(response) {
         if(response.ok) {
             return response.json()
            }
        })
        .then(function(canape) {
            total_prix     = total_prix     + ligne_de_panier.quantite * canape.price   
            total_quantite = total_quantite + ligne_de_panier.quantite
    
            document.getElementById('totalQuantity').textContent = total_quantite
            document.getElementById('totalPrice').textContent = total_prix
        })
    }
}



let boutonCommander = document.getElementById('order')

boutonCommander.addEventListener('click', passerCommande)

function passerCommande(_event) {



    /**
     * GESTION DU BOUTON COMMANDER
     * 1/ ajouter un event listener click sur le bouton
     * 2/ sur le click, valider les informations du formulaire
     *  a/ pour chaque champ du formulaire, utilisez une RegExp pour valider si le champ est OK ou pas
     *  b/ si champ NOK, afficher un message d'erreur dans le <p> prevu a cet effet
     *  c/ apres avoir vérifier tous les champs, si il y en 1 ou + en erreur, de pas aller plus loin (arreter la function)
     *  d/ (bonus) Après erreurs, lorsque l'utilisateur commence a taper du texte, supprimer les messages d'erreur
     *  e/ si tous les champs OK, appeler l'api /api/products/order
     * contact: {
        *   firstName: string,
        *   lastName: string,
        *   address: string,
        *   city: string,
        *   email: string
        * }
        * products: [string] <-- array of product _id
     *  
     * 
     */

    /**
     * Regex email
     * let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
     * https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
     * 
     * if(regex.test(document.getElementById('email').value))
     */
    
 

    let prenom = document.getElementById('firstName').value
    let prenomRegex = new RegExp('[A-Z][A-Za-z\é\è\ê\-]+$');
    let validationPrenom = prenomRegex.test(prenom);
        if (prenom.match(prenomRegex)){
            return true
        } 
        
        else {
            let messageErreur = document.getElementById('firstNameErrorMsg');
            messageErreur.textContent = 'Prénom incorrect';
            _event.preventDefault()
        }

    console.log(validationPrenom)
    /**
     * verifier si prenom est OK avec sa regexp, si NOK afficher le message d'erreur dans #firstNameErrorMsg
     */

    let nom = document.getElementById('lastName').value
    let nomRegex = new RegExp('[A-Z][A-Za-z\é\è\ê\-]+$');
    let validationNom = nomRegex.test(nom);
    if (nom.match(nomRegex)){
        return true
    } 
    
    else {
        let messageErreur = document.getElementById('lastNameErrorMsg');
        messageErreur.textContent = 'Nom incorrect';
        _event.preventDefault()
    }

    console.log(validationNom)


    let adresse = document.getElementById('address').value
    let adresseRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
    let validationAdresse = adresseRegex.test(adresse);
    if (adresse.match(adresseRegex)){
        return true
    } 
    
    else {
        let messageErreur = document.getElementById('addressErrorMsg');
        messageErreur.textContent = 'Adresse incorrecte';
        _event.preventDefault()
    }

    console.log(validationAdresse)


    let ville = document.getElementById('city').value
    let villeRegex = new RegExp('[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$');
    let validationVille = villeRegex.test(ville);
    if (ville.match(villeRegex)){
        return true
    } 
    
    else {
        let messageErreur = document.getElementById('cityErrorMsg');
        messageErreur.textContent = 'Ville incorrecte';
        _event.preventDefault()
    }

    console.log(validationVille)


    let mail = document.getElementById('email').value
    let mailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let validationMail = mailRegex.test(mail);
    if (mail.match(mailRegex)){
        return true
    } 
    
    else {
        let messageErreur = document.getElementById('emailErrorMsg');
        messageErreur.textContent = 'Email incorrect';
        _event.preventDefault()
    }

    console.log(validationMail)

}