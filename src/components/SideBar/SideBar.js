import React from 'react';
import './Sidebar.scss'; 

const Sidebar = () => {
    return (
        <div id="side-bar">
            <div id="filter" style={{ display: 'block' }}>
                <div id="sap-xep">
                    <table id="flight-sort" className="sap-xep-ket-qua" style={{ width: '100%' }}>
                        <tbody>
                            <tr className="titleSort">
                                <td colSpan="2"><span>Sắp xếp</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="borderSort">
                        <table style={{ width: '100%' }} className="sort">
                            <tbody>
                                <tr>
                                    <td>
                                        <input id="sort-1" type="radio" value="abay-suggest" name="groupSort" />
                                        <label htmlFor="sort-1">Abay đề xuất</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="sort1" type="radio" value="price" name="groupSort" />
                                        <label htmlFor="sort1">Giá (Thấp tới Cao)</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="sort2" type="radio" value="time" name="groupSort" />
                                        <label htmlFor="sort2">Thời gian khởi hành</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="checked">
                                        <input id="sort3" type="radio" value="airline" name="groupSort" defaultChecked />
                                        <label htmlFor="sort3">Hãng hàng không</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="cphSubColumn_ctl00_divDisplay2">
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr className="titleSort">
                                <td colSpan="2"><span>Chế độ hiển thị</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="borderSort">
                        <table style={{ width: '100%' }} className="display-mode">
                            <tbody>
                                <tr>
                                    <td className="checked">
                                        <input type="radio" name="rblDisplayMode" value="base" id="priceBase" />
                                        <label htmlFor="priceBase">Giá cơ bản cho 1 người</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" name="rblDisplayMode" value="with-bag" id="priceWithBag" />
                                        <label htmlFor="priceWithBag">Giá cơ bản + phí hành lý</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" name="rblDisplayMode" value="business" id="priceBusiness" />
                                        <label htmlFor="priceBusiness">Giá vé hạng thương gia</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <table id="loc-ket-qua" style={{ width: '100%' }}>
                    <tbody>
                        <tr className="titleSort">
                            <td colSpan="2"><span>Chọn Lọc</span></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <div className="borderSort">
                                    <table className="theo-hang-bay" style={{ width: '100%' }}>
                                        <tbody>
                                            <tr className="sub-title">
                                                <td>Hãng hàng không</td>
                                                <td><a className="remove-filter" href="#">Hiển thị tất cả</a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" value="VN" name="rblAirline" id="rblAirline_VN" />
                                                    <label htmlFor="rblAirline_VN">Vietnam Airlines</label>
                                                </td>
                                                <td>
                                                    <img src="/_Web/_File/Images/AirlineLogo/smVN.gif" alt="Vietnam Airlines" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" value="QH" name="rblAirline" id="rblAirline_QH" />
                                                    <label htmlFor="rblAirline_QH">BamBoo Airways</label>
                                                </td>
                                                <td>
                                                    <img src="/_Web/_File/Images/AirlineLogo/smQH.gif" alt="BamBoo Airways" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" value="VJ" name="rblAirline" id="rblAirline_VJ" />
                                                    <label htmlFor="rblAirline_VJ">VietjetAir</label>
                                                </td>
                                                <td>
                                                    <img src="/_Web/_File/Images/AirlineLogo/smVJ.gif" alt="VietjetAir" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" value="VU" name="rblAirline" id="rblAirline_VU" />
                                                    <label htmlFor="rblAirline_VU">Vietravel Airlines</label>
                                                </td>
                                                <td>
                                                    <img src="/_Web/_File/Images/AirlineLogo/smVU.gif" alt="Vietravel Airlines" />
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
        </div>
    );
};

export default Sidebar;
