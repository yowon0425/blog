// Profile.js - 커버 이미지 상단 위치 및 인스타 스타일 적용

import React, { useState, useEffect } from "react";
import "./Profile.css";
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';

function Profile({ showSettings }) {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [coverImage, setCoverImage] = useState("https://via.placeholder.com/600x200");
  const [nickname, setNickname] = useState("닉네임을 설정하세요");
  const [statusMessage, setStatusMessage] = useState("안녕하세요!");
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState(53);
  const [following, setFollowing] = useState(31);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchPostCount = async () => {
      if (!user) return;
      const q = query(collection(db, 'posts'), where('uid', '==', user.uid));
      const snapshot = await getDocs(q);
      setPostCount(snapshot.size);
    };
    fetchPostCount();
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.profileImage) setProfileImage(data.profileImage);
        if (data.coverImage) setCoverImage(data.coverImage);
        if (data.nickname) setNickname(data.nickname);
        if (data.statusMessage) setStatusMessage(data.statusMessage);
      }
    };
    fetchProfile();
  }, [user]);

  const openEditPopup = () => {
    const popupWindow = window.open("", "editPopup", "width=500,height=600,scrollbars=no,resizable=no");

    popupWindow.document.write(`
      <html>
        <head>
          <title>프로필 편집</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; }
            h2 { margin-top: 0; }
            input { display: block; margin-bottom: 15px; padding: 10px; width: 90%; }
            button { padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; margin-right: 10px; border-radius: 5px; }
            button.cancel { background-color: #d9534f; }
          </style>
        </head>
        <body>
          <h2>프로필 편집</h2>
          <label>프로필 이미지</label>
          <input type="file" accept="image/*" id="imageUpload" />
          <label>커버 이미지</label>
          <input type="file" accept="image/*" id="coverUpload" />
          <input type="text" id="statusMessage" placeholder="상태 메시지 입력" />
          <input type="text" id="nickname" placeholder="닉네임 입력" />
          <button onclick="saveChanges()">저장</button>
          <button class="cancel" onclick="window.close()">취소</button>
          <script>
            function saveChanges() {
              const imageUpload = document.getElementById('imageUpload');
              const coverUpload = document.getElementById('coverUpload');
              const statusMessage = document.getElementById('statusMessage').value;
              const nickname = document.getElementById('nickname').value;
              const reader1 = new FileReader();
              const reader2 = new FileReader();

              function postToParent(profileImage = null, coverImage = null) {
                window.opener.postMessage({
                  profileImage,
                  coverImage,
                  statusMessage,
                  nickname
                }, '*');
                window.close();
              }

              const img1 = imageUpload.files[0];
              const img2 = coverUpload.files[0];

              if (img1 && img2) {
                reader1.onloadend = () => {
                  reader2.onloadend = () => {
                    postToParent(reader1.result, reader2.result);
                  };
                  reader2.readAsDataURL(img2);
                };
                reader1.readAsDataURL(img1);
              } else if (img1) {
                reader1.onloadend = () => postToParent(reader1.result, null);
                reader1.readAsDataURL(img1);
              } else if (img2) {
                reader2.onloadend = () => postToParent(null, reader2.result);
                reader2.readAsDataURL(img2);
              } else {
                postToParent();
              }
            }
          </script>
        </body>
      </html>
    `);
  };

  useEffect(() => {
    const handler = async (event) => {
      const { profileImage: newImage, coverImage: newCover, statusMessage: newStatus, nickname: newNickname } = event.data;
      if (newImage) setProfileImage(newImage);
      if (newCover) setCoverImage(newCover);
      if (newStatus) setStatusMessage(newStatus);
      if (newNickname) setNickname(newNickname);

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          ...(newImage && { profileImage: newImage }),
          ...(newCover && { coverImage: newCover }),
          ...(newStatus && { statusMessage: newStatus }),
          ...(newNickname && { nickname: newNickname })
        }, { merge: true });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [user]);

  return (
    <header className="profile">
      <div className="cover-wrapper">
        <div className="cover-image" style={{ backgroundImage: `url(${coverImage})` }} />

        {showSettings && (
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <button className="gear-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)} title="프로필 옵션">
              ⚙️
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => { openEditPopup(); setIsDropdownOpen(false); }} className="dropdown-item">
                  프로필 편집
                </button>
              </div>
            )}
          </div>
        )}

        <div className="profile-container" onClick={() => setIsImageModalOpen(true)}>
          <img className="profile-avatar" src={profileImage} alt="Profile Avatar" />
          <div className="profile-info">
            <p className="nickname">👤 {nickname}</p>
            <p className="status-message">{statusMessage}</p>
            <div className="profile-stats">
              <div><strong>{postCount}</strong> 게시물</div>

            </div>
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <div className="image-modal" onClick={() => setIsImageModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsImageModalOpen(false)}>
              닫기
            </button>
            <img className="modal-image" src={profileImage} alt="Profile Avatar Enlarged" />
          </div>
        </div>
      )}
    </header>
  );
}

export default Profile;