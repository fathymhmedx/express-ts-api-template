import { Model, HydratedDocument } from "mongoose";

// Wrapper utility: fix type issues with Mongoose model methods
function createWrapper<T>(
  model: Model<T>,
  data: Partial<T>
): Promise<HydratedDocument<T>> {
  return model.create(data as any) as Promise<HydratedDocument<T>>;
}

export class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return createWrapper(this.model, data); // Using wrapper to fix type issues
  }

  async findAll(): Promise<HydratedDocument<T>[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id);
  }

  async update(
    id: string,
    data: Partial<T>
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndDelete(id);
  }
}
