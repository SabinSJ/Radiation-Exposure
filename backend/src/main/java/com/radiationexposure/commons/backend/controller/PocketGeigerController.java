package com.radiationexposure.commons.backend.controller;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import com.radiationexposure.commons.backend.service.PocketGeigerServiceImpl;
import org.elasticsearch.search.aggregations.Aggregation;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@RestController
@RequestMapping("/sensor")
@CrossOrigin(origins="*")
public class PocketGeigerController {

    private PocketGeigerServiceImpl pocketGeigerServiceImpl;

    @Autowired
    public PocketGeigerController(PocketGeigerServiceImpl pocketGeigerServiceImpl) { this.pocketGeigerServiceImpl = pocketGeigerServiceImpl; }

    @PostMapping("/create")
    public PocketGeigerDTO create(@RequestBody final PocketGeigerDTO pocketGeigerDTO)
    {
        return pocketGeigerServiceImpl.save(pocketGeigerDTO);
    }

//    @PostMapping("/create")
//    public void create(@RequestBody final PocketGeigerDTO pocketGeigerDTO)
//    {
//        System.out.println(pocketGeigerDTO);
//    }

    @GetMapping("/getAll")
    public Iterable<PocketGeigerDTO> getAll() {
        return pocketGeigerServiceImpl.findAll();
    }

    @GetMapping("/getSensor/{sensor}")
    public Iterable<PocketGeigerDTO> getSensor(@PathVariable String sensor) {
        System.out.println(java.time.LocalDate.now().toEpochDay());
        return pocketGeigerServiceImpl.findBySensorOrderByTimestampAsc(sensor);
    }

//    @GetMapping("/getDataByTimestampForDailyChart")
//    public Iterable<PocketGeigerDTO> getTimestampForDailyChart() {
//
//        DateTimeZone timeZone = DateTimeZone.forID("Europe/Bucharest");
//        DateTime today = new DateTime(timeZone).withTimeAtStartOfDay();
//        long timestamp = today.getMillis() / 1000l;
//
//        return pocketGeigerServiceImpl.findByTimestampGreaterThanEqualOrderByTimestampAsc(timestamp);
//    }

    @GetMapping("/getDataByTimestampForDailyChart/sensor_name/latitude/longitude")
    public Iterable<PocketGeigerDTO> getTimestampForDailyChart(@PathVariable String sensor_name, @PathVariable double latitude, @PathVariable double longitude) {
        return pocketGeigerServiceImpl.findByCoordinatesSensorData(sensor_name,latitude,longitude);
    }

    @GetMapping("/getMonths")
    public List<Aggregation> getMonths() throws IOException {

        return pocketGeigerServiceImpl.findMonths();
    }

    @GetMapping("/getAvgValuesMonthToMonth")
    public List<Aggregation> getAvgValuesMonthToMonth() throws IOException {

        return pocketGeigerServiceImpl.findAverageValueMonthly();
    }

    @GetMapping("/getDataForDailyChartByMonth")
    public Iterable<PocketGeigerDTO> getDataForDailyChartByMonth() {

        Date beginning, end;

        Calendar startOfMonth = getCalendarForNow();
        startOfMonth.set(Calendar.DAY_OF_MONTH,
                startOfMonth.getActualMinimum(Calendar.DAY_OF_MONTH));
        setTimeToBeginningOfDay(startOfMonth);
        beginning = startOfMonth.getTime();

        Calendar endOfMonth = getCalendarForNow();
        endOfMonth.set(Calendar.DAY_OF_MONTH,
                endOfMonth.getActualMaximum(Calendar.DAY_OF_MONTH));
        setTimeToEndofDay(endOfMonth);
        end = endOfMonth.getTime();


        long timestamp_startOfMonth = atStartOfDay(beginning).getTime() / 1000l;

        long timestamp_endOfMonth = atEndOfDay(end).getTime() / 1000l;

        return pocketGeigerServiceImpl.findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(timestamp_startOfMonth, timestamp_endOfMonth);
    }

    @GetMapping("/getDataByTimestampsForChartByChoosingDay/{day}/{month}/{year}")
    public Iterable<PocketGeigerDTO> getDataByTimestampsForChartByChoosingDay(@PathVariable String day, @PathVariable String month, @PathVariable String year) throws ParseException {

        Date dateValue = new SimpleDateFormat("dd.MM.yyyy").parse(day + "." + month + "." + year);

        long timestamp_startOfDay = atStartOfDay(dateValue).getTime() / 1000l;

        long timestamp_endOfDay = atEndOfDay(dateValue).getTime() / 1000l;

        return pocketGeigerServiceImpl.findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(timestamp_startOfDay, timestamp_endOfDay);
    }

    @GetMapping("/getDataByTimestampsForChartByChoosingMonth/{day}/{month}/{year}")
    public Iterable<PocketGeigerDTO> getDataByTimestampsForChartByChoosingMonth(@PathVariable String day, @PathVariable String month, @PathVariable String year) throws ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

        Date date = dateFormat.parse(day + "." + month + "." + year);

        Calendar firstDayOfMonth = Calendar.getInstance();
        firstDayOfMonth.setTime(date);
        firstDayOfMonth.set(Calendar.DAY_OF_MONTH, firstDayOfMonth.getActualMinimum(Calendar.DAY_OF_MONTH));

        Calendar lastDayOfMonth = Calendar.getInstance();
        lastDayOfMonth.setTime(date);
        lastDayOfMonth.set(Calendar.DAY_OF_MONTH, lastDayOfMonth.getActualMaximum(Calendar.DAY_OF_MONTH));

        long timestamp_startOfMonth = firstDayOfMonth.getTimeInMillis() / 1000l;

        long timestamp_endOfMonth = lastDayOfMonth.getTimeInMillis() / 1000l;

        System.out.println(timestamp_startOfMonth);
        System.out.println(timestamp_endOfMonth);

        return pocketGeigerServiceImpl.findByTimestampGreaterThanEqualAndTimestampLessThanEqualOrderByTimestampAsc(timestamp_startOfMonth, timestamp_endOfMonth);
    }

    private static Calendar getCalendarForNow() {
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(new Date());
        return calendar;
    }


    private static void setTimeToBeginningOfDay(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }

    private static void setTimeToEndofDay(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
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