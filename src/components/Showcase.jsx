export default function Showcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 opacity-90">
      {["فید", "کلاسیک", "ریش", "کودک"].map((t,i)=> (
        <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center text-blue-100">
          {t}
        </div>
      ))}
    </div>
  )
}
