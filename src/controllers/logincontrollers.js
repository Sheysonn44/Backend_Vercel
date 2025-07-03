const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../../auth');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const teacher = await prisma.teacher.findMany({
      where: { email: usuario },
    });

    if (!teacher || teacher[0].password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
   
    const token = generateToken(1);
    console.log(token)
    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error); // importante para ver en consola
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};