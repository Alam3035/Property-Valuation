class DirectMessageService {
    constructor(knex) {
        this.knex = knex;
    }

    send(messages) {
        return this.knex
        .insert({
            content: messages.content,
            sender_id: messages.sender_id,
            receiver_id: messages.receiver_id
        })
        .into('messages')
        .catch(err => {
            throw new Error(err);
        })
    }

    listConversation(userA_id, userB_id) {

        if(!sender_id || receiver_id){
            return this.knex.select('content','sender_id','receiver_id')
            .from('messages')
        }

        return this.knex.select('content','sender_id','receiver_id')
        .from('messages')
        .where('messages.sender_id,userA_id')
        .andWhere('messages.receiver_id',userB_id)

        .orWhere('messages.sender_id,userB_id')
        .andWhere('messages.receiver_id',userA_id)
    }
}

module.exports = DirectMessageService;