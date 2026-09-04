import { Mail, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { makeHttpReq } from "../../helper/makeHttpReq";
import { Link, useNavigate } from "react-router";
import { showError, showSuccess } from "../../helper/toast-notification";
import type { RegisterUserResponse } from "../../types/user-types";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate=useNavigate()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await makeHttpReq<LoginFormValues>(
        "POST",
        "register",
        data
      );

      showSuccess((response as RegisterUserResponse )?.message)
      

      setTimeout(()=>{
        navigate("/auth/verify-email",{
            state:{
                user:(response as RegisterUserResponse )?.user
            }
        });
      },2000)


      // redirect or save auth state here
    } catch (error) {
      console.error(error);
      showError("Invalid email or password")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

          <input
            type="email"
            placeholder="name@company.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

          <input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {errors.password && (
          <p className="text-red-400 text-xs">{errors.password.message}</p>
        )}
      </div>

      <p className=" text-slate-400 text-sm">
  Already have an account ?{" "}
  <Link
    to="/auth/login"
    className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
  >
    Sign in
  </Link>
</p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Signing Up...
          </>
        ) : (
          <>
            Sign Up
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}