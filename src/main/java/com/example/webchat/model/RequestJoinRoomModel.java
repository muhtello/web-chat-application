package com.example.webchat.model;

import com.example.webchat.userProfile.User;


import java.util.UUID;


public class RequestJoinRoomModel {
   private User fromUser;
   private User toUser;
   private String nameRoom;
   private UUID roomId;
   private String time;

   public RequestJoinRoomModel(User fromUser, User toUser, String nameRoom, UUID roomId) {
	  this.fromUser = fromUser;
	  this.toUser = toUser;
	  this.nameRoom = nameRoom;
	  this.roomId = roomId;
	  this.time = StringUtils.getCurrentTime();
   }

   public User getFromUser() {
	  return fromUser;
   }

   public User getToUser() {
	  return toUser;
   }

   public String getNameRoom() {
	  return nameRoom;
   }

   public UUID getRoomId() {
	  return roomId;
   }

   public String getTime() {
	  return time;
   }
}
