import { Product } from './types'
import '../styles/main.css';

let allProducts:Product[] = [];
const container = document.getElementById("container")
const extra_menu = document.getElementById("extra_card_menu")
const extra_content = document.getElementById("extra_content")

function drawProducts(products:Product[]) {
    if (!container) return;

    const allHtmlCards = products.map(current_card => {
        return `
        <div class="card" data-id="${current_card.id}">
            <img src="${current_card.image}" alt="${current_card.title}" " />
            <h3>${current_card.title}</h3>
            <p>Цена: ${current_card.price}₽
        </div>
        `
    }).join('')

    container.innerHTML = allHtmlCards
}

function extraWindowOpener(id:number){
    //console.log("Я в функции открытия окна!")
    const extra_card = allProducts.find(current_card => current_card.id === id)

    //console.log('Проверка ресурсов:', {
    //foundCard: extra_card,
    //contentBox: extra_content,
    //wholeMenu: extra_menu
    //});

    if (!extra_card || !extra_content || !extra_menu) return;

       extra_content.innerHTML = `
        <div class="extra_card_content">
            <img src="${extra_card.image}" class="extra_card_img">
            <div class="extra_card_info">
                <h1>${extra_card.title}</h1>
                <p>${extra_card.description}</p>
                <p class="extra_card_price">${extra_card.price} ₽</p>
                <button class="buy_btn">Купить</button>
            </div>
        </div>
    `;
    //console.log("Click!")
    extra_menu.classList.add('is-active')
    document.body.style.overflow = 'hidden';
}

function cardTapTracker(event: MouseEvent): void {
    if (event.target === null) return;
    const card = (event.target as HTMLElement).closest('.card') as HTMLElement;
    if (card === null) return;

    const strCardId = card.dataset.id
    const cardId = Number(strCardId)
    
    //console.log("Id найден")
    if(cardId) {
        extraWindowOpener(cardId!); 
        //console.log("Передаем id в Opener...")   
    }
    else {
        //console.log("Хелп!Нет data-id!")
    }
}

async function heartOfApp(){
    //ожидаем остюда products через fetch но пока заглушк
    //http://localhost:5000/api/products сюда стучаться
    //const response = await fetch('http://localhost:5000/api/products');
    //const data = await response.json(); 

    await new Promise(res=> setTimeout(res,500))

    allProducts = [
    {
        id: 0,
        title: "Худи Жидкое",
        price: 5000,
        image: "/images/cat_hoodie.png",
        description: "Это худи поззволит вам чувствовать себя жидко"
    },
    {
        id: 1,
        title: "Штаны Простофиля",
        price: 3500,
        image: "/images/pants.png",
        description: "Эти штаны сразу покажут всем кто здесь недотёпа"
    },
    {   id: 2,
        title: "Шляпа Грибоед",
        price: 1500,
        image: "/images/fox_hat.png",
        description: "Это мой гриб,я его я ЕМ! *звуки съедания гриба*"
    }
]

    drawProducts(allProducts);

    if(!container){
        throw new Error("Контейнер не наден")
    }
    container.addEventListener('click',cardTapTracker)

    document.getElementById('close_extra_button')?.addEventListener('click',() =>
    {
        extra_menu?.classList.remove('is-active')
        document.body.style.overflow = 'auto';
    })
}


heartOfApp();