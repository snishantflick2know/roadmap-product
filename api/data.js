const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      await sql`
        CREATE TABLE IF NOT EXISTS board_data (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT now()
        )
      `;
      const rows = await sql`SELECT data FROM board_data WHERE id = 'main'`;
      return res.status(200).json(rows.length ? rows[0].data : null);
    }

    if (req.method === 'POST') {
      const months = req.body;
      if (!Array.isArray(months)) {
        return res.status(400).json({ error: 'Expected array of months' });
      }
      await sql`
        INSERT INTO board_data (id, data, updated_at)
        VALUES ('main', ${JSON.stringify(months)}, now())
        ON CONFLICT (id) DO UPDATE
          SET data = ${JSON.stringify(months)}, updated_at = now()
      `;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: err.message });
  }
}
