/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. تفعيل وضع الإنتاج الصارم
  reactStrictMode: true,
  swcMinify: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // --- مستوى الحماية المتوسط (إعدادات المتصفح الأساسية) ---
          
          // يمنع تخمين نوع الملفات تماماً (Nosniff)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          
          // حماية ضد الـ Clickjacking (يمنع وضع موقعك في iframe)
          { key: 'X-Frame-Options', value: 'DENY' },
          
          // تفعيل فلتر XSS في المتصفحات القديمة
          { key: 'X-XSS-Protection', value: '1; mode=block' },

          // --- مستوى الحماية العالي (سياسات البيانات والتشفير) ---
          
          // إجبار المتصفح على استخدام HTTPS فقط لمدة سنة (HSTS)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          
          // التحكم في البيانات المرسلة عند الانتقال لمواقع تانية
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          
          // حماية الميكروفون والكاميرا (Permission Policy) - بيقفل الوصول ليهم تماماً
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

          // --- المستوى الأعلى (Content Security Policy - CSP) ---
          // ده "البعبع" بتاع الهكرز؛ بيمنع أي سكريبت خارجي مجهول من العمل
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com; " + // مسموح فقط بسكريبتاتك وجوجل أدسنس
                   "style-src 'self' 'unsafe-inline'; " +
                   "img-src 'self' data: https://pagead2.googlesyndication.com; " +
                   "connect-src 'self' https://pagead2.googlesyndication.com; " +
                   "frame-src 'self' https://googleads.g.doubleclick.net;"
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;