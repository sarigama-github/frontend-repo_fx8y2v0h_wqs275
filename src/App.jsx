import Header from './components/Header'
import BookingForm from './components/BookingForm'
import Showcase from './components/Showcase'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.06),transparent_40%)]" />

      <div className="relative container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-5xl">
        <Header />

        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start mt-4">
          <div className="md:col-span-3">
            <BookingForm />
          </div>
          <div className="md:col-span-2">
            <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6 sticky top-6">
              <h3 className="text-white font-semibold text-lg">نمونه خدمات</h3>
              <p className="text-blue-200/80 text-sm mt-1">انتخاب کنید و نوبت بگیرید</p>
              <Showcase />
              <div className="mt-6 text-xs text-blue-300/70">
                بعد از ثبت، پیام تایید برای شما نمایش داده می‌شود.
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-blue-300/60 text-sm">
          ساخته شده با عشق • امکان رزرو آنلاین
        </footer>
      </div>
    </div>
  )
}

export default App
