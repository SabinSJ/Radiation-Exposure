package com.radiationexposure.commons.backend.service;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.repository.UserRepository;
import com.radiationexposure.commons.backend.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) { this.userRepository = userRepository;}

    @Override
    public UserDto createUser(final UserDto userDto) { return userRepository.save(userDto);}
}
