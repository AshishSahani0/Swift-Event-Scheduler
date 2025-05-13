export const sendToken = (user, statusCode, message, res) => {
  try {
    if (!user || typeof user.getJWTToken !== "function") {
      console.error("Error: Invalid user object or missing getJWTToken method");
      return res.status(500).json({
        success: false,
        message: "Token generation failed: User is invalid",
      });
    }

    const token = user.getJWTToken();

    const cookieExpireDays = process.env.COOKIE_EXPIRE || 1;

    res
      .status(statusCode)
      .cookie("token", token, {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .json({
        success: true,
        token,
        message,
        user,
      });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({
      success: false,
      message: "Token generation failed: " + error.message,
    });
  }
};
