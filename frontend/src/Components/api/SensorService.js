import axios from 'axios'

class SensorService{

    // getSensorValuesAndTimeStamp()
    // {
    //     return axios.get("http://185.146.87.75:8080/radioactivitate/sensor/getSensor/PocketGeiger");
    // }

    getSensorValuesAndTimeStamp(userLatitude, userLongitude)
    {
        return axios.get(`http://localhost:8080/sensor/getSensor/PocketGeiger`, {userLatitude, userLongitude});
    }

    getDataByTimestampForToday(userLatitude, userLongitude)
    {
        return axios.get(`http://localhost:8080/sensor/getDataByTimestampForDailyChart/PocketGeiger/${userLatitude}/${userLongitude}`, {userLatitude, userLongitude});
    }

    getTimestampForMonth()
    {
        return axios.get("http://185.146.87.75:8080/radioactivitate/sensor/getDataForDailyChartByMonth")
    }

    getDataByTimestampsForChartByChoosingDay(day,month,year)
    {
        return axios.get(`http://185.146.87.75:8080/radioactivitate/sensor/getDataByTimestampsForChartByChoosingDay/${day}/${month}/${year}`, {day,month,year});
    }

    getDataByTimestampsForChartByChoosingMonth(day,month,year)
    {
        return axios.get(`http://185.146.87.75:8080/radioactivitate/sensor/getDataByTimestampsForChartByChoosingMonth/${day}/${month}/${year}`, {day,month,year});
    }


    getAverageValuesMonthToMonth()
    {
        return axios.get(`http://185.146.87.75:8080/radioactivitate/sensor/getAvgValuesMonthToMonth`);
    }

    //getDataByTimestampForDailyChart

    //getDataByTimestampsForChartByChoosingDay
}

export default new SensorService();