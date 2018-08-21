
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('social_post', (table) => {
            table.increments('post_id').primary();
            table.string('header');
            table.string('body');
            table.string('header_image');

            //FK: users.id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id');
            table.timestamps(false,true);
        }),

        knex.schema.createTable('trade_post', (table) => {
            table.increments('tp_id').primary();
            table.string('address');
            table.string('catname');
            table.integer('asking_price');
            table.integer('area');
            table.string('special_note');
            table.string('images');

            //FK: users.id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id');
            table.timestamps(false,true);
        }),

    ])
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('social_post').then(() => {
        return knex.schema.dropTable('trade_post')
        })
};
