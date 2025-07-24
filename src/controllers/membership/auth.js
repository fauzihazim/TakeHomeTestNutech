import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export const login = async (req, res) => {
    try {
        const [user] = await conn.execute(
            'SELECT * FROM users'
        );
    
        console.log(user);
        res.status(200).json({  
            status: "success",
            message: "User get successfully",
                data: user
            }
        );
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
        await conn.execute(
          'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
          [email, first_name, last_name, password]
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
    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};