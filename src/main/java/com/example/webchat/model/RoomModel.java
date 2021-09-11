package com.example.webchat.model;

import com.example.webchat.userProfile.User;

public class RoomModel {

   private final User user; // user as admin for room
   private final String nameRoom;

   public RoomModel(User user, String nameRoom) {
	  this.user = user;
	  this.nameRoom = nameRoom;
   }

   public User getUser() {
	  return user;
   }

   public String getNameRoom() {
	  return nameRoom;
   }
}
