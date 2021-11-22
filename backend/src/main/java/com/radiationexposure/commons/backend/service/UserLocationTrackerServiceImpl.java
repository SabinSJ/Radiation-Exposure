package com.radiationexposure.commons.backend.service;

import com.radiationexposure.commons.backend.model.UserLocationTrackerDTO;
import com.radiationexposure.commons.backend.repository.UserLocationTrackerRepository;
import com.radiationexposure.commons.backend.service.api.UserLocationTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLocationTrackerServiceImpl implements UserLocationTrackerService {

    @Autowired
    UserLocationTrackerRepository userLocationTrackerRepository;

    @Override
    public UserLocationTrackerDTO save(final UserLocationTrackerDTO userLocationTrackerDTO) { return userLocationTrackerRepository.save(userLocationTrackerDTO); }

    @Override
    public Iterable<UserLocationTrackerDTO> findByUsernameOrderByTimestampAsc(String username) { return userLocationTrackerRepository.findByUsernameOrderByTimestampAsc(username); }

    @Override
    public Iterable<UserLocationTrackerDTO> findAllByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(String username, long timestamp_startOfDay, long timestamp_endOfDay) {
        return userLocationTrackerRepository.findAllByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(username,timestamp_startOfDay,timestamp_endOfDay);
    }
}
