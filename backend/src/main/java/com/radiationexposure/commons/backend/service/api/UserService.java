package com.radiationexposure.commons.backend.service.api;

import com.radiationexposure.commons.backend.model.UserDto;

import java.util.Optional;

public interface UserService {

    UserDto createUser(UserDto userDto);

    Optional<UserDto> findUserByUsername(String username);

    UserDto findByResetToken(String token);

    UserDto loadUserByUsername(String username);
}
