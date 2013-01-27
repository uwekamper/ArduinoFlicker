/*
 Arduino Flickr receiver code
 
 */

int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);
  Serial.begin(19200);
}

void loop() {
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);    
  for(int i = 0; i < 10; i++) {
    Serial.print(sensorValue);
    Serial.println("");
  }

  // turn the ledPin on
  
//  digitalWrite(ledPin, HIGH);  
//  // stop the program for <sensorValue> milliseconds:
//  delay(sensorValue);          
//  // turn the ledPin off:        
//  digitalWrite(ledPin, LOW);   
//  // stop the program for for <sensorValue> milliseconds:
//  delay(250);                  
}
