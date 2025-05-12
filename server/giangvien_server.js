// server/index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        
  database: 'ctdt',    
});

db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối DB:', err);
    return;
  }
  console.log('Kết nối MySQL thành công!');
});

// Route lấy danh sách giảng viên
app.get('/api/giangvien', (req, res) => {
  db.query('SELECT * FROM giangvien', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi truy vấn DB' });
    }
    res.json(results);
  });
});

// Lấy toàn bộ phân công giảng dạy theo ID giảng viên
app.get('/api/phanconggiangday/:idGV', (req, res) => {
    const giangVienId = req.params.idGV;
  
    const query = `
SELECT 
  hp.id AS MAHP,
  hp.tenHP AS TenHP,
  hp.soTinChi AS SoTC,
  MAX(pcgd.soTietThucHien) AS SoTiet, -- dùng MAX để tránh lỗi khi GROUP BY
  SUM(CASE WHEN pcgd.hocKiDay = 1 THEN 1 ELSE 0 END) AS hk1,
  SUM(CASE WHEN pcgd.hocKiDay = 2 THEN 1 ELSE 0 END) AS hk2,
  SUM(CASE WHEN pcgd.hocKiDay = 3 THEN 1 ELSE 0 END) AS hk3
FROM 
  phanconggiangday pcgd
JOIN 
  kehoachmonhom khmn ON khmn.id = pcgd.khMoNhom_id
JOIN 
  hocphan hp ON hp.id = khmn.hocPhan_id
WHERE 
  pcgd.giangVien_id = ?
GROUP BY 
  hp.id, hp.tenHP, hp.soTinChi

    `;
  
    db.query(query, [giangVienId], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn phân công giảng dạy:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn phân công giảng dạy' });
      }
      res.json(results);
    });
  });

  app.listen(port, () => {
    console.log(`API server chạy tại http://localhost:${port}`);
  });
  
  
  