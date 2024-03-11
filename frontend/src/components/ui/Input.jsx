import { IoIosSearch } from 'react-icons/io';
import './css/Input.scss';

// * 재활용 인풋 컴포넌트

// * 사용 예시
// * 검색 아이콘을 추가할 경우, custom='search'로 설정
// * label 속성이 있으면, label을 추가
// * id label과, input의 id 값

// * description이 있으면, 설명을 추가
// * 예) description='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.'

// * custom 속성이 있으면, 해당 속성에 맞는 아이콘을 추가 할 예정 (현재 검색 아이콘만 가능. 추후 추가 예정)

const Input = ({
  className = '',
  placeholder,
  label,
  id,
  description,
  custom,
  children,
  ...props
}) => {
  // * className 기본 값으로 input-box 설정
  // * className이 있으면 input-box 뒤에 추가
  let cssClasses = 'input-box';
  cssClasses += ' ' + className;

  return (
    <div className={cssClasses}>
      {/* //* 검색 아이콘을 추가할 경우, */}
      {custom === 'search' && (
        <span>
          {/* //* 검색 아이콘 */}
          <IoIosSearch />
        </span>
      )}

      {/* //* 자식이 있는 경우 */}
      {!children && (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          {description && <p>{description}</p>}

          {/* //* ...props로, input에 설정 할 다른 속성들 추가 */}
          <input id={id} {...props} placeholder={placeholder} />
        </>
      )}

      {/* //* 자식이 없는 경우 */}
      {children && (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          {description && <p>{description}</p>}
          <div>
            <input id={id} {...props} placeholder={placeholder} />
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
