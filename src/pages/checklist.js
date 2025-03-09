import { useState, useEffect } from "react";

const initialChecklist = [
  "Github에 위클리 미션 PR을 만들어 주세요.",
  "React 혹은 Next.js를 사용해 진행합니다.",
  "프론트엔드에서 API 요청 구현은 TanStack React Query를 활용해 주세요.",
  "API는 https://panda-market-api.vercel.app를 사용합니다.",
  "로그인 페이지에서 '회원 가입하기'를 클릭하면 회원가입 페이지로 이동해 주세요.",
  "로그인 실패 시, 이메일/비밀번호 input 아래에 '이메일을 확인해 주세요.' 또는 '비밀번호를 확인해 주세요.' 에러 메시지를 표시해 주세요.",
  "로그인 버튼 클릭 또는 Enter키 입력 시 로그인 실행됩니다.",
  "로그인 성공 시 '/items' 페이지로 리디렉션합니다.",
  "/auth/signIn으로 POST 요청 후, 성공 응답을 받으면 중고 마켓 페이지로 이동합니다. (JWT로 구현)",
  "로그인 실패 시, 실패 메시지를 모달을 통해 표시합니다.",
  "회원가입 페이지에서 '회원 가입하기'를 클릭하면 '/signin' 페이지로 이동합니다.",
  "회원가입 버튼 클릭 또는 Enter키 입력 시 회원가입이 실행됩니다.",
  "비밀번호 input과 비밀번호 확인 input의 값이 다를 경우, '비밀번호가 일치하지 않아요.' 에러 메시지를 표시해 주세요.",
  "회원가입 성공 시 '/items' 페이지로 리디렉션합니다.",
  "회원가입 실패 시, 실패 메시지를 모달을 통해 표시합니다.",
  "비밀번호 가리기/보이기 아이콘 기능을 구현합니다. 아이콘 클릭 시 비밀번호 문자열의 보임/숨김을 전환합니다.",
  "소셜 로그인 버튼을 클릭 시, 구글은 'https://www.google.com', 카카오는 'https://www.kakaocorp.com/page'로 이동합니다.",
  "로그인/회원가입 성공 후 받은 accessToken을 로컬 스토리지에 저장합니다.",
  "로그인/회원가입 페이지에 접근 시, 로컬 스토리지에 accessToken이 있다면 '/items' 페이지로 자동 리디렉션됩니다.",
  "상단 내비게이션 바에서 인가된 경우 유저 정보를 표시합니다. 인가되지 않았을 경우 '로그인' 버튼이 보입니다.",
  "상품 상세 페이지는 PC, Tablet, Mobile 디자인에 맞게 구현합니다.",
  "상품 상세 페이지 URL 경로는 '/items/{itemId}'로 설정합니다.",
  "상품 상세 조회는 인가된 사용자만 접근할 수 있도록 구현합니다. 인가되지 않은 경우 접근이 제한됩니다.",
  "상품 수정 및 삭제 기능을 구현하며, 인가된 사용자만 사용할 수 있도록 합니다. 수정은 '/products/{productId}' PATCH, 삭제는 '/products/{productId}' DELETE 요청을 사용합니다.",
  "상품 삭제 전, 확인 모달을 띄워 사용자의 동의를 받도록 합니다.",
  "상품에 대한 좋아요 및 좋아요 취소 기능을 '/products/{productId}/favorite' POST & DELETE 요청을 통해 구현합니다.",
  "댓글 생성, 수정, 삭제 기능을 API를 활용하여 구현하며, 인가된 사용자만 이용할 수 있습니다. 댓글 수정은 '/comments/{commentId}' PATCH, 삭제는 '/comments/{commentId}' DELETE 요청을 사용합니다.",
  "React Hook Form을 활용하여 로그인 및 회원가입 페이지를 구현합니다.",
  "반응형 디자인을 적용하여 PC(1200px 이상), Tablet(744px ~ 1199px), Mobile(375px ~ 743px)로 분기합니다.",
  "Axios Interceptors를 활용하여 인증 토큰을 리퀘스트 헤더에 자동으로 첨부합니다.",
  "기존 fetch 또는 axios로 구현된 API 요청을 React Query로 마이그레이션합니다.",
  "로딩 인디케이터와 에러 메시지를 구현하여 사용자가 데이터 로딩 중 및 오류 상황을 인지할 수 있도록 합니다.",
  "상품 목록 및 상품 상세 데이터를 Prefetching하여 데이터 로딩 성능을 향상시킵니다.",
  "React Query의 캐싱 기능을 활용하여 데이터 로딩 시간을 최소화하고 불필요한 API 호출을 방지합니다.",
  "상품 목록 페이지에서 데이터 실시간 업데이트를 위해 React Query의 Query Refresh 설정을 적용합니다.",
];

export default function Checklist() {
  const [checklistItems, setChecklistItems] = useState(initialChecklist);
  const [checkedItems, setCheckedItems] = useState({});
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const savedChecklist = JSON.parse(localStorage.getItem("checklistItems"));
    const savedChecks = JSON.parse(localStorage.getItem("checkedItems")) || {};

    if (savedChecklist) setChecklistItems(savedChecklist);
    setCheckedItems(savedChecks);
  }, []);

  useEffect(() => {
    localStorage.setItem("checklistItems", JSON.stringify(checklistItems));
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checklistItems, checkedItems]);

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addNewItem = () => {
    if (newItem.trim() === "") return;
    setChecklistItems((prev) => [...prev, newItem]);
    setNewItem("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📌 미션9 체크리스트</h1>

      {/* 체크리스트 추가 UI */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 체크리스트 항목 입력"
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={addNewItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          추가
        </button>
      </div>

      {/* 체크리스트 목록 */}
      <ul className="space-y-2">
        {checklistItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedItems[index] || false}
              onChange={() => toggleCheck(index)}
              className="w-5 h-5 cursor-pointer"
            />
            <span
              className={
                checkedItems[index] ? "line-through text-gray-400" : ""
              }
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
