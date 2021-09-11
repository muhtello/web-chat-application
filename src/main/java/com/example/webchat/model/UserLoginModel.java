package com.example.webchat.model;

import com.example.webchat.roomChat.RoomChat;
import com.example.webchat.userProfile.User;

public class UserLoginModel {

   private final User user;
   private final RoomChat roomChat;

   public UserLoginModel(User user, RoomChat roomChat) {
	  this.user = user;
	  this.roomChat = roomChat;
   }

   public User getUser() {
	  return user;
   }

   public RoomChat getRoomChat() {
	  return roomChat;
   }
}
