import jwt from 'jsonwebtoken';

export const verify_Token = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET || 'default_secret_key';
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    return next();
  }
  catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
