const steps = [
  {
    num: '01',
    title: '选择源目录',
    desc: '指定需要扫描的文件夹，支持任意深度的递归扫描。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '智能扫描',
    desc: '提取 EXIF 信息、识别文件名时间戳、计算 SHA1 哈希值，自动去重。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '分类归档',
    desc: '按规则将文件复制或移动到 {年}/{月}/{分类}/ 目录结构中。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '井然有序',
    desc: '所有文件按时间线排列，随时可按分类浏览和检索。',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06)_0%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
            工作流程
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            四步完成<span className="gradient-text">智能归档</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            从散乱到有序，只需简单的几步操作。
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center group">
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-white/10 mb-6 group-hover:border-accent/30 group-hover:glow-sm transition-all duration-300">
                  <div className="text-accent">{step.icon}</div>
                </div>
                <div className="text-xs text-text-secondary font-mono mb-2 opacity-50">{step.num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
