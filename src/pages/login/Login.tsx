import { useState, type FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RungtaSteelLogin() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate("/admin/dashboard");
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900 px-5 py-8">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(184,191,204,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,191,204,0.06) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage:
                        "radial-gradient(ellipse 900px 600px at 50% 38%, black 40%, transparent 78%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 900px 600px at 50% 38%, black 40%, transparent 78%)",
                }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_1100px_620px_at_50%_-10%,rgba(77,108,201,0.30),transparent_65%)]" />
            <div className="pointer-events-none absolute left-1/2 bottom-[-260px] h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(194,97,31,0.35),transparent_72%)] animate-pulse [animation-duration:7s] motion-reduce:animate-none" />

            <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-graphite-300/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-16 h-px bg-gradient-to-r from-transparent via-graphite-300/15 to-transparent" />

            <div className="relative z-10 w-full max-w-[408px]">
                <div className="mb-7 flex items-center justify-center gap-2.5">
                    <img src="/icons/logo.png" alt="Logo" />
                </div>

                <div className="relative rounded-[20px] border border-white/10 bg-white/[0.055] px-8 pb-[30px] pt-9 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_24px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl backdrop-saturate-150">
                    <div className="pointer-events-none absolute inset-x-3.5 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                    <div className="mb-6">
                        <h1 className="mb-1.5 font-display text-[21px] font-semibold tracking-tight text-graphite-50">
                            Sign in to your account
                        </h1>
                        <p className="text-[13.5px] leading-relaxed text-graphite-400">
                            Enter your registered email and password to continue.
                        </p>
                    </div>

                    <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-medium text-graphite-300">
                                Email address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="pointer-events-none absolute left-[13px] h-4 w-4 text-graphite-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@rungtasteel.com"
                                    className="w-full rounded-[10px] border border-white/10 bg-white/[0.045] py-2.5 pl-[38px] pr-3.5 font-sans text-sm text-graphite-50 placeholder-graphite-500 outline-none transition hover:border-white/20 focus:border-red-400/60 focus:bg-white/[0.065] focus:ring-[3px] focus:ring-red-500/15"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-medium text-graphite-300">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <Lock className="pointer-events-none absolute left-[13px] h-4 w-4 text-graphite-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    className="w-full rounded-[10px] border border-white/10 bg-white/[0.045] py-2.5 pl-[38px] pr-10 font-sans text-sm text-graphite-50 placeholder-graphite-500 outline-none transition hover:border-white/20 focus:border-red-400/60 focus:bg-white/[0.065] focus:ring-[3px] focus:ring-red-500/15"
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 rounded p-1 text-graphite-400 transition hover:text-graphite-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="-mt-1 flex items-center justify-between text-[13px]">
                            <label className="flex items-center gap-1.5 text-graphite-400">
                                <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 accent-red-500"
                                />
                                Keep me signed in
                            </label>
                            <a
                                href="#"
                                className="border-b border-graphite-400/40 pb-px text-graphite-300 transition hover:border-graphite-100 hover:text-graphite-50"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="mt-1 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-red-400 to-red-600 py-3 font-sans text-[14.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(194,97,31,0.55)] transition hover:brightness-[1.06] hover:shadow-[0_10px_28px_-8px_rgba(194,97,31,0.7)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2"
                        >
                            Sign in
                            <ArrowRight className="h-[15px] w-[15px]" />
                        </button>
                    </form>

                    <p className="mt-[22px] text-center text-xs leading-relaxed text-graphite-500">
                        For authorized personnel only. Access is logged and monitored.
                    </p>
                </div>

                <p className="mt-5 text-center text-[12.5px] text-graphite-400">
                    Trouble signing in?{" "}
                    <a href="#" className="border-b border-graphite-400/40 pb-px text-graphite-300 transition hover:border-graphite-100 hover:text-graphite-50">
                        Contact IT support
                    </a>
                </p>
            </div>
        </div>
    );
}
