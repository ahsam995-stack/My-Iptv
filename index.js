// مثال بسيط لسيرفر التفعيل (Express). انقل CODES إلى قاعدة بيانات في الإنتاج.
const express = require('express');
const app = express();
app.use(express.json());

const CODES = {
  'DEMO-1234': { server: 'http://your-xtream-host:8080', username: 'user1', password: 'pass1', expires: '2027-01-01' },
};

app.post('/api/activate', (req, res) => {
  const entry = CODES[String(req.body?.code || '').trim().toUpperCase()];
  if (!entry || new Date(entry.expires) < new Date()) return res.status(404).json({ error: 'invalid_code' });
  const { server, username, password } = entry;
  res.json({ server, username, password });
});

app.listen(process.env.PORT || 3000, () => console.log('Activation API running'));
