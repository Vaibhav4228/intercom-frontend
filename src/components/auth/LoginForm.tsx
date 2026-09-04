import { Mail, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { makeHttpReq } from "../../helper/makeHttpReq";
import { Link, useNavigate } from "react-router";
import type { AuthResponse } from "../../types/user-types";
import { showError } from "../../helper/toast-notification";

interface LoginFormValues {
    email: string;
    password: string;
}



export default function LoginForm() {
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

    const navigate = useNavigate()

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await makeHttpReq<LoginFormValues>(
                "POST",
                "login",
                data
            );
            console.log(response)
            if ((response as AuthResponse)?.userData?.isLoggedIn) {
                localStorage.setItem('userData', JSON.stringify(response))
                setTimeout(() => {
                    navigate("/admin");
                }, 2000)
            } else {
                showError("Invalid email or password")
            }

            // redirect or save auth state here
        } catch (error) {
            console.error(error);
            showError("Invalid email or password");
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
                Don't have an account?{" "}
                <Link
                    to="/auth/register"
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                    Sign up
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
                        Signing In...
                    </>
                ) : (
                    <>
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </form>
    );
}