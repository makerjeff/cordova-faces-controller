/* =============================
 *  PWM Motor Controller v0.2.0
 * =============================
 * 2016.MAY.24: DONE!
 * 2016.MAY.24: Implementing direction + speed for both wheels.
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
int motor1EN = 3;    //proMicro PWM pin
int motor1DirA = 15;  //proMicro digital pin, may need to be swapped
int motor1DirB = 14;  //proMicro digital pin, may need to be swapped

//TODO: implement
int motor2EN = 9;    //motorB PWM pin
int motor2DirA = 7;   //motorB dirA digital pin
int motor2DirB = 8;   //motorB dirB digital pin



void setup() {

  Serial.begin(9600);
  //Serial.setTimeout(10);  //milliseconds of wait time between bytes.
  
  while(!Serial) {
    ; //wait for serial port connection; leonardo + micro
  }

    motorInit();

}

void loop() {
  serialMotorController();
}


// ===== CUSTOM FUNCTIONS =====

/**
 * initialize the motor
 * TODO: add a feedback system.
 */
void motorInit(){
  pinMode(pwmLed, OUTPUT);
  pinMode(RXLED, OUTPUT);

  pinMode(motor1EN, OUTPUT);
  pinMode(motor1DirA, OUTPUT);
  pinMode(motor1DirB, OUTPUT);
  pinMode(motor2EN, OUTPUT);
  pinMode(motor2DirA, OUTPUT);
  pinMode(motor2DirB, OUTPUT);
  //set to zeros
  analogWrite(pwmLed, 0);
  analogWrite(motor1EN, 0);
  digitalWrite(motor1DirA, LOW);
  digitalWrite(motor1DirB, LOW);
  analogWrite(motor2EN, 0);
  digitalWrite(motor2DirA, LOW);
  digitalWrite(motor2DirB, LOW);
}

// TODO: rewrite to allow dual motor control!
//comprehensive test using singular numbers, single motor, parsing two values.
void serialMotorController() {

  while(Serial.available() > 0) {

    // [motor1 direction], [motor1 speed], [motor2 direction], [motor2 speed]; 
    int motor1Dir = Serial.parseInt();
    int motor1Speed = Serial.parseInt();
    int motor2Dir = Serial.parseInt();
    int motor2Speed = Serial.parseInt();

    //ERRORS
    if(motor1Speed > 255 || motor1Dir > 1 || motor2Speed > 255 || motor2Dir > 1) {
      Serial.print("A value was too high! try again. \r\n");  
    }

    //if end character has been reached...
    else if (Serial.read() == ';'){

      // FEEDBACK 
      if(motor1Dir == 1) {
        Serial.print("m1f");
      }
      else if(motor1Dir == 0) {
        Serial.print("m1r");
      }
      
      Serial.print(": ");
      Serial.print(motor1Speed);

      Serial.print(", ");

      if(motor2Dir == 1) {
        Serial.print("m2f");
      }
      else if(motor2Dir == 0) {
        Serial.print("m2r");
      }
      
      Serial.print(": ");
      Serial.print(motor2Speed);

      Serial.print(". \r\n");

      // FEEDBACK - END

      // affect motor1
      if(motor1Dir == 1){
      digitalWrite(motor1DirA, HIGH);
      digitalWrite(motor1DirB, LOW);
      }
      else if(motor1Dir == 0){
        digitalWrite(motor1DirA, LOW);
        digitalWrite(motor1DirB, HIGH);
      }

      //affect motor2
      if(motor2Dir == 1){
      digitalWrite(motor2DirA, HIGH);
      digitalWrite(motor2DirB, LOW);
      }
      else if(motor2Dir == 0){
        digitalWrite(motor2DirA, LOW);
        digitalWrite(motor2DirB, HIGH);
      }
      
      analogWrite(motor1EN, motor1Speed);
      analogWrite(motor2EN, motor2Speed);
      analogWrite(pwmLed, motor1Speed);
    }
  } 
}

