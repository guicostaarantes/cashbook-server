import {
  Repository,
  getRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';
import Category from '../../../entities/categories/implementations/Category';

class CategoriesRepository implements ICategoriesRepository {
  baseRepository: Repository<Category>;

  constructor() {
    this.baseRepository = getRepository(Category);
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const newCategory = this.baseRepository.create({
      name,
    });

    const category = await this.baseRepository.save(newCategory);

    return category;
  }

  public async update(category: Category): Promise<Category> {
    await this.baseRepository.save(category);
    return category;
  }

  public async find(
    page: number,
    fields: (keyof Category)[],
  ): Promise<Category[]> {
    const options = {
      take: 10,
      skip: 10 * (page - 1),
    } as FindManyOptions;
    if (fields.length) {
      options.select = fields;
    }
    const categories = await this.baseRepository.find(options);
    return categories;
  }

  public async findById(
    id: string,
    fields: (keyof Category)[],
  ): Promise<Category> {
    const options = {
      where: { id },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const category = await this.baseRepository.findOne(options);
    return category;
  }

  public async findByName(
    name: string,
    fields: (keyof Category)[],
  ): Promise<Category> {
    const options = {
      where: { name },
    } as FindOneOptions;
    if (fields.length) {
      options.select = fields;
    }
    const category = await this.baseRepository.findOne(options);
    return category;
  }
}

export default CategoriesRepository;
