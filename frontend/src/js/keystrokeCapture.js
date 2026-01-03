class KeystrokeCapture {
    constructor(inputElement) {
        this.inputElement = inputElement
        this.keyDownTimes = new Map()
        this.events = []
        this.active = false
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    start() {
        this.reset()
        this.active = true
        this.inputElement.addEventListener("keydown", this.handleKeyDown)
        this.inputElement.addEventListener("keyup", this.handleKeyUp)
    }

    stop() {
        this.active = false
        this.inputElement.removeEventListener("keydown", this.handleKeyDown)
        this.inputElement.removeEventListener("keyup", this.handleKeyUp)
    }

    reset() {
        this.keyDownTimes.clear()
        this.events = []
    }

    handleKeyDown(e) {
        if (!this.active) return
        if (e.repeat) return
        if (this.isIgnoredKey(e.key)) return

        const time = performance.now()
        this.keyDownTimes.set(e.key, time)

        this.events.push({ key: e.key, type: "down", time })
    }

    handleKeyUp(e) {
        if (!this.active) return
        if (this.isIgnoredKey(e.key)) return

        const time = performance.now()
        const downTime = this.keyDownTimes.get(e.key)
        if (downTime === undefined) return

        this.events.push({ key: e.key, type: "up", time })
        this.keyDownTimes.delete(e.key)
    }

    isIgnoredKey(key) {
        return ["Shift","Control","Alt","CapsLock","Tab","Meta"].includes(key)
    }

    getRawEvents() {
        return [...this.events]
    }
}

export default KeystrokeCapture
