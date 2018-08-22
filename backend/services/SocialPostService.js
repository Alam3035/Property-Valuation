class SocialPostService {
    constructor(knex) {
        this.knex = knex;
    }

    //users post social post
    addSocialPost(header, body, header_image, userID, postID) { //records the blog post written by user in to database
        let query = this.knex
            .select()
            .from('users')
            .where('users.user_id', userID)

            return query.then((rows) => {
                if(rows.length !== 1) {
                    throw new Error('Invalid User');
                } else {
                    return this.knex
                        .insert({
                            user_id: userID,
                            post_id: postID,
                            header: header,
                            body: body,
                            header_image: header_image
                        })
                        .into('social_post')
                }
            })
    }

    // users delete social post
    deleteSocialPost(postID, userID) { //Deleting social post 
        let query = this.knex
            .select('post_id')
            .from('social_post')
            .where('user_id', userID)

            return query.then((rows) => {
                if(rows.length === 1 ) {
                    return this.knex('social_post')
                        .where('post_id', postID)
                        .del();
                } else {
                    throw new Error ('No such post')
                }
            })
    }


}

module.exports = SocialPostService;