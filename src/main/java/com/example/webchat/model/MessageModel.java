package com.example.webchat.model;


import lombok.Getter;
import lombok.Setter;


import java.util.UUID;

@Getter
@Setter
public class MessageModel {


   private String message;
   private String fromUser;
   private UUID toRoom;
   private String time;




   public MessageModel(String message, String fromUser, UUID toRoom) {
      this.message = message;
      this.fromUser = fromUser;
      this.toRoom = toRoom;
      this.time = StringUtils.getCurrentTime();
   }


}
