package com.radiationexposure.commons.backend.repository;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.List;

@EnableElasticsearchRepositories
public interface PocketGeigerRepository extends ElasticsearchRepository<PocketGeigerDTO, String> {

    List<PocketGeigerDTO> findBySensorOrderByTimestampAsc(String sensor);

    List<PocketGeigerDTO> findByTimestampGreaterThanEqualOrderByTimestampAsc(long timestamp);

    List<PocketGeigerDTO> findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(long timestamp_startOfDay, long timestamp_endOfDay);

    List<PocketGeigerDTO> findByLocationlatGreaterThanAndLocationlongGreaterThan(int var1, int var2);
}
