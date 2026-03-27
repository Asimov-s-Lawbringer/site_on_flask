export interface Product {
    id:number;
    title:string;
    price:number;
    image:string;
    description:string;
    category?:string;
    discount?:number;
}

interface Users {
    id:number;
    name:string;
    lastname:string;
    middlename:string;
    phone_number:string;
    location: string;
}
//один ко многим Юзер->Заказы
//один ко многим Заказ->Товары
interface Orders {
    id:number;
    user_id:number;
    product_id:number;
    created_at:string;
    status:string;
    summ_cost: number;
}

interface Warehouse {
    product_id:number;
    quantity:number;
}

