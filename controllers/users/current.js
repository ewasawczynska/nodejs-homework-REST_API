export const current = async (req, res) => {
  const { email, subscription } = req.user;
  try {
    return res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  }
  catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      data: "Not authorized",
    })
  }
    
    
  };