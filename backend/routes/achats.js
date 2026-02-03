const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

// Créer la table si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS achats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix REAL NOT NULL,
    date TEXT NOT NULL
)`);

// Ajouter un achat
router.post('/', (req, res) => {
    const { nom, prix, date } = req.body;
    if (!nom || !prix || prix <= 0 || !date) {
        return res.status(400).json({ error: "Données invalides" });
    }
    db.run(
        `INSERT INTO achats (nom, prix, date) VALUES (?, ?, ?)`,
        [nom, prix, date],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Obtenir tous les achats
router.get('/', (req, res) => {
    db.all(`SELECT * FROM achats ORDER BY date DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
