class SocketIORouter{

    constructor(io,userService){
        this.io = io;
        this.userService = userService;
    }

    router(){
        this.io.use((socket, next)=>{
            if(!socket.session.passport){
                socket.disconnect();
            }else{
                next();
            }
        });
        this.io.on('connection',this.connection.bind(this));
    }

    connection(socket){
        socket.emit('username', socket.session.passport.user);

        socket.on('getUsers',this.getUsers(socket).bind(this));
    }

    getUsers(socket){
        return (data)=>{
            return this.userService.list().then((users)=>{
                socket.emit('users',users);
            });
        };
    }
    
}

module.exports = SocketIORouter