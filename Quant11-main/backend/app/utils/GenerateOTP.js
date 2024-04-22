 //Generate otp
 function generateOTP() {
    // Generate a random 4-digit number
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString(); // Convert to string for consistency
}

module.exports = generateOTP