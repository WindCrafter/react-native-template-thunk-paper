# react-native-template-thunk-paper
 
# Cấu trúc thư mục

* script: Các script hỗ trợ tác vụ như log, đổi tên dự án, tạo logo, v.v...
* src: Mã nguồn chính
  * assets: Chứa các file tĩnh từ ảnh, video, âm thanh, lottie, v.v...
  * components: Nơi chứa các components dùng chung cho toàn bộ dự án
  * configs: Nơi cài đặt các cấu hình liên quan đến store, api, v.v...
  * constants: Chứa các hằng số, giá trị cố định phục vụ các phần nh logic, giao diện, ngôn ngữ, v.v..
  * helpers: Các hàm hỗ trợ được xây dựng và tích lũy trong quá trình phát triển
  * navigation: Nơi móc nối các màn hình
  * screens: Nơi viết các màn hình
  * store: Nơi chứa global state dự án và các hàm thunk
  * services: Các async function phụ trợ không làm việc trực tiếp vơ store như thunk function
  * models: Định nghĩa các đối tượng để... bạn biết rồi đấy


# Hướng dẫn sử dụng dành cho người lười

# Giới thiệu các hàm hỗ trợ

## Các hooks
`src/helpers/hooks`

### useSystem
Hook này dùng để lấy các thông tin quan trọng của hệ thống, cho phép nhận vào một stylesheet và trả về một stylesheet mới được áp dụng theme hiện tại  
