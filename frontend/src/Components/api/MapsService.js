import axios from 'axios'

class MapsService {

    getTrackingData(username)
    {
      return axios.get(`http://185.146.87.75:8080/radioactivitate/userLocationTracker/getTrackingData/${username}`, {username})
    }

    getTrackingDataByDay(username,day,month,year)
    {
      return axios.get(`http://localhost:8080/userLocationTracker/getTrackingDataByDay/${username}/${day}/${month}/${year}`, {username,day,month,year})
    }

    getDataByTodaysTimestamp()
    {
      return axios.get(`http://185.146.87.75:8080/radioactivitate/sensor/getDataByTimestampForDailyChart`)
    }
}

export default new MapsService()