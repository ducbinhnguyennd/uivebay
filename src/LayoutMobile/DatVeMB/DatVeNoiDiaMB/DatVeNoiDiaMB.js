import React from 'react'
import ThongTinDat from '../../../Layout/DatVe/ThongTinDat'

const DatVeNoiDiaMB = () => {

  return (
    <div style={{padding:"10px"}}>   
        <ThongTinDat />
        <div>
          <table className='fare-rule'>
            <tbody>
              <tr className='title'>
                <td className='head'>
                  <p>Điều kiện vé</p>
                </td>
              </tr>
              <tr>
                <td className='main-fare'>
                  - Hoàn vé: <br />
                  + Thu phí, hoàn bảo lưu định danh trong 01 năm từ ngày khởi
                  hành
                  <br />
                  + Yêu cầu hoàn hủy phải báo trước 30 tiếng so với giờ khởi
                  hành chặng bay đầu tiên.
                  <br />
                  - Đổi vé: <br />
                  + Trước giờ khởi hành 06 tiếng: 378,000đ/chiều/khách + chênh
                  lệch giá
                  <br />
                  + Trong vòng 06 tiếng và sau khởi hành: Không áp dụng
                  <br />- Đổi tên: Không áp dụng
                </td>
              </tr>
            </tbody>
          </table>
       
      </div>
    </div>
  )
}

export default DatVeNoiDiaMB
