package com.example.webchat.controller;

import com.example.webchat.model.*;
import com.example.webchat.roomChat.RoomChat;
import com.example.webchat.service.RoomChatService;
import com.example.webchat.service.UserService;
import com.example.webchat.userProfile.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class ChatController {

   private final UserService userService;
   private final RoomChatService roomChatService;

   @Autowired
   SimpMessagingTemplate messagingTemplate;

   @Autowired
   public ChatController(UserService userService, RoomChatService roomChatService) {
	  this.userService = userService;
	  this.roomChatService = roomChatService;
   }

   @PostMapping("user/login")
   public ResponseEntity addNewUser(@NonNull @RequestBody User user)
   {

      User newUser = userService.addNewUser(user);
      RoomChat publicRoom = roomChatService.getDefaultRoom();
      roomChatService.addUserToRom(publicRoom.getRoomId(), newUser);

      return ResponseEntity.ok(new UserLoginModel(
          newUser,
          publicRoom
      ));
   }

   @PostMapping("room/add")
   public RoomChat addRoomChat(@NonNull @RequestBody RoomModel roomModel)
   {
      return roomChatService.addNewRoom(roomModel);
   }

   @PostMapping("room/adduser/")
   public Map<UUID, String> addUserToRoom (@RequestParam(value = "roomId") String roomId, @RequestParam(value = "userId") String userId){
      UUID currentRoomId = UUID.fromString(roomId);
      User UserToAdd = userService.selectUserById(UUID.fromString(userId)).get();
      roomChatService.addUserToRom(currentRoomId, UserToAdd);
      return roomChatService.getUsersInRoom(currentRoomId);
   }

   @GetMapping("room/{roomId}/users")
   public Map<UUID, String> getUsersInRoom(@PathVariable String roomId)
   {
      UUID idToUUD = UUID.fromString(roomId);
      return roomChatService.getUsersInRoom(idToUUD);
   }

   // receive message from client
   @MessageMapping("/room/{roomId}")
   public void sendMsgToRoom(@DestinationVariable String roomId, MessageModel message) {
         UUID currentId = UUID.fromString(roomId);

      if (roomChatService.isRoomExisted(currentId)){

         // update list users in room
         Map<UUID, String> usersInRoom = roomChatService.getUsersInRoom(currentId);
         ReplyMessageModel replyMessage = new ReplyMessageModel(
             message,
             usersInRoom
         );
         messagingTemplate.convertAndSend("/topic/" + roomId, replyMessage);
      }
   }


   @MessageMapping("/user/{userId}")
   public void sendRequestJoinRoom (@DestinationVariable String userId,
                                    RequestJoinRoomModel requestJoinRoomModel
   )
   {
      if (roomChatService.isRoomExisted(requestJoinRoomModel.getRoomId())){

         messagingTemplate.convertAndSend("/topic/" + userId, requestJoinRoomModel);
      }
   }

}
