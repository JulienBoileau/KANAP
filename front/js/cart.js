/**
 * 1. Parcourir les lignes de panier dans le localStorage
 *  a/  On recupere pour chaque ligne de panier les informations depuis l'api
 *  b/ construire dynamiquement les elements HTML avec les informations de l'api
 */

 let params = new URLSearchParams(document.location.search);
 let id = params.get("id");

 let quantity = parseInt(document.getElementById('quantity').value);

 let ligne_de_panier = null
 if(item == null) { //si existe pas dans localstorage
     ligne_de_panier = {
         id: id,
         couleur: color,
         quantite: quantity 
     }
     localStorage.setItem(key, JSON.stringify(ligne_de_panier))
 }
 
 /* Récupérer info produit de l'API par son id */
 fetch('http://localhost:3000/api/products/' + id)
 .then(function(response) {
     if(response.ok) {
         return response.json()
     }
 })
 .then(function(infos_ligne) {
   
    let article_element = createElement('article')
    article_element.className = 'cart_item'
    article_element.id = id
    article_element.color = color

    let div_element = createElement('div')
    div_element.className = 'cart_item_img'

    let img = document.createElement('img')
    img.src = img.imageUrl
    img.alt = img.altTxt

    let div_element = createElement('div')
    div_element.className = 'cart_item_content'

    let div_element = createElement('div')
    div_element.className = 'cart_item_content_description'

    let h2_element = createElement('h2')
    h2_element.textContent = infos_ligne.name

    let p_element = createElement('p')
    p_element.textContent = color

    let p_element = createElement('p')
    p_element.textContent = infos_ligne.price

    let div_element = createElement('div')
    div_element.className = 'cart_item_content_settings'

    let div_element = createElement('div')
    div_element.className = 'cart_item_content_settings_quantity'

    let p_element = createElement('p')
    p_element.textContent = 'Qté : ' + quantity

    let input_element = createElement('input')
    input_element.type = 
 })

