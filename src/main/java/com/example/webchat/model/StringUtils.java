package com.example.webchat.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class StringUtils {

   private static final String timeFormat = "HH:mm:ss";

   public static String getCurrentTime(){
	  DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timeFormat);
	  return LocalDateTime.now().format(formatter);
   }
}
