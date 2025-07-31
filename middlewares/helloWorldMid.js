export const helloWorldMid = (req, res, next) => {
  if (req.params.name.length >= 2) {
    next();
  } else {
    res.status(400).json({
      success: false,
      errorMessage: req.params.name + ", name most to be min 2 chars",
    });
  }
};
