import "../assets/css/DoubleRoomPage.css";

const hotels = [
    // Standard rooms
    {
      name: "Standard Room 1",
      location: "Hà Nội, Việt Nam",
      price: "1,000,000 VND/đêm",
      rating: 4.5,
      reviews: 100,
      image: "https://vanangroup.com.vn/wp-content/uploads/2024/05/Phong-ngu-hai-giuong-don-noi-that-khach-san-4-sao-3.jpg",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 2",
      location: "Đà Nẵng, Việt Nam",
      price: "1,100,000 VND/đêm",
      rating: 4.0,
      reviews: 50,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS28jsAXQmxi3osP-1glaDn6Zta_U7dBgdb2g&s",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 3",
      location: "TP. Hồ Chí Minh, Việt Nam",
      price: "1,200,000 VND/đêm",
      rating: 4.3,
      reviews: 80,
      image: "https://noithatmyhouse.net/wp-content/uploads/2020/07/phong-doi-5.jpg",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 4",
      location: "Cần Thơ, Việt Nam",
      price: "1,150,000 VND/đêm",
      rating: 4.2,
      reviews: 60,
      image: "https://noithathacuong.vn/vnt_upload/advisory/05_2023/04/1.jpg",
      type: "Standard",
      available: 8,  // Available rooms
    },
    {
      name: "Standard Room 5",
      location: "Hải Phòng, Việt Nam",
      price: "1,250,000 VND/đêm",
      rating: 4.4,
      reviews: 120,
      image: "https://noithatmanhhe.vn/media/31979/thiet-ke-noi-that-phong-ngu-02-1.jpg",
      type: "Standard",
      available: 15,  // Available rooms
    },
    {
      name: "Standard Room 6",
      location: "Vũng Tàu, Việt Nam",
      price: "1,000,000 VND/đêm",
      rating: 4.5,
      reviews: 100,
      image: "https://vinapad.com/wp-content/uploads/2020/11/double-bed-la-gi.jpg",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 7",
      location: "Quảng Ninh, Việt Nam",
      price: "1,100,000 VND/đêm",
      rating: 4.0,
      reviews: 50,
      image: "https://dyf.vn/wp-content/uploads/2021/10/phong-double-la-gi.jpg",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 8",
      location: "Bình Dương, Việt Nam",
      price: "1,200,000 VND/đêm",
      rating: 4.3,
      reviews: 80,
      image: "https://thing.vn/wp-content/uploads/2020/10/phong-twin-4.jpg",
      type: "Standard",
      available: 10,  // Available rooms
    },
    {
      name: "Standard Room 9",
      location: "Bình Dương, Việt Nam",
      price: "1,300,000 VND/đêm",
      rating: 4.3,
      reviews: 80,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41D11azH-cy7UwIbtqvH4FW-7dhz7XV796g&s",
      type: "Standard",
      available: 10,  // Available rooms
    },
    // VIP rooms
    {
      name: "VIP Room 1",
      location: "Hà Nội, Việt Nam",
      price: "2,000,000 VND/đêm",
      rating: 5.0,
      reviews: 150,
      image: "https://bathatresort.vn/wp-content/uploads/2019/11/z4116978505071_8b7f6ac9640091cc3aa429e3b28ba0c2.jpg",
      type: "VIP",
      available: 5,  // Available rooms
    },
    {
      name: "VIP Room 2",
      location: "Đà Nẵng, Việt Nam",
      price: "2,500,000 VND/đêm",
      rating: 4.8,
      reviews: 120,
      image: "https://mailamhotel.com/images/product/goc/goc_1615395639.jpg",
      type: "VIP",
      available: 5,  // Available rooms
    },
    {
      name: "VIP Room 3",
      location: "TP. Hồ Chí Minh, Việt Nam",
      price: "2,200,000 VND/đêm",
      rating: 4.6,
      reviews: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4QKUYocyFklEeX50QZrf3pGLAvIbh80JsQ&s",
      type: "VIP",
      available: 4,  // Available rooms
    },
    {
      name: "VIP Room 4",
      location: "Cần Thơ, Việt Nam",
      price: "2,400,000 VND/đêm",
      rating: 4.7,
      reviews: 110,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_WsBRlUBJd7FbrVXwCWvBOCzCRLTLrkwgdA&s",
      type: "VIP",
      available: 6,  // Available rooms
    },
    // New VIP rooms added
    {
      name: "VIP Room 5",
      location: "Sài Gòn, Việt Nam",
      price: "2,600,000 VND/đêm",
      rating: 4.9,
      reviews: 130,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PguqF1aK5ZD3FFXqa0h6wvVSQre3imYbNA&s",
      type: "VIP",
      available: 3,  // Available rooms
    },
    {
      name: "VIP Room 6",
      location: "Hà Nội, Việt Nam",
      price: "2,700,000 VND/đêm",
      rating: 5.0,
      reviews: 140,
      image: "https://image.taiwantravelmap.com/booking/companyImages/708/201812101600533816.jpg",
      type: "VIP",
      available: 4,  // Available rooms
    },
    {
      name: "VIP Room 7",
      location: "Đà Lạt, Việt Nam",
      price: "2,300,000 VND/đêm",
      rating: 4.8,
      reviews: 115,
      image: "https://tourdanangcity.vn/wp-content/uploads/2023/05/khach-san-5-sao-da-nang-12.jpg",
      type: "VIP",
      available: 5,  // Available rooms
    },
    {
      name: "VIP Room 8",
      location: "Nha Trang, Việt Nam",
      price: "2,400,000 VND/đêm",
      rating: 4.9,
      reviews: 125,
      image: "https://duthuyenhalonglanha.com/wp-content/uploads/2022/10/Vip.jpg",
      type: "VIP",
      available: 3,  // Available rooms
    },
    {
      name: "VIP Room 9",
      location: "Nha Trang, Việt Nam",
      price: "2,400,000 VND/đêm",
      rating: 4.9,
      reviews: 125,
      image: "https://bobhotel.com.vn/upload/filemanage/B.O.B%20SIGNATURE%20-%20Vip%20Room-cao-lanh_3.jpg",
      type: "VIP",
      available: 3,  // Available rooms
    },
    // Presidential rooms
    {
      name: "Presidential Suite 1",
      location: "Sài Gòn, Việt Nam",
      price: "5,000,000 VND/đêm",
      rating: 5.0,
      reviews: 200,
      image: "https://bwpremiermarvella.com/storage/web-photo/accommodations-1/president-suite/r5-9642-copy.jpg",
      type: "Presidential",
      available: 1,  // Available rooms
    },
    {
      name: "Presidential Suite 2",
      location: "Hà Nội, Việt Nam",
      price: "6,000,000 VND/đêm",
      rating: 5.0,
      reviews: 250,
      image: "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/suite/presidentialsuite/180712-30-2000-acc-hanoi-hotel.jpg.thumb.1920.1920.jpg",
      type: "Presidential",
      available: 1,  // Available rooms
    },
    {
      name: "Presidential Suite 3",
      location: "Quảng Ninh, Việt Nam",
      price: "5,500,000 VND/đêm",
      rating: 5.0,
      reviews: 230,
      image: "https://tripzone.vn/uploads/202104/13/02/140041-agoda---ph-ng-presidential-suite.png",
      type: "Presidential",
      available: 1,  // Available rooms
    },
    {
      name: "Presidential Suite 4",
      location: "Sài Gòn, Việt Nam",
      price: "6,200,000 VND/đêm",
      rating: 5.0,
      reviews: 270,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXET8KzpsHuBSb9JUvibOP_ScE9TRzZRNs_HVTPOhGTu8rpeio21ZnOZS6Q5IqW4JQ4k&usqp=CAU",
      type: "Presidential",
      available: 1,  // Available rooms
    },
    {
      name: "Presidential Suite 3",
      location: "Quảng Ninh, Việt Nam",
      price: "5,500,000 VND/đêm",
      rating: 5.0,
      reviews: 230,
      image: "https://potiquehotel.com/uploads/files/2022/10/12/potique-hotel-nha-trang-presidential-suite-2.jpg",
      type: "Presidential",
      available: 1,  // Available rooms
    },
    {
      name: "Presidential Suite 4",
      location: "Sài Gòn, Việt Nam",
      price: "6,200,000 VND/đêm",
      rating: 5.0,
      reviews: 270,
      image: "https://vanangroup.com.vn/wp-content/uploads/2024/05/Phong-President-Suite-luon-duoc-thiet-ke-voi-day-du-cong-nang.jpg",
      type: "Presidential",
      available: 1,  // Available rooms
    },
  ];

export default hotels;
