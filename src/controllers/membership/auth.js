import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils.js";
import 'dotenv/config';

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
        const findingUser = await findUserByEmail(email);
        if (!findingUser) {
            res.status(401).json({  
                status: 103,
                message: "Username atau password salah",
                data: null
            });
            return;
        }
        if (!await bcrypt.compare(password, findingUser.password)) {
            return res.status(401).json({
                "status": 103,
                "message": "Username atau password salah",
                "data": null
            });
        };
        const accessToken = generateAccessToken({ sub: findingUser.idUser, email: findingUser.email });
        const refreshToken = generateRefreshToken({ sub: findingUser.idUser, email: findingUser.email });
        res.status(200).json({  
            "status": 0,
            "message": "Login Sukses",
            "data": {
                "token": accessToken
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

export const getProfile = async (req, res) => {
    try {
        const email = res.locals.email;
        const findUser = await findUserByEmail(email);
        if (!findUser) {
            res.status(404).json({
                status: "failed",
                message: "User tidak ditemukan"
            });
            return;
        }
        res.status(200).json({
            "status": 0,
            "message": "Sukses",
            "data": {
                "email": findUser.email,
                "first_name": findUser.first_name,
                "last_name": findUser.last_name,
                "profile_image": findUser.profile_image
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
}

export const updateProfile = async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const email = res.locals.email;
        const [updateUser] = await conn.execute(
          'UPDATE users SET first_name = ?, last_name = ? WHERE email = ?',
          [first_name, last_name, email]
        );
        if (!updateUser.affectedRows) {
            throw new Error("Failed update profile data");
        }
        const [[updatedUser]] = await conn.execute(
          'SELECT profile_image FROM users'
        );
        res.status(200).json({
            status: 0,
            message: "Update Pofile berhasil",
            data: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                profile_image: updatedUser.profile_image
            }
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
    throw error;
  }
};