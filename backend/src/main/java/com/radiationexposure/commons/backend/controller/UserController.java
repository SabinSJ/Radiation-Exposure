package com.radiationexposure.commons.backend.controller;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.service.UserServiceImpl;
import org.elasticsearch.monitor.fs.FsInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="*")
public class UserController {

    private UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create")
    public UserDto create(@RequestBody final UserDto userDto) {
        return userServiceImpl.createUser(userDto);
    }

    @PostMapping("/signup")
    public HttpStatus registerUser(@RequestBody UserDto userDto) {
        //Verify if password is too short
        if (userDto.getPassword().length() < 5)
            return HttpStatus.BAD_REQUEST;

        if (!userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {
            // Creating user's account
            UserDto user = new UserDto();
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setUsername(userDto.getUsername());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            userServiceImpl.createUser(user);
            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @PatchMapping("/changeUserData/{user}/{firstName}/{lastName}/{address}")
    public HttpStatus updateAddress(@PathVariable String user, @PathVariable String firstName, @PathVariable String lastName, @PathVariable String address)
    {
        UserDto updateUserAddress = userServiceImpl.loadUserByUsername(user);

        updateUserAddress.setFirstName(firstName);
        updateUserAddress.setLastName(lastName);
        updateUserAddress.setAddress(address);

        userServiceImpl.createUser(updateUserAddress);

        return HttpStatus.OK;

    }

    @GetMapping("/verifyPassword/{user}/{password}")
    public HttpStatus verifyPassword(@PathVariable String user, @PathVariable String password)
    {
        UserDto verifyUserPassword = userServiceImpl.loadUserByUsername(user);

        if(passwordEncoder.matches(password,verifyUserPassword.getPassword()))
        {
            return HttpStatus.OK;
        }

        return HttpStatus.BAD_REQUEST;
    }

    @PatchMapping("/changePassword/{user}/{newPassword}")
    public HttpStatus changePassword(@PathVariable String user, @PathVariable String newPassword)
    {
        UserDto changeUserPassword = userServiceImpl.loadUserByUsername(user);

        if (userServiceImpl.findUserByUsername(changeUserPassword.getUsername()).isPresent()) {

            changeUserPassword.setPassword(passwordEncoder.encode(newPassword));
            userServiceImpl.createUser(changeUserPassword);

            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @GetMapping("/getUserData/{user}")
    public UserDto getUser(@PathVariable String user)
    {
        return userServiceImpl.loadUserByUsername(user);
    }
}
