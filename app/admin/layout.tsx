import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { displayName: true, email: true, roles: { include: { role: true } } },
  });
  return user;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  // Debug logging to help identify redirect loops
  console.log("Admin Layout Session Check:", session);
  
  // Check for admin role (case-insensitive to be safe, or match auth.ts)
  if (!session || (session.role !== "admin" && session.role !== "ADMIN")) {
    console.log("Redirecting to login. Role mismatch or no session.");
    redirect("/login");
  }

  const user = await getUserProfile(session.userId);
  const displayName = user?.displayName || "Unknown User";
  const roleName = user?.roles[0]?.role.name || "N/A";

  return (
    <div className="flex h-screen bg-stone-50 font-sans text-stone-900 overflow-hidden">
      
      {/* SIDEBAR: Arcane Library / Guild Hall */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl relative z-20">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <div className="font-serif text-xl font-bold text-amber-500 tracking-wider flex items-center gap-2">
            <span>✦</span> ORION <span className="text-slate-500 text-xs mt-1">ADMIN</span>
          </div>
        </div>

        {/* User Profile (Sidebar) */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-900 font-bold shadow-lg ring-2 ring-slate-800">
                 {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                 <div className="font-bold text-slate-100 text-sm truncate">{displayName}</div>
                 <div className="text-xs text-amber-500/80 uppercase tracking-wider font-semibold">{roleName}</div>
              </div>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
           <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 mt-2">
              Management
           </p>
           
           <AdminLink href="/admin" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Dashboard" />
           <AdminLink href="/admin/users" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" label="Users & Roles" />
           <AdminLink href="/admin/campaigns" icon="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" label="Campaigns" />
           
           <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 mt-6">
              Compendium
           </p>
           <AdminLink href="/admin/spells" icon="M13 10V3L4 14h7v7l9-11h-7z" label="Spells" />
           <AdminLink href="/admin/monsters" icon="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" label="Bestiary" />
           <AdminLink href="/admin/items" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" label="Items" />
           
           <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 mt-6">
              System
           </p>
           <AdminLink href="/admin/settings" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" label="Settings" />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
           <form action={logout}>
              <button className="w-full py-2 px-4 rounded-md bg-red-900/10 text-red-400 text-sm font-medium hover:bg-red-900/20 hover:text-red-300 transition-colors flex items-center justify-center gap-2">
                 <span>Log Out</span>
              </button>
           </form>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-slate-50/50">
         
         {/* TOP NAVBAR */}
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
            
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-slate-500 text-sm">
               <span className="font-medium text-slate-900">Admin</span>
               <span>/</span>
               <span>Dashboard</span>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex items-center gap-4">
               <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
                  <span className="sr-only">Notifications</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>
               <div className="h-8 w-px bg-slate-200"></div>
               <div className="text-sm text-slate-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
               </div>
            </div>
         </header>

         {/* Content Area */}
         <main className="flex-1 overflow-y-auto p-8 relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <div className="max-w-7xl mx-auto pb-10">
               {children}
            </div>
         </main>
      </div>
    </div>
  );
}

function AdminLink({ href, icon, label }: { href: string; icon: string; label: string }) {
   return (
      <Link href={href} className="group flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
         <svg className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
         </svg>
         <span className="font-medium text-sm">{label}</span>
      </Link>
   );
}
