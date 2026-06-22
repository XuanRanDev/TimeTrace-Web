import { useEffect, useState } from 'react'

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#22c55e', '#06b6d4', '#a78bfa', '#f59e0b', '#ec4899', '#3b82f6'][i % 6],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
      size: 4 + Math.random() * 8,
    }))
  )

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed top-[-10px] opacity-0 rounded-sm"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `confettiFall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; top: -10px; transform: rotate(0deg) translateX(0); }
          25% { opacity: 1; }
          100% { opacity: 0; top: 105vh; transform: rotate(720deg) translateX(80px); }
        }
      `}</style>
    </>
  )
}

export default function PaymentSuccess() {
  const [orderNo, setOrderNo] = useState('--')
  const [amount, setAmount] = useState('--')
  const [payTime, setPayTime] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setOrderNo(params.get('out_trade_no') || 'TT' + Date.now().toString(36).toUpperCase())
    setAmount(params.get('total_amount') ? '¥' + params.get('total_amount') : '--')
    setPayTime(params.get('time') || new Date().toLocaleString('zh-CN'))
  }, [])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center overflow-hidden relative">
      <Confetti />

      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <style>{`
        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.18;
          animation: orbFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .bg-orb-1 { width: 500px; height: 500px; background: #22c55e; top: -120px; left: -100px; }
        .bg-orb-2 { width: 400px; height: 400px; background: #06b6d4; bottom: -80px; right: -60px; animation-delay: -3s; }
        .bg-orb-3 { width: 300px; height: 300px; background: #a78bfa; top: 40%; left: 60%; animation-delay: -5s; }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="relative z-10 w-[460px] max-w-[92vw] text-center rounded-3xl p-14 pb-12 border border-white/[0.08]"
        style={{
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 60px rgba(34,197,94,0.08), 0 25px 50px -12px rgba(0,0,0,0.4)',
          animation: 'cardIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Checkmark */}
        <div className="relative w-24 h-24 mx-auto mb-7">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              boxShadow: '0 0 40px rgba(34,197,94,0.3)',
              animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
            }}
          >
            <svg
              className="w-11 h-11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 60, strokeDashoffset: 60, animation: 'drawCheck 0.4s ease 0.6s forwards' }}
            >
              <polyline points="6 12 10 16 18 8" />
            </svg>
          </div>
          <div
            className="absolute -inset-1.5 rounded-full border-2 pointer-events-none"
            style={{ borderColor: 'rgba(34,197,94,0.3)', animation: 'ringPulse 2s ease-in-out infinite 1s' }}
          />
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-bold mb-2" style={{ animation: 'fadeUp 0.5s ease 0.4s both' }}>
          支付成功
        </h1>
        <p className="text-[15px] text-text-secondary mb-8" style={{ animation: 'fadeUp 0.5s ease 0.5s both' }}>
          感谢您的购买，订单已确认
        </p>

        {/* Info */}
        <div
          className="rounded-[14px] p-5 px-6 mb-8 border border-white/5"
          style={{ background: 'rgba(15,23,42,0.5)', animation: 'fadeUp 0.5s ease 0.6s both' }}
        >
          {[
            { label: '订单编号', value: orderNo },
            { label: '支付方式', value: '支付宝' },
            { label: '支付金额', value: amount, highlight: true },
            { label: '支付状态', value: '✓ 已完成', valueColor: 'text-emerald-400' },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between items-center py-2.5 ${i > 0 ? 'border-t border-white/5' : ''}`}
            >
              <span className="text-[13px] text-slate-500">{row.label}</span>
              <span
                className={`text-sm font-medium ${row.valueColor || ''} ${row.highlight ? 'text-2xl font-bold text-emerald-400' : 'text-slate-200'}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-9 py-3.5 text-[15px] font-semibold text-white rounded-[14px] transition-all duration-200 no-underline"
          style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
            animation: 'fadeUp 0.5s ease 0.7s both',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.4)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.3)' }}
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          返回首页
        </a>

        <div className="mt-6 text-xs text-slate-600" style={{ animation: 'fadeUp 0.5s ease 0.8s both' }}>
          支付时间：{payTime}
        </div>
      </div>
    </div>
  )
}
