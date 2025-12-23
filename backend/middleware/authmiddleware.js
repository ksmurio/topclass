import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      message.value = "You must be logged in";
      return;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};
