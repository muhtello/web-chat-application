package com.example.webchat.service;

import com.example.webchat.repository.UserRepository;
import com.example.webchat.userProfile.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

   private final UserRepository userRepository;

   @Autowired
   public UserService(@Qualifier("fakeUser") UserRepository userRepository) {
	  this.userRepository = userRepository;
   }

   public User addNewUser (User newUser)
   {
      return userRepository.addNewUser(newUser);
   }

   public Optional<User> selectUserById (UUID id){
      return userRepository.selectUserById(id);
   }
}
