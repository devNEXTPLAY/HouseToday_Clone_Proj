import { useState } from "react";

const HashtagForm = ({ userValues, onUserValues }) => {
  const [hashtagValeue, setHashTagValue] = useState("");

  // 해시태그 입력
  const handleChangeHashTagValue = event => setHashTagValue(event.target.value);

  // 해시태그 추가
  const handleAddHashTag = event => {
    // 중복 방지
    const duplicateHashtag = userValues.hashtags.includes(hashtagValeue);

    if (duplicateHashtag) {
      return;
    }

    if (event.key === "Enter" && hashtagValeue.length > 1) {
      onUserValues(prevValues => {
        const updateHashtags = [...prevValues.hashtags, hashtagValeue];
        return {
          ...prevValues,
          hashtags: updateHashtags,
        };
      });

      setHashTagValue("");
    }
  };

  // 해시태그 삭제
  const handleRemoveHashTag = hashtagKey => {
    onUserValues(prevValues => {
      return {
        ...prevValues,
        hashtags: prevValues.hashtags.filter(tag => tag !== hashtagKey),
      };
    });
  };

  return (
    <>
      {userValues.hashtags.length > 0 && (
        <ul className="hashtag-list">
          {userValues.hashtags.map(tag => {
            return (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => handleRemoveHashTag(tag)}
                >{`# ${tag}`}</button>
              </li>
            );
          })}
        </ul>
      )}

      {userValues.hashtags.length < 3 && (
        <input
          type="text"
          id="hashtag"
          placeholder="태그를 입력하세요."
          value={hashtagValeue}
          onChange={handleChangeHashTagValue}
          onKeyDown={handleAddHashTag}
        />
      )}
    </>
  );
};

export default HashtagForm;
