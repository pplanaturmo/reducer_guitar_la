export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

// Pick<Type,Keys >

// Omit<Type, Keys>

export type PartialCartItem = Pick<Guitar,'id' | 'name' | 'price'> & {
  quantity : number
}

