package com.radiationexposure.commons.backend.jwt.resource;

import com.radiationexposure.commons.backend.jwt.JwtUtil;
import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000/")
public class JwtAuthenticationRestController {

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest) throws Exception {
        //Verify if requested user have correct credentials
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername()
                    , authenticationRequest.getPassword()));
        } catch (Exception e) {
            //log.info("User with invalid credentials trying to login ", e);
            return ResponseEntity.notFound().build();
        }
        //Load user information from database
        Optional<UserDto> userDto = userService.findUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDto.get());
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}
