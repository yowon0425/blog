//profile.js
import React, { useState } from "react";
import "./Profile.css";

function Profile({ initialImage, initialStatus, showSettings }) {
  const [profileImage, setProfileImage] = useState(initialImage || "https://via.placeholder.com/100");
  const [statusMessage, setStatusMessage] = useState(initialStatus || "안녕하세요!");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditPopup = () => {
    const popupWindow = window.open(
      "",
      "editPopup",
      "width=500,height=500,scrollbars=no,resizable=no"
    );

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
          <input type="file" accept="image/*" id="imageUpload" />
          <input type="text" id="statusMessage" placeholder="상태 메시지 입력" />
          <button onclick="saveChanges()">저장</button>
          <button class="cancel" onclick="window.close()">취소</button>
          <script>
            function saveChanges() {
              const imageUpload = document.getElementById('imageUpload');
              const statusMessage = document.getElementById('statusMessage');
              const reader = new FileReader();
              reader.onloadend = () => {
                window.opener.postMessage({
                  profileImage: reader.result,
                  statusMessage: statusMessage.value
                }, '*');
                window.close();
              };
              if (imageUpload.files[0]) {
                reader.readAsDataURL(imageUpload.files[0]);
              } else {
                window.opener.postMessage({
                  statusMessage: statusMessage.value
                }, '*');
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `);
  };

  window.addEventListener("message", (event) => {
    const { profileImage: newProfileImage, statusMessage: newStatusMessage } = event.data;
    if (newProfileImage) setProfileImage(newProfileImage);
    if (newStatusMessage) setStatusMessage(newStatusMessage);
  });

  return (
    <header className="profile">
      {/* 설정 옵션은 showSettings가 true일 때만 표시 */}
      {showSettings && (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <button
            className="gear-icon"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="프로필 옵션"
          >
            ⚙️
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu" style={{ position: "absolute", top: "30px", right: "0px", background: "#fff", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
              <button
                onClick={() => {
                  openEditPopup();
                  setIsDropdownOpen(false);
                }}
                className="dropdown-item"
              >
                프로필 편집
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className="profile-container"
        onClick={() => setIsImageModalOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
        <img className="profile-avatar" src={profileImage} alt="Profile Avatar" />
        <p className="status-message">{statusMessage}</p>
      </div>

      {isImageModalOpen && (
        <div
          className="image-modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            style={{ position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-btn"
              onClick={() => setIsImageModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
            <img
              className="modal-image"
              src={profileImage}
              alt="Profile Avatar Enlarged"
              style={{ maxWidth: "80%", maxHeight: "80%" }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Profile;
