import db from "../config/db.js";

export const getRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [ownedStore] = await db.query(
      "SELECT * FROM stores WHERE ownerId = ?",
      [ownerId]
    );

    if (!ownedStore.length) {
      return res.status(404).json({ message: "Store not found" });
    }

    const storeId = ownedStore[0].id;


    const [ratings] = await db.query(`
      SELECT u.name AS userName, u.email, r.rating
      FROM ratings r
      JOIN users u ON r.userId = u.id
      WHERE r.storeId = ?
    `, [storeId]);

    const [avg] = await db.query(
      "SELECT AVG(rating) AS avgRating FROM ratings WHERE storeId = ?",
      [storeId]
    );

    res.json({
      store: ownedStore[0],
      avgRating: avg[0].avgRating || 0,
      ratings
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
