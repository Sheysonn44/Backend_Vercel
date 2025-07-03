const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Generar un token
function generateToken(user) {
  const payload = { id: user.id };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Verificar el token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

module.exports = { generateToken, verifyToken };

