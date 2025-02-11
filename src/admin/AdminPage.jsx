import React from "react";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <span className="admin-title">관리자 페이지</span>
        <input type="text" placeholder="검색" className="admin-search" />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>닉네임</th>
            <th>이름</th>
            <th>계정</th>
            <th>회원 유형</th>
            <th>가입일</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>충동구매</td>
            <td>홍길동</td>
            <td>ada@naver.com</td>
            <td>일반 회원</td>
            <td>2025-02-11</td>
            <td>
              <button className="edit-btn">수정</button>
            </td>
            <td>
              <button className="delete-btn">삭제</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>다나와</td>
            <td>홍길동</td>
            <td>ada@naver.com</td>
            <td>사업자</td>
            <td>2025-02-11</td>
            <td>
              <button className="edit-btn">수정</button>
            </td>
            <td>
              <button className="delete-btn">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
