/**
 * 1. Récupérer la liste des canapés depuis l'API / Faire un appel HTTP GET vers http://localhost:3000/api/products
 * http://localhost:3000/api/products
 * 
 * 2. Parcourir la liste des canapés et pour chaque canapé
 * a/ Créer les éléments HTML fournit en commentaire dans le fichier index.html
 * b/ Remplir ces éléments par les infos de l'API
 */

fetch('http://localhost:3000/api/products')
.then(function(response) {
    if(response.ok) {
        return response.json()
    }
})
.then(function(liste_canapes) {
    //console.log(liste_canapes)
    //on parcourt la liste des canapes
    liste_canapes.map(function(canape) {
        console.log(canape)   

        let a_element = document.createElement('a')
        a_element.href = "./product.html?id=" + canape._id

        let article_element = document.createElement('article')

        let img_element = document.createElement('img')
        img_element.src = canape.imageUrl

        let h3_element = document.createElement('h3')
        h3_element.className = 'productName'
        h3_element.textContent = canape.name
        
        
        let p_element = document.createElement('p')
        p_element.className = 'productDescription'
        p_element.textContent = canape.description

        a_element.appendChild(article_element)
        article_element.appendChild(img_element)
        article_element.appendChild(h3_element)
        article_element.appendChild(p_element)

        document.getElementById('items').appendChild(a_element)
    
    })
})
.catch(function(error) {
    console.log(error)
})









