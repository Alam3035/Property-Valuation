class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    //Add profile service -- > not needed after jwt.
    // addUserDetails(name,  email, password, phone, facebook_id, special_user){
    //     console.log('this works')
    //     let query = this.knex
    //     .select()
    //     .from('users')
    //     .where('users.email', email)

    //     return query.then(rows => {
    //         if(rows.length > 0) {
    //             console.log('User Already exists');
    //         } else {
    //             console.log('inserting')
    //             return this.knex('users')
    //                 .insert({
    //                     name: name,
    //                     email: email,
    //                     password: password,
    //                     phone: Number(phone),
    //                     facebook_id: facebook_id,
    //                     special_user: Boolean(special_user)
    //                 }).then('should have worked')
    //         }
    //     })

    // }


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
    updateUserDetail(name, phone, userID) {
        console.log('updating the user')
        let query = this.knex
        .select('users.user_id')
        .from('users')
        .where('users.user_id', userID);


        return query.then(rows => {
                    console.log(rows)
                if(rows.length !== 1) {
                console.log('User undefined')
            } else {
                console.log('I figured out where I fucked up?')
                console.log(name, phone)
                return this.knex('users')
                    .where('users.user_id', userID)
                    .update({
                        name: name,
                        phone: Number(phone),                        
                    })
            }
        })
    }

    // write users chat messages
   


}

module.exports = UserService;