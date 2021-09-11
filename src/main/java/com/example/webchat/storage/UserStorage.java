package com.example.webchat.storage;

import com.example.webchat.repository.UserRepository;
import com.example.webchat.userProfile.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeUser")
public class UserStorage implements UserRepository {

   private static List<User> userDB = new ArrayList<>();

   @Override
   public User addNewUser ( User user)
   {
      UUID id = UUID.randomUUID();
      User newUser = new User(id, user.getUsername());
	  userDB.add(newUser);
	  return newUser;
   }

   @Override
  public Optional<User> selectUserById(UUID id)
   {
      return userDB.stream().filter(user-> user.getUserId().equals(id)).findFirst();
   }

}
