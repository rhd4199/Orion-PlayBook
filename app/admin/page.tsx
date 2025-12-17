import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
         <h2 className="text-3xl font-serif font-bold text-slate-900">
            Guild Overview
         </h2>
         <p className="text-slate-500 mt-1">
            Welcome back, Guild Master. Here is what's happening today.
         </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
           title="Total Users" 
           value="1,234" 
           icon="users"
           trend="+12%"
           trendUp={true}
        />
        <StatCard 
           title="Active Campaigns" 
           value="56" 
           icon="map"
           trend="+5%"
           trendUp={true}
        />
        <StatCard 
           title="Spells Recorded" 
           value="450" 
           icon="book"
           trend="No Change"
           trendUp={null}
        />
        <StatCard 
           title="Monsters Slayed" 
           value="320" 
           icon="skull"
           trend="+2"
           trendUp={true}
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Left: Recent Activity */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-slate-200 shadow-sm">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex justify-between items-center">
                     <CardTitle className="text-lg font-bold text-slate-800">
                        Recent Activity
                     </CardTitle>
                     <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">View All</button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                     <ActivityItem 
                        user="Drizzt Do'Urden"
                        action="created a new character"
                        target="Guenhwyvar"
                        time="2 mins ago"
                        initials="DD"
                     />
                     <ActivityItem 
                        user="Elminster Aumar"
                        action="added a new spell"
                        target="Meteor Swarm"
                        time="15 mins ago"
                        initials="EA"
                     />
                     <ActivityItem 
                        user="Strahd von Zarovich"
                        action="started a campaign"
                        target="Curse of Strahd"
                        time="1 hour ago"
                        initials="SZ"
                     />
                     <ActivityItem 
                        user="Volo"
                        action="updated monster manual"
                        target="Goblin"
                        time="3 hours ago"
                        initials="VL"
                     />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Right: Quick Drafts / System Status */}
         <div className="space-y-6">
            <Card className="bg-white border border-slate-200 shadow-sm">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg font-bold text-slate-800">
                     System Status
                  </CardTitle>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600">Database</span>
                     <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">OPERATIONAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600">API Latency</span>
                     <span className="text-sm font-mono text-slate-900">24ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm text-slate-600">Storage</span>
                     <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[45%]"></div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
               <h3 className="font-serif font-bold text-lg mb-2 text-amber-400">Dungeon Master Tip</h3>
               <p className="text-slate-300 text-sm leading-relaxed">
                  "Always have a backup plan for when your players inevitably ignore your plot hooks and decide to open a tavern instead."
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp }: any) {
   // Simple icon mapping
   const icons: any = {
      users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
      book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      skull: "M12 2c-.956 0-1.896.082-2.812.238a10.002 10.002 0 00-5.839 13.064 3.003 3.003 0 001.205 3.968c.247.14.515.234.792.276.536.082 1.077.126 1.624.126.547 0 1.088-.044 1.624-.126.277-.042.545-.136.792-.276a3.003 3.003 0 001.205-3.968A10.002 10.002 0 0012 2z"
   };

   return (
      <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
         <CardContent className="p-6">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm font-medium text-slate-500">{title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
               </div>
               <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icons[icon] || icons.users}></path>
                  </svg>
               </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
               {trendUp === true && <span className="text-emerald-600 font-bold flex items-center">↑ {trend}</span>}
               {trendUp === false && <span className="text-red-600 font-bold flex items-center">↓ {trend}</span>}
               {trendUp === null && <span className="text-slate-500 font-medium">{trend}</span>}
               <span className="text-slate-400 ml-2">from last month</span>
            </div>
         </CardContent>
      </Card>
   )
}

function ActivityItem({ user, action, target, time, initials }: any) {
   return (
      <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
         <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
            {initials}
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-900 truncate">
               <span className="font-semibold">{user}</span> {action} <span className="font-semibold text-amber-700">{target}</span>
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{time}</p>
         </div>
      </div>
   )
}