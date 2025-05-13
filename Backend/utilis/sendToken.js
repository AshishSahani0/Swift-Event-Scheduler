export const sendToken = (user, statusCode, message, res) => {
  try {
    if (!user || typeof user.getJWTToken !== "function") {
      console.error("Error: Invalid user object or missing getJWTToken method");
      return res.status(500).json({
        success: false,
        message: "Token generation failed: Invalid user",
      });
    }

    const token = user.getJWTToken();

    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE || "1", 10);

    res
      .status(statusCode)
      .cookie("token", token, {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // Can change to 'Lax' for cross-site support
      })
      .json({
        success: true,
        token,
        message,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({
      success: false,
      message: "Token generation failed: " + error.message,
    });
  }
};
