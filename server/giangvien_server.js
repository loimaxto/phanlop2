// server/index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(express.json());


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
  db.query('SELECT * FROM giangvien WHERE status = 1', (err, results) => {
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
  SUM(CASE WHEN pcgd.hocKiDay = 3 THEN 1 ELSE 0 END) AS hk3,
  gv.id AS GiangVienID,      -- ID giảng viên
  gv.tenGV AS TenGV,  -- Tên giảng viên
  gv.namSinh AS NamSinh,    -- Năm minh
  gv.chucDanh AS ChucDanh,   -- Chức danh
  gv.khoa AS khoa
FROM 
  phanconggiangday pcgd
JOIN 
  kehoachmonhom khmn ON khmn.id = pcgd.khMoNhom_id
JOIN 
  hocphan hp ON hp.id = khmn.hocPhan_id
JOIN 
  giangvien gv ON gv.id = pcgd.giangVien_id  -- JOIN bảng giảng viên
WHERE  
  pcgd.giangVien_id = ? AND pcgd.status = 1 
GROUP BY  
  hp.id, hp.tenHP, hp.soTinChi, gv.id, gv.tenGV, gv.namSinh, gv.chucDanh, gv.khoa


    `;
  
    db.query(query, [giangVienId], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn phân công giảng dạy:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn phân công giảng dạy' });
      }
      res.json(results);
    });
  });

   //update giang viên
  app.put('/api/giangvien/:id', (req, res) => {
  const id = req.params.id;
  const { tenGV, namSinh, chucDanh, trinhDo } = req.body;

  const sql = `
    UPDATE giangvien 
    SET tenGV = ?, namSinh = ?, chucDanh = ?, trinhDo = ?
    WHERE id = ?
  `;

  db.query(sql, [tenGV, namSinh, chucDanh, trinhDo, id], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật giảng viên:', err);
      return res.status(500).json({ message: 'Lỗi khi cập nhật giảng viên' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
    }

    res.json({ message: 'Cập nhật giảng viên thành công' });
  });
});

// Xoá mềm giảng viên (set status = 0)
app.put('/api/giangvien/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    UPDATE giangvien 
    SET status = 0
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi khi xoá mềm giảng viên:', err);
      return res.status(500).json({ message: 'Lỗi khi xoá mềm giảng viên' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy giảng viên để xoá' });
    }

    res.json({ message: 'Đã xoá giảng viên (mềm)' });
  });
});

// Lấy danh sách giảng viên theo khoa (lọc theo ngành)
app.get('/api/giangvien/by-khoa/:khoa', (req, res) => {
  const khoa = req.params.khoa;

  const sql = `SELECT * FROM giangvien WHERE status = 1 AND khoa = ?`;
  db.query(sql, [khoa], (err, results) => {
    if (err) {
      console.error('Lỗi khi lọc giảng viên theo khoa:', err);
      return res.status(500).json({ message: 'Lỗi khi truy vấn giảng viên' });
    }
    res.json(results);
  });
});

// Lấy danh sách giảng viên theo tên (tìm kiếm theo tên)

app.get('/api/giangvien/search/:tenGV', (req, res) => {
  const tenGV = req.params.tenGV;
  const sql = `SELECT * FROM giangvien WHERE status = 1 AND tenGV LIKE ?`;
  db.query(sql, [`%${tenGV}%`], (err, results) => {
    if (err) {
      console.error('Lỗi khi tìm giảng viên:', err);
      return res.status(500).json({ message: 'Lỗi server khi tìm giảng viên' });
    }
    res.json(results);
  });
});

// Lấy toàn bộ tên ngành
app.get('/api/nganh', (req, res) => {
  const sql = 'SELECT * FROM nganh WHERE status = 1';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy danh sách ngành:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    res.json(results); // Gửi danh sách ngành về client
  });
});

// API Lấy danh sách người dùng
app.get('/api/user', (req, res) => {
  const sql = 'SELECT * FROM user WHERE status = 1'; // Chọn người dùng có status = 1

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi khi lấy danh sách người dùng:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    res.json(results); // Trả về danh sách người dùng
  });
});
app.post('/api/giangvien/them', (req, res) => {
  const { userId, tenGV, namSinh, chucDanh, khoa, boMon, chuyenMon, trinhDo } = req.body;

  if (!userId || !tenGV || !namSinh || !chucDanh || !khoa || !boMon || !chuyenMon || !trinhDo) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
  }

  const sql = `
    INSERT INTO giangvien (user_id, tenGV, namSinh, chucDanh, khoa, boMon, chuyenMon, trinhDo, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;

  const values = [userId, tenGV, namSinh, chucDanh, khoa, boMon, chuyenMon, trinhDo];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm giảng viên:', err);
      return res.status(500).json({ message: 'Lỗi server khi thêm giảng viên.', error: err.message });
    }

    res.status(201).json({ message: 'Thêm giảng viên thành công.', giangVienId: result.insertId });
  });
});

//lấy danh sách các nhóm học phần theo khoa
app.get('/api/phanconggiangday/khoa/:khoa', (req, res) => {
    const khoa = decodeURIComponent(req.params.khoa);  // Giải mã URL
    const query = `
    SELECT 
      hp.id AS MAHP,
      hp.tenHP AS TenHP,
      hp.soTinChi AS SoTC, 
      MAX(pcgd.soTietThucHien) AS SoTiet, -- dùng MAX để tránh lỗi khi GROUP BY 
      SUM(CASE WHEN pcgd.hocKiDay = 1 THEN 1 ELSE 0 END) AS hk1, 
      SUM(CASE WHEN pcgd.hocKiDay = 2 THEN 1 ELSE 0 END) AS hk2,
      SUM(CASE WHEN pcgd.hocKiDay = 3 THEN 1 ELSE 0 END) AS hk3,
      gv.id AS GiangVienID,      -- ID giảng viên
      gv.tenGV AS TenGV,  -- Tên giảng viên
      gv.namSinh AS NamSinh,    -- Năm sinh
      gv.chucDanh AS ChucDanh,   -- Chức danh
      gv.khoa AS khoa
    FROM 
      phanconggiangday pcgd
    JOIN  
      kehoachmonhom khmn ON khmn.id = pcgd.khMoNhom_id 
    JOIN  
      hocphan hp ON hp.id = khmn.hocPhan_id 
    JOIN  
      giangvien gv ON gv.id = pcgd.giangVien_id  -- JOIN bảng giảng viên 
    WHERE   
      gv.khoa = ? AND pcgd.status = 1  AND gv.status = 1
    GROUP BY   
      hp.id, hp.tenHP, hp.soTinChi, gv.id, gv.tenGV, gv.namSinh, gv.chucDanh, gv.khoa
    `;

    // Execute the query
    db.query(query, [khoa], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(result);
        }
    });
});



  app.listen(port, () => {
    console.log(`API server chạy tại http://localhost:${port}`);
  });
  
  
  