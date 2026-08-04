import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I/l — avoids confusion

const generateCaptchaText = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length));
  }
  return result;
};

const Captcha = forwardRef(({ length = 6 }, ref) => {
  const [captchaText, setCaptchaText] = useState(() => generateCaptchaText(length));
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const canvasRef = useRef(null);

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150}, 0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150}, 0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    const charWidth = width / text.length;
    ctx.font = "bold 24px monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    [...text].forEach((char, i) => {
      ctx.save();
      const x = charWidth * i + charWidth / 2;
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  useEffect(() => {
    drawCaptcha(captchaText);
  }, [captchaText]);

  const refresh = () => {
    setCaptchaText(generateCaptchaText(length));
    setUserInput("");
    setError(false);
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const isValid = userInput.trim().toUpperCase() === captchaText.toUpperCase();
      setError(!isValid);
      if (!isValid) refresh(); // regenerate on failed attempt, prevents guessing against same text
      return isValid;
    },
    reset: refresh,
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <canvas
          ref={canvasRef}
          width={150}
          height={50}
          style={{ border: "1px solid #ccc", borderRadius: 4 }}
        />
        <IconButton onClick={refresh} size="small" aria-label="Refresh captcha">
          <RefreshIcon />
        </IconButton>
      </Box>
      <TextField
        label="Enter Captcha"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          setError(false);
        }}
        error={error}
        helperText={error ? "Captcha does not match" : ""}
        fullWidth
        sx={{ backgroundColor: "#fff" }}
      />
    </Box>
  );
});

Captcha.displayName = "Captcha";
export default Captcha;