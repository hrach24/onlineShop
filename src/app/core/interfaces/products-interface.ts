export interface IProducts {
  [key: string]: IProductCategory
}

export interface IProductCategory {
  [key: string]: IProduct[]
}

export interface IProduct {
  id: string;
  "title": string,
  "img": string,
  "ingredients": string,
  "description": string,
  "price": string,
  favorites: any[],
}

export interface ISkeleton {
  skeleton: any[]
}
