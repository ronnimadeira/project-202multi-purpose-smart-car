function car_back () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed_RB)
}
function car_move_RF () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed_RB)
}
function drift_left () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, 0)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed_RB)
}
function car_left () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed_RB)
}
bluetooth.onBluetoothConnected(function () {
    connect_flag = 1
    while (connect_flag == 1) {
        ble_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        serial.writeString(ble_val)
        serial.writeLine("")
        if (ble_val == "a") {
            car_forward()
        } else if (ble_val == "b") {
            car_left()
        } else if (ble_val == "c") {
            car_back()
        } else if (ble_val == "d") {
            car_right()
        } else if (ble_val == "k") {
            car_left_move()
        } else if (ble_val == "h") {
            car_right_move()
        } else if (ble_val == "g") {
            car_move_RF()
        } else if (ble_val == "i") {
            car_move_RB()
        } else if (ble_val == "j") {
            car_move_LB()
        } else if (ble_val == "l") {
            car_move_LF()
        } else if (ble_val == "s") {
            mecanumRobotV2.state()
        } else if (ble_val == "t") {
            mecanumRobotV2.setLed(LedCount.Left, LedState.ON)
            mecanumRobotV2.setLed(LedCount.Right, LedState.ON)
        } else if (ble_val == "u") {
            mecanumRobotV2.setLed(LedCount.Left, LedState.OFF)
            mecanumRobotV2.setLed(LedCount.Right, LedState.OFF)
        } else if (ble_val == "e") {
            drift_left()
        } else if (ble_val == "f") {
            drift_right()
        } else if (ble_val == "m") {
            if (color_num < 3) {
                color_num = color_num + 1
            }
            showcolor()
        } else if (ble_val == "n") {
            if (color_num > 0) {
                color_num = color_num - 1
            }
            showcolor()
        } else if (ble_val == "o") {
            strip.clear()
            strip.show()
        } else if (ble_val == "v") {
            ble_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
            basic.pause(100)
            speed_LF = parseFloat(ble_val)
            basic.pause(100)
            serial.writeNumber(speed_LF)
            serial.writeLine("")
        } else if (ble_val == "w") {
            ble_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
            basic.pause(100)
            speed_LB = parseFloat(ble_val)
            basic.pause(100)
            serial.writeNumber(speed_LB)
            serial.writeLine("")
        } else if (ble_val == "x") {
            ble_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
            basic.pause(100)
            speed_RF = parseFloat(ble_val)
            basic.pause(100)
            serial.writeNumber(speed_RF)
            serial.writeLine("")
        } else if (ble_val == "y") {
            ble_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
            basic.pause(100)
            speed_RB = parseFloat(ble_val)
            basic.pause(100)
            serial.writeNumber(speed_RB)
            serial.writeLine("")
        }
    }
})
function car_move_LB () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed_RB)
}
function showcolor () {
    if (color_num == 0) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (color_num == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    } else if (color_num == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
    }
    strip.show()
}
function car_move_RB () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, 0)
}
function tracking () {
    if (mecanumRobotV2.LineTracking(LT.Left) == 0 && (mecanumRobotV2.LineTracking(LT.Center) == 0 && mecanumRobotV2.LineTracking(LT.Right) == 0)) {
        mecanumRobotV2.state()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 0 && (mecanumRobotV2.LineTracking(LT.Center) == 0 && mecanumRobotV2.LineTracking(LT.Right) == 1)) {
        car_right()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 0 && (mecanumRobotV2.LineTracking(LT.Center) == 1 && mecanumRobotV2.LineTracking(LT.Right) == 0)) {
        car_forward()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 0 && (mecanumRobotV2.LineTracking(LT.Center) == 1 && mecanumRobotV2.LineTracking(LT.Right) == 1)) {
        car_right()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 1 && (mecanumRobotV2.LineTracking(LT.Center) == 0 && mecanumRobotV2.LineTracking(LT.Right) == 0)) {
        car_left()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 1 && (mecanumRobotV2.LineTracking(LT.Center) == 0 && mecanumRobotV2.LineTracking(LT.Right) == 1)) {
        car_forward()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 1 && (mecanumRobotV2.LineTracking(LT.Center) == 1 && mecanumRobotV2.LineTracking(LT.Right) == 0)) {
        car_left()
    } else if (mecanumRobotV2.LineTracking(LT.Left) == 1 && (mecanumRobotV2.LineTracking(LT.Center) == 1 && mecanumRobotV2.LineTracking(LT.Right) == 1)) {
        car_forward()
    }
}
function car_right_move () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed_RB)
}
function drift_right () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, 0)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, 0)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed_RB)
}
function follow () {
    mecanumRobotV2.setServo(90)
    basic.pause(500)
    if (mecanumRobotV2.ultra() <= 10) {
        car_back()
    } else if (mecanumRobotV2.ultra() > 20 && mecanumRobotV2.ultra() <= 40) {
        car_forward()
    } else {
        mecanumRobotV2.state()
    }
}
function car_move_LF () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, 0)
}
function avoid () {
    distance = mecanumRobotV2.ultra()
    if (distance < 15) {
        mecanumRobotV2.state()
        basic.pause(500)
        mecanumRobotV2.setServo(160)
        basic.pause(500)
        distance_l = mecanumRobotV2.ultra()
        basic.pause(100)
        mecanumRobotV2.setServo(20)
        basic.pause(200)
        diatance_r = mecanumRobotV2.ultra()
        basic.pause(200)
        mecanumRobotV2.setServo(90)
        basic.pause(500)
        if (distance_l > diatance_r) {
            car_left()
            basic.pause(500)
        } else {
            car_right()
            basic.pause(500)
        }
    } else {
        car_forward()
    }
}
function car_forward () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, speed_RB)
}
function car_left_move () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed_RB)
}
function car_right () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, speed_LF)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, speed_LB)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, speed_RF)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, speed_RB)
}
let diatance_r = 0
let distance_l = 0
let distance = 0
let ble_val = ""
let connect_flag = 0
let strip: neopixel.Strip = null
let color_num = 0
let speed_RB = 0
let speed_RF = 0
let speed_LB = 0
let speed_LF = 0
serial.redirectToUSB()
speed_LF = 50
speed_LB = 50
speed_RF = 50
speed_RB = 50
color_num = 0
strip = neopixel.create(DigitalPin.P7, 4, NeoPixelMode.RGB)
led.enable(false)
basic.forever(function () {
    if (ble_val == "p") {
        tracking()
    } else if (ble_val == "q") {
        follow()
    } else if (ble_val == "r") {
        avoid()
    } else if (ble_val == "s") {
        mecanumRobotV2.state()
        mecanumRobotV2.setServo(90)
    }
})
