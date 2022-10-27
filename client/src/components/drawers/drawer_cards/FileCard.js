import React from "react";
import {
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFileZip,
  AiFillFileExcel,
  AiFillFilePpt,
  AiFillFile,
} from "react-icons/ai";
import { IoLogoJavascript, IoLogoPython, IoLogoHtml5 } from "react-icons/io";
import { FaFileVideo, FaJava } from "react-icons/fa";

const fileCard = ({ fileName, onClick }) => {
  const getExtImage = () => {
    const regex = new RegExp("[^.]+$");
    const extension = fileName.match(regex)[0];

    const iconSize = 25;

    if (["pdf"].includes(extension)) return <AiFillFilePdf size={iconSize} />;
    if (["jpg", "jpeg", "png", "gif"].includes(extension))
      return <AiFillFileImage size={iconSize} />;
    if (["mp4", "mkv"].includes(extension))
      return <FaFileVideo size={iconSize} />;
    if (["zip", "rar", "7z"].includes(extension))
      return <AiFillFileZip size={iconSize} />;
    if (["xlsx", "csv"].includes(extension))
      return <AiFillFileExcel size={iconSize} />;
    if (["pptx"].includes(extension)) return <AiFillFilePpt size={iconSize} />;
    if (["js"].includes(extension)) return <IoLogoJavascript size={iconSize} />;
    if (["py"].includes(extension)) return <IoLogoPython size={iconSize} />;
    if (["html"].includes(extension)) return <IoLogoHtml5 size={iconSize} />;
    if (["java"].includes(extension)) return <FaJava size={iconSize} />;
    // if([""].includes(extension)) return < size={iconSize}/>

    return <AiFillFile size={iconSize} />;
  };

  return (
    <div className="file-card-wrapper" onClick={() => onClick(fileName)}>
      <div className="file-image-container">{getExtImage()}</div>
      <div className="file-name">{fileName}</div>
    </div>
  );
};

export default fileCard;
