/**
 * 1. Parcourir les lignes de panier dans le localStorage
 *  a/ On recupere pour chaque ligne de panier les informations depuis l'api
 *  b/ construire dynamiquement les elements HTML avec les informations de l'api
 *  c/ Calcul des totaux = Prix et quantité
 *  d/ Suppression d'une ligne du panier
 *  e/ Modification de la quantité d'une ligne du panier
 */

console.log(localStorage.length)

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
        article.className = 'cart_item'
        article.id = identifiant
        article.color = couleur_canape
    
        let div_1 = document.createElement('div')
        div_1.className = 'cart_item_img'
        article.appendChild(div_1)
    
        let img = document.createElement('img')
        img.src = img.imageUrl
        img.alt = img.altTxt
        div_1.appendChild(img)
    
        let div_2 = document.createElement('div')
        div_2.className = 'cart_item_content'
    
        let div_3 = document.createElement('div')
        div_3.className = 'cart_item_content_description'
        div_2.appendChild(div_3)
    
        let titre_h2 = document.createElement('h2')
        titre_h2.textContent = canape.name
        div_3.appendChild(titre_h2)
    
        let p_1= document.createElement('p')
        p_1.textContent = couleur_canape
        div_3.appendChild(p_1)
    
        let p_2 = document.createElement('p')
        p_2.textContent = canape.price
        div_3.appendChild(p_2)
    
        let div_4 = document.createElement('div')
        div_4.className = 'cart_item_content_settings'
    
        let div_5 = document.createElement('div')
        div_5.className = 'cart_item_content_settings_quantity'
        div_4.appendChild(div_5)
    
        let p_3 = document.createElement('p')
        p_3.textContent = 'Qté : ' + quantity
        div_5.appendChild(p_3)

        let value = canape.price
    
        let input = document.createElement('input')
        input.className = ('itemQuantity')
        input.setAttribute = (value)
        div_5.appendChild(input)

        let div_6 = document.createElement('div')
        div_6.className = ('cart__item__content__settings__delete')
        div_4.appendChild(div_6)

        let p_4 = document.createElement('p')
        p_4.className=('deleteItem')
        div_6.appendChild(p_4)

     })

     let total = 0

     array.forEach(ligne_de_panier => {

        let total_ligne = ligne_de_panier.quantite * canape.price
        let total = total_ligne += total

        return total
     });

     function calculTotal()
     {

        let quantite_totale = document.getElementById('totalQuantity')
        let prix_total = document.getElementById('totalPrice')

     }

}

 