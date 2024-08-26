import React from "react";
import Navbar from "../components/Navbar";

function Error() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <img
          src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?t=st=1724393333~exp=1724396933~hmac=6521b67b652d166370be4bf3db03333a28539088cfd60e33d2750e1202e64155&w=740"
          alt="Page Not Found"
          className="max-w-full max-h-full"
        />
      </div>
    </>
  );
}

export default Error;
