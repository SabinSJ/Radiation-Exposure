package com.radiationexposure.commons.backend.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JwtWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        "/authenticate",
                        "/sensor/*",
                        "/sensor/getSensor/*",
                        "/sensor/getDataByTimestampForDailyChart/",
                        "/sensor/getDataForDailyChartByMonth",
                        "/sensor/getDataByTimestampsForChartByChoosingMonth/*/*/*",
                        "/sensor/getDataByTimestampsForChartByChoosingDay/*/*/*",
                        "/user/*",
                        "/user/getUserData/*",
                        "/user/changeUserData/*/*/*/*",
                        "/user/verifyPassword/*/*",
                        "/user/changePassword/*/*",
                        "/userLocationTracker/*",
                        "/userLocationTracker/getTrackingData/*",
                        "/userLocationTracker/getTrackingDataByDay/*/*/*/*",
                        "/forgot/*",
                        "/reset/*/*")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService) //injecting our implementation of UserDetailsService interface which loads user details from elasticsearch index
                .passwordEncoder(passwordEncoder());            //we enabling password encoding
    }

}
