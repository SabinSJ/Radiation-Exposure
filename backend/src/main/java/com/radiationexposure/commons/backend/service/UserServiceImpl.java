package com.radiationexposure.commons.backend.service;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.repository.UserRepository;
import com.radiationexposure.commons.backend.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) { this.userRepository = userRepository;}

    @Override
    public UserDto createUser(final UserDto userDto) { return userRepository.save(userDto);}

    @Override
    public Optional<UserDto> findUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);
        return userDto;
    }

    @Override
    public UserDto findByResetToken(String token) {
        UserDto userDto = userRepository.findByResetToken(token);
        return userDto;
    }

    @Override
    public UserDto loadUserByUsername(String username) {
        Optional<UserDto> userDto = userRepository.findByUsername(username);

        if (userDto == null) {
            throw new UsernameNotFoundException(String.format("User not found '%s'.", username));
        }

        return userDto.get();
    }
}
