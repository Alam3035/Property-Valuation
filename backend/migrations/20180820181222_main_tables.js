
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('user_id').primary();
            table.string('name');
            table.string('email');
            table.integer('phone');
            table.string('password');
            table.boolean('special_user');
            table.string('facebook_id');
        }),

        knex.schema.createTable('real_estate', (table) => {
            table.increments('re_id').primary();
            table.string('addr');
            table.string('catfathername');
            table.string('catname');
            table.string('area');
        }),

    ])
};

exports.down = function (knex, Promise) {
        return knex.schema.dropTable('users').then(() => {
            return knex.schema.dropTable('real_estate')
        });
}