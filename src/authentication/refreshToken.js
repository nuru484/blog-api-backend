require('dotenv').config();
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Check no refresh token provided
  if (!refreshToken) return res.sendStatus(401);

  try {
    // Validate refresh token exists in the DB
    const user = await prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!user) return res.sendStatus(403); // Invalid refresh token

    // Verify the refresh token using JWT
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // If refresh token has expired
          return res
            .status(401)
            .json({ message: 'Refresh token expired. Please log in again.' });
        }
        // Handle other verification errors
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // Generate a new access token for the user
      const newAccessToken = jwt.sign(
        {
          id: decoded.id, // Use decoded token to access user details
          email: decoded.email,
          role: decoded.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' } // New access token valid for 1 hour
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Server error during refresh token process:', error);
    res.sendStatus(500); // Internal server error
  }
};

export default refreshToken;
