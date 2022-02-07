const sqlite3 = require('sqlite3').verbose();
const getConn = () => new sqlite3.Database('./db.sqlite');

module.exports = {
  getShopItems: () => {
    const db = getConn();
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT * FROM shop_items', [], (err, rows = []) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
      db.close();
    });
  },
  addShopItem: ({
    shopItem: { name, description, image_url: imageUrl, price },
  }) => {
    const db = getConn();
    return new Promise((resolve) => {
      db.serialize(() => {
        const stmt = db.prepare(`
          INSERT INTO shop_items (
            name,
            description,
            image_url,
            price
          ) VALUES (?, ?, ?, ?)`);
        stmt.run(name, description, imageUrl, price);
        stmt.finalize();
        resolve({ status: 'success' });
      });
      db.close();
    });
  },
  removeShopItem: ({ shopItemId }) => {
    const db = getConn();
    return new Promise((resolve) => {
      db.serialize(() => {
        const stmt = db.prepare(
          `DELETE FROM shop_items WHERE shop_item_id = (?)`
        );
        stmt.run(shopItemId);
        stmt.finalize();
        resolve({ status: 'success' });
      });
      db.close();
    });
  },
};
