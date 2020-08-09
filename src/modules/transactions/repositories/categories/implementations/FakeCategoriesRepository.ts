import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';
import FakeCategory from '../../../entities/categories/implementations/FakeCategory';

class FakeCategoriesRepository implements ICategoriesRepository {
  public table: FakeCategory[];

  constructor() {
    this.table = [];
  }

  public async create({ name }: ICreateCategoryDTO): Promise<FakeCategory> {
    const category = new FakeCategory();

    category.name = name;

    this.table.push(category);

    return category;
  }

  public async update(category: FakeCategory): Promise<FakeCategory> {
    const categoryIndex = this.table.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.table[categoryIndex] = category;

    return category;
  }

  public async find(
    page: number,
    fields: (keyof FakeCategory)[],
  ): Promise<FakeCategory[]> {
    const categories = this.table.slice(10 * (page - 1), 10);
    const response = categories.map(category => {
      if (fields.length) {
        Object.keys(category)
          .filter(key => !fields.includes(key as keyof FakeCategory))
          // eslint-disable-next-line no-param-reassign
          .forEach(key => delete category[key as keyof FakeCategory]);
      }
      return category;
    });
    return response;
  }

  public async findById(
    id: string,
    fields: (keyof FakeCategory)[],
  ): Promise<FakeCategory> {
    const category = this.table.find(findCategory => findCategory.id === id);
    if (!category) {
      return undefined;
    }
    const response = { ...category };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeCategory))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeCategory]);
    }
    return response;
  }

  public async findByName(
    name: string,
    fields: (keyof FakeCategory)[],
  ): Promise<FakeCategory> {
    const category = this.table.find(
      findCategory => findCategory.name === name,
    );
    if (!category) {
      return undefined;
    }
    const response = { ...category };
    if (fields.length) {
      Object.keys(response)
        .filter(key => !fields.includes(key as keyof FakeCategory))
        // eslint-disable-next-line no-param-reassign
        .forEach(key => delete response[key as keyof FakeCategory]);
    }
    return response;
  }
}

export default FakeCategoriesRepository;
