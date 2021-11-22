package com.radiationexposure.commons.backend.service.api;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;

public interface PocketGeigerService {

    PocketGeigerDTO save(PocketGeigerDTO pocketGeigerDTO);

    Iterable<PocketGeigerDTO> findAll();

    Iterable<PocketGeigerDTO> findBySensorOrderByTimestampAsc(String sensor);

    Iterable<PocketGeigerDTO> findByTimestampGreaterThanEqualOrderByTimestampAsc(long timestamp);

    Iterable<PocketGeigerDTO> findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(long timestamp_startOfDay, long timestamp_endOfDay);

}
