import { Server } from "socket.io";
import { User } from "./models/User.model.js";
import { Captain } from "./models/Captain.model.js";

let io;

function InitalizeSocket(server) {
    io = new Server(server, {
        cors:{
            origin:'*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client Connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client Disconnected: ${socket.id}`);
        })

        socket.on('join', async(data) => {
            const{userId, userType} = data;
            console.log(`User ${userId} joined with type ${userType}`);
            if(userType === 'user'){
                await User.findByIdAndUpdate(userId,{socketId:socket.id});
                // socket.join(user.socketId);
            }
            else if(userType === 'captain'){
                 await Captain.findByIdAndUpdate(userId,{socketId:socket.id});
                // socket.join(captain.socketId);
            }
        })
        // in these data  we get is latitude ,longitude and token and we use token if nedded
    socket.on('update-location-captain',async (data) => {
        const { userId, location } = data;
        if (!location || !location.ltd || !location.lng) {
            return socket.emit('error', { message: 'Invalid location data' });
        }

        await Captain.findByIdAndUpdate(userId, {
            location: {
                ltd: location.ltd,
                lng: location.lng
            }
        });
    });
   
    });

    
}

//sendMessage

function sendMessageToSocketId(socketId, messageObject) {
    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else{
        console.log('Socket is not initialized');
    }
}

export {InitalizeSocket, sendMessageToSocketId}