"use client";

import CONSTANT from "@/packages/helpers/src/constants";
import Fragment from "@/packages/ui/src/atoms/fragment";
import { KeyboardEvent, useCallback, useRef } from "react";
import useAuth from "@/packages/ui/src/molecules/hooks/useAuth";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";

export default function VerifyPage() {
  const { viewProps, handlers, setMessage } = useAuth();
  const {
    message,
    codeDigits,
    manualToken,
    initialUrlToken,
    verificationStatus,
  } = viewProps;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleDigitChange = useCallback(
    (index: number, value: string) => {
      const newDigits = [...codeDigits];
      const input = value.slice(-1).replace(/[^0-9]/g, "");

      newDigits[index] = input;
      handlers.setCodeDigits(newDigits);

      if (input && index < CONSTANT.VERIFICATION_CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (!input && index > 0 && newDigits[index] === "") {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [codeDigits, handlers]
  );

  const handlePaste = useCallback(
    (e: {
      preventDefault: () => void;
      clipboardData: { getData: (arg0: string) => string };
    }) => {
      e.preventDefault();
      const pasteData = e.clipboardData
        .getData("text")
        .trim()
        .replace(/[^0-9]/g, "");

      if (pasteData.length >= CONSTANT.VERIFICATION_CODE_LENGTH) {
        const newDigits = pasteData
          .slice(0, CONSTANT.VERIFICATION_CODE_LENGTH)
          .split("");
        handlers.setCodeDigits(newDigits);
        if (newDigits.length === CONSTANT.VERIFICATION_CODE_LENGTH) {
          inputRefs.current[CONSTANT.VERIFICATION_CODE_LENGTH - 1]?.focus();
        }
      }
    },
    [handlers]
  );

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const renderIcon = () => {
    switch (verificationStatus) {
      case "loading":
        return <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />;
      case "success":
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <Mail className="w-12 h-12 text-ghost-apple" />;
    }
  };

  const showManualForm =
    verificationStatus === "idle" || verificationStatus === "error";

  return (
    <Fragment className="min-h-screen pt-12 w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col justify-center items-center">
      <div className="w-[60%] sm:w-[50%] min-w-max rounded-2xl flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-peach via-quaternary to-peach/70 p-8 rounded-2xl shadow-xl w-full max-w-sm transition-all duration-300 border border-gray-100">
          <div className="flex flex-col items-center space-y-4 mb-8">
            {renderIcon()}
            <h1 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
              {verificationStatus === "success"
                ? "Verified!"
                : "Enter Verification Code"}
            </h1>
            <p className="text-center text-sm text-gray-600 transition-opacity duration-500">
              {message ||
                (initialUrlToken
                  ? "Processing verification link..."
                  : `A ${CONSTANT.VERIFICATION_CODE_LENGTH}-digit code was sent to your email. Please enter it below.`)}
            </p>
          </div>

          {(verificationStatus === "success" ||
            verificationStatus === "error") && (
            <div
              className={`p-3 mb-6 rounded-lg font-medium text-sm ${
                verificationStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } transition-all duration-500`}
            >
              <p>{message}</p>
            </div>
          )}

          {showManualForm && (
            <form onSubmit={handlers.handleSubmitManual} className="space-y-6">
              <div
                className="flex justify-center space-x-2 sm:space-x-3"
                onPaste={handlePaste}
              >
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`code-${index}`}
                    name={`code-${index}`}
                    type="text"
                    maxLength={1}
                    autoComplete="off"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-14 sm:w-12 sm:h-16 text-2xl font-bold text-gray-800 text-center border-2 border-gray-300 bg-ghost-apple rounded-xl shadow-inner focus:border-blue-500 focus:ring-0 transition duration-150 caret-transparent"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={
                  manualToken.length !== CONSTANT.VERIFICATION_CODE_LENGTH
                }
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 transition duration-200"
              >
                {"Verify Account"}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  className="text-sm text-fig hover:text-coconut-shell cursor-pointer font-medium transition duration-150"
                  onClick={() => {
                    console.log("Resend code requested.");
                    setMessage("New code requested. Check your inbox.");
                    // In a real application, this would trigger a `resendVerificationEmail` service call.
                  }}
                >
                  Didn't receive the code? Resend Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}
