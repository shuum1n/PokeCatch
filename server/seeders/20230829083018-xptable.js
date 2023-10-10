'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize)
  {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const xpTable = require('../datas/XpTable.json').map(x =>
    {
      x.createdAt = new Date();
      x.updatedAt = new Date();
      return x;
    })
    await queryInterface.bulkInsert('xpTables', xpTable, {});
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('xpTables', null, {});
  }
};
