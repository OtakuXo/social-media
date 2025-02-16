"use client";
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { TUserId } from "@/type";
import { post } from "@/utilles/post";

const Crop = (userId: TUserId) => {
  const [inputImage, setInputImage] = useState<string>("");
  const [outputImage, setOutputImage] = useState<string>("");
  //   const [tempImage, setTempImage] = useState<string>("");
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    // console.log(cropper?.getCroppedCanvas().toDataURL());
    setOutputImage(`${cropper?.getCroppedCanvas().toDataURL()}`);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = (event) => {
      setInputImage(`${event.target?.result}`);
    };
  };

  const sendToBackend = async () => {
    if (!outputImage) return;
    const image = document.createElement("img");
    image.src = outputImage;

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext("2d");
    image.onload = async () => {
      context?.drawImage(image, 0, 0, 200, 200);
      console.log(image);
      console.log(canvas);

      // converting canvs to bse64
      const compressedImage = `data:image/jpeg;base64, ${
        canvas.toDataURL("image/jpeg").split(";base64,")[1]
      }`;

      // sending to backend
      // setTempImage(compressedImage);

      const res = await post(
        "http://localhost:3000/api/user/avatar/update-avatar",
        {
          id: userId,
          image: compressedImage,
        }
      );
      console.log(res);
      // alert(res.msg);
    };
  };

  return (
    <div className="p-[20px] ">
      <div className="flex gap-[12px]">
        {/* workspace */}
        <div className="min-w-[600px] w-[70%] h-[600px] border border-black">
          <Cropper
            src={inputImage}
            style={{ width: "100%", height: "100%" }}
            // Cropper.js options
            aspectRatio={1}
            guides={true}
            crop={onCrop}
            ref={cropperRef}
          />
        </div>

        {/* preview */}
        <div>
          <p>cropped preview</p>
          <div className="w-[200px] h-[200px] flex items-center border border-black">
            <img src={outputImage} className="w-full" alt="" />
          </div>
          <a href={outputImage} download={"cropped"}>
            download
          </a>
        </div>
        {/* temp */}
        {/* <p>compressing for porfermance</p>
        <div className="w-[200px] h-[200px] flex items-center border border-black">
          <img src={tempImage} className="w-full" alt="" />
        </div>
        <a href={tempImage} download={"compressed"}>
          dowmload
        </a> */}
      </div>

      <div className="flex gap-[12px] mt-[12px] ">
        {/* upload */}
        <form action="">
          <label htmlFor="upload" className="styledBtn">
            Upload
          </label>
          <input
            id="upload"
            type="file"
            // accept=".jpg, .png, .jpeg"
            className="hidden"
            onChange={uploadImage}
          />
        </form>

        {/* submit */}
        <button className="styledBtn" onClick={sendToBackend}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Crop;
