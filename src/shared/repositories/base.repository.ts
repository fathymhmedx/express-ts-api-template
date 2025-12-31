export class BaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
