package com.radiationexposure.commons.backend.jwt;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserServiceImpl userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserDto> userDto = userService.findUserByUsername(username);

        if(userDto == null){
            //log.info("User with invalid credentials trying to login");
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        return new JwtUserDetails(userDto.get().getId(),userDto.get().getUsername(),userDto.get().getPassword(),"");
    }
}
