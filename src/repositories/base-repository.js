export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(createDto) {
    const entity = new this.model(createDto);
    return await entity.save();
  }

  async findByUniqueFields(query) {
    return await this.model.findOne(query);
  }

  async findByID(id) {
    return await this.model.findById(id);
  }

  async findAll(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const datas = await this.model.find().skip(skip).limit(limit);
      const totalEntities = await this.model.countDocuments();
      return {
        datas,
        totalEntities,
      };
    }
    const result = await this.model.find();
    return {
      result,
      totalData: result.length,
    };
  }

  async update(id, updateDto) {
    return await this.model.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
}
