package com.example.webchat.storage;

import com.example.webchat.repository.RoomChatRepository;
import com.example.webchat.roomChat.RoomChat;
import com.example.webchat.userProfile.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository("fakeRoom")
public class RoomChatStorage implements RoomChatRepository {

   private static List<RoomChat> roomDB = new ArrayList<>();

   static {
      roomDB.add(
          new RoomChat(UUID.fromString("9e54dfd9-2901-41c1-9c6d-799d21df0a84"),
              "Public", new User(
                  UUID.randomUUID(),
                  "admin"
          ))
      );
   }

   @Override
   public RoomChat getDefaultRoom()
   {
      return roomDB.get(0);
   }

   Optional<RoomChat> getRoomById(UUID id){

     return roomDB.stream()
        .filter(room -> room.getRoomId().equals(id))
        .findFirst()
     ;


   }

   @Override
   public Boolean isRoomExisted (UUID id){
      return  getRoomById(id).isPresent();
   }

   @Override
   public RoomChat addNewRoom(String nameRoom, User userAdmin)
   {
      UUID id = UUID.randomUUID();
      RoomChat newRoomChat = new RoomChat(id, nameRoom, userAdmin);
      roomDB.add(newRoomChat);
      return newRoomChat;

   }



   @Override
   public void addUserToRom(UUID currentRoomId, User userToAdd)
   {
      Optional<RoomChat> currentRoom = getRoomById(currentRoomId);

      if (currentRoom.isPresent())
      {
          Map<UUID, String> usersInRoom = currentRoom.get().getUsersInRoom();
          usersInRoom.put(userToAdd.getUserId(), userToAdd.getUsername());

      }

   }

   @Override
   public Map<UUID, String> getUsersInRoom(UUID roomChatId)  {
      RoomChat currentRoom = getRoomById(roomChatId).get();

      return currentRoom.getUsersInRoom();

   }


}
