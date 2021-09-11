package com.example.webchat.service;

import com.example.webchat.model.RoomModel;
import com.example.webchat.roomChat.RoomChat;
import com.example.webchat.repository.RoomChatRepository;
import com.example.webchat.userProfile.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


import java.util.Map;
import java.util.UUID;

@Service
public class RoomChatService {
   private final RoomChatRepository roomChatRepository;

   @Autowired
   public RoomChatService(@Qualifier("fakeRoom") RoomChatRepository roomChatRepository) {
	  this.roomChatRepository = roomChatRepository;
   }

   public void addUserToRom(UUID currentRoomId, User userToAdd){
      roomChatRepository.addUserToRom(currentRoomId, userToAdd);
   }

   public RoomChat getDefaultRoom()
   {
      return roomChatRepository.getDefaultRoom();
   }

   public Boolean isRoomExisted(UUID roomId){
      return  roomChatRepository.isRoomExisted(roomId);
   }

   public RoomChat addNewRoom(RoomModel roomModel){
      User currentUser = roomModel.getUser();
      RoomChat newRoom = roomChatRepository.addNewRoom(roomModel.getNameRoom(), currentUser);
      addUserToRom(newRoom.getRoomId(), currentUser);
      return newRoom;
   }

   public Map<UUID, String> getUsersInRoom(UUID roomId)
   {
      return roomChatRepository.getUsersInRoom(roomId);
   }
}
