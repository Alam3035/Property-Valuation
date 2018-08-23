class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    //Profile details services
    getUserDetail(userID){
        let query = this.knex
        .select('users.name', 'users.email', 'users.phone', 'special_user')
        .from('users')
        .where('users.user_id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                name: row.name,
                email: row.email,
                phone: row.phone,
                special_user: row.special_user
            }))
        })
    }

    //Change user details
    updateUserDetail(userID, name, email, phone, special_user) {
        let query = this.knex
        .select()
        .from('users')
        .where('users.user_id', userID);

        return query.then(rows => {
            if(rows.length !== 1) {
                return new Error ('Invalid User');
            } else {
                return this.knex('user')
                    .where('user_id', userID)
                    .update({
                        name: name,
                        email: email,
                        phone: phone,
                        special_user: special_user
                    })
            }
        })
    }

    // write users chat messages
   


}

module.exports = UserService;