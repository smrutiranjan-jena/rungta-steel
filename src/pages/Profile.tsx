import { useState } from "react";
import { UserCircle2, Mail, Phone, MapPin, Building, Briefcase, Camera, ShieldCheck, Lock, Edit3 } from "lucide-react";
import type { RoleKey } from "../data/roles";
import { roles } from "../data/roles";
import AppShell from "../components/shared/AppShell";

export default function ProfilePage() {
    const [role, setRole] = useState<RoleKey>("admin");
    const currentRoleInfo = roles.find((r) => r.key === role);

    const userName =
        role === "purchase_rep" ? "Rahul Sharma" :
            role === "office_coordinator" ? "Sita Verma" :
                role === "evaluator" ? "Akhil Iyer" :
                    role === "technical_user" ? "Tech Team Leader" :
                        role === "finance_user" ? "Manish Kapoor" : "System Administrator";

    return (
        <AppShell
            title="My Profile"
            subtitle="Manage your personal information and preferences."
            activeRole={role}
            onRoleChange={setRole}
        >
            <div className=" mx-auto mb-10 space-y-6 animate-[fadeInUp_.3s_ease_forwards]">

                {/* Abstract Cover Banner */}
                <div className="relative w-full h-[70px] rounded-[24px] bg-gradient-to-r from-primary-900 via-primary-800 to-accent-600 shadow-md overflow-hidden">
                    <div className="absolute -top-24 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-32 left-10 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl" />
                </div>

                {/* Floating Profile Info Card */}
                <div className="relative px-6 sm:px-8 pb-8 rounded-3xl shadow-sm -mt-12 z-10 mx-4 lg:mx-8">

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 -mt-16">
                        {/* Avatar overlapping natively via negative margin */}
                        <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg border border-graphite-100 shrink-0 mx-auto sm:mx-0">
                            <div className="w-full h-full bg-primary-50 rounded-full flex items-center justify-center relative overflow-hidden group">
                                <UserCircle2 size={80} className="text-primary-300" strokeWidth={1} />
                                <button className="absolute inset-0 bg-primary-900/60 flex flex-col gap-1 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <Camera size={24} className="text-white" />
                                    <span className="text-[10px] text-white font-bold tracking-wider">CHANGE</span>
                                </button>
                            </div>
                        </div>

                        {/* Profile Info block next to avatar */}
                        <div className="mt-2 sm:mt-16 flex-1 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                            <div>
                                <h1 className="font-display text-2xl font-bold text-graphite-900 tracking-tight">{userName}</h1>
                                <p className="text-sm font-medium text-graphite-500 mt-1">{currentRoleInfo?.title || "Staff Member"}</p>
                            </div>
                            <div className="flex justify-center sm:justify-start">
                                <button className="flex items-center gap-2 px-5 py-2.5 border border-graphite-200 rounded-full font-semibold text-xs text-graphite-700 hover:bg-graphite-50 transition shadow-sm">
                                    <Edit3 size={14} /> Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flex Grid rows for details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-4 mr-4 lg:ml-8 lg:mr-8 mt-6">

                    {/* Left Column - Work Information */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white border border-graphite-100 p-7 rounded-3xl shadow-sm hover:shadow-md transition duration-300">
                            <h3 className="font-display text-[16px] font-bold text-graphite-900 mb-6 flex items-center gap-2">
                                <Briefcase className="text-primary-500" size={18} /> Professional Details
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Building size={14} /> Primary Plant</p>
                                    <p className="text-[14px] font-medium text-graphite-800 break-words">Kamanda Steel Plant (KSP)</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><MapPin size={14} /> Location</p>
                                    <p className="text-[14px] font-medium text-graphite-800">Bhubaneswar, Odisha</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Phone size={14} /> Contact Phone</p>
                                    <p className="text-[14px] font-medium text-graphite-800">+91 98765 43210</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Mail size={14} /> Official Email</p>
                                    <p className="text-[14px] font-medium text-blue-600 break-all">{userName.split(" ")[0].toLowerCase()}@rungtasteel.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-graphite-100 p-7 rounded-3xl shadow-sm hover:shadow-md transition duration-300">
                            <h3 className="font-display text-[16px] font-bold text-graphite-900 mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-[#00c950]" size={18} /> System Permissions
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3.5 border border-graphite-100 bg-graphite-50/50 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-graphite-800">Approval Workflows</p>
                                        <p className="text-[12px] text-graphite-500 mt-0.5">Able to process and sign off applications.</p>
                                    </div>
                                    <span className="px-3 py-1 bg-[#00c950]/10 text-[#00c950] font-bold text-[10px] uppercase tracking-wide rounded-full">Active</span>
                                </div>
                                <div className="flex items-center justify-between p-3.5 border border-graphite-100 bg-graphite-50/50 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-graphite-800">DMS Write Access</p>
                                        <p className="text-[12px] text-graphite-500 mt-0.5">Authorised to upload tracking reports.</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] border border-blue-100 uppercase tracking-wide rounded-full">Granted</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Secondary Settings */}
                    <div className="col-span-1 space-y-6">
                        <div className="bg-primary-900 text-white p-7 rounded-3xl shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800 rounded-bl-full opacity-50 z-0"></div>
                            <div className="relative z-10">
                                <h3 className="font-display text-[16px] font-bold mb-5 flex items-center gap-2">
                                    <Lock className="text-primary-300" size={18} /> Security
                                </h3>

                                <div className="space-y-5">
                                    <div>
                                        <p className="text-[11px] font-bold text-primary-300 uppercase tracking-widest mb-1">Password</p>
                                        <p className="text-[13px] font-medium text-white">Last changed 45 days ago</p>
                                        <button className="mt-2 text-[12px] font-semibold text-accent-400 hover:text-accent-300 transition">Update Password &rarr;</button>
                                    </div>
                                    <div className="h-px bg-white/10 w-full" />
                                    <div>
                                        <p className="text-[11px] font-bold text-primary-300 uppercase tracking-widest mb-1">2FA Authentication</p>
                                        <p className="text-[13px] font-medium text-white flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#00c950]" /> Enabled</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppShell>
    );
}
