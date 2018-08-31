
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
            table.integer('asking_price');
            table.string('special_note');
            table.string('images');


            //FK: re.id
            table.integer('re_id').unsigned();
            table.foreign('re_id').references('real_estate.re_id');

            //FK: users.id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id');
            table.timestamps(false,true);

        }),

        knex.schema.createTable('historical_transaction', (table) => {
            table.increments('ht_id').primary();
            table.integer('id');
            table.string('block');
            table.integer('rootid');
            table.integer('price_value');
            table.string('date');
            table.decimal('sq_price');
            table.integer('winloss');
            table.string('img_url');

            //FK: re.id
            table.integer('re_id').unsigned();
            table.foreign('re_id').references('real_estate.re_id');
        })

    ]);
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('social_post').then(() => {
        return knex.schema.dropTable('trade_post').then(() => {
            return knex.schema.dropTable('historical_transaction')
        });
    });
};