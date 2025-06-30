export class BaseRepository {
  async getAll() {
    throw new Error('getAll method must be implemented');
  }

  async getById(id) {
    throw new Error('getById method must be implemented');
  }

  async create(data) {
    throw new Error('create method must be implemented');
  }

  async update(id, data) {
    throw new Error('update method must be implemented');
  }

  async delete(id) {
    throw new Error('delete method must be implemented');
  }
} 