import ICategory from '../entities/ICategory';

export interface ICreateCategoryDTO {
  name: string;
}

export interface ICategoriesRepository {
  create(dto: ICreateCategoryDTO): Promise<ICategory>;
  update(Category: ICategory): Promise<ICategory>;
  find(page: number, fields: (keyof ICategory)[]): Promise<ICategory[]>;
  findById(id: string, fields: (keyof ICategory)[]): Promise<ICategory>;
  findByName(id: string, fields: (keyof ICategory)[]): Promise<ICategory>;
}
