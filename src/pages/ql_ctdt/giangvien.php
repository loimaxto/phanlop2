  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="giangvien.css">
    <title>Quản lý Giảng viên</title>
  </head>
  <body>
    <div id="container_gv">

      <div id="header_gv">

      <div id="header_gv_left">
      <button id="them_gv" class="btn">Thêm</button>
      <button id="sua_gv" class="btn">Sửa</button>
        <button id="import_gv" class="btn">Import</button>
        <button id="export_gv" class="btn">Export</button>
      </div>

      <div id="header_gv_right">
          <input type="text" placeholder="Nhập tên giảng viên cần tìm">
          <Select>
          <option value="CNTT">CNTT</option>
          <option value="Sư phạm">Sư phạm</option>
          <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
        </Select>
      </div>

      </div>

      <div id="content_gv">
    <h2>BẢNG PHÂN CÔNG CÔNG TÁC CỦA CÁN BỘ, GIẢNG VIÊN CƠ HỮU</h2>
  
    <div class="bang_gv">

    <div class="scroll-container">

    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã CB</th>
          <th>Họ và tên GV</th>
          <th>Năm sinh</th>
          <th>Chức danh, học vị</th>
          <th>Tổng tiết công tác</th>
        </tr>
      </thead>
    
      <tbody>
        <tr>
          <td>1</td>
          <td>11381</td>
          <td>Phạm Thế Bảo</td>
          <td>1972</td>
          <td>PGS.TS</td>
          <td>721.5</td>
        </tr>

        <tr>
          <td>1</td>
          <td>11381</td>
          <td>Phạm Thế Bảo</td>
          <td>1972</td>
          <td>PGS.TS</td>
          <td>721.5</td>
        </tr>

      </tbody>
    </table>

    </div>
    </div>

  </div>
    </div>

    
  <!-- Bảng chi tiết -->
  <div id="container_chitiet">
      
      <div id="form_chitiet">
          <button >X</button>
          <div id="name_gv_ct">Giảng viên: <strong>Phạm Thế Bảo</strong></div>
          <h2>Phân công giảng dạy</h2>

          <div style="height:auto; border: 2px solid black;">
          <div class="scroll-container" style="height:auto">
              <table class="table_chitiet">
                  <thead>
                      <tr>
                          <th rowspan="2">Tên Học phần</th>
                          <th rowspan="2">Mã học phần</th>
                          <th rowspan="2">Số TC</th>
                          <th rowspan="2">Số tiết của HP</th>
                          <th>Số lượng lớp nhóm</th>
                          <th colspan="3">Giảng dạy ở học kì</th>
                          <th rowspan="2">Tổng số tiết giảng dạy</th>
                          <th rowspan="2">Công tác khác</th>
                          <th rowspan="2">Tổng CLC</th>

                      </tr>
                      <tr>
                              <th>DH</th>
                              <th>1</th>
                              <th>2</th>
                              <th>3</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                      <td>Cấu trúc rời rạc</td>
                      <td>841403</td>
                      <td>4</td>
                      <td>60</td>
                      <td>2</td>
                      <td>2</td>
                      <td></td>
                      <td></td>
                      <td>120</td>
                      <td rowspan="5">Viện trưởng KH dữ liệu (265,5) TK(70), PBT(35)</td>
                      <td rowspan="5"></td>
                      </tr>

                      <tr>
                      <td>Thực tập tốt nghiệp (8 tuần)</td>
                      <td>841070</td>
                      <td>6</td>
                      <td>18</td>
                      <td>3</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>54</td>
                      </tr>

                      <tr>
                      <td>Cấu trúc dữ liệu và giải thuật</td>
                      <td>841108</td>
                      <td>4</td>
                      <td>75</td>
                      <td>1</td>
                      <td></td>
                      <td>1</td>
                      <td></td>
                      <td>60</td>
                      </tr>
                      
                      <tr>
                      <td>Phân tích và xử lí ảnh</td>
                      <td>841446</td>
                      <td>4</td>
                      <td>75</td>
                      <td>1</td>
                      <td></td>
                      <td>1</td>
                      <td></td>
                      <td>60</td>
                      </tr>

                      <tr>
                      <td>Phân tích và xử lí ảnh (Toán UD)</td>
                      <td>848028</td>
                      <td>4</td>
                      <td>75</td>
                      <td>1</td>
                      <td></td>
                      <td>1</td>
                      <td></td>
                      <td>60</td>
                      </tr>
                          <th colspan="8">Tổng cộng</th>
                          <th>354</th>
                          <th>367.5</th>
                          <th></th>
                  </tbody>
              </table>
          </div>
          </div>

      </div>

  </div>

  </body>
  <script src="giangvien.js"></script>

  </html>
