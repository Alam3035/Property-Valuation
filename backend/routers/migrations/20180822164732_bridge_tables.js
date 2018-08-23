exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user_favourites_property', function (table) {
            table.increments('user_fav_prop').primary();

            //FK: Historical transactions ht_id
            table.integer('re_id').unsigned();
            table.foreign('re_id').references('real_estate.re_id');

            //FK: users user_id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id');  
        }),

        knex.schema.createTable('user_favourites_blogpost', function (table) {
            table.increments('user_fav_bp').primary();
 
            //FK: Social Post post_id
            table.integer('post_id').unsigned();
            table.foreign('post_id').references('social_post.post_id');

            //FK: users user_id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id');  
        }),

        knex.schema.createTable('direct_messages', function (table) {
            table.increments('chat_id').primary();

            //FK: user user_id
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.user_id'); 

            //FK: trade_post tp_id
            table.integer('tp_id').unsigned();
            table.foreign('tp_id').references('trade_post.tp_id'); 
        }),

    ])
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_favourites_property').then(() => {
        return knex.schema.dropTable('user_favourites_blogpost').then(() => {
            return knex.schema.dropTable('direct_messages')
        })
    });
};