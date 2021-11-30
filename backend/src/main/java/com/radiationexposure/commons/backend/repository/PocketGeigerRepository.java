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

   // List<PocketGeigerDTO> findAllBySensorAndLocationLongBetweenAndLocationLatBetweenAndTimestampAfterOrderByTimestampAsc(int var1, int var2);

    List<PocketGeigerDTO> findBySensorAndLocationlatBetweenAndLocationlongBetweenAndTimestampGreaterThanEqualOrderByTimestampAsc(String sensor_name, double latitude1, double latitude2, double longitude1, double longitude2, long timestamp);
}
