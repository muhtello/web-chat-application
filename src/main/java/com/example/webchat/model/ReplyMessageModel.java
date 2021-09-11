package com.example.webchat.model;



import java.util.Map;
import java.util.UUID;

public class ReplyMessageModel {

   private  final MessageModel messageModel;
   private  final Map<UUID, String> usersInRoom;

   public ReplyMessageModel(MessageModel messageModel, Map<UUID, String> usersInRoom) {
	  this.messageModel = messageModel;
	  this.usersInRoom = usersInRoom;
   }

   public MessageModel getMessageModel() {
	  return messageModel;
   }

   public Map<UUID, String> getUsersInRoom() {
	  return usersInRoom;
   }
}
