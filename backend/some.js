
//Handle Register POST
app.post('/api/register', function(req, res) {

    //view posted values
    console.log(req.body);

    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        //create user object
        let query = knex
        .select()
        .from('users')
        console.log(query);

    return query.then(rows => {
        return this.knex('users')
        .insert ({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            special_user: req.body.special_user, //make to have a second factor for auth?
            facebook_id: req.body.facebook_id
        })
    }).then(rows => {
        return Promise.all(
            let query = knex
            .select('users.user_id', 'users.email', 'users.password')
            .from('users')
            .where('users.email' == req.body.email)
            return query.then

        )
    })
        
        users.push(user)

        //create a token then return
        var token = jwt.sign({
            id: user.user_id,
            email: user.email
        }); 

        res.send({userid: user.user_id, token: token});
        res.end();
    });
});