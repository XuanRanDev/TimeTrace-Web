import { useState } from 'react'

const installMethods = [
  {
    id: 'fpk',
    label: 'FPK 安装',
    desc: '推荐方式，适合 fnOS 用户',
    commands: [
      { label: '命令行安装', code: 'appcenter-cli install-fpk com.xuanran.archiver.fpk' },
      { label: '手动安装', code: '# 1. 启用手动安装\nappcenter-cli manual-install enable\n# 2. 通过 fnOS Web 界面上传 .fpk 文件' },
    ],
  },
  {
    id: 'dev',
    label: '开发环境',
    desc: '适合开发者本地调试',
    commands: [
      { label: '前端开发', code: 'cd frontend\nnpm install\nnpm run dev' },
      { label: '后端开发', code: 'cd app/server\npip install -r requirements.txt\nuvicorn main:app --reload --port 8000' },
      { label: '打包 FPK', code: './doc/fnpack build' },
    ],
  },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-dark/80 border border-white/5 rounded-xl p-4 text-sm text-text-secondary font-mono overflow-x-auto">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs rounded-md bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  )
}

export default function Install() {
  const [activeTab, setActiveTab] = useState('fpk')
  const method = installMethods.find((m) => m.id === activeTab)!

  return (
    <section id="install" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.06)_0%,transparent_60%)]" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
            开始使用
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            几步即可<span className="gradient-text">开始归档</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            支持 FPK 一键安装或开发者本地构建。
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {installMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === m.id
                  ? 'bg-primary text-white glow-sm'
                  : 'bg-surface/50 text-text-secondary hover:text-white hover:bg-surface border border-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="bg-surface/30 rounded-2xl border border-white/5 p-6 md:p-8">
          <p className="text-sm text-text-secondary mb-6">{method.desc}</p>
          <div className="space-y-4">
            {method.commands.map((cmd) => (
              <div key={cmd.label}>
                <div className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">{cmd.label}</div>
                <CodeBlock code={cmd.code} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📦', title: '一键安装', desc: '通过 FPK 包管理器直接安装到 fnOS' },
            { icon: '🔧', title: '开发者友好', desc: 'Vite 热重载 + Uvicorn 自动重启' },
            { icon: '🚀', title: '生产就绪', desc: 'SQLite WAL 模式 + 增量扫描' },
          ].map((item) => (
            <div key={item.title} className="bg-surface/30 rounded-xl p-5 border border-white/5 text-center">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
              <div className="text-xs text-text-secondary">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
