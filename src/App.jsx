import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./component/main/Navbar";
import MainPage from "./component/main/MainPage";
import Login from "./component/user/Login";
import Signup from "./component/user/Signup";
import ProductsPage from "./component/products/ProductsPage";
import DetailProduct from "./component/product/DetailProduct";
import Mypage from "./component/user/Mypage";
import CartPage from "./component/user/CartPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./component/user/PrivateRoute";
import ProductRegister from "./component/product/ProductRegister";
import NoticeWrite from "./component/main/NoticeWrite";
import OrderHistory from "./component/user/OrderHistory";
import ReviewRegister from "./component/user/ReviewRegister";
import ReviewPage from "./component/user/ReviewPage";
import UserPage from "./component/user/UserPage";
import UserBoard from "./component/user/UserBoard";
import Wishlist from "./component/products/Wishlist";
import NoticeBoard from "./component/main/NoticeBoard";
import Chat from "./component/chat/Chat";
import ChatRoomList from "./component/chat/ChatRoomList";

// 해야할 일 : 주문내역, 리뷰
// userBoard, ReviewRegister, ReviewPage(임시값), orderHistory(임시값), mypage, NoticeWrite  주석 지우기
// App.jsx에 <Route path="/notice-write" element={<NoticeWrite />} /> 2개 있던데 하나 지워주세요
// App.jsx에 <Route path="/*" 이렇게 작성되어 있던 보더 있던데 그거 쓰면 모든 페이지넘기는곳 아직 설정안된부분은 거기로 넘어가는데 지워주세요.(없을수도 있음)
// CartPage.jsx, AdminPage.jsx는 뭐죠?? 안쓰면 삭제해주세요. css도 삭제해주세요.
// 관리자가 회원관리 할건지

// 나희님이 주신 테이블 쿼리문 알집으로 준거 풀고 임포트(그걸로 설정할시 바로 카톡창위 쿼리 4개는 안써도 됨) 시키니 chatRoomData.user2.userId의 아이디랑 chatRoomData.user1.userId 서로 변경되서 나오더라고요. 만약 다른 두분이 그걸로 쿼리문 작성하고 있으면
// 상품 올린사람이랑 상품구매할사람 거꾸로 출력이 될겁니다. 그러니 그거도 모든 컴퓨터에 맞춰서 설정해야하니 모든 자리마다 확인 부탁드릴게요.

// 상품을 삭제 시켰을때 채팅방의 목록에 사진을 불러올수 없어 임시로 라이언 사진으로 변경 되도록 설정해놨습니다. 좋은 이미지 있으면 그걸로 나중에 변경 부탁드릴게요.(public 폴더내 이미지 추가하고 src에 넣기만 하면됨)
// 상품을 삭제 시켰을때 입장이 불가능하도록 막아놨는데 다른 방법 있으시면 그걸로 변경하여도 됩니다.
// 백엔드 컨트롤러,서비스 같은경우 각자 맡은 건 다른 사람이 알아보도록 주석으로 뭔지 남겨주세요.... 뭐가 뭔지 모르겠어서 뭘 써야할지 잘 모르겠네요
// 프론트 모든 상품 페이지 들어갔을때 헤더 영역 전체 카테고리 클릭시 고정이 되어있음 다른 페이지로 넘기지 않으면 계속 안사라짐(이걸 수정하든 아니면 그냥 마우스 올릴때만 나타나게 변경하든 의논)
// 백엔드 찜(favorite), 상품구매(purchase) 엔티티 JoinColumn은 외래키인데 기본키에 외래키로 줬던데 이유 있어요? 혹시나 이유 있을까봐 일단 건드리지 않았습니다.
// purchase컨트롤러는 구매에 관한 내용인데 68번째줄 찜 목록으로 작성했던데???
// purchase컨트롤러 이상해서 일단은 구매완료 메서드는 chat컨트롤러에 작성해뒀으니 나중에 옮기면 될듯요
// 구매완료시 모든 곳은 정상적으로 다 나오는데 상품 리스트부분의 이미지가 이상함 이건 다시 체크해봐야할듯
// 개인적으로 메시지가 지금 안읽은게 있으면 우리 카톡처럼 안읽은 메시지 개수가 나오도록 하고싶은데...
// !!!!!!!!!!!!!!     나희님! 지금 나희님 자리나 제자리에 user1,user2순서가 제 집이랑 달라서 판매완료 체크하면 반대가 될수도 있으니 그점 참조 해주세요.
function App({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // 로컬 데이터 지우기
  // localStorage.clear();

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // 수정상품
  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.product_id === updatedProduct.product_id
        ? updatedProduct
        : product
    );

    setProducts(updatedProducts);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* 메인 화면 */}
        <Route
          path="/"
          element={<MainPage user={user} products={products} />}
        />
        {/* 로그인 */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* 회원가입 */}
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* 상품 등록 */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <ProductRegister addProduct={addProduct} />
            </PrivateRoute>
          }
        />

        {/* 상품 수정 */}
        <Route
          path="/edit-product"
          element={
            <PrivateRoute user={user}>
              <ProductRegister
                addProduct={addProduct}
                updateProduct={updateProduct}
                products={products}
              />
            </PrivateRoute>
          }
        />

        {/* 접속중인 마이페이지 */}
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <Mypage user={user} setUser={setUser} products={products} />
            </PrivateRoute>
          }
        />

        {/* 접속중인 유저의 전체 메시지함 */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoomList />
            </PrivateRoute>
          }
        />

        {/* 채팅방 */}
        <Route
          path="/chat/:chatRoomId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        {/* 전체상품 */}
        <Route
          path="/product"
          element={<ProductsPage products={products} user={user} />}
        />

        {/* 상품 디테일 */}
        <Route
          path="/product/:product_id"
          element={
            <DetailProduct
              user={user}
              products={products}
              setProducts={setProducts}
              updateProduct={updateProduct}
            />
          }
        />

        {/* 판매자 페이지 */}
        <Route
          path="/user-board/:user_id"
          element={<UserBoard user={user} products={products} />}
        />

        {/* 회원 수정 */}
        <Route
          path="/user-page/:user_id"
          element={<UserPage user={user} products={products} />}
        />

        {/* 회원 수정 */}
        <Route path="/edit-user" element={<Signup setUser={setUser} />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute user={user}>
              <CartPage user={user} />
            </PrivateRoute>
          }
        />

        {/* 전체 공지 */}
        <Route path="/notice-board" element={<NoticeBoard />} />

        {/* 공지 작성 */}
        <Route path="/notice-write" element={<NoticeWrite />} />
        <Route path="/notice-write" element={<NoticeWrite />} />

        {/* 주문 내역 */}
        <Route path="/orderhistory" element={<OrderHistory />} />

        {/* 리뷰 등록 */}
        <Route path="/add-review" element={<ReviewRegister />} />

        {/* 전체 리뷰 */}
        <Route path="/review" element={<ReviewPage />} />

        {/* 찜한 상품 */}
        <Route
          path="/wishlist"
          element={<Wishlist user={user} products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
