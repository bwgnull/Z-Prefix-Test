/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First_Name: 'Jacob', Last_Name: 'Smith', Username: 'JacobSm1th', Password: 'Actor'},
    {First_Name: 'Joseph', Last_Name: 'Smith', Username: 'theRealJosephSmith1', Password: 'Golden_Tablets'},
    {First_Name: 'test', Last_Name: 'test', Username: 'test', Password: 'test'}
  ]);
};

