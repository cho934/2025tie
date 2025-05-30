function runrun () {
    GO(10)
    if (color == 1) {
        kitronik_servo_lite.turnLeft(90)
    } else {
        kitronik_servo_lite.turnRight(90)
    }
    GO(50)
}
// // Fonction pour afficher la position actuelle
// 
// function afficherPosition () {
// 
// x = Math.round(odometry.getX())
// 
// y = Math.round(odometry.getY())
// 
// angle = Math.round(odometry.getOrientationDegrees())
// 
// basic.clearScreen()
// 
// basic.showString("X:" + x)
// 
// basic.pause(1000)
// 
// basic.showString("Y:" + y)
// 
// basic.pause(1000)
// 
// basic.showString("A:" + angle)
// 
// basic.pause(1000)
// 
// }
// 
// // Bouton A : Afficher la position actuelle
// 
// input.onButtonPressed(Button.A, function () {
// 
// afficherPosition()
// 
// })
// 
// // Boutons A+B : Définir une position de référence
// 
// input.onButtonPressed(Button.AB, function () {
// 
// // Exemple : définir la position à (1000, 500) avec angle 0
// 
// odometry.setPosition(1000, 1000, 0)
// 
// basic.showIcon(IconNames.Target)
// 
// basic.pause(500)
// 
// basic.clearScreen()
// 
// })
// 
// // Bouton B : Réinitialiser l'odométrie
// 
// input.onButtonPressed(Button.B, function () {
// 
// odometry.reset()
// 
// encoders.stop()
// 
// basic.showIcon(IconNames.Yes)
// 
// basic.pause(500)
// 
// basic.clearScreen()
// 
// })
// 
// let rightDelta = 0
// 
// let leftDelta = 0
// 
// let scaledY = 0
// 
// let scaledX = 0
// 
// let angle = 0
// 
// let y = 0
// 
// let x = 0
// 
// let encoders: MagEncoders.MagEncoders = null
// 
// let debug = 0
// 
// let distance = 0
// 
// let angleRad = 0
// 
// let angleDeg = 0
// 
// // Configuration du robot
// 
// // Distance entre les roues en mm
// 
// let ENTRAXE_MM = 100
// 
// // Nombre de ticks par mètre
// 
// let TICKS_PAR_METRE = 130000
// 
// // Initialisation au démarrage
// 
// encoders = MagEncoders.createMagEncoder(
// 
// true,
// 
// false,
// 
// true,
// 
// true,
// 
// true,
// 
// true,
// 
// false
// 
// )
// 
// encoders.start()
// 
// odometry.initialize(ENTRAXE_MM, TICKS_PAR_METRE)
// 
// basic.showIcon(IconNames.Heart)
// 
// // ===== COMMUNICATION SÉRIE =====
// 
// // Envoi périodique de la position via le port série
// 
// loops.everyInterval(1000, function () {
// 
// })
// 
// // Affichage périodique de la position sur la matrice LED
// 
// basic.forever(function () {
// 
// // Afficher un point représentant la position du robot
// 
// // Mise à l'échelle pour la matrice 5x5
// 
// // -2500 à 2500 mm => 0 à 5
// 
// scaledX = Math.round((odometry.getX() + 2500) / 1000)
// 
// // -2500 à 2500 mm => 0 à 5
// 
// scaledY = Math.round((odometry.getY() + 2500) / 1000)
// 
// // Limiter aux dimensions de la matrice
// 
// scaledX = Math.constrain(scaledX, 0, 4)
// 
// scaledY = Math.constrain(scaledY, 0, 4)
// 
// basic.clearScreen()
// 
// // Inverser Y pour avoir Y+ vers le haut
// 
// led.plot(scaledX, 4 - scaledY)
// 
// basic.pause(100)
// 
// })
// 
// // ===== COMMUNICATION SÉRIE =====
// 
// // Envoi périodique de la position via le port série
// 
// loops.everyInterval(100, function () {
// 
// encoders.getValues()
// 
// // Obtenir les deltas des encodeurs
// 
// leftDelta = encoders.getDeltaLeftValue()
// 
// rightDelta = encoders.getDeltaRightValue()
// 
// if (debug) {
// 
// serial.writeValue("l", encoders.getLeftTotalCount())
// 
// serial.writeValue("r", encoders.getRightTotalCount())
// 
// }
// 
// // Mettre à jour l'odométrie seulement si il y a eu du mouvement
// 
// if (leftDelta != 0 || rightDelta != 0) {
// 
// odometry.updateFromTicks(leftDelta, rightDelta)
// 
// serial.writeLine("POS:" + odometry.getX() + "," + odometry.getY() + "," + odometry.getOrientationDegrees())
// 
// }
// 
// // Pause de 50ms entre chaque mise à jour
// 
// basic.pause(50)
// 
// })
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
let rightDelta = 0
let leftDelta = 0
let distancedetection = 0
let motor_stop = 0
let count = 0
let tirette = 0
let color = 0
let enable_detection = 0
let start_odo_every = 1
let debug = 1
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
let scaledY = 0
let angleDeg = 0
let angleRad = 0
let distance = 0
let x = 0
let y = 0
let angle = 0
let scaledX = 0
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
// Configuration du robot
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
// Configuration
// entraxe 120mm, 200000 ticks/m
odometry.initialize(120, 200000)
robotNavigator.useDifferentialMotors()
robotNavigator.setPositionTolerance(5)
robotNavigator.setAngleTolerance(1)
robotNavigator.enableCorrection()
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
        // Mise à jour de la position depuis l'odométrie
        robotNavigator.updatePosition(odometry.getX(), odometry.getY(), odometry.getOrientationDegrees())
        // Navigation
        robotNavigator.updateNavigation()
        Run(robotNavigator.getLeftMotorSpeed(), robotNavigator.getRightMotorSpeed())
    }
})
control.inBackground(function () {
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(100000)
    butinuer()
})
