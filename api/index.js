const express = require('express')
const app = express()
const cors = require('cors');
//const port = 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const login = require("../src/routes/loginrouters")
const teacher = require("../src/routes/teacher.routes")

//const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
const allowedOrigins = ['https://front-bueno-xi.vercel.app', 'http://localhost:5173', ];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Ruta base para utilizar el servicio
app.get("/api", function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('SERVIDOR SISTEMA');
});

app.use("/api/login", login);
app.use("/api/teacher", teacher);

app.get("/", (req, res) => res.send("Hola desde Vercel"));

module.exports = app;

