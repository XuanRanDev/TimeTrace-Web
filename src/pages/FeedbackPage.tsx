import { Link } from 'react-router-dom'

const GITHUB_ISSUES_URL = 'https://github.com/XuanRanDev/TimeTrace-Web/issues'

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-8"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回首页
        </Link>

        <h1 className="text-3xl font-bold text-white mb-3">问题反馈</h1>
        <p className="text-text-secondary leading-relaxed mb-10">
          感谢您使用时迹。如果您在使用过程中遇到了问题，或有任何建议与意见，请通过以下方式联系我们。为了更高效地定位和解决问题，请您在反馈时尽量提供详细的信息。
        </p>

        <div className="space-y-8">
          <section className="bg-dark-lighter/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary text-sm font-bold">1</span>
              推荐方式：提交 GitHub Issue
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              通过 GitHub Issues 反馈可以让我们更系统地跟踪问题状态，也方便其他用户查看是否遇到相同问题。这是最优先的反馈渠道。
            </p>
            <a
              href={GITHUB_ISSUES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-all duration-300 hover:scale-105 hover:glow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              前往 GitHub Issues
            </a>
          </section>

          <section className="bg-dark-lighter/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 text-accent text-sm font-bold">2</span>
              备选方式：发送邮件
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              如果您不方便使用 GitHub，也可以通过邮件反馈问题。请将邮件发送至以下地址：
            </p>
            <a
              href="mailto:xuanrandev@qq.com?subject=时迹问题反馈"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-accent/20 hover:bg-accent/30 border border-accent/30 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              xuanrandev@qq.com
            </a>
          </section>

          <section className="bg-dark-lighter/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm font-bold">!</span>
              反馈时请提供以下信息
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              为了帮助我们快速定位并解决您遇到的问题，请在反馈时尽可能提供以下信息：
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div>
                  <span className="text-white font-medium">应用日志文件（非常重要）</span>
                  <p className="text-sm mt-1 text-text-secondary/80">
                    日志文件位于 NAS 上的{' '}
                    <code className="px-1.5 py-0.5 bg-white/10 rounded text-accent text-sm font-mono">{"/vol{x}/@appdata/dev.xuanran.timetrace/info.log"}</code>
                    ，其中 <code className="px-1.5 py-0.5 bg-white/10 rounded text-accent text-sm font-mono">x</code> 为应用安装所在存储空间的序号（通常为 <code className="px-1.5 py-0.5 bg-white/10 rounded text-accent text-sm font-mono">1</code> 或 <code className="px-1.5 py-0.5 bg-white/10 rounded text-accent text-sm font-mono">2</code>）。请将该日志文件作为附件一并提交。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <span className="text-white font-medium">问题描述</span>
                  <p className="text-sm mt-1 text-text-secondary/80">请详细描述您遇到的问题，包括操作步骤、出现频率以及与预期行为的差异。</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <div>
                  <span className="text-white font-medium">环境信息</span>
                  <p className="text-sm mt-1 text-text-secondary/80">请提供 fnOS 版本号以及时迹的应用版本号（可在应用设置中查看）。</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div>
                  <span className="text-white font-medium">截图或录屏（如有）</span>
                  <p className="text-sm mt-1 text-text-secondary/80">如果问题涉及界面异常，提供截图或录屏可以帮助我们更快地理解和复现问题。</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
