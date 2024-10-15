import React, { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

const qualificationOptions = {
  고등학생: "JA1000",
  대학생: "JA2000",
  일반: "JA3000",
  중학생: "JA4000",
  다문화가족: "JA5000",
  예비창업자: "JA6000",
  "한부모가정/조손가정": "JA7000",
  해당사항없음: "JA8000",
};

function Mypage() {
  const [keywords, setKeywords] = useState(["저소득"]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [selectedQualification, setSelectedQualification] =
    useState("고등학생");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "고등학생",
    "저소득",
    "예비창업자",
  ]);

  const handleKeywordChange = (e) => {
    setInputKeyword(e.target.value);
  };

  const addKeyword = (e) => {
    if (e.key === "Enter" && inputKeyword.trim() !== "") {
      setKeywords([...keywords, inputKeyword.trim()]);
      setInputKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
    setIsDropdownOpen(false);
  };

  const handleSave = () => {
    // 여기에 저장 로직을 구현합니다.
    console.log("저장된 키워드:", keywords);
    console.log(
      "저장된 자격요건:",
      selectedOptions.map((option) => ({
        [option]: qualificationOptions[option],
      }))
    );
  };

  return (
    <div className="p-6 bg-white max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4H20L12 12L4 4Z" fill="currentColor" />
            <path d="M20 20H4L12 12L20 20Z" fill="currentColor" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold">이주안 (me@juany.kr)</h2>
        </div>
      </div>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">나의 키워드</h3>
        <div className="relative">
          <div className="flex items-center border rounded-md">
            <Search className="text-gray-400 ml-2" size={20} />
            <input
              type="text"
              value={inputKeyword}
              onChange={handleKeywordChange}
              onKeyPress={addKeyword}
              placeholder="키워드"
              className="w-full p-2 outline-none"
            />
            {inputKeyword && (
              <button onClick={() => setInputKeyword("")} className="mr-2">
                <X size={20} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">나의 자격요건</h3>
        <div className="relative mb-4">
          <button
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between border border-red-500 rounded-md p-2 bg-white"
          >
            <span>{selectedQualification}</span>
            <ChevronDown
              size={20}
              className={`text-red-500 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-red-50 border border-red-100 rounded-md shadow-lg z-10">
              {Object.keys(qualificationOptions).map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-700"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-pink-500">
            활성화된 지역
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <span
                key={option}
                className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {option}
                <button
                  onClick={() => toggleOption(option)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        저장
      </button>
    </div>
  );
}

export default Mypage;
