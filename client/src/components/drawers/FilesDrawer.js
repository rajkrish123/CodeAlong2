import React, { useState as UseState, useEffect as UseEffect } from "react";
import axios from "axios";

import BasicDrawer from "./BasicDrawer";
import FileDownload from "js-file-download";
import FileCard from "./drawer_cards/FileCard";

const FilesWindow = ({ socket, roomId }) => {
  const [files, setFiles] = UseState(null);

  UseEffect(() => {
    socket.on("newFilesList", (data) => {
      setFiles(data);
    });
  }, []);

  const downloadAll = async () => {
    const res = await axios.post(`http://localhost:4000/download/all`, {
      roomId,
    });
  };

  const startFileDownload = async (file) => {
    axios({
      url: `http://localhost:4000/download/`,
      method: "POST",
      responseType: "blob", // Important
      data: {
        file: `${file}`,
        roomId: roomId,
      },
    }).then((response) => FileDownload(response.data, file));
  };

  const renderFileCardHelper = () => {
    if (files && files.length !== 0) {
      console.log(files);
      return files.map((file) => {
        return (
          <FileCard
            fileName={file}
            key={file}
            onClick={(file) => startFileDownload(file)}
          />
        );
      });
    } else return <div id="room-folder-empty">No files in the Room</div>;
  };

  return (
    <BasicDrawer
      id="files-drawer"
      title="Files"
      headerContent={
        <div
          className="drawer-button"
          onClick={(e) => downloadAll()}
          disabled={files === null || files.length === 0}
        >
          Download All
        </div>
      }
      content={renderFileCardHelper()}
    />
  );
};

export default FilesWindow;
