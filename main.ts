function zeige_uhrzeit () {
    anzeige = stunden * 100 + minuten
    zeige_wert(anzeige)
}
input.onPinTouchEvent(TouchPin.P1, input.buttonEventDown(), function () {
    if (uhr_wird_gestellt) {
        startzeit_uhr += 3600
    }
    if (timer_wird_gestellt) {
        laufzeit_timer += 60
        if (laufzeit_timer > 1800) {
            laufzeit_timer = 0
        }
    }
})
function zeige_restzeit () {
    anzeige = restzeit_timer % 60
    anzeige += Math.floor(restzeit_timer / 60) * 100
    zeige_wert(anzeige)
}
// Nur die geänderten Ziffern werden aktualisiert.
function zeige_wert (wert: number) {
    ziffer = wert % 10
    if (ziffer != ziffern_alt[3]) {
        _4Digit.bit(ziffer, 3)
        ziffern_alt[3] = ziffer
    }
    ziffer = Math.floor(wert / 10) % 10
    if (ziffer != ziffern_alt[2]) {
        _4Digit.bit(ziffer, 2)
        ziffern_alt[2] = ziffer
    }
    ziffer = Math.floor(wert / 100) % 10
    if (ziffer != ziffern_alt[1]) {
        _4Digit.bit(ziffer, 1)
        ziffern_alt[1] = ziffer
    }
    ziffer = Math.floor(wert / 1000) % 10
    if (ziffer != ziffern_alt[0]) {
        _4Digit.bit(ziffer, 0)
        ziffern_alt[0] = ziffer
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (!(timer_wird_gestellt)) {
        if (uhr_wird_gestellt) {
            uhr_wird_gestellt = false
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        } else {
            uhr_wird_gestellt = true
            basic.showLeds(`
                . # # # .
                # . # . #
                # . # # #
                # . . . #
                . # # # .
                `)
        }
    }
})
function zeige_timer () {
    anzeige = laufzeit_timer % 60
    anzeige += Math.floor(laufzeit_timer / 60) * 100
    zeige_wert(anzeige)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (!(uhr_wird_gestellt)) {
        if (timer_wird_gestellt) {
            timer_wird_gestellt = false
            timer_laeuft = true
            startzeit_timer = input.runningTime()
            basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . . . .
                . . # . .
                `)
        } else {
            timer_wird_gestellt = true
            timer_laeuft = false
            basic.showLeds(`
                . # # # .
                . . # . .
                . # . # .
                . # . # .
                . . # . .
                `)
        }
    }
})
function aktualisiere_restzeit () {
    restzeit_timer = Math.floor((input.runningTime() - startzeit_timer) / 1000)
    restzeit_timer = laufzeit_timer - restzeit_timer
    if (restzeit_timer <= 0) {
        timer_laeuft = false
        zeige_wert(0)
        music.playMelody("C D G C5 B A E C ", 166)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
    if (uhr_wird_gestellt) {
        startzeit_uhr += 60
    }
    if (timer_wird_gestellt) {
        laufzeit_timer += 1
    }
})
function aktualisiere_uhrzeit () {
    millisekunden = input.runningTime()
    sekunden = Math.floor(millisekunden / 1000) + startzeit_uhr
    minuten = Math.floor(sekunden / 60)
    stunden = Math.floor(minuten / 60)
    minuten = minuten % 60
    stunden = stunden % 24
}
let startzeit_timer = 0
let ziffer = 0
let restzeit_timer = 0
let _4Digit: grove.TM1637 = null
let ziffern_alt: number[] = []
let timer_laeuft = false
let timer_wird_gestellt = false
let uhr_wird_gestellt = false
let laufzeit_timer = 0
let startzeit_uhr = 0
let anzeige = 0
let stunden = 0
let minuten = 0
let sekunden = 0
let millisekunden = 0
millisekunden = 0
sekunden = 0
minuten = 0
stunden = 0
anzeige = 0
startzeit_uhr = 0
laufzeit_timer = 0
uhr_wird_gestellt = false
timer_wird_gestellt = false
timer_laeuft = false
ziffern_alt = [
10,
10,
10,
10
]
_4Digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4Digit.point(true)
basic.forever(function () {
    if (timer_wird_gestellt) {
        zeige_timer()
    } else if (timer_laeuft) {
        aktualisiere_restzeit()
        zeige_restzeit()
    } else {
        aktualisiere_uhrzeit()
        zeige_uhrzeit()
    }
})
