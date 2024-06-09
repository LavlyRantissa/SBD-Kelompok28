import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const { identifier } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [image, setImage] = useState(null);
  const [linkPicture, setImageUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [buttonPN, setButtonPN] = useState(false);
  const [buttonAddress, setButtonAddress] = useState(false);
  const [buttonBalance, setButtonBalance] = useState(false);

  function toggleButtonPN() {
    setButtonPN(!buttonPN);
  }

  function toogleButtonA() {
    setButtonAddress(!buttonAddress);
  }

  const handleBalance1 = (event) => {
    const balance = event.target.value;
    setBalance(balance);
    if (balance < 0) {
      alert("harus posiif");
    } else {
    }
  };

  const handleBalance = async (event) => {
    event.preventDefault();
    setButtonBalance(!buttonBalance);

    const response = await fetch(
      `http://localhost:9453/users/topup/${encodeURIComponent(identifier)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, balance }),
      }
    );
    try {
      if (response.status === 200) {
        alert("top up berhasil");
      } else {
        alert("top up gagal");
      }
    } catch (error) {
      alert("There was an error. Please try again l3ater.");
    }
  };

  const handleAddress = async (event) => {
    setButtonAddress(!buttonAddress);
    const response = await fetch(
      `http://localhost:9453/users/address/${encodeURIComponent(identifier)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, address }),
      }
    );
    try {
      if (response.status === 200) {
        alert("address berhasil");
      } else {
        alert("address gagal");
      }
    } catch (error) {
      alert("There was an error. Please try again l3ater.");
    }
  };

  const handlePN = async (event) => {
    setButtonPN(!buttonPN);
    const response = await fetch(
      `http://localhost:9453/users/phonenumber/${encodeURIComponent(
        identifier
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, phoneNumber }),
      }
    );
    try {
      if (response.status === 200) {
        alert("PN berhasil");
      } else {
        alert("PN gagal");
      }
    } catch (error) {
      alert("There was an error. Please try again l3ater.");
    }
  };

  const uploadImage = (event) => {
    event.preventDefault();

    if (!image) {
      console.log("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bugtucs0");
    formData.append("folder", "profile_picture_user");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dramhnsj2/image/upload",
      formData
    )
      .then((response) => {
        console.log(response);
        const linkPicture = response.data.secure_url;
        setImageUrl(linkPicture);
        alert(linkPicture);

        Axios.put(
          `http://localhost:9453/users/info/${encodeURIComponent(identifier)}`,
          { linkPicture },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((putResponse) => {
            console.log("Image URL saved successfully:", putResponse.data);
            alert("Berhasil simpan gambar");
            alert(linkPicture);
          })
          .catch((error) => {
            console.error("Error saving the image URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      });
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9453/users/info/${encodeURIComponent(identifier)}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setUserDetail(data.data);
        } else if (response.status === 404) {
          alert("Account not found");
        } else {
          alert("Failed to get user details");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to get user details");
      }
    };

    getDetails();
  }, [identifier]);

  return (
    <div className="profile-page-container">
      <div className="profile-page-profile-page">
        <div className="profile-page-group1">
          <span className="profile-page-text">
            <Link to={`/adoption/${identifier}`} className="notactiverl">
              ADOPT
            </Link>
          </span>
          <img
            src="https://res.cloudinary.com/dramhnsj2/image/upload/v1717589840/Frontend-Components/y6e54qbvtwgyyttiimjd.png"
            alt="MENGadopsi-logo"
            className="profile-page-bg-sub-screenshot2024060301040011"
          />
          <span className="profile-page-text02">
            <span>HOMEPAGE</span>
          </span>
          <span className="profile-page-text04">
            <span>OUR CAT</span>
          </span>
          <span className="profile-page-text06">
            <span>CONTACT</span>
          </span>
        </div>
        <span className="profile-page-text08">
          <span>DONATE</span>
        </span>
        <div className="profile-page-frame2">
          <span className="profile-page-text10">
            <span>PROFILE</span>
          </span>
        </div>

        {userDetail && userDetail.profile_picture ? (
          <div className="profile-page-rectangle13">
            <img
              src={userDetail.profile_picture}
              alt="Uploaded"
              className="uploaded-image"
            />
          </div>
        ) : (
          <img
            src="https://res.cloudinary.com/dramhnsj2/image/upload/v1717590148/Frontend-Components/su56owgk62z6wx8xycoh.png"
            alt="ProfilePicture-bg"
            className="profile-page-rectangle13"
          />
        )}

        <div className="w-[1390.01px] h-[0px] left-[35px] top-[182px] absolute border border-orange-300"></div>
        <div className="w-[1390.01px] h-[0px] left-[35px] top-[937px] absolute border border-orange-300"></div>
        <div className="w-[1000.24px] h-[0px] left-[453.71px] top-[403.98px] absolute border border-orange-300"></div>
        <span className="profile-page-text12">
          <input
            className="input-img"
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
        </span>
        <span className="profile-page-text14">
          <span>{userDetail ? `I'm ${userDetail.username}` : ""}</span>
        </span>
        <span className="profile-page-text16">
          <span>E-Mail </span>
        </span>
        <span className="profile-page-text18">
          <span>Phone Number</span>
        </span>
        <span className="profile-page-text100">
          <span>{userDetail ? userDetail.email : ""}</span>
        </span>
        <span className="profile-page-text20">
          <span>{userDetail ? userDetail.phone_number : ""}</span>
        </span>
        <span className="profile-page-text22">
          <span>{userDetail ? userDetail.address : ""}</span>
        </span>
        <span className="profile-page-text24">
          <span>{userDetail ? `Rp. ${userDetail.balance}` : ""}</span>
        </span>
        <span className="profile-page-text26">
          <span>Address</span>
        </span>
        <span className="profile-page-text28">
          <span>{userDetail ? `User ID:  ${userDetail.user_id}` : ""}</span>
        </span>
        <span className="profile-page-text30">
          <span>Balance</span>
          {buttonBalance ? (
            <input
              type="number"
              className="forgot-password-frame02-input-fieldwith-label2"
              placeholder="Ex: 1000"
              onChange={handleBalance1}
              value={balance}
            />
          ) : (
            <h1></h1>
          )}

          {buttonAddress ? (
            <input
              type="text"
              className="forgot-password-frame02-input-fieldwith-label20"
              placeholder="Ex: Jl. Test No.10"
              onChange={(event) => setAddress(event.target.value)}
              value={address}
            />
          ) : (
            <h1></h1>
          )}

          {buttonPN ? (
            <input
              type="number"
              className="forgot-password-frame02-input-fieldwith-label1"
              placeholder="Ex: 081234567890"
              onChange={(event) => setPhoneNumber(event.target.value)}
              value={phoneNumber}
            />
          ) : (
            <h1></h1>
          )}
        </span>
        <button className="profile-page-button-new" onClick={handlePN}>
          <span className="profile-page-text32">
            <span>{buttonPN ? "Update" : "Change"}</span>
          </span>
        </button>
        <button onClick={uploadImage} className="profile-page-button-new1">
          <span className="profile-page-text34">
            <span>Update Profile Picture</span>
          </span>
        </button>
        <button className="profile-page-button-new2" onClick={handleAddress}>
          <span className="profile-page-text36">
            <span>{buttonAddress ? "Update" : "Change"}</span>
          </span>
        </button>
        <button className="profile-page-button-new3 " onClick={handleBalance}>
          <span className="profile-page-text38">
            <span className="profile-page-text39">
              {" "}
              {buttonBalance ? "Confirm" : "Top Up"}
            </span>
          </span>
        </button>
        <button className="profile-page-frame00-button">
          <span className="profile-page-text41">
            <span>Log Out</span>
          </span>
        </button>
        <img
          src="https://res.cloudinary.com/dramhnsj2/image/upload/v1717590154/Frontend-Components/otweu5n4ikz9i0mlr3hq.png"
          alt="Orange-bg"
          className="profile-page-rectangle14"
        />
        <span className="profile-page-text43">
          <span>Hello</span>
        </span>
      </div>
    </div>
  );
};

export default ProfilePage;
