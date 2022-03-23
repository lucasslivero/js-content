const db = require('../database');

class CategoryRepository {
  TABLE = 'categories';

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(`SELECT * FROM ${this.TABLE} order by name ${direction}`);
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM ${this.TABLE} where id = $1`, [
      id,
    ]);
    return row;
  }

  async save({ name }) {
    const [row] = await db.query(
      `
    INSERT INTO ${this.TABLE} (name)
    VALUES ($1)
    RETURNING *`,
      [name],
    );
    return row;
  }

  async update(id, category) {
    const [row] = await db.query(
      `UPDATE ${this.TABLE}
    SET name = $1
    WHERE id = $2
    RETURNING *`,
      [category.name, id],
    );
    return row;
  }

  async delete(id) {
    return db.query(`DELETE FROM ${this.TABLE} WHERE id = $1`, [id]);
  }
}

module.exports = new CategoryRepository();
