package com.radiationexposure.commons.backend.controller;

import com.radiationexposure.commons.backend.model.UserLocationTrackerDTO;
import com.radiationexposure.commons.backend.service.UserLocationTrackerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

@RestController
@RequestMapping("/userLocationTracker")
@CrossOrigin(origins="*")
public class UserLocationTrackerController {

    private UserLocationTrackerServiceImpl userLocationTrackerServiceImpl;

    @Autowired
    public UserLocationTrackerController(UserLocationTrackerServiceImpl userLocationTrackerServiceImpl) {this.userLocationTrackerServiceImpl = userLocationTrackerServiceImpl;}

    @PostMapping("/create")
    public UserLocationTrackerDTO create(@RequestBody final UserLocationTrackerDTO userLocationTrackerDTO)
    {
        return userLocationTrackerServiceImpl.save(userLocationTrackerDTO);
    }

    @GetMapping("/getTrackingData/{username}")
    public Iterable<UserLocationTrackerDTO> getTrackingData(@PathVariable String username)
    {
        return userLocationTrackerServiceImpl.findByUsernameOrderByTimestampAsc(username);
    }

    @GetMapping("/getTrackingDataByDay/{username}/{day}/{month}/{year}")
    public Iterable<UserLocationTrackerDTO> getTrackingDataByDay(@PathVariable String username, @PathVariable String day, @PathVariable String month, @PathVariable String year) throws ParseException {
        Date dateValue = new SimpleDateFormat("dd.MM.yyyy").parse(day + "." + month + "." + year);

        long timestamp_startOfDay = atStartOfDay(dateValue).getTime() / 1000l;

        long timestamp_endOfDay = atEndOfDay(dateValue).getTime() / 1000l;

        return userLocationTrackerServiceImpl.findAllByUsernameAndTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(username, timestamp_startOfDay, timestamp_endOfDay);
    }

    public Date atEndOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    public Date atStartOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }
}
