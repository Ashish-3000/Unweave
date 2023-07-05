import React, { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

export const uploadimage = async ({ file, setUrl, setError }) => {
  //   references
  const storageRef = projectStorage.ref(file.name);

  await storageRef.put(file).on(
    "state_changed",
    (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    },
    (err) => {
      setError(err);
      console.log(err);
    },
    async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    }
  );
};
