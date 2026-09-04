import { useState } from "react";
import OtpInput from "react-otp-input";
import { CheckCircle, RefreshCw, KeyRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { makeHttpReq } from "../../helper/makeHttpReq";
import { showError, showSuccess } from "../../helper/toast-notification";


type VerifyUserEmailType = {
  success: boolean
  message: string
}
export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation()
  const navigate=useNavigate()
  const { user } = location?.state || {}
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      console.log("OTP:", otp);

      const response = await makeHttpReq("POST", "verify-email", { otpCode:otp, email: user?.email });

      if (!(response as VerifyUserEmailType)?.success) {
        showError('Email or otp code is invalid ')
      } else {
      
        showSuccess("Code verified successfully!");
        setTimeout(()=>{
          navigate('/auth/login')
        },2000)
      }


    } catch (error) {
      console.log(error)
    }

    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">

        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <KeyRound className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Verify your email
          </h1>


        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={7}
            shouldAutoFocus
            inputType="tel"
            containerStyle="flex justify-center gap-3"
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "45px",
                  height: "45px",
                }}
                className="rounded-md border border-indigo-500 bg-slate-950 text-center text-xl font-bold text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500"
              />
            )}
          />

          <div className="space-y-3">
            <button
              type="submit"
              disabled={otp.length !== 7 || isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>


          </div>

        </form>

        <p className="text-center">
          <Link
            to="/auth/register"
            className="text-xs font-medium text-slate-500 hover:text-slate-300"
          >
            ← Back to registration
          </Link>
        </p>

      </div>
    </div>
  );
}