export interface Category {
  name: string;
  fprScore: number;
  traits: Trait[];
}

export interface Trait {
  name: string;
  fprMean: number;
  count: number;
}

export interface Dataset {
  id: string;
  name: string;
  categories: Category[];
  score: number;
}
