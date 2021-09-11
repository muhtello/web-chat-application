package com.example.webchat.roomChat;

import com.example.webchat.userProfile.User;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class RoomChat {
   private final UUID roomId;
   private final String name;
   private final User userAsAdmin;

   Map<UUID, String> usersInRoom = new HashMap<>();


   public RoomChat(UUID roomId, String name, User userAsAdmin) {
	  this.roomId = roomId;
	  this.name = name;
	  this.userAsAdmin = userAsAdmin;
   }

   public UUID getRoomId() {
	  return roomId;
   }

   public String getName() {
	  return name;
   }

   public Map<UUID, String> getUsersInRoom() {
	  return usersInRoom;
   }

   public void setUsersInRoom(Map<UUID, String> usersInRoom) {
	  this.usersInRoom = usersInRoom;
   }

   public User getUserAsAdmin() {
	  return userAsAdmin;
   }
}
