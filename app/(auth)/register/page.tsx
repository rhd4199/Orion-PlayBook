"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen bg-paper bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Chaos - "Tabletop Mess" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Random Dice */}
        <div className="absolute top-20 right-20 text-black/10 transform rotate-12 animate-float">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <div className="absolute bottom-20 left-20 text-leaf/20 transform -rotate-45">
           <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45zM11 10h2v6h-2v-6zm0 8h2v2h-2v-2z"/></svg>
        </div>
        {/* Potion Bottle */}
        <div className="absolute bottom-1/2 right-10 hidden xl:block text-black">
           <svg width="100" height="150" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-2xl rotate-12"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-3.31-2.69-6-6-6s-6 2.69-6 6c0 .33.02.64.06.94l5.94 10.06 5.94-10.06zM12 4c2.5 0 4.65 1.51 5.53 3.7C16.55 7.26 15.3 7 14 7c-2.48 0-4.73.99-6.44 2.61C8.21 6.32 10 4 12 4zm0-2C9.24 2 7 4.24 7 7v1h10V7c0-2.76-2.24-5-5-5z"/></svg>
        </div>
      </div>

      {/* Main Container: The "ENLISTMENT" Poster */}
      <div className="relative w-full max-w-lg transform -rotate-1 transition-transform hover:rotate-0 duration-500">
        
        {/* The Pin holding it */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-black shadow-lg"></div>
        </div>

        {/* The Paper */}
        <div className="bg-[#FFF8DC] border-4 border-black neo-shadow-lg p-8 relative">
           
           {/* "ENLISTMENT" Header */}
           <div className="text-center border-b-4 border-black pb-6 mb-8 relative">
              <h1 className="font-brutal text-5xl uppercase tracking-tighter leading-none text-black scale-y-125">
                 ENLISTMENT
              </h1>
              <p className="font-serif font-bold text-xl text-bark mt-2 uppercase tracking-[0.3em]">
                 Join the Adventure
              </p>
              
              {/* Stamp */}
              <div className="absolute top-0 left-0 transform -rotate-12 opacity-80">
                 <div className="border-4 border-blue-700 text-blue-700 font-brutal text-xs p-1 uppercase tracking-widest -rotate-12">
                    Open for All
                 </div>
              </div>
           </div>

           {/* The Portrait Frame (Empty for now, or Logo) */}
           <div className="w-24 h-24 mx-auto bg-black mb-8 border-4 border-black relative group cursor-help rounded-full">
              <div className="absolute inset-0 bg-leaf flex items-center justify-center overflow-hidden rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-black group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                 </svg>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black text-white px-2 py-1 font-mono text-[10px] font-bold border-2 border-white transform rotate-6">
                 NEWBIE
              </div>
           </div>

           {/* The Form */}
           <form action={action} className="space-y-6">
              
              <div className="space-y-2">
                 <Label htmlFor="displayName" className="font-brutal uppercase text-lg bg-black text-white inline-block px-2 transform rotate-1">
                    Adventurer Name
                 </Label>
                 <Input
                    id="displayName"
                    name="displayName"
                    type="text"
                    required
                    className="bg-transparent border-4 border-black rounded-none h-12 text-lg font-bold font-mono focus:ring-0 focus:bg-leaf/20 focus:border-leaf transition-colors placeholder:text-black/30"
                    placeholder="ENTER_NAME"
                 />
                 {state?.errors?.displayName && (
                    <p className="text-red-600 font-bold text-xs bg-red-100 p-1 border border-red-600 inline-block transform rotate-1">
                       ⚠ {state.errors.displayName}
                    </p>
                 )}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="email" className="font-brutal uppercase text-lg bg-black text-white inline-block px-2 transform -rotate-1">
                    Contact Scroll (Email)
                 </Label>
                 <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-transparent border-4 border-black rounded-none h-12 text-lg font-bold font-mono focus:ring-0 focus:bg-leaf/20 focus:border-leaf transition-colors placeholder:text-black/30"
                    placeholder="ENTER_EMAIL"
                 />
                 {state?.errors?.email && (
                    <p className="text-red-600 font-bold text-xs bg-red-100 p-1 border border-red-600 inline-block transform -rotate-1">
                       ⚠ {state.errors.email}
                    </p>
                 )}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="password" className="font-brutal uppercase text-lg bg-black text-white inline-block px-2 transform rotate-1">
                    Secret Passcode
                 </Label>
                 <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-transparent border-4 border-black rounded-none h-12 text-lg font-bold font-mono focus:ring-0 focus:bg-leaf/20 focus:border-leaf transition-colors placeholder:text-black/30"
                    placeholder="••••••••"
                 />
                 {state?.errors?.password && (
                    <p className="text-red-600 font-bold text-xs bg-red-100 p-1 border border-red-600 inline-block transform rotate-1">
                       ⚠ {state.errors.password}
                    </p>
                 )}
              </div>

              {/* THE BIG BUTTON */}
              <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full h-16 bg-black text-white font-brutal text-2xl uppercase tracking-widest border-4 border-transparent hover:bg-leaf hover:text-black hover:border-black hover:neo-shadow transition-all relative overflow-hidden group"
                    disabled={isPending}
                >
                    <span className="relative z-10 group-hover:animate-pulse">
                        {isPending ? "SCRIBING..." : "SIGN CONTRACT"}
                    </span>
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                </Button>
              </div>

              <div className="text-center">
                 <Link href="/login" className="font-serif italic font-bold text-bark hover:text-blue-600 hover:underline decoration-wavy decoration-2 underline-offset-4">
                    "Already a member? Enter here..." (Login)
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
