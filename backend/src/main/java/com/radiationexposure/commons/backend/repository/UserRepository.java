package com.radiationexposure.commons.backend.repository;

import com.radiationexposure.commons.backend.model.UserDto;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.Optional;

@EnableElasticsearchRepositories
public interface UserRepository extends ElasticsearchRepository<UserDto, String> {

    Optional<UserDto> findByUsername(String username);

    UserDto findByResetToken(String token);

}
