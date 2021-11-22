package com.radiationexposure.commons.backend.repository;

import com.radiationexposure.commons.backend.model.UserLocationTrackerDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.util.List;

@EnableElasticsearchRepositories
public interface UserLocationTrackerRepository extends ElasticsearchRepository<UserLocationTrackerDTO,String> {
    List<UserLocationTrackerDTO> findByUsernameOrderByTimestampAsc(String username);

    //List<UserLocationTrackerDTO> findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(long timestamp_startOfDay, long timestamp_endOfDay);

    List<UserLocationTrackerDTO> findByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(String username,long timestamp_startOfDay, long timestamp_endOfDay);

    List<UserLocationTrackerDTO> findAllByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(String username,long timestamp_startOfDay, long timestamp_endOfDay);
}
