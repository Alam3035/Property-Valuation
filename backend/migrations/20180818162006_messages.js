
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', function (table) {
        table.increments('message_id').primary();
        table.string('messages');

        //FK: direct_messages chat.id
        table.integer('chat_id').unsigned();
        table.foreign('chat_id').references('direct_messages.chat_id');

         //FK: user user_id
         table.integer('user_id').unsigned();
         table.foreign('user_id').references('users.user_id'); 

    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages')
};
