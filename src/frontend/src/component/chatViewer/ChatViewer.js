import React, {Component} from "react";
import SockJsClient from 'react-stomp';
import UsersRoomViewer from "../usersRoomViewer/UsersRoomViewer";
import MessageViewer from "../messageViewer/MessageViewer";
import RoomViewer from "../room/RoomViewer";
import {addNewRoom, getUsersInRoom, 
  updateUsersInRoom, welcomeMessage, 
  addUserToRoom} 
from "./ChatViewer.helper";
import "./chat-viewer.css"

class ChatViewer extends Component
{
  constructor(props){
    super(props);
    this.state = {
      chatRooms: [],
      indexRoom: 0,
      requestJoinMsg : {
        fromUser: {},
        toUser: {},
        roomName: "",
        roomId: 0
      }
    }
  }

  componentDidMount(){
    
  }



  async handleConnect()
  {
    
    console.log("connected");
    let chatRooms = (this.state.chatRooms && this.state.chatRooms) || [];
    if (chatRooms && chatRooms.length === 0)
    {
      const {defualtRoom} = this.props;
      console.log("defualt room chat has been created");
      const usersInRoom = await getUsersInRoom(defualtRoom.roomId);
      const welcomMsg = welcomeMessage(
        defualtRoom.userAsAdmin.username, 
        defualtRoom.roomId
      );
        
      const publicRoom = {
        userAsAdmin: defualtRoom.userAsAdmin,
        roomId: defualtRoom.roomId,
        nameRoom: defualtRoom.name,
        usersInRoom : usersInRoom,
        unreadedMsg: 0,
        messages: [{...welcomMsg}],
      };
      chatRooms.push(publicRoom);
      this.setState({
        chatRooms: chatRooms,
        //TODO change indexRoom
        //indexRoom: 0 
      })

    }
  }



  handleOnMessage(messageModel, topic)
  {
    console.log("message recived", messageModel, topic);
    const userId = this.props.user.userId;
    const topicId = topic.split("/").pop();
    if (userId === topicId ){
      console.log("match", messageModel);
      this.setState({requestJoinMsg: messageModel});
      return;
    };
    const message = messageModel.messageModel;
    let chatRooms = this.state.chatRooms;
    const indexRoom = chatRooms.findIndex(c=> c.roomId === message.toRoom);
    let selectedRoom = chatRooms[indexRoom];
    const unreadedMsg = indexRoom === this.state.indexRoom ? 
    0 : selectedRoom.unreadedMsg  + 1
    ;
    
    selectedRoom.unreadedMsg = unreadedMsg;
    selectedRoom.messages.push(message);
    selectedRoom.usersInRoom = updateUsersInRoom(messageModel.usersInRoom);
    this.setState({chatRooms});
  }

  handleSendMessage = (event, text) => {
    const user = this.props.user;
    const username = user.username;
    const {chatRooms, indexRoom} = this.state;
    if(event.key === 'Enter'){
      event.preventDefault();
      console.log("sending message")
      const  roomId = chatRooms[indexRoom].roomId;
      //"9e54dfd9-2901-41c1-9c6d-799d21df0a84";
      
      const chat = {
        message: text,
        fromUser: username,
        toRoom: roomId,
      }
      console.log(chat);
      try {
        this.clientRef.sendMessage("/app/room/" + roomId, JSON.stringify(chat));
        document.getElementById("output").value = "";
      } catch(e) {
        console.log("erro in connection", e);
        
      }
    }
  }

  async handleNewRoom(nameRoom){
    const user = this.props.user;
    let chatRooms = this.state.chatRooms;
    const newRoom = await addNewRoom(nameRoom , user);
    chatRooms.push(newRoom);
    
    this.setState({
      chatRooms
    })
    
  }

  handleRequest(requestJoinMsg){
    console.log(requestJoinMsg);
    try{
      this.clientRef.sendMessage(
        "/app/user/" + requestJoinMsg.toUser.userId,
         JSON.stringify(requestJoinMsg)
      );
      
    } catch(e) {
      console.log("erro in connection", e); 
    }
  }

