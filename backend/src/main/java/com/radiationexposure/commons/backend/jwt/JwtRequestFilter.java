package com.radiationexposure.commons.backend.jwt;

import com.radiationexposure.commons.backend.model.UserDto;
import com.radiationexposure.commons.backend.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String jwtToken = jwtTokenUtil.parseJWTTokenFromRequestHeader(httpServletRequest);
        String username = null;
        if(jwtToken != null){
            username = jwtTokenUtil.getUsernameFromRequestTokenHeader(jwtToken);
        }
        //log.debug("Username from JWT token'{}'", username);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDto userDto = userService.loadUserByUsername(username);
            JwtUserDetails userDetails = new JwtUserDetails(userDto.getId(), userDto.getUsername(), userDto.getPassword(),"");

            //Validate the token
            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                //Creating authentication object
                //UsernamePasswordAuthenticationToken is an object used by spring to represent the current authenticated user
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, AuthorityUtils.createAuthorityList("Role_USER"));
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                //Set authentication true for auth user
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
