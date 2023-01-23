export interface IFlashcard {
  id: number;
  category: string;
  front: string;
  back: string;
}

export interface ICategories {
  id: number;
  idCode: string;
  name: string;
  total: number;
}
