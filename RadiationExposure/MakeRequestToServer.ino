#include <ESP8266HTTPClient.h>

WiFiClient wifiClient;

String serverName = "http://185.146.87.75:8080/radioactivitate/sensor/create";
//String serverName = "http://192.168.0.164:8080/sensor/create";



void send_data_to_server(String sensorValue, String latitudeStr, String longitudeStr, String timestamp)
{
  HTTPClient http;
  http.begin( wifiClient, serverName );
  http.addHeader("Content-Type", "application/json");
  
  int httpResponseCode = http.POST("{\"source\":\"Home\",\"sensor\":\"PocketGeiger\",\"value\":\"" + sensorValue + "\",\"locationlat\":\"" + latitudeStr + "\",\"locationlong\":\"" + longitudeStr + "\",\"timestamp\":\"" + timestamp + "\",\"measurement\":\"uSv/h\"}");
  //int httpResponseCode = http.POST("{\"source\":\"Home\",\"sensor\":\"PocketGeiger\",\"value\":\"" + sensorValue + "\",\"locationlat\":\"" + latitudeStr + "\",\"locationlong\":\"" + longitudeStr + "\",\"measurement\":\"uSv/h\"}");


  if(httpResponseCode > 0)
  {
     String response = http.getString();
     Serial.println(httpResponseCode);
     Serial.println(response);
     Serial.println("Data sent to database");
  
  }
  else
  {
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}
