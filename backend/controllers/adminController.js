import db from "../config/db.js";
import bcrypt from "bcryptjs";


export const getDashboardStats = async (req, res) => {
  try {
    const [[users]] = await db.query("SELECT COUNT(*) AS count FROM users");
    const [[stores]] = await db.query("SELECT COUNT(*) AS count FROM stores");
    const [[ratings]] = await db.query("SELECT COUNT(*) AS count FROM ratings");

    res.json({
      totalUsers: users.count,
      totalStores: stores.count,
      totalRatings: ratings.count,
    });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const [exists] = await db.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    if (exists.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hash, address, role]
    );

    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error("Add User Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ message: "All fields required" });
    }

    await db.query(
      "INSERT INTO stores (name, email, address, ownerId) VALUES (?, ?, ?, ?)",
      [name, email, address, ownerId]
    );

    res.json({ message: "Store added successfully" });
  } catch (err) {
    console.error("Add Store Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllStores = async (req, res) => {
  try {
    const [stores] = await db.query(`
      SELECT s.*, 
             IFNULL(AVG(r.rating), 0) AS avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.storeId
      GROUP BY s.id
    `);

    res.json(stores);
  } catch (err) {
    console.error("Fetch Stores Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllAdminUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, address, role FROM users ORDER BY name ASC"
    );

    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const [[userRow]] = await db.query("SELECT id, name, email, address, role FROM users WHERE id = ?", [userId]);
    if (!userRow) return res.status(404).json({ message: "User not found" });

    // If store_owner, fetch their stores and ratings
    if (userRow.role === "storeOwner") {
      const [stores] = await db.query(`
        SELECT s.id, s.name, s.email, s.address,
               IFNULL(ROUND(AVG(r.rating),1),0) AS avgRating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.storeId
        WHERE s.owner_id = ?
        GROUP BY s.id
      `, [userId]);
      return res.json({ user: userRow, stores });
    }

    return res.json({ user: userRow });
  } catch (err) {
    console.error("GetUserById Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const storeOwner = async (req, res) => {
  try {
    const [owners] = await db.query(
      'SELECT id, name, email FROM users WHERE role = "storeOwner"'
    );

    return res.json(owners); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch owners" });
  }
};



