export interface ingredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  position?: 'top' | 'bottom' | undefined;
  locker?: boolean;
}

export interface orderType {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  position: string;
  locker: boolean;
}

export interface ConstructorState {
  burderConstructor: {
    bun: ingredientType[];
    ingredients: ingredientType[];
  };
  totalPrice: Number;
}
