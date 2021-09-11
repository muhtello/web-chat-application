package com.example.webchat.repository;

import com.example.webchat.roomChat.RoomChat;
import com.example.webchat.userProfile.User;


import java.util.Map;
import java.util.UUID;

public interface RoomChatRepository {

   RoomChat addNewRoom(String nameRoom, User userAsAdmin);

   RoomChat getDefaultRoom ();

   Boolean isRoomExisted(UUID roomId);
   /*List<RoomChat> getAllRooms();*/

   Map<UUID, String> getUsersInRoom(UUID roomChatId);

   void addUserToRom (UUID currentRoomId, User userToAdd);


}
