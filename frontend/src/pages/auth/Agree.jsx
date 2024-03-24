import { useState } from "react";
import AgreeInput from "../../components/ui/AgreeInput";

const agreeList = [
  {
    state: "age",
    checked: false,
    title: "만 14세이상입니다",
    condition: "필수",
  },
  {
    state: "service",
    checked: false,
    title: "이용약관",
    condition: "필수",
  },
  {
    state: "privacy",
    checked: false,
    title: "개인정보 수집 및 이용동의",
    condition: "필수",
  },
  {
    state: "agree_promotion",
    checked: false,
    title: "개인정보 마케팅 활용 동의",
    condition: "선택",
  },
  {
    state: "agree_promotion",
    checked: false,
    title: "이벤트, 쿠폰, 특가, 알림 메일 및 SMS 수신",
    condition: "선택",
  },
];

const Agree = () => {
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const [isAgree, setIsAgree] = useState(agreeList);

  // * 전체 동의 핸들러
  const handleIsAgreeAll = () => {
    if (isAgreeAll === false) {
      setIsAgreeAll(true);
      setIsAgree((prevIsAgree) => {
        const updateIsAgree = prevIsAgree.map((agree) => {
          return { ...agree, checked: true };
        });

        return updateIsAgree;
      });
    } else {
      setIsAgreeAll(false);
      setIsAgree((prevIsAgree) => {
        const updateIsAgree = prevIsAgree.map((agree) => {
          return { ...agree, checked: false };
        });

        return updateIsAgree;
      });
    }
  };

  // * 개별 동의 핸들러
  const handleIsAgree = (agree) => {
    setIsAgree((prevIsAgree) => {
      const updateIsAgree = prevIsAgree.map((item) => {
        if (item.title === agree.title) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return updateIsAgree;
    });
  };

  return (
    <section className="agree-section">
      <h4>약관 동의</h4>
      <div className="section__container">
        <div className="agree__chackbox">
          <input
            type="checkbox"
            id="agree_all"
            name="agree_all"
            onChange={handleIsAgreeAll}
          />
          <label htmlFor="all">
            <strong>전체 동의</strong> <span>선택항목에 대한 동의 포함</span>
          </label>
        </div>

        <hr />

        {isAgree.map((agree) => (
          <AgreeInput
            key={agree.title}
            id={agree.state}
            title={agree.title}
            condition={agree.condition}
            checked={agree.checked}
            onChange={() => handleIsAgree(agree)}
          />
        ))}
      </div>
    </section>
  );
};

export default Agree;
