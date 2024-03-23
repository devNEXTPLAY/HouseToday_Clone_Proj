import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./css/Setting.scss";
import Header from "../../components/widgets/Header";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// * 사용자 설정
const Setting = () => {
  const [user, setUser] = useState({});

  const fileRef = useRef(null);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

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
          setImage(imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 업로드 취소할 시
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
  };

  const token = useSelector((state) => state.Auth.token);

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

  const onSetting = (e) => {
    const settingData = {
      profile_img: image,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      birth_date: user.birth_date,
      intro_msg: user.intro_msg,
    };
    console.log(settingData);
    axios
      .post("http://localhost:3005/api/users/profile", settingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
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
            src={user.profile_img}
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
          <button>이미지 삭제</button>
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
