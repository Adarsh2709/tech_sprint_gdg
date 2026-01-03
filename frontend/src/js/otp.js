const otpInput = document.getElementById("otp")
const button = document.getElementById("verify")
const status = document.getElementById("status")

button.addEventListener("click", async () => {
    const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpInput.value })
    })

    const data = await res.json()
    status.innerText = data.success ? "Login successful" : "Invalid OTP"
})
