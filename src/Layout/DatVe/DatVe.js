import React, { useState } from 'react';
import "./DatVe.scss"
import ThongTinDat from './ThongTinDat';
const DatVe = () => {
  const [fullName, setFullName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [invoiceRequired, setInvoiceRequired] = useState(false);
  const [taxCode, setTaxCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [remark, setRemark] = useState('');
  const [baggage, setBaggage] = useState('0,0');

  const handleInvoiceToggle = () => setInvoiceRequired(!invoiceRequired);

  return (
    <div className="datve-container">
      <div className="content-left">
        <ThongTinDat />
      </div>
      <div className="content-right">
        <div id="side-bar-datve">
          <table className="fare-rule">
            <tbody>
              <tr className="title">
                <td className="head">
                  <p>Điều kiện vé</p>
                </td>
              </tr>
              <tr>
                <td className="main-fare">
                  - Hoàn vé: <br />
                  + Thu phí, hoàn bảo lưu định danh trong 01 năm từ ngày khởi hành
                  <br />
                  + Yêu cầu hoàn hủy phải báo trước 30 tiếng so với giờ khởi hành
                  chặng bay đầu tiên.
                  <br />
                  - Đổi vé: <br />
                  + Trước giờ khởi hành 06 tiếng: 378,000đ/chiều/khách + chênh lệch
                  giá
                  <br />
                  + Trong vòng 06 tiếng và sau khởi hành: Không áp dụng
                  <br />
                  - Đổi tên: Không áp dụng
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
       
  );
};

export default DatVe;
