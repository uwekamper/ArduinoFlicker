/*
 Arduino Flickr receiver code
 
 */

int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor

#define DETECTOR_DELAY 50 // in ms

long detectPreamble() {
  long t_firstedge;
  long t_secondedge;
  long te = 0;
  
  Serial.println("Waiting for preamble");
  int i = 0;
  while(true) {
    // Serial.println(i);
    int first_edge = waitForEdge();
    t_firstedge = millis();
    
    if (first_edge != 1) {
      i = 0;
      continue;
    }
    
    if( waitForEdge() != first_edge ) {
      t_secondedge = millis();
      // Serial.println("go");
    }
    else {
      i = 0;
      continue;
    }
    
    i++;
    te = (te + (t_secondedge - t_firstedge)) / 2;
  
    
    if (i >= 8) {
      Serial.println("got preamble");
        Serial.print("TE = ");
        Serial.println(te);
    
      break;   
    }
  }
  return te;
}

decodeMessage() {
  byte message = 0;
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
      // Serial.print("Edge detected: ");
      if (dq > 0.0) {
        // Serial.println("^");
        return 1;
      }
      else {
        // Serial.println("v");
        return -1;
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
  Serial.println("hello");
  decodeMessage();
  // turn the ledPin on
       
}
