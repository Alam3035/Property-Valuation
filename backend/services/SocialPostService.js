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
                };
            });
    };

    listSocialPost(userID) {
        let query = this.knex
        .select(
            'social_post.post_id',
            'social_post.header',
            'social_post.body',
            'social_post.header_image',
        )
        .from('social_post')
        .where('social_post.user_id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                header: row.header,
                body: row.body,
                header_images: row.header_image
            }));
        });
    };

    // users delete social post
    deleteSocialPost(spostID, userID) { //Deleting social post 
        let query = this.knex
            .select('post_id')
            .from('social_post')
            .where('social_post.user_id', userID)

            return query.then((rows) => {
                if(rows.length === 1 ) {
                    return this.knex('social_post')
                        .where('post_id', spostID)
                        .del();
                } else {
                    throw new Error ('No such post')
                };
            });
    };

    updateSocialPost(header, body, header_image, userID, postID) {
            let query = this.knex
            .select('')
            .from('users')
            .where('user.user_id', userID)

            return query.then((rows) => {
                if (rows.length === 1) {
                    return this.knex('social_post')
                    .where('post_id', spostID)
                        .update({
                            post_id: postID,
                            header: header,
                            body: body,
                            header_image: header_image
                        });
                }else {
                    throw new Error ('No such post')
                };
            });
    };
};

module.exports = SocialPostService;