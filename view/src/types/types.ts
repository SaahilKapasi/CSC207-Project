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
  description: string;
}

export interface Comparison {
  dataset1: Dataset;
  dataset2: Dataset;
}
