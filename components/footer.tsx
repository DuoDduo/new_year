export function Footer() {
  const socialLinks = ["Twitter", "Instagram", "Facebook", "LinkedIn"]

  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white border-opacity-10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-3xl font-bold mb-4 glow">2026</div>
        <p className="text-gray-400 mb-6">Here&apos;s to new adventures, growth, and unforgettable moments</p>
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <a key={link} href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500">© 2026 New Year Celebration. All rights reserved.</p>
      </div>
    </footer>
  )
}
