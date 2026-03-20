import { Product } from './types'
//
const products:Product[] = [
    {
        id: 0,
        title: "Худи Жидкое",
        price: 5000,
        image: "/images/hoodie.png",
        description: "Это худи поззволит вам чувствовать себя жидко"
    },
    {
        id: 1,
        title: "Штаны Простофиля",
        price: 3500,
        image: "/images/pants.png",
        description: "Эти штаны сразу покажут всем кто здесь недотёпа"
    },
]

const container = document.getElementById("products")

function drawProducts() {
    if(!container) return

    container.innerHTML= ""

    for(let i=0;i < products.length;i++){
        const p = products[i]

        const html_card = `
        <div class="card">
            <img src="${p.image}" alt="${p.title}" style="width:100px" />
            <h3>${p.title}</h3>
            <p>Цена: ${p.price}
            <button onclick="console.log('Купили ${p.id}')">Купить</button>
        </div>
        `
        container.innerHTML += html_card
    }
}

drawProducts();