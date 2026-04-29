export interface Product {
    id:number;
    title:string;
    price:number;
    image:string;
    description:string;
    category?:string;
    discount_price?:number;
}

interface Users {
    id:number;
    name:string;
    lastname:string;
    middlename:string;
    phone_number:string;
    location: string;
}
interface Orders {
    id:number;
    user_id:number;
    created_at:string;
    status:"pending"|"paid"|"shipped"|"cancelled";
}

interface OrderItems {
    id:number;
    order_id:number;
    product_id:number;
    quantity:number;
    price:number;
}

