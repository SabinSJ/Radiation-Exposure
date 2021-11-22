package com.radiationexposure.commons.backend.controller;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.service.UserServiceImpl;
import com.radiationexposure.commons.backend.service.api.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins="*")
public class ResetPasswordController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/forgot/{username}")
    public HttpStatus forgotPassword(@PathVariable String username)
    {
        UserDto userDto = userServiceImpl.loadUserByUsername(username);

        if (userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {

            userDto.setResetToken(UUID.randomUUID().toString());

            userServiceImpl.createUser(userDto);

            SimpleMailMessage passwordResetMail = new SimpleMailMessage();
            passwordResetMail.setFrom("gndappcontact@gmail.com");
            passwordResetMail.setTo(userDto.getUsername());
            passwordResetMail.setSubject("Cerere de resetare a parolei");
            passwordResetMail.setText("Pentru a reseta parola, accesati acest link: " + "http://localhost:3000/reset?token=" + userDto.getResetToken());

            emailService.sendEmail(passwordResetMail);

            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }

    @PostMapping(value = "/reset/{token}/{password}")
    public HttpStatus forgotPassword(@PathVariable String token, @PathVariable String password)
    {
        UserDto userDto = userServiceImpl.findByResetToken(token);

        if (userServiceImpl.findUserByUsername(userDto.getUsername()).isPresent()) {

            userDto.setPassword(passwordEncoder.encode(password));
            userDto.setResetToken(null);

            userServiceImpl.createUser(userDto);

            return HttpStatus.OK;
        }
        return HttpStatus.BAD_REQUEST;
    }


}
