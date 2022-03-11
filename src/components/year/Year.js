import React, { useEffect } from "react";

export default function Year() {
  return (
    <video style={{ maxWidth: "100%", maxHeight: "100%" }} controls>
      <source
        src="https://zappa-havrila-net.s3.eu-central-1.amazonaws.com/year.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}
