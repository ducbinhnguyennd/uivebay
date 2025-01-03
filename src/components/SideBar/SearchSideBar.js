import React from "react";
import "./SearchSideBar.scss";
function SearchSidebar() {
  return (
    <div className="SearchSidebar">
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        id="Table1"
        className="sub-search-form"
      >
        <tbody>
          <tr>
            <td className="sub-form-search">
              <div className="borderSortlastItem">
                <table width="100%">
                  <tbody>
                    <tr className="from">
                      <td colSpan="6">
                        <label htmlFor="departure">Điểm đi</label>
                        <br />
                        <input
                          name="departure"
                          type="text"
                          defaultValue="Tp Hồ Chí Minh"
                          id="departure"
                          className="departure startplace text-input ac_input focus-input"
                          data-type="departure"
                        />
                        <input
                          type="hidden"
                          id="hdfstartplace"
                          name="hdfstartplace"
                          defaultValue="SGN"
                        />
                      </td>
                    </tr>

                    <tr>
                    <td>
                    <span className="reverse-command">⥮</span>

                    </td>
                    </tr>
                    <tr className="to">
                      <td colSpan="6">
                        <label htmlFor="arrival">Điểm đến</label>
                        <br />
                        <input
                          name="arrival"
                          type="text"
                          defaultValue="Hà Nội"
                          id="arrival"
                          className="arrival endplace text-input ac_input focus-input"
                          data-type="arrival"
                        />
                        <input
                          type="hidden"
                          id="hdfendplace"
                          name="hdfendplace"
                          defaultValue="HAN"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="departure" colSpan="3">
                        <label htmlFor="departureDate">Ngày đi</label>
                        <br />
                        <input
                          name="departureDate"
                          type="text"
                          defaultValue="06/01/2025"
                          id="departureDate"
                          className="date-input txtDateLunar txtDateLunar-departure depDate focus-input"
                          data-type="departure"
                        />
                      </td>
                      <td className="return" colSpan="3">
                        <label htmlFor="returnDate">Ngày về</label>
                        <br />
                        <input
                          name="returnDate"
                          type="text"
                          id="returnDate"
                          className="date-input txtDateLunar txtDateLunar-return retDate focus-input"
                          data-type="return"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="13" style={{ paddingTop: "5px" }}>
                        <a
                          href="/_WEB/PageSub/OtherPage/Xem-lich-am.aspx"
                          className="lightview"
                          rel="nofollow"
                          style={{ fontSize: "12px", color: "orangered" }}
                        >
                          * Xem lịch âm
                        </a>
                        <span className="remove-date">Bỏ chọn ngày về</span>
                      </td>
                    </tr>
                    <tr className="passenger">
                      <td colSpan="2">
                        <label htmlFor="adults">Người lớn</label>
                        <br />
                        <select
                          name="adults"
                          id="adults"
                          className="focus-input"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td colSpan="2">
                        <label htmlFor="children">Trẻ em</label>
                        <br />
                        <select name="children" id="children">
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td colSpan="2">
                        <label htmlFor="infants">Trẻ sơ sinh</label>
                        <br />
                        <select name="infants" id="infants">
                          {[...Array(7)].map((_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="6"></td>
                    </tr>
                    <tr>
                      <td colSpan="6"></td>
                    </tr>
                    <tr align="center">
                      <td colSpan="7" align="center" className="input-submit">
                        <button
                          className="button-text radius-5px btnSearchReCaptcha"
                          onClick={() => alert("Đang xử lý...")}
                        >
                          Tìm Chuyến Bay
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SearchSidebar;
