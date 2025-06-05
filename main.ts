function runrun () {
    GO(10)
    if (color == 1) {
        kitronik_servo_lite.turnLeft(90)
    } else {
        kitronik_servo_lite.turnRight(90)
    }
    GO(50)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
    if (receivedNumber == 11) {
        color = 1
    }
    if (receivedNumber == 22) {
        color = 2
    }
})
function StopMotors () {
    servos.P1.stop()
    servos.P2.stop()
}
function GO (num: number) {
    count = 0
    kitronik_servo_lite.biasDriving(80)
    while (true) {
        basic.pause(100)
        if (motor_stop == 1) {
            kitronik_servo_lite.stop()
        } else {
            kitronik_servo_lite.forward()
        }
        count = count + 1
        if (count > num) {
            break;
        }
    }
}
// Fonction pour ajuster paramètres selon le terrain
function configureForPrecision () {
    // Plus lent = plus précis
    robotNavigator.setSpeed(25)
    // Tolérance réduite
    robotNavigator.setPositionTolerance(8)
    // Angle plus précis
    robotNavigator.setAngleTolerance(5)
    // Correction plus forte
    robotNavigator.setCorrectionGain(0.8)
}
function doVL53L1X () {
    distancedetection = VL53L1X.readSingle()
    serial.writeValue("dist", distancedetection)
    if (distancedetection < 100) {
        motor_stop = 1
    } else {
        motor_stop = 0
    }
}
input.onButtonPressed(Button.A, function () {
    odometry.reset()
    odometry.setPosition(0, 0, 0)
    robotNavigator.setSpeed(100)
    // Ajout de points
    robotNavigator.addWaypoint(100, 0)
    robotNavigator.addWaypoint(100, 100)
    robotNavigator.addWaypoint(0, 100)
    robotNavigator.startNavigation()
})
// Aller à un point spécifique
function goToPoint (x: number, y: number) {
    robotNavigator.clearWaypoints()
    robotNavigator.addWaypoint(x, y)
    robotNavigator.startNavigation()
}
// stopMotors()
function testMotors () {
    basic.showString("L")
    // controlLeftMotor(50)
    basic.pause(1000)
    // controlLeftMotor(0)
    basic.showString("R")
    // controlRightMotor(50)
    basic.pause(1000)
    // controlRightMotor(0)
    basic.showString("TEST STOP")
}
// Reset complet du système
function resetRobot () {
    robotNavigator.stopNavigation()
    odometry.reset()
    robotNavigator.clearWaypoints()
    basic.showString("RESET")
}
function butinuer () {
    ContinuousServo.spin_one_way_with_speed(AnalogPin.P15, 100)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "BLUE") {
        color = 2
    }
    if (receivedString == "YELLOW") {
        color = 1
    }
})
input.onButtonPressed(Button.B, function () {
    odometry.reset()
    odometry.setPosition(0, 0, 0)
    butinuer()
})
function Run (left: number, right: number) {
    servos.P1.run(0 - left)
    servos.P2.run(right)
}
// Fonction pour créer un parcours personnalisé
function createCustomPath () {
    robotNavigator.clearWaypoints()
    // Parcours en forme de L
    // Droite 30cm
    robotNavigator.addWaypoint(300, 0)
    // Haut 15cm
    robotNavigator.addWaypoint(300, 150)
    // Gauche 15cm
    robotNavigator.addWaypoint(150, 150)
    // Haut 15cm
    robotNavigator.addWaypoint(150, 300)
    // Gauche 15cm
    robotNavigator.addWaypoint(0, 300)
    // Retour origine
    robotNavigator.addWaypoint(0, 0)
}
function initnavigator () {
    robotNavigator.configureYPositionFunc(function () {
        return odometry.getY()
    })
    robotNavigator.configureXPosition(function () {
        return odometry.getX()
    })
    robotNavigator.configureAngleDegPosition(function () {
        return odometry.getOrientationDegrees()
    })
}
let rightDelta = 0
let leftDelta = 0
let distancedetection = 0
let motor_stop = 0
let count = 0
let tirette = 0
let color = 0
let scaledX = 0
let angle = 0
let y = 0
let x = 0
let distance = 0
let angleRad = 0
let angleDeg = 0
let scaledY = 0
let start_odo_every = 1
let debug = 1
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
let strip = neopixel.create(DigitalPin.P16, 5, NeoPixelMode.RGB_RGB)
let range = strip.range(0, 4)
ContinuousServo.turn_off_motor(DigitalPin.P15)
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
strip.show()
basic.pause(500)
strip.clear()
strip.show()
basic.showIcon(IconNames.Square)
// Configuration de l'odometrie
// Distance entre les roues en mm
let ENTRAXE_MM = 100
// Nombre de ticks par mètre
let TICKS_PAR_METRE = 130000
// Initialisation au démarrage
let encoders = MagEncoders.createMagEncoder(
true,
false,
true,
true,
true,
true,
false
)
encoders.start()
odometry.initialize(ENTRAXE_MM, TICKS_PAR_METRE)
odometry.reset()
odometry.setPosition(0, 0, 0)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    while (tirette == 0) {
        if (color == 1) {
            basic.clearScreen()
            basic.showIcon(IconNames.Skull)
        }
        if (color == 2) {
            basic.clearScreen()
            basic.showIcon(IconNames.Diamond)
        }
        if (color == 0) {
            basic.clearScreen()
            led.plotBarGraph(
            distancedetection,
            400,
            false
            )
        }
        basic.pause(50)
    }
    odometry.reset()
    odometry.setPosition(0, 0, 0)
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(85000)
    // run()
    butinuer()
    // basic.pause(85000)
    tirette = 0
    color = 0
})
// Envoi périodique de la position via le port série
loops.everyInterval(60, function () {
    let enable_detection = 0
    if (enable_detection) {
        doVL53L1X()
    }
    // motors.setLeftSpeed(robotNavigator.getLeftMotorSpeed())
    // motors.setRightSpeed(robotNavigator.getRightMotorSpeed())
    if (start_odo_every) {
        encoders.getValues()
        // Obtenir les deltas des encodeurs
        leftDelta = encoders.getDeltaLeftValue()
        rightDelta = encoders.getDeltaRightValue()
        if (debug) {
            serial.writeValue("l", encoders.getLeftTotalCount())
            serial.writeValue("r", encoders.getRightTotalCount())
        }
        // Mettre à jour l'odométrie seulement si il y a eu du mouvement
        if (leftDelta != 0 || rightDelta != 0) {
            odometry.updateFromTicks(leftDelta, rightDelta)
            serial.writeLine("POS:" + odometry.getX() + "," + odometry.getY() + "," + odometry.getOrientationDegrees())
        }
    }
})
control.inBackground(function () {
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(100000)
    butinuer()
})
