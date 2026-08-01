import { motion } from 'framer-motion'

export function LoginIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="login-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#login-glow)" />
        <circle cx="200" cy="200" r="140" stroke="#173a7a" strokeWidth="0.5" strokeDasharray="6 4" opacity="0.15" />
        <motion.rect
          x="120" y="130" width="160" height="160" rx="24"
          stroke="#173a7a" strokeWidth="1.5" fill="#173a7a" fillOpacity="0.04"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle cx="200" cy="170" r="22" fill="#173a7a" fillOpacity="0.1" stroke="#173a7a" strokeWidth="1" />
        <motion.circle cx="200" cy="170" r="8" fill="#f26722" opacity={0.6}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path d="M 160 220 L 240 220" stroke="#173a7a" strokeWidth="3" strokeLinecap="round" opacity={0.3}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
        <motion.path d="M 170 240 L 230 240" stroke="#173a7a" strokeWidth="3" strokeLinecap="round" opacity={0.2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
        <motion.path d="M 180 260 L 220 260" stroke="#173a7a" strokeWidth="3" strokeLinecap="round" opacity={0.15}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 }} />
        <motion.circle cx="320" cy="120" r="4" fill="#f26722"
          animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="80" cy="280" r="3" fill="#173a7a"
          animate={{ y: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity }} />
      </svg>
    </motion.div>
  )
}

export function RegisterIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="reg-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#reg-glow)" />
        <motion.rect
          x="100" y="100" width="200" height="200" rx="20"
          stroke="#f26722" strokeWidth="1.5" fill="#f26722" fillOpacity="0.04"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path d="M 120 150 L 280 150" stroke="#173a7a" strokeWidth="2" strokeLinecap="round" opacity={0.2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
        <motion.path d="M 120 180 L 240 180" stroke="#173a7a" strokeWidth="2" strokeLinecap="round" opacity={0.15}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
        <motion.path d="M 120 210 L 260 210" stroke="#173a7a" strokeWidth="2" strokeLinecap="round" opacity={0.15}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
        <motion.path d="M 120 240 L 220 240" stroke="#173a7a" strokeWidth="2" strokeLinecap="round" opacity={0.12}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }} />
        <motion.circle cx="260" cy="265" r="30" fill="#173a7a" fillOpacity="0.08" stroke="#173a7a" strokeWidth="1" strokeDasharray="4 3" />
        <motion.path d="M 250 265 L 270 265 M 260 255 L 260 275" stroke="#173a7a" strokeWidth="2" strokeLinecap="round"
          animate={{ rotate: [0, 90, 0] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.circle cx="100" cy="100" r="3" fill="#f26722"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="320" cy="320" r="4" fill="#173a7a"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
      </svg>
    </motion.div>
  )
}

export function ForgotPasswordIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="forgot-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#forgot-glow)" />
        <motion.rect
          x="140" y="180" width="120" height="80" rx="12"
          stroke="#173a7a" strokeWidth="2" fill="white" fillOpacity="0.5"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path d="M 160 180 L 160 160 C 160 140, 240 140, 240 160 L 240 180"
          stroke="#f26722" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.circle cx="200" cy="222" r="5" fill="#f26722"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path d="M 180 210 L 200 222 L 220 210"
          stroke="#173a7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
        <motion.path d="M 120 280 Q 200 320, 280 280"
          stroke="#173a7a" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity={0.2}
          animate={{ strokeDashoffset: [0, -14] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle cx="200" cy="80" r="3" fill="#173a7a"
          animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity }} />
      </svg>
    </motion.div>
  )
}

export function ResetPasswordIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="reset-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#reset-glow)" />
        <motion.circle cx="200" cy="200" r="50" stroke="#173a7a" strokeWidth="2" fill="#173a7a" fillOpacity="0.04"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path d="M 170 200 L 190 218 L 230 182"
          stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.circle cx="130" cy="130" r="3" fill="#f26722"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="280" cy="140" r="4" fill="#173a7a"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="120" cy="270" r="3" fill="#f26722"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
        <motion.circle cx="270" cy="270" r="4" fill="#173a7a"
          animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }} />
        <motion.path d="M 80 200 Q 200 80, 320 200" stroke="#173a7a" strokeWidth="0.5" opacity={0.15} />
        <motion.path d="M 80 250 Q 200 370, 320 250" stroke="#f26722" strokeWidth="0.5" opacity={0.12} />
      </svg>
    </motion.div>
  )
}

export function VerifyEmailIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="verify-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#verify-glow)" />
        <motion.rect
          x="130" y="130" width="140" height="110" rx="16"
          stroke="#173a7a" strokeWidth="1.5" fill="#173a7a" fillOpacity="0.04"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.path d="M 130 140 L 200 195 L 270 140"
          stroke="#173a7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.circle cx="200" cy="240" r="45" fill="#16a34a" fillOpacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
        <motion.path d="M 182 240 L 196 254 L 218 226"
          stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.path d="M 100 280 Q 200 310, 300 280"
          stroke="#173a7a" strokeWidth="0.5" fill="none" strokeDasharray="3 2" opacity={0.15}
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </motion.div>
  )
}

export function OtpIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="otp-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173a7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#otp-glow)" />
        <motion.rect
          x="110" y="145" width="180" height="110" rx="20"
          stroke="#173a7a" strokeWidth="1.5" fill="white" fillOpacity="0.5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.path d="M 130 165 L 270 165" stroke="#173a7a" strokeWidth="1" opacity={0.12}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
        <motion.path d="M 130 185 L 270 185" stroke="#173a7a" strokeWidth="1" opacity={0.12}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
        <motion.path d="M 130 205 L 270 205" stroke="#173a7a" strokeWidth="1" opacity={0.12}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
        <motion.path d="M 130 225 L 270 225" stroke="#173a7a" strokeWidth="1" opacity={0.12}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }} />
        <motion.rect x="180" y="80" width="40" height="30" rx="6" fill="#173a7a" fillOpacity={0.06} stroke="#173a7a" strokeWidth="0.5" />
        <motion.rect x="180" y="80" width="40" height="6" rx="2" fill="#f26722" opacity={0.4}
          animate={{ x: [0, 0, 30, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="140" cy="115" r="4" fill="#173a7a" opacity={0.3} />
        <motion.circle cx="260" cy="130" r="3" fill="#f26722" opacity={0.3} />
      </svg>
    </motion.div>
  )
}
