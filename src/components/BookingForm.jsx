import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function BookingForm() {
  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  const [barberId, setBarberId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [slots, setSlots] = useState([])
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch(`${API}/barbers`).then(r=>r.json()).then(setBarbers)
    fetch(`${API}/services`).then(r=>r.json()).then(setServices)
  }, [])

  useEffect(() => {
    if (barberId && date) {
      fetch(`${API}/availability?barber_id=${barberId}&date=${date}`)
        .then(r=>r.json())
        .then((data)=> setSlots(data.slots || []))
    }
  }, [barberId, date])

  const selectedService = useMemo(()=> services.find(s=>s.id===serviceId), [services, serviceId])

  const submit = async (e) => {
    e.preventDefault()
    setMessage(null)
    if (!barberId || !serviceId || !date || !time || !name || !phone) {
      setMessage({type:'error', text:'لطفا تمام فیلدها را پر کنید'})
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API}/appointments`, {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          barber_id: barberId,
          service_id: serviceId,
          customer_name: name,
          customer_phone: phone,
          date,
          time
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.message || 'خطایی رخ داد')
      setMessage({type:'success', text:data.message || 'ثبت شد'})
      setTime('')
    } catch(err){
      setMessage({type:'error', text: err.message})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 md:p-8">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">آرایشگر</label>
            <select value={barberId} onChange={e=>setBarberId(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
              <option value="">انتخاب کنید</option>
              {barbers.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">خدمت</label>
            <select value={serviceId} onChange={e=>setServiceId(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
              <option value="">انتخاب کنید</option>
              {services.map(s=> <option key={s.id} value={s.id}>{s.title} {s.price?`- ${s.price.toLocaleString()} تومان`:''}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">تاریخ</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">ساعت</label>
            <select value={time} onChange={e=>setTime(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
              <option value="">انتخاب کنید</option>
              {slots.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">نام و نام خانوادگی</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" placeholder="مثال: امیر محمدی" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">شماره تماس</label>
            <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" placeholder="09xxxxxxxxx" />
          </div>
        </div>

        {selectedService && (
          <div className="text-blue-200/90 text-sm">
            زمان تقریبی: {selectedService.duration_minutes} دقیقه • هزینه: {selectedService.price?.toLocaleString()} تومان
          </div>
        )}

        {message && (
          <div className={"p-3 rounded "+(message.type==='success'?"bg-emerald-500/20 text-emerald-200 border border-emerald-400/30":"bg-red-500/20 text-red-200 border border-red-400/30")}>{message.text}</div>
        )}

        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition">
          {loading? 'در حال ثبت...' : 'ثبت نوبت'}
        </button>
      </form>
    </div>
  )
}
