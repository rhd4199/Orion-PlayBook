"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-paper bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Chaos - "Tabletop Mess" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Random Dice */}
        <div className="absolute top-20 left-20 text-black/10 transform -rotate-12 animate-float">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z"/></svg>
        </div>
        <div className="absolute bottom-20 right-20 text-leaf/20 transform rotate-45">
           <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z"/></svg>
        </div>
        {/* Dagger stuck in the table */}
        <div className="absolute top-1/2 left-10 hidden xl:block text-black">
           <svg width="100" height="300" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-2xl"><path d="M12 2l2 2v10l2 2v2h-3v4h-2v-4H8v-2l2-2V4l2-2z"/></svg>
        </div>
      </div>

      {/* Main Container: The "WANTED" Poster */}
      <div className="relative w-full max-w-lg transform rotate-1 transition-transform hover:rotate-0 duration-500">
        
        {/* The Pin holding it */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="w-8 h-8 rounded-full bg-red-600 border-4 border-black shadow-lg"></div>
        </div>

        {/* The Paper */}
        <div className="bg-[#FFF8DC] border-4 border-black neo-shadow-lg p-8 relative">
           
           {/* "WANTED" Header */}
           <div className="text-center border-b-4 border-black pb-6 mb-8 relative">
              <h1 className="font-brutal text-6xl uppercase tracking-tighter leading-none text-black scale-y-125">
                 WANTED
              </h1>
              <p className="font-serif font-bold text-xl text-bark mt-2 uppercase tracking-[0.5em]">
                 Dead or Alive
              </p>
              
              {/* Stamp */}
              <div className="absolute top-0 right-0 transform rotate-12 opacity-80">
                 <div className="border-4 border-red-700 text-red-700 font-brutal text-xs p-1 uppercase tracking-widest rotate-12">
                    Guild Approved
                 </div>
              </div>
           </div>

           {/* The Portrait Frame (Empty for now, or Logo) */}
           <div className="w-32 h-32 mx-auto bg-black mb-8 border-4 border-black relative group cursor-help">
              <div className="absolute inset-0 bg-leaf flex items-center justify-center overflow-hidden">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-black group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                 </svg>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-black text-white px-2 py-1 font-mono text-xs font-bold border-2 border-white">
                 LVL ??
              </div>
           </div>

           {/* The Form */}
           <form action={action} className="space-y-6">
              
              <div className="space-y-2">
                 <Label htmlFor="email" className="font-brutal uppercase text-lg bg-black text-white inline-block px-2 transform -rotate-1">
                    True Identity
                 </Label>
                 <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-transparent border-4 border-black rounded-none h-14 text-xl font-bold font-mono focus:ring-0 focus:bg-leaf/20 focus:border-leaf transition-colors placeholder:text-black/30"
                    placeholder="ENTER_EMAIL"
                 />
                 {state?.errors?.email && (
                    <p className="text-red-600 font-bold text-xs bg-red-100 p-1 border border-red-600 inline-block transform rotate-1">
                       ⚠ {state.errors.email}
                    </p>
                 )}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="password" className="font-brutal uppercase text-lg bg-black text-white inline-block px-2 transform rotate-1">
                    Secret Phrase
                 </Label>
                 <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-transparent border-4 border-black rounded-none h-14 text-xl font-bold font-mono focus:ring-0 focus:bg-leaf/20 focus:border-leaf transition-colors placeholder:text-black/30"
                    placeholder="••••••••"
                 />
                 {state?.errors?.password && (
                    <p className="text-red-600 font-bold text-xs bg-red-100 p-1 border border-red-600 inline-block transform -rotate-1">
                       ⚠ {state.errors.password}
                    </p>
                 )}
              </div>

              {/* Reward Section */}
              <div className="flex justify-between items-center py-4 border-y-4 border-black/10 border-dashed my-6 font-mono text-sm text-gray-600">
                 <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full border border-black"></span>
                    REWARD: ACCESS
                 </span>
                 <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-400 rounded-full border border-black"></span>
                    RISK: HIGH
                 </span>
              </div>

              {/* THE BIG BUTTON */}
              <Button
                 type="submit"
                 className="w-full h-20 bg-black text-white font-brutal text-3xl uppercase tracking-widest border-4 border-transparent hover:bg-leaf hover:text-black hover:border-black hover:neo-shadow transition-all relative overflow-hidden group"
                 disabled={isPending}
              >
                 <span className="relative z-10 group-hover:animate-pulse">
                    {isPending ? "UNLOCKING..." : "CLAIM BOUNTY"}
                 </span>
                 {/* Hover Effect Background */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
              </Button>

              <div className="text-center">
                 <Link href="/register" className="font-serif italic font-bold text-bark hover:text-red-600 hover:underline decoration-wavy decoration-2 underline-offset-4">
                    "Audentes Fortuna Iuvat..." (Register)
                 </Link>
              </div>

           </form>
           
           {/* Tear Effect at bottom */}
           <div className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFF8DC]" style={{clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)"}}></div>
        </div>
      </div>
    </div>
  );
}
