import { useEffect, useRef } from 'react'
import { SpotlightCard } from './InteractiveCards'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: '智能扫描',
    desc: '递归扫描目录下所有文件类型，支持增量扫描，仅处理新增和变更文件，避免重复处理。',
    color: '#3b82f6',
    bgColor: 'rgba(37,99,235,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '多源时间提取',
    desc: 'EXIF 拍摄日期 → 文件名时间戳（含 13 位 Unix 毫秒）→ 文件修改时间，三级回退确保准确性。',
    color: '#a78bfa',
    bgColor: 'rgba(139,92,246,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'SHA1 去重',
    desc: '基于文件哈希的精确去重，避免重复归档和重复备份，节省宝贵的存储空间。',
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    title: '自动归档',
    desc: '按 {年}/{月}/{分类}/ 结构自动整理文件，支持复制和移动两种模式，灵活适配不同场景。',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: '灵活规则',
    desc: '自定义分类规则（扩展名 / 文件名 / EXIF 品牌型号）和模板化命名，内置常见分类模板。',
    color: '#f43f5e',
    bgColor: 'rgba(244,63,94,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '定时任务',
    desc: '基于 Cron 表达式的定时调度，自动执行扫描和归档，真正做到全自动无人值守。',
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: '重复文件查找',
    desc: '按 SHA1 查找重复文件，直观展示重复情况，支持一键清理释放空间。',
    color: '#a78bfa',
    bgColor: 'rgba(139,92,246,0.15)',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '多用户隔离',
    desc: '基于 fnOS 网关的用户认证，数据按用户隔离，每个用户拥有独立的归档空间。',
    color: '#14b8a6',
    bgColor: 'rgba(20,184,166,0.15)',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(25px)', transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms` }}
    >
      <SpotlightCard className="h-full rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 bg-surface/50 hover:bg-surface/80 hover:glow-sm">
        <div className="p-6 h-full">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${feature.bgColor}, transparent)` }}
          >
            <div style={{ color: feature.color }}>
              {feature.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
        </div>
      </SpotlightCard>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
            核心功能
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            为你的文件建立<span className="gradient-text">时间轴</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            从扫描、识别、分类到归档，全流程自动化。无论照片、视频、文档还是音频，都能找到属于它的时间位置。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
