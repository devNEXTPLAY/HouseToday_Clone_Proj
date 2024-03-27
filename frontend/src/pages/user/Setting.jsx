import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions";

import "./css/Setting.scss";
import Header from "../../components/widgets/Header";
import { Link, useParams, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// * 사용자 설정
const Setting = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const { uid } = useParams();

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
    }
  };

  const onRemoveImage = () => {
    if(window.confirm("이미지를 삭제하시겠습니까?") === false) return;
    axios
      .delete("http://localhost:3005/api/common/delete", {
        data: { filePath: image },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setImage(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
          setImage(res.data.profile_img || image)
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

  const dispatch = useDispatch();
  const onwithdraw = () => {
    dispatch(userLogin());
    if(window.confirm("정말로 탈퇴하시겠습니까?") === false) return;
    axios
      .delete("http://localhost:3005/api/users/withdrawal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

      localStorage.removeItem("token");
      axios({
        method: "get",
        url: "http://localhost:3005/api/users/logout",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).catch((err) => console.log(err));
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
  }

  return (
    <>
      <form className="form" onSubmit={onSetting}>
        <div className="form__image-box">
          <img
            src={image}
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
          <button type="button" onClick={onRemoveImage}>이미지 삭제</button>
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
          {/* 회원탈퇴버튼, style은 버튼 boarder 없이 회색 텍스트만 */}
          <Button 
            type="button" 
            style={{color: "gray", backgroundColor:"white", marginBottom:"20px", textAlign:"left"}} 
            onClick={onwithdraw}>
              회원탈퇴
          </Button>
          <Button type="submit">완료</Button>
        </nav>
      </form>
    </>
  );
};

export default Setting;
