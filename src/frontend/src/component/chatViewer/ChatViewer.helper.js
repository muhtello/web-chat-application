import axios from "axios";

const urlServer = "http://localhost:8080/";
 


export const getUsersInRoom =  async (roomId) =>
{
  if (roomId !== undefined && roomId !== ""){
    let usersInRoom;
    //console.log(roomId);
    const data = await getAllUsersInRoom(roomId);
    //console.log(data);


    usersInRoom = await updateUsersInRoom(data);
    
    return  usersInRoom;
  }
    

}



export const updateUsersInRoom = (newUsers) => {
  //let usersInRoom = [];
  const users = Object.entries(newUsers).map(([key, value], index) => {
    return {
      userId: key,
      username: value
    }
    // const user = {
    //   userId: key,
    //   username: value
    // };
    
    // //usersInRoom.push(user);
    // return user;
  });

  //console.log(usersInRoom);
  //return usersInRoom;
  return users;
}

export const welcomeMessage = (fromUser, toRoom) => {
  const msg = {
    message:  fromUser + " add you to this room",
    fromUser,
    toRoom,

  }

  return msg
}

export const addUserToRoom = async(roomId, newuser) =>{
  const url = urlServer + "room/adduser/";
  console.log("the user to add", newuser)
  try{
    const response = await axios.post(url, null, {
      params: {
        roomId: roomId,
        userId: newuser
      }
    });
    const data = await response.data;
    const users = updateUsersInRoom(data);

    return users;

  }catch(erro){
    console.log(erro);

  }

  
}
export const addNewRoom = async(nameRoom, currentUser) =>
{
  try{

    const response = await axios.post(urlServer + "room/add", {
      user: {...currentUser},
      nameRoom: nameRoom
    });
    const data = await response.data;
    console.log("new room", data);
    const usersInRoom = updateUsersInRoom(data.usersInRoom);
    //getUsersInRoom(data.roomId);
    const newRoom = {
      roomId: data.roomId,
      nameRoom: data.name,
      userAsAdmin: data.userAsAdmin,
      usersInRoom : usersInRoom,
      unreadedMsg: 0,
      messages: [],
    }
    return newRoom;
  }
  catch(error){
    console.log(error);
  }
  
}



// helper

const getAllUsersInRoom = async (roomId) => {
  
  const url = urlServer + "room/" + roomId + "/users";
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data; 
  }
  catch(error){
    console.log(error);
  }
 
}