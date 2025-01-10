import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChiTietDonHang.scss";
import { formatDate } from "../../../components/LunarCalendarFormat/LunarCalendarFormat";
import { useToast } from "../../../components/useToast/ToastContext";
import { useNavigate } from "react-router-dom";
import ModalThanhToan from "../../../components/ModalThanhToan/ModalThanhToan";
import {
  getAirlineName,
  getAirlineImage,
} from "../../SearchLayout/SearchLayoutFunction";
const ChiTietDonHang = () => {
  const { state: hoadon } = useLocation();
  const { sethoadon } = useToast();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hangmaybay, sethangmaybay] = useState([]);

  const [thanhtoan, setthanhtoan] = useState(null);
  const fetchhang = async () => {
    try {
      const response = await fetch("https://demovemaybay.shop/gethangmaybay");
      const data = await response.json();
      if (response.ok) {
        sethangmaybay(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchhang();
  }, []);
  if (!hoadon) {
    return <div>không có dữ liệu</div>;
  }
  const handleRowClick = (item) => {
    if (item.trangthai === "Chờ thanh toán") {
      sethoadon(item);
      navigate("/thanhtoan");
    } else {
      setthanhtoan(item);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
    setthanhtoan(null); // Xóa dữ liệu trong modal
  };

  return (
    <div className="chitiethoadon">
      <h3>Hóa đơn chi tiết</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã hóa đơn</th>
              <th>Tên người liên hệ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Ngày bay</th>
              <th>Chuyến bay</th>
              <th>Tổng tiền</th>
              <th>Trạng thái thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {hoadon.length > 0 ? (
              hoadon.map((item, index) => (
                <tr key={item._id} onClick={() => handleRowClick(item)}>
                  <td data-label="STT">{index + 1}</td>
                  <td data-label="Mã hóa đơn">{item.mahoadon}</td>
                  <td data-label="Tên người liên hệ">{item.namelienhe}</td>
                  <td data-label="Số điện thoại">{item.phone}</td>
                  <td data-label="Email">{item.email}</td>
                  <td data-label="Ngày bay">{formatDate(item.ngaybay)}</td>
                  <td data-label="Chuyến bay">{item.chuyenbay}</td>
                  <td data-label="Tổng tiền">
                    {item.tongtien.toLocaleString()}
                  </td>
                  <td data-label="Trạng thái thanh toán">{item.trangthai}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
  <ModalThanhToan onClose={closeModal} isOpen={isModalOpen}>
    <div className="desktop-view">
    <table>
      <tbody>
        <tr className="table-cell">
          <div>
            <strong>Người liên hệ:</strong> {thanhtoan.namelienhe}
          </div>
          <div>
            <strong>Mã hóa đơn:</strong> {thanhtoan.mahoadon}
          </div>
        </tr>
        <tr>
          <td className="table-cell">
            <div>
              <strong>Email:</strong> {thanhtoan.email}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {thanhtoan.phone}
            </div>
          </td>
        </tr>
        <tr>
          <td className="table-cell">
            <div>
              <strong>Từ</strong> {thanhtoan.cityfrom} - {thanhtoan.cityto}
            </div>
            <div>
              <strong>Ngày:</strong> {formatDate(thanhtoan.ngaybay)}
            </div>
            <div>
              <strong>Giờ:</strong> {thanhtoan.hourfrom} - {thanhtoan.hourto}
            </div>
          </td>
        </tr>
        <tr>
          <td className="table-cell">
            <div>
              <strong>Hãng:</strong> {getAirlineName(thanhtoan.hang, hangmaybay)}
            </div>
            <div>
              <img
                src={getAirlineImage(thanhtoan.hang, hangmaybay)}
                alt={thanhtoan.hang}
              />
            </div>
            <div>
              <strong>Chuyến bay:</strong> {thanhtoan.chuyenbay}
            </div>
          </td>
        </tr>

        
        {thanhtoan.ngayve && (
          
          <tr>
            <td className="table-cell">
              <div>
                <strong>Từ</strong> {thanhtoan.cityto} - {thanhtoan.cityfrom}
              </div>
              <div>
                <strong>Ngày:</strong> {formatDate(thanhtoan.ngayve)}
              </div>
              <div>
                <strong>Giờ:</strong> {thanhtoan.hourvefrom} - {thanhtoan.hourveto}
              </div>
            </td>
          </tr>
        )}
        {thanhtoan.ngayve && (
          
          <tr>
          <td className="table-cell">
            <div>
              <strong>Hãng:</strong> {getAirlineName(thanhtoan.hangve, hangmaybay)}
            </div>
            <div>
              <img
                src={getAirlineImage(thanhtoan.hangve, hangmaybay)}
                alt={thanhtoan.hangve}
              />
            </div>
            <div>
              <strong>Chuyến bay:</strong> {thanhtoan.chuyenbayve}
            </div>
          </td>
        </tr>
        )}

        <tr>
          <td className="table-cell">
            <div>
              <strong>Giá vé đi:</strong> {thanhtoan.tienve.toLocaleString()} đ
            </div>
            {thanhtoan.tienveve && (
              <div>
                <strong>Giá vé về:</strong> {thanhtoan.tienveve.toLocaleString()} đ
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td className="table-cell">
            <div>
              <strong>Đặt ghế:</strong> {thanhtoan.datghe ? "Có" : "Không"}
            </div>
            <div>
              <strong>Mã voucher:</strong> {thanhtoan.mavoucher || "Không có"}
            </div>
          </td>
        </tr>
        <tr>
          <td data-label="Ghi chú">{thanhtoan.ghichu || "Không có"}</td>
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Tên hành khách</th>
          <th>Đối tượng</th>
          <th>Hành lý ký gửi</th>
        </tr>
      </thead>
      <tbody>
        {thanhtoan.khachbay.map((khach, index) => (
          <tr key={khach._id || index}>
            <td>{khach.namebay}</td>
            <td>{khach.doituong}</td>
            <td>{khach.hanhlykygui || "Không có"}</td>
          </tr>
        ))}
        <tr>
          <td
            colSpan="2"
            style={{ textAlign: "right", fontWeight: "bold" }}
          >
            Tổng tiền:
          </td>
          <td>{thanhtoan.tongtien.toLocaleString()} đ</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div className="mobile-view">
    <div className="modal-content-mb">
    <div className="info-groupmb">
      <div><strong>Người liên hệ:</strong> {thanhtoan.namelienhe}</div>
      <div><strong>Mã hóa đơn:</strong> {thanhtoan.mahoadon}</div>
    </div>
    <div className="info-groupmb">
      <div><strong>Email:</strong> {thanhtoan.email}</div>
      <div><strong>Số điện thoại:</strong> {thanhtoan.phone}</div>
    </div>
    <div className="info-groupmb">
      <div><strong>Từ:</strong> {thanhtoan.cityfrom} - {thanhtoan.cityto}</div>
      <div><strong>Ngày:</strong> {formatDate(thanhtoan.ngaybay)}</div>
      <div><strong>Giờ:</strong> {thanhtoan.hourfrom} - {thanhtoan.hourto}</div>
    </div>
    <div className="info-group">
      <div><strong>Hãng:</strong> {getAirlineName(thanhtoan.hang, hangmaybay)}</div>
      <img
        src={getAirlineImage(thanhtoan.hang, hangmaybay)}
        alt={thanhtoan.hang}
        className="airline-logo"
      />
      <div><strong>Chuyến bay:</strong> {thanhtoan.chuyenbay}</div>
    </div>
    {thanhtoan.ngayve && (
      <div className="info-groupmb">
        <div><strong>Từ:</strong> {thanhtoan.cityto} - {thanhtoan.cityfrom}</div>
        <div><strong>Ngày:</strong> {formatDate(thanhtoan.ngayve)}</div>
        <div><strong>Giờ:</strong> {thanhtoan.hourvefrom} - {thanhtoan.hourveto}</div>
      </div>
    )}
    {thanhtoan.ngayve && (
      <div className="info-group">
        <div><strong>Hãng:</strong> {getAirlineName(thanhtoan.hangve, hangmaybay)}</div>
        <img
          src={getAirlineImage(thanhtoan.hangve, hangmaybay)}
          alt={thanhtoan.hangve}
          className="airline-logo"
        />
        <div><strong>Chuyến bay:</strong> {thanhtoan.chuyenbayve}</div>
      </div>
    )}
    <div className="info-groupmb">
      <div><strong>Giá vé đi:</strong> {thanhtoan.tienve.toLocaleString()} đ</div>
      {thanhtoan.tienveve && (
        <div><strong>Giá vé về:</strong> {thanhtoan.tienveve.toLocaleString()} đ</div>
      )}
    </div>
    <div className="info-groupmb">
      <div><strong>Đặt ghế:</strong> {thanhtoan.datghe ? "Có" : "Không"}</div>
      <div><strong>Mã voucher:</strong> {thanhtoan.mavoucher || "Không có"}</div>
    </div>
    <div className="info-group">
      <strong>Ghi chú:</strong> {thanhtoan.ghichu || "Không có"}
    </div>
    <div className="passenger-info">
      <h3>Thông tin hành khách:</h3>
      {thanhtoan.khachbay.map((khach, index) => (
        <div key={khach._id || index} className="passenger">
          <div><strong>Tên:</strong> {khach.namebay}</div>
          <div><strong>Đối tượng:</strong> {khach.doituong}</div>
          <div><strong>Hành lý ký gửi:</strong> {khach.hanhlykygui || "Không có"}</div>
        </div>
      ))}
      <div className="total-price">
        <strong>Tổng tiền:</strong> {thanhtoan.tongtien.toLocaleString()} đ
      </div>
    </div>
  </div>
  </div>
  </ModalThanhToan>
)}

    </div>
  );
};

export default ChiTietDonHang;
