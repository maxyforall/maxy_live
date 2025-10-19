import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  email: string;
  setEmailVerified: (value: boolean) => void;
  setCurrentStep: (value: number) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EmailVerificationUI: React.FC<Props> = ({ email, setEmailVerified, setCurrentStep }) => {
  const [timer, setTimer] = useState(15 * 60); // 15 min countdown
  const [resendAvailable, setResendAvailable] = useState(false);

  // Poll every 10 seconds to check if verified
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}api/auth/check-email-verified?email=${email}`);
        const data = await res.json();

        if (data.verified) {
          clearInterval(interval);
          toast.success("✅ Email verified!");
          setEmailVerified(true);
          setCurrentStep(3);
        }
      } catch {
        // ignore errors quietly
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [email]);

  // Timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Enable resend button after 30 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setResendAvailable(true), 30000);
    return () => clearTimeout(timeout);
  }, []);

  const handleResend = async () => {
    try {
      const res = await fetch(`${API_URL}api/auth/send-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionalMail: email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("📩 Verification email resent!");
        setResendAvailable(false);
        setTimer(15 * 60);
        setTimeout(() => setResendAvailable(true), 30000);
      } else {
        toast.error(data.message || "Failed to resend email");
      }
    } catch {
      toast.error("Network error");
    }
  };

  // Format time (mm:ss)
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-white text-lg font-semibold">Check your inbox 📬</h3>
      <p className="text-gray-400 mt-2">
        We’ve sent a verification link to <b>{email}</b>.
        <br />Click the link in your email to continue.
      </p>

      <p className="text-sm text-gray-500 mt-4">
        Link expires in <span className="text-[#50A8FF] font-semibold">{formatTime(timer)}</span>
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#50A8FF] text-white rounded-xl px-5 py-2.5 hover:bg-[#3997e9] transition"
        >
          I’ve verified
        </button>

        {resendAvailable && (
          <button
            onClick={handleResend}
            className="text-sm text-[#50A8FF] underline hover:text-[#3a91e6] transition"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationUI;
