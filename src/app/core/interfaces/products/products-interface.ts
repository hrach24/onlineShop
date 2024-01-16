export interface Product {
  id: string;
  "title": string,
  "img": string,
  "ingredients": string,
  "description": string,
  "price": string
}

export interface Products {
  [key: string]: Product
}

export interface subCategories {
  [key: string]: [key: string, Product]
}

export interface IHomeProduct{
  [key: string]: Product
}
