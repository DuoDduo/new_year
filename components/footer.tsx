import { Github, Linkedin, Instagram, Code2, Heart } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { 
      name: "GitHub", 
      href: "https://github.com/DuoDduo", 
      icon: <Github className="w-5 h-5" /> 
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/blessing-james-6b541829b", 
      icon: <Linkedin className="w-5 h-5" /> 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/d_blessing_james", 
      icon: <Instagram className="w-5 h-5" /> 
    },
  ]

  return (
    <footer className="relative z-10 py-20 px-6 overflow-hidden border-t border-white/5 bg-black">
      {/* Background Gradient Glow - Consistency with Hero/Surprise */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-transparent blur-[100px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Branding with Glow */}
        <div className="text-5xl font-black mb-6 tracking-tighter glow bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent italic">
          2026
        </div>
        
        {/* Quote/Message */}
        <p className="max-w-md text-gray-300 mb-10 leading-relaxed font-light text-lg">
          "Here&apos;s to new adventures, growth, and the quiet courage to keep <span className="text-white font-medium">becoming</span>."
        </p>

        {/* Social Icons with Gradient Hover States */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((social) => (
            <a 
              key={social.name} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-3 transition-all duration-500"
            >
              <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-400 group-hover:text-white group-hover:border-orange-500/50 group-hover:bg-gradient-to-br group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-300 shadow-xl">
                {social.icon}
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition-all duration-300">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Credits Section */}
        <div className="w-full pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Code2 className="w-4 h-4 text-orange-400" />
            </div>
            <span>
              Built with Gratitude by 
              <span className="glow bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-black ml-1 uppercase tracking-wider">
                Blessing James
              </span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
               <Heart className="w-3 h-3 text-pink-500 fill-pink-500/20" />
               Future Ready
             </div>
             <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase font-bold">
               © 2026 • Design Studio
             </p>
          </div>
        </div>
      </div>
    </footer>
  )
}