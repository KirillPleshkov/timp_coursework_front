type TypeProduct = {
  id: number;
  name: string;
  imageUrl: string;
  activeSubstance: string;
  maker: string;
  description: string;
  price: number;
  isBasket?: boolean;
  indicationsForUse: string;
  contraindications: string;
  applicationMethod: string;
  shelfLife: string;
};

export type { TypeProduct };
