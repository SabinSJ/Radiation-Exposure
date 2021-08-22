package com.radiationexposure.commons.backend.repository;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@EnableElasticsearchRepositories
public interface PocketGeigerRepository extends ElasticsearchRepository<PocketGeigerDTO, String> {
}
