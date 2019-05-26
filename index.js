/* //var express=require('express');
//var app=express();

var app=require('express')(); //this line in place of above 2 lines

var http=require('http').Server(app);//this code connect with http request and able to communicate
var io=require('socket.io')(http);


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',function(socket){   //for build a connection
    console.log('a user is connected.')

    setTimeout(function(){  //here timeout is  an event for display a message after 5 sec
       // socket.send('thanks for joining us');
       socket.emit('testEvent','this is a test event.');
    },5000)//here 5000 is milliseconds stands for 5 seconds

    socket.on('disconnect',function(socket){   //this is for disconnection of the connected api
        console.log('a user is disconnected.')   
    })
})

http.listen(3000,function(){
    console.log('the server is running at port 3000');
}) */


//var express=require('express');
//var app=express();


//                SERVER TO CLIENT   ( BROADCASTING )
/* 
var app=require('express')(); //this line in place of above 2 lines

var http=require('http').Server(app);//this code connect with http request and able to communicate
var io=require('socket.io')(http);   //for socket


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})

var clients = 0;
    io.on('connection',function(socket){   //for build a connection
    clients++;
    socket.emit('newClientConnected',{message:'hello new client.'})  //message pass only on new client screen
    socket.broadcast.emit('newClientConnected',{ message: clients + 'clients are connected with us.'})//but here message broadcas or pass to every client
    //io.sockets.emit('broadcast',{ message: clients + 'clients are connected with us.'})

    socket.on('disconnect',function(){   //this is for disconnection of the connected api
    clients--;
    socket.broadcast.emit('newClientConnected',{ message: clients + 'clients are connected with us.'})
    //io.sockets.emit('broadcast',{ message: clients + 'clients are connected with us.'})
      
    })
})

http.listen(3000,function(){
    console.log('the server is running at port 3000');
}) */

                      ////////////////      CHATTING APP    ///////////////////

var app=require('express')(); //this line in place of above 2 lines

var http=require('http').Server(app);//this code connect with http request and able to communicate
var io=require('socket.io')(http);   //for socket


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})

users=[];
io.on('connection',function(socket){
    console.log('A user is connected.');
    
    socket.on('setUsername',function(data){
     console.log(data);

        if(users.indexOf(data) > -1){
        socket.emit('userAlreadyExists',data + 'already exist.Try with some')
        }else{
            users.push(data);
            socket.emit('newUserSet',{ username:data });          
        }
    });

     socket.on('msg',function(data){
        io.sockets.emit('NewMessage',data);
    }) 
});


http.listen(3000,function(){
    console.log('the server is running at port 3000');
})