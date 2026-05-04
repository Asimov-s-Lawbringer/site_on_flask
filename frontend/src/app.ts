import { Product } from './types'
import '../styles/main.css';

let allProducts: Product[] = [];
const container = document.getElementById("container")
const extra_menu = document.getElementById("extra_card_menu")
const extra_content = document.getElementById("extra_content")


document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const btn = target.closest("[data-category]") as HTMLElement | null;
  if (!btn) return;

  const category = btn.dataset.category!;
  filterByCat(category);
});


function filterByCat(category: string) {
  if (category === "All") {
    drawProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(p => p.category === category);
  drawProducts(filtered);

}

/*
document.getElementById("test-back")?.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          name: "test",
          lastname: "user",
          middlename: "x",
          phone_number: "999",
          location: "test"
        },
        items: [
          { product_id: 1, quantity: 1 }
        ]
      })
    });

    const data = await response.json();

    console.log("RESULT:", data);
    //alert("Заказ создан");

  } catch (err) {
    
    console.error(err);
  }
});

//document.querySelector(".buy_btn")
//?.addEventListener("click", testOrderFlow);
*/
/* 
async function testOrderFlow() {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          name: "egor",
          lastname: "egorov",
          middlename: "test",
          phone_number: "123456",
          location: "Moscow"
        },
        items: [
          { product_id: 1, quantity: 2 },
          { product_id: 2, quantity: 1 }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    console.log("создано:", data);

    alert(`создан заказ с id: ${data.order_id}`);

  } catch (err) {
    console.error(err);
    alert("не удалось создать заказ");
  }
}

*/
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const button = target.closest(".buy_btn") as HTMLElement | null;

  if (!button) return;

  const id = Number(button.dataset.id);

  addToCart(id);
});

type CartItem = {
  product_id: number;
  quantity: number;
};

function addToCart(productId: number) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find(item => item.product_id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product_id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("CART:", cart);
}



function drawProducts(products: Product[]) {
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

function extraWindowOpener(id: number) {
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
                <button class="buy_btn" data-id="${extra_card.id}">Купить</button>
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
  if (cardId) {
    extraWindowOpener(cardId!);
    //console.log("Передаем id в Opener...")   
  }
  else {
    //console.log("Хелп!Нет data-id!")
  }
}

async function heartOfApp() {
  //ожидаем остюда products через fetch но пока заглушк
  //http://localhost:5000/api/products сюда стучаться
  //const response = await fetch('http://localhost:5000/api/products');
  //const data = await response.json(); 

  try {
    const response = await fetch('http://localhost:5000/api/products');
    if (!response.ok) {
      throw new Error(`Ошибка:${response.status}`)
    }
    allProducts = (await response.json() as Product[]);
  }
  finally {
    console.log(allProducts)
  }

  drawProducts(allProducts);

  if (!container) {
    throw new Error("Контейнер не наден")
  }
  container.addEventListener('click', cardTapTracker)

  document.getElementById('close_extra_button')?.addEventListener('click', () => {
    extra_menu?.classList.remove('is-active')
    document.body.style.overflow = 'auto';
  })
}

/* 
container?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const button = target.closest(".buy_btn") as HTMLElement | null;

  if (button) {
    testOrderFlow();
    const id = Number(target.dataset.id)
    console.log(id)
    console.log(container)
  }
});

}

*/



heartOfApp();