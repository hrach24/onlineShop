export interface IProducts {
  [key: string]: IProductCategory
}

export interface IProductCategory {
  [key: string]: IProduct[]
}

export interface IProduct {
  id: string;
  title: string,
  img: string,
  ingredients: string,
  description: string,
  price: string,
  isFavorite: boolean,
  favorites: any[],
  favProductCategory?: string
}

export interface ISkeleton {
  skeleton: any[]
}

export interface IUserFavoriteProducts {
   productCategory: string,
  productId: string,
}

export interface IFavoriteProduct {
  id: string;
  title: string,
  img: string,
  ingredients: string,
  description: string,
  price: string,
  isFavorite?: boolean,
}
