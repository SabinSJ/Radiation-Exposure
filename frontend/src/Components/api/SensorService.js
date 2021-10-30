import axios from 'axios'

class SensorService{

    getSensorValuesAndTimeStamp()
    {
        return axios.get("http://radiationexposurebackend-env-1.eba-ipfipxqm.us-east-2.elasticbeanstalk.com/sensor/getSensor/PocketGeiger");
    }

    getTimestampForToday()
    {
        return axios.get(`http://radiationexposurebackend-env-1.eba-ipfipxqm.us-east-2.elasticbeanstalk.com/sensor/getTimestamp/`)
    }

    getDataByTimestampsForChartByChoosingDay(day,month,year)
    {
        return axios.get(`http://localhost:8080/sensor/getDataByTimestampsForChartByChoosingDay/${day}/${month}/${year}`, {day,month,year});
    }

    //getDataByTimestampForDailyChart

    //getDataByTimestampsForChartByChoosingDay
}

export default new SensorService();