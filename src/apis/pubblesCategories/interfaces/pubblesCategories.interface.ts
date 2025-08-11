export interface IPubblesCategoriesServiceFindOne {
  id: string;
}

export interface IPubblesCategoriesServiceCreate {
  name: string;
}

export interface IPubblesCategoriesServiceFindOneByName {
  name: string;
}

export interface IProductsTagsFindByNames {
  tagNames: string[];
}
