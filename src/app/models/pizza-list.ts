export interface pizzaList {
    description: string;
    id: number;
    img_url: string;
    isVeg: boolean;
    name: string;
    price: number;
    rating: number;
    size: [];
    toppings: [];
}
export interface cartList {
    id: number; name: string; selection: any; price: number;
}
export interface cartLists {
    id: number; name: string; selections: any[]; quantity: number; price: number;
}