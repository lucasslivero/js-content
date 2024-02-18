const db = require('../database');

class ContactRepository {
  TABLE = 'contacts';

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(
      `SELECT ct.*, cat.name as category_name FROM ${this.TABLE} ct
      LEFT JOIN categories cat on cat.id = ct.category_id
      order by ct.name ${direction}`,
    );
  }

  async findById(id) {
    const [row] = await db.query(
      `SELECT ct.*, cat.name as category_name FROM ${this.TABLE} ct
    LEFT JOIN categories cat on cat.id = ct.category_id
    where ct.id = $1`,
      [id],
    );
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM ${this.TABLE} where email = $1`, [email]);
    return row;
  }

  async save(contact) {
    const [row] = await db.query(
      `
    INSERT INTO ${this.TABLE} (name, email, phone, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [contact.name, contact.email, contact.phone, contact.category_id],
    );
    return row;
  }

  async update(id, contact) {
    const [row] = await db.query(
      `UPDATE ${this.TABLE}
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *`,
      [contact.name, contact.email, contact.phone, contact.category_id, id],
    );
    return row;
  }

  async delete(id) {
    return db.query(`DELETE FROM ${this.TABLE} WHERE id = $1`, [id]);
  }
}

module.exports = new ContactRepository();
