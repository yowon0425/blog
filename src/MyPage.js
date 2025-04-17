import React, { useState } from "react"; // useState 추가
import Profile from "./Profile"; // Profile 컴포넌트 가져오기
import "./MyPage.css";


function MyPage() {
  const [birthDate, setBirthDate] = useState("");
  const [fortune, setFortune] = useState("");
  const [animalSign, setAnimalSign] = useState("");

  const handleCheckFortune = () => {
    if (!birthDate) {
      setFortune("생년월일을 입력해주세요.");
      return;
    }

    // 생년월일을 바탕으로 띠 계산
    const year = new Date(birthDate).getFullYear();
    const animalSigns = [
      "쥐",
      "소",
      "호랑이",
      "토끼",
      "용",
      "뱀",
      "말",
      "양",
      "원숭이",
      "닭",
      "개",
      "돼지",
    ];
    const signIndex = (year - 4) % 12; // 띠 계산 공식
    const sign = animalSigns[signIndex];
    setAnimalSign(sign);

    // 띠별 운세 제공
    const fortunesBySign = {
      쥐: "지혜를 발휘하여 큰 성공을 이룰 수 있는 날입니다.",
      소: "끈기와 인내로 어려움을 극복할 수 있습니다.",
      호랑이: "모험을 통해 새로운 기회를 발견할 수 있는 하루입니다.",
      토끼: "평온하고 안정된 하루를 기대해도 좋습니다.",
      용: "강한 의지와 리더십으로 주목받는 날입니다.",
      뱀: "창의적인 아이디어가 성공을 이끄는 하루입니다.",
      말: "에너지가 넘치는 하루로 활발히 움직여보세요.",
      양: "주변 사람들과 협력하여 좋은 결과를 얻을 수 있습니다.",
      원숭이: "유머와 재치가 돋보이는 하루입니다.",
      닭: "성실한 노력으로 원하는 결과를 얻을 수 있습니다.",
      개: "믿음직한 모습을 통해 신뢰를 얻는 하루입니다.",
      돼지: "풍요와 행운이 가득한 하루입니다.",
    };

    setFortune(fortunesBySign[sign]);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* 헤더 섹션 */}
      <header style={{ marginBottom: "20px" }}>
        <Profile
          initialImage="https://via.placeholder.com/100"
          initialStatus="여기를 클릭하여 내 프로필을 확인하세요!"
          showSettings={true} // 마이페이지에서는 설정 버튼 표시
        />
      </header>

      {/* 띠별 운세 섹션 */}
      <main>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>띠별 운세</h1>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          생년월일을 입력하고 자신의 띠와 오늘의 운세를 확인해보세요!
        </p>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={{ padding: "10px", marginBottom: "10px", fontSize: "1rem" }}
        />
        <button
          onClick={handleCheckFortune}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          운세 확인
        </button>
        {animalSign && (
          <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#333" }}>
            <strong>띠:</strong> {animalSign}
          </p>
        )}
        {fortune && (
          <p style={{ marginTop: "10px", fontSize: "1.2rem", color: "#333" }}>
            <strong>운세 결과:</strong> {fortune}
          </p>
        )}
      </main>
    </div>
  );
}

export default MyPage;
