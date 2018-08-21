
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('user_id').primary();
            table.string('name');
            table.string('email');
            table.integer('phone');
            table.string('password');
            table.boolean('special_user');
        }),

        knex.schema.createTable('historical_transaction', (table) => {
            table.increments('ht_id').primary();
            table.integer('id');
            table.string('addr');
            table.string('catnamefather');
            table.string('catname');
            table.string('block');
            table.integer('root_id')
            table.integer('price_value');
            table.string('date');
            table.decimal('sq_price_value');
            table.string('area');
            table.string('winloss');
            table.binary('img');
            table.string('mime_type');
            table.timestamps(false, true);
        }),

    ])
};

exports.down = function (knex, Promise) {
        return knex.schema.dropTable('users').then(() => {
            return knex.schema.dropTable('historical_transaction')
        });
}