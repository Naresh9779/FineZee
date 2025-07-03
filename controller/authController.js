

exports.register = async (req, res, next) => {
  try {
    const details = req.body;
   



    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error });
  }
};
