#include <ESP8266WiFi.h>

const char* ssid = "SabinGeorgescu";
const char* pass = "Pr0grammingIsTheKey";

//const char* mobileDataSsid = "SabinSJ";
//const char* mobileDataPass = "parola1234";

void wifi_setup() {

  WiFi.begin(ssid,pass);
  
  Serial.println(" ");
  Serial.print("Connecting to ");
  Serial.print(ssid);

  while(WiFi.status()!= WL_CONNECTED)
  {
    Serial.print(".");
    delay(5000);
  }
  Serial.println("Connected Successfully");
}

boolean verifyWifiConnection()
{
  if(WiFi.status() == WL_CONNECTED)
  {
    return true;
  }
  return false;
}
