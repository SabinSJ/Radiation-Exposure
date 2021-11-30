class DarkModeLightModeService {

    setDarkMode(value) {
        sessionStorage.setItem("DARK_MODE_SESSION", value)
    }

    isDarkModeActivated(){
        let value = sessionStorage.getItem("DARK_MODE_SESSION");

        if(value === 'true')
            return true;
        else return false;
    }

}
export default new DarkModeLightModeService()