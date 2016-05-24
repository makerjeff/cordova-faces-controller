/* ===========================
 *  PWM Motor Controller 
 * ===========================
 * 2016.MAY.24: CONVERTED TO cordova-faces-controller
 */
 
 /*---------------------------
 *  Motor Direction Reference
 * ---------------------------
 * 
 * forward:
 * motor1EN1 = (PWM);
 * motor1DirA = HIGH;
 * motor1DirB = LOW;
 * 
 * backward:
 * motor1EN1 = (PWM);
 * motor1DirA = LOW;
 * motor1DirB = HIGH;
 * 
 * neutral:
 * motor1EN1 = 0;
 * Motor1DirA = (as it was)
 * Motor1DirB = (as it was)
 * 
 * brake:
 * motorEN1 = 0;
 * Motor1DirA = LOW;
 * Motor1DirB = LOW;
*/
//starting with single motor control first

// LED globals
int pwmLed = 10;  //debug LED tester for PWM
int RXLED = 17; //RX led on micro, TXLED0 and TXLED1 macros for TX led.
unsigned long prevMil = 0;
int blinkInterval = 250;
bool led1State = false;

// SERIAL globals
int inByte = 0;

// MOTOR globals
// ProMicro PWM: 3, 5, 6, 9, 10
int motor1EN1 = 3;    //proMicro PWM pin
int motor1DirA = 14;  //proMicro digital pin
int motor1DirB = 15;  //proMicro digital pin

//TODO: implement
int motor2EN1 = 9;    //motorB PWM pin
int motor2DirA = 7;   //motorB dirA digital pin
int motor2DirB = 8;   //motorB dirB digital pin



void setup() {
  pinMode(pwmLed, OUTPUT);
  pinMode(RXLED, OUTPUT);

  Serial.begin(9600);
  //Serial.setTimeout(10);
  
  while(!Serial) {
    ; //wait for serial port connection; leonardo + micro
  }
  
  analogWrite(pwmLed, 0);
}

void loop() {
  // put your main code here, to run repeatedly:

  //evaluateSerial();

  serialMotorTest();
}


// custom functions

void evaluateSerial() {
  
  while(Serial.available() > 0) {
    int val1 = Serial.parseInt();


    if(val1 > 255) {
      Serial.print("value too high! try again \r\n");
    }

    else if (Serial.read() == ';') {
      Serial.print(val1);
      Serial.print(". \r\n");

      setMotor(1, val1);
    }
  }
}

//comprehensive test using singular numbers, single motor
void serialMotorTest() {

  while(Serial.available() > 0) {
    int val1 = Serial.parseInt();

    if(val1 > 255) {
      Serial.print("value is too high! try again \r\n");  
    }

    else if (Serial.read() == ';'){
      Serial.print(val1);
      Serial.print(". \r\n");

      //affect motor
      analogWrite(pwmLed, val1);
    }
  }
  
}


/**
 * setMotor prototype (untested)
 */
void setMotor(int dir, int speet) {
  
  if(dir == 1) {
    digitalWrite(motor1DirA, HIGH);
    digitalWrite(motor1DirB, LOW);
  }
  else if(dir == 0) {
    digitalWrite(motor1DirA, LOW);
    digitalWrite(motor1DirB, HIGH);  
  }
  else {
    digitalWrite(motor1DirA, LOW);
    digitalWrite(motor1DirB, LOW);
  }

  analogWrite(pwmLed, speet);
  
}


