#include <NTPClient.h>
#include <WiFiUdp.h>

const long utcOffsetInSeconds = 0;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

void timestamp_setup()
{
  timeClient.begin();
}

unsigned long getTime() 
{
  timeClient.update();
  
  return timeClient.getEpochTime();
}
