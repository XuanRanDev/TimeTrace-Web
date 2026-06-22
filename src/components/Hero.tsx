import { useEffect, useRef } from 'react'

function FloatingOrb({ className, delay }: { className: string; delay: number }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '4s' }}
    />
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = container.getBoundingClientRect()
      const x = ((clientX - left) / width - 0.5) * 20
      const y = ((clientY - top) / height - 0.5) * 20
      container.style.setProperty('--mouse-x', `${x}px`)
      container.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" ref={containerRef}>
      <FloatingOrb className="w-96 h-96 bg-primary top-20 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-accent top-40 right-0" delay={1.5} />
      <FloatingOrb className="w-64 h-64 bg-purple-500 bottom-20 left-1/3" delay={3} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-text-secondary mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          fnOS 原生应用 · v1.0.1
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="text-white">时间的痕迹</span>
          <br />
          <span className="gradient-text">井然有序</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          时迹是一款面向 NAS 的智能文件归档工具。自动提取 EXIF 拍摄时间、识别文件名时间戳，
          将散落的文件按 <span className="text-accent font-medium">年 / 月 / 分类</span> 重建为清晰的时间轴。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#install"
            className="group relative px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 glow hover:scale-105"
          >
            <span className="relative z-10">立即安装</span>
          </a>
          <a
            href="#features"
            className="px-8 py-3.5 text-text-secondary hover:text-white font-medium rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            了解更多
          </a>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-500/20 rounded-2xl blur-xl opacity-40" />
          <div className="relative bg-surface/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-text-secondary font-mono">时迹 · 文件归档管理</span>
            </div>
            <div className="grid grid-cols-12 gap-4 text-left">
              <div className="col-span-3 bg-dark/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  目录
                </div>
                {['/Photos', '/Videos', '/Documents', '/Music'].map((d, i) => (
                  <div key={d} className={`text-xs px-2 py-1 rounded ${i === 0 ? 'bg-primary/20 text-primary' : 'text-text-secondary'}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="col-span-9 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">2024 / 06</span>
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">已归档 1,247 个文件</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Photos', count: '892', color: 'blue' },
                    { name: 'Videos', count: '213', color: 'purple' },
                    { name: 'Documents', count: '142', color: 'cyan' },
                  ].map((item) => (
                    <div key={item.name} className="bg-dark/60 rounded-lg p-3 border border-white/5">
                      <div className="text-xs text-text-secondary mb-1">{item.name}</div>
                      <div className="text-lg font-bold text-white">{item.count}</div>
                      <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${
                          item.color === 'blue' ? 'from-blue-500 to-blue-400' :
                          item.color === 'purple' ? 'from-purple-500 to-purple-400' :
                          'from-cyan-500 to-cyan-400'
                        }`} style={{ width: item.name === 'Photos' ? '85%' : item.name === 'Videos' ? '72%' : '60%' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />图片
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />视频
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />文档
                  </span>
                  <span className="ml-auto">SHA1 去重 · 增量扫描 · EXIF 提取</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
