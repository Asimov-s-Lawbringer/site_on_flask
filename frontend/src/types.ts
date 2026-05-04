export interface Product {
    id:string;
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

interface Orders {
    id:number;
    user_id:number;
    created_at:string;
    status:string;
}

interface Warehouse {
    id:number;
    order_id:number;
    product_id:number;
    quantity:number;
    price_at_moment:number;
}

