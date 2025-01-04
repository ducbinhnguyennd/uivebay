/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import './GioiThieu.scss'
const GioiThieu = () => {
  const [activeTab, setActiveTab] = useState(0)

  const showTab = (tabIndex, height) => {
    setActiveTab(tabIndex)
    const container = document.getElementById('stcontainer')
    container.style.height = height
    const tab = document.getElementById(`tabs-${tabIndex + 1}`)
    tab.style.top = '0px'
  }
  
  return (
    <div className='g'>
      <img src='https://www.abay.vn/_WEB/_File/Images/GioiThieuAbay/Banner.jpg'></img>
      <div className='contentGioithieu'>
        <div id='tabs' className='stMain'>
          <ul className='tabAnchor'>
            <li className='tab1' onClick={() => showTab(0, '3232px')}>
              <a href='#tabs-1' className='sel'>
                <span className='imgtab1'></span>
                Công ty
                <br /> Vé máy bay ABAY
              </a>
            </li>
            <li className='tab2' onClick={() => showTab(1, '1647px')}>
              <a href='#tabs-2'>
                Hệ thống
                <br /> ABAY.vn
              </a>
            </li>
            <li className='tab3' onClick={() => showTab(2, '4582px')}>
              <a href='#tabs-3'>Gia ĐÌnh abay</a>
            </li>
            <li className='tab4' onClick={() => showTab(3, '420px')}>
              <a href='#tabs-4'>Đối tác</a>
            </li>
          </ul>

          <div
            className='stContainer'
            style={{ height: '3232px' }}
            id='stcontainer'
          >
            <div className={activeTab === 0 ? 'show' : 'hide'}>
              <div id='tabs-1' className='tabContent' style={{ top: '0px' }}>
                <p>
                  ABAY là công ty hoạt động trong lĩnh vực thương mại điện tử –{' '}
                  <b>chuyên cung cấp dịch vụ vé máy bay trực tuyến</b> của các
                  hãng hàng không nội địa và quốc tế. ABAY có hệ thống Đặt Vé
                  Máy Bay Trực Tuyến tại website{' '}
                  <a href='/'>
                    <b>www.ABAY.vn</b>
                  </a>{' '}
                  với các chức năng:{' '}
                  <i>
                    Tìm kiếm hành trình bay, So sánh giá vé của các hãng hàng
                    không, Đặt vé trên website và Thanh toán trực tuyến.
                  </i>
                </p>
                <p>
                  Là doanh nghiệp hoạt động theo mô hình Đại lý Du lịch Trực
                  tuyến (Online Travel Agency – OTA) đầu tiên tại Việt Nam, nhóm
                  phát triển đằng sau ABAY.vn đã có nhiều năm kinh nghiệm trong
                  việc thiết kế và thực hiện các ứng dụng web cao cấp cho nhiều
                  ngành khác nhau (viễn thông, ngân hàng, bán lẻ) và biết rất rõ
                  làm thế nào để thực hiện các giao dịch dựa trên các ứng dụng
                  được nhanh chóng, đáng tin cậy, và dễ sử dụng.
                </p>
                <p style={{ textAlign: 'center' }}>
                  <img
                    src='https://www.abay.vnhttps://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-1.JPG'
                    alt=''
                  />
                </p>
                <p>
                  Trong nhiều năm, đội ngũ nghiên cứu thị trường của ABAY đã đặt
                  phòng khách sạn, mua vé tàu, du thuyền, tour du lịch, thuê xe
                  ô tô trực tuyến ngay từ máy tính cá nhân của mình. Qua những
                  năm đó chúng tôi phải lướt qua hàng chục, hàng trăm website
                  nặng nề, khó dùng với các sản phẩm dịch vụ đắt đỏ và sự hỗ trợ
                  khách hàng chậm chạp, thiếu chuyên nghiệp từ phía các công ty
                  chủ quản website. Điều này đã tạo nên động lực để chúng tôi
                  tạo nên sự thay đổi, khác biệt và đó là lý do ABAY ra đời.
                </p>
                <p>
                  Với ABAY, chúng tôi quyết tâm tạo ra website đặt vé máy bay
                  trực tuyến tốt nhất với ưu tiên hàng đầu là <b>sự tiện lợi</b>{' '}
                  tối đa mà ABAY có thể mang đến cho khách hàng. Từ một nhóm nhỏ
                  với vài thành viên, cho đến nay ABAY đã trở thành công ty dẫn
                  đầu trong lĩnh vực này tại thị trường Việt Nam với hơn 100
                  nhân viên, 4 chi nhánh tại Hà Nội và TP HCM, hơn 1000 khách
                  hàng mỗi ngày và sẽ còn vươn xa hơn nữa. Trong tương lai,
                  ngoài mảng vé máy bay, ABAY có kế hoạch xây dựng tổ hợp dịch
                  vụ trực tuyến gồm: đặt vé máy bay, tour du lịch, du thuyền,
                  khách sạn… để tiến tới mục tiêu trở thành một trong những
                  doanh nghiệp OTA thành công đầu tiên tại Việt Nam.
                </p>
                <p style={{ textAlign: 'center' }}>
                  <img
                    src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-2.JPG'
                    alt=''
                  />
                </p>
                <h3>THÀNH TỰU ĐÃ ĐẠT ĐƯỢC</h3>
                <p>
                  Ngay trong năm đầu đi vào hoạt động, ABAY đã gặt hái được
                  thành tựu đáng nể như:
                  <i>
                    Đại lý Top 1 của VietJet Air và Jetstar Pacific miền Bắc, 1
                    trong số ít doanh nghiệp trở thành thành viên câu lạc bộ GM
                    của Vietnam Airlines, Sản phẩm tin cậy- dịch vụ hoàn hảo -
                    nhãn hiệu được người tiêu dùng bình chọn…
                  </i>
                </p>
                <div>
                  <b>Năm 2012</b>
                  <ul>
                    <li>Giải thưởng Sao vàng của VietJet Air</li>
                    <li>Đối tác vàng của Jetstar năm 2012</li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-3.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-4.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                  </p>
                </div>
                <div>
                  <b>Năm 2013</b>
                  <ul>
                    <li>
                      Sản phẩm - Dịch vụ uy tín, chất lượng do người tiêu dùng
                      bình chọn năm 2013
                    </li>
                    <li>
                      Top 5 Đại lý tăng trưởng cao nhất miền Bắc của Abacus
                    </li>
                    <li>
                      Đại lý đạt doanh thu cao nhất miền Bắc năm 2013 của
                      Jetstar
                    </li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-5.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-6.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                  </p>
                </div>
                <div>
                  <b>Năm 2014</b>
                  <ul>
                    <li>
                      Top 50 thương hiệu uy tín nổi tiếng được tin dùng năm 2014
                    </li>
                    <li>
                      Sản phẩm tin cậy, Dịch vụ hoàn hảo, Nhãn hiệu ưa dùng năm
                      2014
                    </li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-7.pnG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-8.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                  </p>
                </div>
                <div>
                  <b>Năm 2015</b>
                  <ul>
                    <li>
                      Sản phẩm tin cậy – Dịch vụ hoàn hảo – Nhãn hiệu ưa dùng
                      2015
                    </li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-9.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-10.pnG'
                      style={{ height: '200px', paddingLeft: '15px' }}
                      alt=''
                    />
                  </p>
                </div>
                <div>
                  <b>Năm 2016</b>
                  <ul>
                    <li>
                      Sao Khuê 2016 - giải thưởng dành cho sản phẩm dịch vụ xuất
                      sắc, uy tín của ngành công nghiệp phần mềm và dịch vụ CNTT
                      Việt Nam, do Hiệp hội phần mềm và Dịch vụ công nghệ thông
                      tin Việt Nam (Vinasa) trao tặng
                    </li>
                    <li>
                      Đại lý có doanh số cao nhất miền Bắc của VietJet Air năm
                      2015
                    </li>
                    <li>
                      Top 3 đại lý có lượng vé quốc tế bán ra lớn nhất miền Bắc
                      năm 2015 của Sabre Vietnam
                    </li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-2016-sao-khue.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                  </p>
                </div>
                <div>
                  <b>Năm 2017</b>
                  <ul>
                    <li>
                      Chứng nhận Nhóm 20 Đại lý có Điểm Doanh thu cao nhất năm
                      2017 của Vietnam Airlines
                    </li>
                    <li>
                      Giải thưởng 1st Prize Performance từ Hệ thống phân phối
                      toàn cầu SABRE - Hệ thống đặt chỗ chính của Vietnam
                      Airlines và hầu hết các hãng hàng không quốc tế khác
                    </li>
                    <li>
                      Giải thưởng Top Agent Of The Year 2017 - Northern Area và
                      chứng nhận Đại lý có doanh thu cao nhất Miền Bắc năm 2017
                      của Vietjet Air
                    </li>
                  </ul>
                  <p style={{ textAlign: 'center' }}>
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-2017-vietjet.JPG'
                      style={{ height: '200px' }}
                      alt=''
                    />
                    <img
                      src='https://www.abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-2017-vna.JPG'
                      style={{ height: '200px', paddingLeft: '15px' }}
                      alt=''
                    />
                  </p>
                </div>
                <h6 class='nameCty'>CÔNG TY TNHH VÉ MÁY BAY TRỰC TUYẾN ABAY</h6>
                <p>
                  Số ĐKKD: 0105795184 - Mã số thuế: 0105795184
                  <br />
                  Ngày thành lập: 20/02/2012
                  <br />
                  Giám đốc: Ông Phạm Tuấn Nam
                  <br />
                  Website chính thức:
                  <a href='#' class='blueLink'>
                    {' '}
                    www.abay.vn
                  </a>
                  <br />
                </p>
                <h6 class='nameCty'>Địa chỉ:</h6>
                <p>
                  <b class='listItemGT'>ABAY TẠI HÀ NỘI</b>
                  <br />
                  324 Phố Huế, Q.Hai Bà Trưng, Hà Nội
                  <br />
                  Email: contact@abay.vn
                  <br />
                  Tel: 19006091
                  <br />
                  <br />
                  <b class='listItemGT'>ABAY TẠI TP HỒ CHÍ MINH</b>
                  <br />
                  52 Huỳnh Khương Ninh, P.Đa Kao, Q1, TP Hồ Chí Minh
                  <br />
                  Email: contact@abay.vn
                  <br />
                  Tel: 19006061
                  <br />
                </p>
              </div>
            </div>
            <div className={activeTab === 1 ? 'show' : 'hide'}>
              <div id='tabs-2' className='tabContent' style={{ top: '1657px' }}>
                <p style={{ textAlign: 'center' }}>
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/TrangchuABAY.jpg'
                    style={{ width: '600px' }}
                    alt='ABAY Homepage'
                  />
                </p>

                <p>
                  <a href='/' className='blueLink'>
                    www.ABAY.vn
                  </a>{' '}
                  là website Đặt Vé Máy Bay Trực Tuyến thuộc sở hữu của Công ty
                  ABAY. Được thiết kế với giao diện thân thiện, dễ sử dụng.
                  ABAY.vn thực hiện các chức năng sau:
                </p>

                <div style={{ paddingLeft: '20px' }}>
                  <p>
                    <b>
                      1. Tìm kiếm hành trình bay theo yêu cầu của khách hàng
                      (chặng bay, giờ bay, giá vé)
                    </b>
                  </p>
                  <p>
                    <b>
                      2. So sánh giá vé của 3 hãng hàng không nội địa (Vietnam
                      Airlines, Vietjet Air, Jetstar Pacific) và hơn 350 hãng
                      hàng không quốc tế
                    </b>
                  </p>
                  <p>
                    <b>3. Đặt vé máy bay nội địa và quốc tế tự động</b>
                  </p>
                  <p>
                    <b>
                      4. Tính năng TÌM VÉ GIÁ RẺ THEO THÁNG giúp khách hàng so
                      sánh giá vé của tất cả các ngày trong tháng, từ đó tìm ra
                      được thời gian có giá vé hợp lý hoặc tìm được ngày có giá
                      rẻ nhất.
                    </b>
                  </p>
                  <p>
                    <b>5. Hệ thống thanh toán với nhiều hình thức đa dạng</b>
                    <span style={{ fontSize: '12px' }}>
                      : Thanh toán qua chuyển khoản của 12 ngân hàng nội địa,
                      Thanh toán tại văn phòng công ty ABAY (trực tiếp hoặc qua
                      cà thẻ - POS), Thanh toán tại nhà khách hàng và Thanh toán
                      trực tuyến qua các cổng trung gian (123Pay) với hơn 20
                      loại thẻ ngân hàng, visa, visa điện tử.
                    </span>
                  </p>
                </div>

                <p>
                  Website còn có phiên bản dành cho các thiết bị di động
                  (mobile, tablet, laptop) giúp khách hàng có thể đặt vé máy bay
                  nhanh chóng mọi lúc, mọi nơi khi muốn.
                </p>

                <p style={{ textAlign: 'center' }}>
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-11.jpg'
                    style={{ width: '600px' }}
                    alt='Giới thiệu ABAY'
                  />
                </p>

                <p>
                  Ngoài thực hiện trực tiếp thao tác đặt vé trên website, khách
                  hàng còn có thể gọi điện tới tổng đài <b>1900 6091</b>, chat
                  trực tuyến, gửi email hoặc liên lạc với ABAY qua mạng xã hội
                  Facebook.
                </p>

                <p>
                  Không chỉ phục vụ nhu cầu đặt vé, Đội Vé Nội Địa và Quốc Tế
                  với nghiệp vụ chuyên môn cao và bề dày kinh nghiệm sẽ tư vấn
                  cho khách hàng những vấn đề liên quan đến chuyến bay như:{' '}
                  <i>các quy định hàng không, giấy tờ thủ tục cần thiết</i> để
                  đảm bảo khách hàng có những chuyến bay suôn sẻ và an toàn
                  nhất.
                </p>

                <p style={{ textAlign: 'center' }}>
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/gioi-thieu-abay-12.jpg'
                    style={{ width: '600px' }}
                    alt='Giới thiệu ABAY 2'
                  />
                </p>

                <p>
                  Cùng với đó là Đội Ngũ Chăm Sóc Khách chu đáo và chuyên nghiệp
                  giúp giải đáp mọi thắc mắc, tiếp nhận khiếu nại, tư vấn thông
                  tin và hỗ trợ đặt vé 24/7.
                </p>

                <a
                  href='/tien-ich/huong-dan-su-dung.aspx'
                  className='blueLink'
                  style={{ display: 'block', margin: '10px 0' }}
                >
                  » Hướng dẫn Đặt Vé Máy Bay trên ABAY.vn
                </a>
              </div>
            </div>
            <div className={activeTab === 2 ? 'show' : 'hide'}>
              <div id='tabs-3' className='tabContent' style={{ top: '4592px' }}>
                <p>
                  Nguồn nhân lực luôn là yếu tố được ABAY đề cao và lấy làm
                  trọng tâm phát triển của công ty bởi hơn ai hết chúng tôi hiểu
                  rằng con người chính là tài sản quý giá nhất, có tính then
                  chốt, quyết định tới sự thành bại của doanh nghiệp. Do đó từ
                  khi thành lập tới nay ABAY luôn trải thảm đỏ chào đón nhân
                  tài; luôn nỗ lực tạo điều kiện, môi trường làm việc chất lượng
                  cũng như thực hiện các chính sách khuyến khích làm việc và đãi
                  ngộ tốt nhất dành cho nhân viên. Sự thành công của ABAY ngày
                  hôm nay chính là minh chứng cho những cống hiến, nỗ lực cũng
                  như niềm tin mà các thành viên dành cho đại gia đình ABAY
                </p>
                <img
                  src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/cocaunhansu.jpg'
                  width='600px'
                  style={{ margin: '10px 0px' }}
                  alt='Cơ Cấu Nhân Sự'
                />
                <p>
                  Gia Đình ABAY hiện có hơn 100 thành viên với 4 chi nhánh đặt
                  tại Hà Nội và TP Hồ Chí Minh. ABAY luôn tạo môi trường làm
                  việc tốt nhất để nhân viên có cơ hội thể hiện năng lực bản
                  thân. Phòng vé ABAY phục vụ hơn 1000 khách hàng mỗi ngày và
                  ABAY hiện là công ty có doanh số dẫn đầu thị trường vé máy bay
                  trực tuyến tại Việt Nam. Nhân viên ABAY không chỉ nỗ lực, cống
                  hiến hết mình trong công việc mà còn nhiệt tình tham gia các
                  hoạt động tập thể nhằm tăng tinh thần đoàn kết giữa các thành
                  viên và xây dựng văn hóa công ty ABAY vững mạnh.
                </p>
                {[
                  'gia-dinh-abay-1.JPG?v=1',
                  'gia-dinh-abay-2.JPG',
                  'gia-dinh-abay-3.JPG',
                  'gia-dinh-abay-4.JPG',
                  'gia-dinh-abay-5.JPG',
                  'gia-dinh-abay-6.JPG',
                  'gia-dinh-abay-7.JPG',
                  'gia-dinh-abay-8.JPG',
                  'gia-dinh-abay-9.JPG',
                  'gia-dinh-abay-10.JPG'
                ].map((img, index) => (
                  <p style={{ textAlign: 'center' }} key={index}>
                    <img
                      src={`https://abay.vn/_Web/_File/Images/GioithieuAbay2016/${img}`}
                      alt={`Gia Đình Abay ${index + 1}`}
                    />
                  </p>
                ))}
              </div>
            </div>
            <div className={activeTab === 3 ? 'show' : 'hide'}>
              <div id='tabs-4' className='tabContent' style={{ top: '407px' }}>
                <div className='doitac'>
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/logoSenpay.gif'
                    width='140'
                    height='70'
                    alt='Cổng Thanh toán SenPay'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/sohapay.gif'
                    width='140'
                    height='70'
                    alt='Cổng Thanh toán SohaPay'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/nganluong.gif'
                    width='140'
                    height='70'
                    alt='Cổng Thanh toán Ngân Lượng'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Noibaitaxi.gif'
                    width='140'
                    height='70'
                    alt='Nội Bài Taxi'
                  />
                </div>
                <div className='doitac2'>
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Jetstar.gif'
                    width='140'
                    height='70'
                    alt='Jetstar Pacific Airlines'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Vietjetair.gif'
                    width='140'
                    height='70'
                    alt='Vietjet Air'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/vna.gif'
                    width='140'
                    height='70'
                    alt='Vietnam Airlines'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/HuongHaiLogo.gif'
                    width='140'
                    height='70'
                    alt='Hương Hải Sealife Cruise'
                  />
                </div>
                <div className='doitac2'>
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Abacus.gif'
                    width='140'
                    height='70'
                    alt='Abacus'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/logoTransviet.gif'
                    width='140'
                    height='70'
                    alt='TRansviet'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Hongngocha.gif'
                    width='140'
                    height='70'
                    alt='Hồng Ngọc Hà'
                  />
                  <img
                    src='https://abay.vn/_WEB/_File/Images/GioiThieuAbay/Enviet.gif'
                    width='140'
                    height='70'
                    alt='Én Việt'
                  />
                </div>
                <div className='doitac2'>
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/colormedia.png'
                    width='140'
                    height='70'
                    alt='ColorMedia'
                  />
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/kosshop.jpg'
                    width='140'
                    height='70'
                    alt='KosShop'
                  />
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/ononpaylogo.png'
                    width='140'
                    height='70'
                    alt='OnOnPay'
                  />
                  <img
                    src='https://abay.vn/_Web/_File/Images/GioithieuAbay2016/vnglogo.jpg'
                    width='140'
                    height='70'
                    alt='VNG'
                  />
                </div>
                <p>
                  Trong tương lai, ngoài mảng vé máy bay, ABAY có kế hoạch mở
                  rộng ra lĩnh vực đặt tour du lịch, du thuyền, khách sạn… Vì
                  vậy ABAY luôn mong muốn có cơ hội hợp tác với các doanh nghiệp
                  quan tâm và có nhu cầu hợp tác cùng ABAY trong các lĩnh vực
                  trên.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GioiThieu
