/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    { UserId: 1, Item_name: 'Wireless Mouse', Description: 'Ergonomic wireless mouse with adjustable DPI and USB-C charging.', Quantity: 7 },
    { UserId: 2, Item_name: 'Office Chair', Description: 'Adjustable ergonomic office chair with lumbar support and breathable mesh.', Quantity: 2 },
    { UserId: 1, Item_name: 'Notebook', Description: 'Hardcover ruled notebook with 200 pages of recycled paper.', Quantity: 6 },
    { UserId: 1, Item_name: 'Sleeve of zyns', Description: 'Must be 21 or older to order', Quantity: 6 }

  ]);
};
