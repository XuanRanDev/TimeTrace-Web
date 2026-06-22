const stack = [
  { name: 'Python 3.12', desc: '运行时', color: '#3776AB' },
  { name: 'FastAPI', desc: '后端框架', color: '#009688' },
  { name: 'SQLite', desc: '数据库', color: '#003B57' },
  { name: 'React 18', desc: '前端框架', color: '#61DAFB' },
  { name: 'Vite', desc: '构建工具', color: '#646CFF' },
  { name: 'Ant Design', desc: 'UI 组件库', color: '#1890FF' },
  { name: 'APScheduler', desc: '任务调度', color: '#FF6F00' },
  { name: 'fnOS', desc: '运行平台', color: '#2563EB' },
]

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
            技术栈
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            可靠的<span className="gradient-text">技术选型</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            选择成熟稳定的技术栈，确保性能与可维护性。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stack.map((tech) => (
            <div
              key={tech.name}
              className="group relative bg-surface/50 hover:bg-surface/80 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 text-center hover:glow-sm"
            >
              <div
                className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm"
                style={{ background: `${tech.color}20`, color: tech.color }}
              >
                {tech.name.charAt(0)}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{tech.name}</div>
              <div className="text-xs text-text-secondary">{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
