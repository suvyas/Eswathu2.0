import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { createCaptcha, sendOtp, verifyOtp } from "../services/api";
import { useLanguage } from "@/context/LanguageContext";
//import MainLayout from "../layout/MainLayout";

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [userId, setUserId] = useState("");
  const [answer, setAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("identity");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshCaptcha = async () => {
    try {
      setCaptcha(await createCaptcha());
      setAnswer("");
    } catch (e) {
      setNotice(e.message);
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      // const result = await sendOtp({
      //   userId,
      //   captchaId: captcha?.challengeId,
      //   captchaAnswer: answer,
      // });
      setNotice(result.message);
      if (result.success) {
        setStep("otp");
        await refreshCaptcha();
      }
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      const result = await verifyOtp({
        userId,
        otp,
        captchaId: captcha?.challengeId,
        captchaAnswer: answer,
      });
      if (!result.success) {
        setNotice(result.message);
        await refreshCaptcha();
        return;
      }
      localStorage.setItem("nupms-token", result.accessToken);
      localStorage.setItem(
        "nupms-user",
        JSON.stringify({ name: result.displayName, userId }),
      );
      
      // Instead of window.location.href, we use React Router
      if (result.redirectTo && result.redirectTo !== "/") {
        window.location.href = result.redirectTo; // For external redirects if any
      } else {
        navigate("/home"); // Default internal redirect
      }
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <MainLayout>
      <main className="flex-1 grid place-items-center p-4 lg:py-[55px] lg:px-[22px] bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.08),transparent_45%),#F8FAFC]">
        <div className="max-w-[520px] w-full bg-white border border-slate-200 rounded-[22px] p-6 lg:p-[40px] shadow-[0_15px_40px_rgba(15,23,42,.08)] transition duration-350 hover:-translate-y-[6px] hover:shadow-[0_25px_60px_rgba(15,23,42,.15)] animate-fadeUp">
          <h2 className="text-center font-display font-semibold text-[34px] text-[#133f4f] mt-[10px] mb-[9px]">{t.signIn}</h2>

          <form className="grid gap-[18px]" onSubmit={step === "identity" ? requestOtp : login}>
            <label className="grid gap-[7px] text-[#2e555f] text-[14px] font-bold">
              {t.user}
              <input
                className="h-[54px] rounded-xl border border-slate-300 bg-slate-50 px-4 transition duration-300 focus:bg-white focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(20,184,166,.18)] focus:outline-none disabled:bg-[#f0f4f3]"
                value={userId}
                onChange={(e) => setUserId(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                maxLength="20"
                placeholder={t.user}
                autoComplete="username"
                required
                disabled={step === "otp"}
              />
            </label>

            {step === "otp" && (
              <label className="grid gap-[7px] text-[#2e555f] text-[14px] font-bold">
                {t.otp}
                <input
                  className="h-[54px] rounded-xl border border-slate-300 bg-slate-50 px-4 transition duration-300 focus:bg-white focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(20,184,166,.18)] focus:outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength="6"
                  inputMode="numeric"
                  placeholder="••••••"
                  autoComplete="one-time-code"
                  required
                />
              </label>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.18fr] gap-[13px] items-end">
              <div className="h-[48px] border border-slate-300 rounded-lg bg-slate-100 flex items-center justify-between pl-[15px] text-slate-700 font-bold tracking-[0.6px]">
                <span>{captcha?.question ?? "Loading…"}</span>
                <button
                  type="button"
                  className="h-full border-0 border-l border-[#b9d8cb] bg-transparent px-[15px] text-[#08786d] text-[21px] cursor-pointer hover:bg-slate-200 transition"
                  onClick={refreshCaptcha}
                  aria-label="Refresh captcha"
                >
                  ↻
                </button>
              </div>
              <label className="grid gap-[7px] text-[#2e555f] text-[14px] font-bold">
                {t.answer}
                <input
                  className="h-[54px] rounded-xl border border-slate-300 bg-slate-50 px-4 transition duration-300 focus:bg-white focus:border-teal-500 focus:shadow-[0_0_0_4px_rgba(20,184,166,.18)] focus:outline-none"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  maxLength="2"
                  required
                />
              </label>
            </div>

            {notice && (
              <p className={`m-0 p-[10px_12px] text-[13px] border-l-[3px] ${notice.includes("sent") || notice.includes("successful") ? "bg-[#e7f6ee] text-[#075c51] border-[#08776d]" : "bg-[#fff3e9] text-[#7d401b] border-[#bd6328]"}`}>
                {notice}
              </p>
            )}

            <button className="h-[56px] border-none rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white text-[17px] font-semibold cursor-pointer transition duration-300 shadow-[0_10px_24px_rgba(20,184,166,.30)] hover:-translate-y-[3px] hover:shadow-[0_18px_35px_rgba(20,184,166,.35)] hover:from-teal-600 hover:to-teal-800 active:scale-95 disabled:opacity-70 disabled:pointer-events-none" disabled={loading}>
              {loading ? t.wait : step === "identity" ? t.getOtp : t.login}
            </button>
          </form>

          {step === "otp" && (
            <button
              className="border-0 bg-transparent text-[#08776d] pt-[16px] text-[13px] font-semibold cursor-pointer hover:underline"
              onClick={() => {
                setStep("identity");
                setOtp("");
                setNotice("");
              }}
            >
              {t.different}
            </button>
          )}
        </div>
      </main>
    // </MainLayout>
  );
}