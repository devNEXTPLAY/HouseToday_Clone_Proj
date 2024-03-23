import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Guide = () => {
  const [isGuide, setIsGuide] = useState(false);
  const handleGuide = () => setIsGuide(prevState => !prevState);

  return (
    <section className="guide">
      <button className="guide__button" onClick={handleGuide}>
        <div className="button__inner-text">
          <strong>집들이 작성 가이드</strong>
          <span>원할한 집들이 발행을 위해 꼭 읽어주세요.</span>
        </div>

        <span className={isGuide ? "rotate180" : "button__inner-icon"}>
          <IoIosArrowDown />
        </span>
      </button>

      <ul className={isGuide ? "open" : "close"}>
        <li>
          에디터 컨택 없이 집들이를 작성하는 경우,
          <strong>집들이 피드나 홈에서는 공개되지 않을 수 있습니다.</strong>
        </li>
        <li>
          에디터의 제안으로 작성한 글이나, 내부에서 선정한 글만 피드나 홈을 통해
          노출되며, 선정 여부는 <strong>14일 이내에 댓글</strong>로
          안내드립니다. <strong>선정 기준은 공개하지 않습니다.</strong>
        </li>
        <li>
          집들이 작성 관련 가이드는 아래 링크를 참고해 주세요.
          <ul>
            <li>
              원룸·오피스텔·방을 소개하는 경우 <Link>바로가기</Link>
            </li>
            <li>
              아파트·빌라·주택 전체를 소개하는 경우 <Link>바로가기</Link>
            </li>
          </ul>
        </li>
        <li>
          사진 속 제품 정보는 [태그] 기능을 이용해 등록해 주세요.
          <ul>
            <li>제품 정보 등록 가이드 (바로가기)</li>
          </ul>
        </li>
        <li>
          사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, jpg, png,
          webp, heif, heic, gif 포맷을 지원합니다.
        </li>
        <li>
          글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해
          주세요.
        </li>
        <li>
          온라인 집들이는 작성해주신 초안을 바탕으로 내부 에디터의 편집과 검수,
          태그 작업을 거쳐서 발행되고 있습니다. 이에 따라 커버사진과 제목, 본문
          구성 등이 변경될 수 있습니다.
        </li>
      </ul>
    </section>
  );
};

export default Guide;
