import { useSelector, useDispatch } from "react-redux";
import { updateProfileImg } from "../../redux/actions";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./css/Setting.scss";
import Header from "../../components/widgets/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// * 사용자 설정
const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const fileRef = useRef(null);
  const { uid } = useParams();

  const token = useSelector((state) => state.Auth.token);
  const profileImge = useSelector((state) => state.Auth.profile_img);

  // 이미지 서버 업로드
  const onChangeImage = (e) => {
    const formData = new FormData();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      formData.append("file", file);
      axios
        .post("http://localhost:3005/api/common/upload", formData)
        .then((res) => {
          console.log(res);
          const imageUrl = `http://localhost:3005/${res.data.filePath}`;
          dispatch(updateProfileImg(imageUrl));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 이미지 삭제
  const onRemoveImage = () => {
    if (window.confirm("이미지를 삭제하시겠습니까?") === false) return;
    axios
      .delete("http://localhost:3005/api/common/delete", {
        data: { filePath: profileImge },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(
          updateProfileImg(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3005/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onSettingChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 사용자 정보 수정
  const onSetting = (e) => {
    const settingData = {
      profile_img: profileImge, // 리덕스에서 가져온 이미지
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      birth_date: user.birth_date,
      intro_msg: user.intro_msg,
    };
    console.log(settingData);
    axios
      .patch("http://localhost:3005/api/users/modify", settingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate(`/users/${uid}`);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <>
      <form className="form" onSubmit={onSetting}>
        <div className="form__image-box">
          <img
            src={profileImge}
            alt="image"
            name="profile_image"
            onClick={() => {
              fileRef.current.click();
            }}
          />
          <input
            type="file"
            name="profile_image"
            style={{ display: "none" }}
            onChange={onChangeImage}
            ref={fileRef}
          />
          <button type="button" onClick={onRemoveImage}>
            이미지 삭제
          </button>
        </div>

        <Input
          label="닉네임"
          name="nickname"
          value={user.nickname}
          onChange={onSettingChange}
        />
        <Input
          label="이메일"
          type="email"
          name="email"
          value={user.email}
          onChange={onSettingChange}
        />
        <hr />

        <Input
          label="휴대전화번호"
          name="phone"
          value={user.phone}
          onChange={onSettingChange}
        />
        <Input
          label="생년월일"
          type="date"
          name="birth_date"
          value={user.birth_date}
          onChange={onSettingChange}
        />
        <Input
          label="1줄 소개"
          placeholder="짧은 글로 자신을 소개해보세요. (최대 150자)"
          name="intro_msg"
          value={user.intro_msg}
          onChange={onSettingChange}
        />

        <nav className="nav">
          <Link>탈퇴하기</Link>

          <Button type="submit">완료</Button>
        </nav>
      </form>
    </>
  );
};

export default Setting;
