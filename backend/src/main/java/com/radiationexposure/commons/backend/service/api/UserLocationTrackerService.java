package com.radiationexposure.commons.backend.service.api;

import com.radiationexposure.commons.backend.model.UserLocationTrackerDTO;

public interface UserLocationTrackerService {
    UserLocationTrackerDTO save(UserLocationTrackerDTO userLocationTrackerDTO);

    Iterable<UserLocationTrackerDTO> findByUsernameOrderByTimestampAsc(String username);

    Iterable<UserLocationTrackerDTO> findAllByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(String username, long timestamp_startOfDay, long timestamp_endOfDay);
}
