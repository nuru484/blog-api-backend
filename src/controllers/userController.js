const userData = async (req, res) => {
  const user = req.user;
  try {
    res.json({ user });
  } catch (error) {
    console.error('Error retrieving user from token:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default userData;
