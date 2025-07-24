import bcrypt from 'bcrypt';
import 'dotenv/config';
import mysql from 'mysql2/promise';

const saltRounds = Number(process.env.SALTROUNDS);


const conn = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findingUser = await findUserByEmailAndPass(email, password);
        if (findingUser) {
            res.status(401).json({  
                status: 103,
                message: "Username atau password salah",
                data: null
            });
            return;
        }
        res.status(200).json({  
            "status": 0,
            "message": "Login Sukses",
            "data": {
                "token": "Token Ini"
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
}

export const register = async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    try {
        const findingUser = await findUserByEmail(email);
        if (findingUser) {
            res.status(409).json({  
                status: "failed",
                error: "Email has been used"
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await conn.execute(
          'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
          [email, first_name, last_name, hashedPassword]
        );
        res.status(200).json({  
            "status": 0,
            "message": "Registrasi berhasil silahkan login",
            "data": null
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
}

const findUserByEmail = async (email) => {
  try {
    const [user] = await conn.execute(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return user[0] || null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};

const findUserByEmailAndPass = async (email, password) => {
    try {
        const [user] = await conn.execute(
            'SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1',
            [email, password]
        );
        return user[0] || null;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}