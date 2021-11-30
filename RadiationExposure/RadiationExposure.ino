#include <RadiationWatch.h>

boolean delayInitializer = true;

RadiationWatch radiationWatch(4,5);

long timestamp = 1609452000;
double verifyRadiationValue = 0.000001;
double pocketGeigerValue = 0.0;

void setup() {
  
  Serial.begin(115200);
  radiationWatch.setup();
  wifi_setup();
  timestamp_setup();
  
}

void loop() {
  
  if(verifyWifiConnection() && getTime() > timestamp)
  {

    radiationWatch.loop();

    pocketGeigerValue = radiationWatch.uSvh();
      
    timestamp = getTime();

    delayInitializer = false;

    getLocation();

    if(pocketGeigerValue > verifyRadiationValue)
    {
      send_data_to_server(String(pocketGeigerValue,2), String(getLatitude(),4), String(getLongitude(),4), String(timestamp));
      delay(600000);
    }
  }
  
}
