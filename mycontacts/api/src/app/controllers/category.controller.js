const CategoryRepository = require('../repositories/category.repository');

class CategoryController {
  async findAll(request, response) {
    const { orderBy } = request.query;
    const contacts = await CategoryRepository.findAll(orderBy);
    response.json(contacts);
  }

  async findById(request, response) {
    const { id } = request.params;
    const category = await CategoryRepository.findById(id);
    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async save(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contact = await CategoryRepository.save({
      name,
    });
    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }
    const contactExist = await CategoryRepository.findById(id);
    if (!contactExist) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactByEmail = await CategoryRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await CategoryRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await CategoryRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await CategoryRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
