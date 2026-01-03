import KeystrokeCapture from "./keystrokeCapture.js"
import { extractFeatures } from "./featureExtraction.js"

const input = document.getElementById("password")
const button = document.getElementById("submit")
const status = document.getElementById("status")

const capture = new KeystrokeCapture(input)
let attempts = []

input.addEventListener("focus", () => capture.start())

button.addEventListener("click", () => {
    capture.stop()
    const raw = capture.getRawEvents()
    const features = extractFeatures(raw)

    if (features.length === 0) return

    attempts.push(features)
    status.innerText = `Captured ${attempts.length}/10 attempts`

    input.value = ""
    capture.reset()
    capture.start()

    if (attempts.length === 10) {
        fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ attempts })
        })
        status.innerText = "Registration data sent"
        attempts = []
    }
})
