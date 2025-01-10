"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savings = exports.subscriptions = exports.budget = exports.reportData = exports.transactions = exports.navigationLinks = void 0;

var _images = require("../../../utils/images");

var navigationLinks = [{
  id: 1,
  title: 'Home',
  image: _images.iconsImgs.home,
  link: '/'
}, {
  id: 2,
  title: 'Hãng máy bay',
  image: _images.iconsImgs.maybay,
  link: '/hangmaybay'
}, {
  id: 3,
  title: 'Thành phố',
  image: _images.iconsImgs.city,
  link: '/vung'
}, {
  id: 4,
  title: 'Phần trăm',
  image: _images.iconsImgs.phantram,
  link: '/phantram'
}, {
  id: 5,
  title: 'Blog',
  image: _images.iconsImgs.blog,
  link: '/theloaiblog'
}, {
  id: 6,
  title: 'Ngân Hàng',
  image: _images.iconsImgs.bank,
  link: '/nganhang'
}, {
  id: 7,
  title: 'Hóa đơn',
  image: _images.iconsImgs.report,
  link: '/hoadon'
}, {
  id: 8,
  title: 'Voucher',
  image: _images.iconsImgs.voucher,
  link: '/voucher'
}];
exports.navigationLinks = navigationLinks;
var transactions = [{
  id: 11,
  name: 'Sarah Parker',
  image: _images.personsImgs.person_four,
  date: '23/12/04',
  amount: 22000
}, {
  id: 12,
  name: 'Krisitine Carter',
  image: _images.personsImgs.person_three,
  date: '23/07/21',
  amount: 20000
}, {
  id: 13,
  name: 'Irene Doe',
  image: _images.personsImgs.person_two,
  date: '23/08/25',
  amount: 30000
}];
exports.transactions = transactions;
var reportData = [{
  id: 14,
  month: 'Jan',
  value1: 45,
  value2: null
}, {
  id: 15,
  month: 'Feb',
  value1: 45,
  value2: 60
}, {
  id: 16,
  month: 'Mar',
  value1: 45,
  value2: null
}, {
  id: 17,
  month: 'Apr',
  value1: 45,
  value2: null
}, {
  id: 18,
  month: 'May',
  value1: 45,
  value2: null
}];
exports.reportData = reportData;
var budget = [{
  id: 19,
  title: 'Subscriptions',
  type: 'Automated',
  amount: 22000
}, {
  id: 20,
  title: 'Loan Payment',
  type: 'Automated',
  amount: 16000
}, {
  id: 21,
  title: 'Foodstuff',
  type: 'Automated',
  amount: 20000
}, {
  id: 22,
  title: 'Subscriptions',
  type: null,
  amount: 10000
}, {
  id: 23,
  title: 'Subscriptions',
  type: null,
  amount: 40000
}];
exports.budget = budget;
var subscriptions = [{
  id: 24,
  title: 'LinkedIn',
  due_date: '23/12/04',
  amount: 20000
}, {
  id: 25,
  title: 'Netflix',
  due_date: '23/12/10',
  amount: 5000
}, {
  id: 26,
  title: 'DSTV',
  due_date: '23/12/22',
  amount: 2000
}];
exports.subscriptions = subscriptions;
var savings = [{
  id: 27,
  image: _images.personsImgs.person_one,
  saving_amount: 250000,
  title: 'Pay kid bro’s fees',
  date_taken: '23/12/22',
  amount_left: 40000
}];
exports.savings = savings;