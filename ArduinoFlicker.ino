/*
 Arduino Flickr receiver code
 
 */

int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor

#define DETECTOR_DELAY 50 // in ms

void edgeDetected() {
  
}

int waitForEdge() {

  int firstVal = -1; 
  int secondVal = -1;
  float dq = 0; // differential quotient of 
  
  while(true) {
    firstVal = analogRead(sensorPin);
    delay(DETECTOR_DELAY);
    secondVal = analogRead(sensorPin);
    
    dq = (secondVal - firstVal) / DETECTOR_DELAY;
    
    if (abs(dq) >= 1.0) {
      Serial.print("Edge detected: ");
      if (dq > 0.0) {
        Serial.println("^");
      }
      else {
        Serial.println("v");
      }
    }
  } // end while
  
  return 0;
}

void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);
  Serial.begin(19200);
}

void loop() {
  // read the value from the sensor:
  
  waitForEdge();
  delay(250);
  // turn the ledPin on
       
}
