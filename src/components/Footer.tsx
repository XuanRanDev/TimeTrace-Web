import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="时迹" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold">
                <span className="text-white">时迹</span>
                <span className="text-accent ml-1.5 font-medium text-sm opacity-70">TimeTrace</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              时间的痕迹，井然有序。<br/>让每一个文件回到它应属于的时间位置。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">相关链接</h4>
            <div className="space-y-2">
              <Link to="/docs" className="block text-sm text-text-secondary hover:text-white transition-colors">使用教程</Link>
              <Link to="/faq" className="block text-sm text-text-secondary hover:text-white transition-colors">常见问题</Link>
              <Link to="/changelog" className="block text-sm text-text-secondary hover:text-white transition-colors">更新日志</Link>
              <Link to="/terms" className="block text-sm text-text-secondary hover:text-white transition-colors">用户协议</Link>
              <Link to="/feedback" className="block text-sm text-text-secondary hover:text-white transition-colors">问题反馈</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © 2024-2026 XuanRan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
