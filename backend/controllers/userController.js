import db from "../config/db.js";
import bcrypt from "bcryptjs";


export const getStores = async (req, res) => {
  try {
    const userId = req.user.id;


    const [stores] = await db.query(`SELECT s.id, s.name, s.email, s.address, (SELECT AVG(r.rating) FROM ratings r WHERE r.storeId = s.id) AS avgRating, (SELECT r.rating FROM ratings r WHERE r.storeId = s.id AND r.userId = ?) AS userRating FROM stores s`,
      [userId]
    );

    res.json({ stores }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const rateStore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({ message: "Store ID & rating required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    const [existing] = await db.query(
      "SELECT * FROM ratings WHERE userId = ? AND storeId = ?",
      [userId, storeId]
    );

    if (existing.length) {
  
      await db.query(
        "UPDATE ratings SET rating = ? WHERE userId = ? AND storeId = ?",
        [rating, userId, storeId]
      );
      return res.json({ message: "Rating updated successfully" });
    }

    await db.query(
      "INSERT INTO ratings (userId, storeId, rating) VALUES (?, ?, ?)",
      [userId, storeId, rating]
    );

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    // console.log(userId)
    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    if (newPassword.length < 8 || newPassword.length > 16)
      return res.status(400).json({ message: "Password must be 8–16 characters" });
    // console.log(userId)
   
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    const passhash = user.password;
    console.log("row user",user)

    // console.log(oldPassword);
    // console.log(newPassword)
    // console.log(passhash)

    const valid = await bcrypt.compare(oldPassword, passhash)
    
    // console.log(valid)

    if (!valid) return res.status(401).json({ message: "Invalid password" });

  
    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
