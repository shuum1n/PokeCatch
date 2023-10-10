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
    const areaDatas = require('../datas/Areas.json').map(x =>
    {
      x.createdAt = new Date();
      x.updatedAt = new Date();
      return x
    })
    await queryInterface.bulkInsert('Areas', areaDatas, {})
  },

  async down(queryInterface, Sequelize)
  {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Areas', null, {})

  }
};
