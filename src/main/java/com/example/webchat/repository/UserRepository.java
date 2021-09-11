package com.example.webchat.repository;

import com.example.webchat.userProfile.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository {

   User addNewUser (User user);

   Optional <User> selectUserById(UUID id);


}