  async handleExceptRequest(req){
    const user = this.props.user;
    let chatRooms = this.state.chatRooms;
    const usersInRoom = await addUserToRoom(req.roomId, user.userId);
    const welcomMsg = welcomeMessage(user.username, req.roomId)
    console.log(usersInRoom);
    const newRoom = {
      roomId: req.roomId,
      nameRoom: req.nameRoom,
      usersInRoom : usersInRoom,
      unreadedMsg: 0,
      messages: [{...welcomMsg}],
    };
    const requestJoinMsg = {
      fromUser: {},
      toUser: {},
      roomName: "",
      roomId: 0
    }
    chatRooms.push(newRoom);
    this.setState({
      chatRooms: chatRooms,
      requestJoinMsg: requestJoinMsg
    })

  }

  render(){
    const {indexRoom, chatRooms, requestJoinMsg} = this.state;
    const {user} = this.props;
    const messages = (
      chatRooms[indexRoom] 
      && chatRooms[indexRoom].messages
      && chatRooms[indexRoom].messages) || []
    ;
    const usersInRoom = (
      chatRooms[indexRoom] 
      && chatRooms[indexRoom].usersInRoom
      && chatRooms[indexRoom].usersInRoom) || []
    ;
    const userAsAdmin = (
      chatRooms[indexRoom]
      && chatRooms[indexRoom].userAsAdmin
      && chatRooms[indexRoom].userAsAdmin
    ) || {}
    const rooms =  chatRooms[indexRoom] && chatRooms.map((room, index) => {
      const unreadedMsg = index !== indexRoom ? room.unreadedMsg : 0;
      return {
        roomId: room.roomId,
        nameRoom: room.nameRoom,
        unreadedMsg
      }
    });

    const topic = chatRooms && chatRooms.map(room => "/topic/" + room.roomId);
    const topicWithUser = [...topic, "/topic/" + user.userId];
    
    const url = "http://localhost:8080/chat";
    return(
      <div>
        <SockJsClient
          url={url}
          topics={topicWithUser}
          onConnect={() => this.handleConnect()}
          onDisconnect={console.log("Disconnected!")} //TODO handle disconnected socket 
          onMessage={(message, topic ) => this.handleOnMessage(message, topic)}
          debug={false}
          ref={ (client) => { this.clientRef = client }}
        />
        <div className="ppane-body">
          <div className="container">
            <div className="chat-box-warrper">
              <div className= "chat-box-header">
                <span className="chat-box-status conntectd" >
                {chatRooms[indexRoom] && chatRooms[indexRoom].nameRoom}</span>
              </div>
              <div className = "chat-box-body">
                <MessageViewer
                  messages={messages}
                  currentUser = {this.props.user.username}
                />
              </div>
              <div className="chat-input-wrapper">
                <textarea
                  id="output"
                  className = "chat-input-raw"
                  cols={60}
                  row={60}
                  placeholder="send message"
                  //onChange = {(e) => this.sendMessage(e.target.value)}
                  onKeyPress = {(e) => this.handleSendMessage(e, e.target.value)}
                >
                </textarea>
                
              </div>
              <div>
                <RoomViewer
                  rooms = {rooms}
                  selectedIndex = {indexRoom}
                  handleNewRoom = {(nameRoom) => this.handleNewRoom(nameRoom)}
                  handleSwtichRoom = {
                    (indexRoom) => this.setState(prevState => (
                      {
                        indexRoom: indexRoom,
                        chatRooms: prevState.chatRooms.map((c, i) => 
                            prevState.indexRoom === i ? {...c, unreadedMsg: 0 } : c
                          )
                      }
                    )
                  )}
                  
                />
              </div>
            </div>
            <div className="rightpane">
                <UsersRoomViewer 
                  usersInRoom={usersInRoom}
                  user = {user}
                  userAsAdmin = {userAsAdmin}
                  rooms = {rooms}
                  requestJoinMsg = {requestJoinMsg}
                  handleRequest = {(room, user) => this.handleRequest(room, user)}
                  handleExceptRequest = {(req) => this.handleExceptRequest(req)}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatViewer;