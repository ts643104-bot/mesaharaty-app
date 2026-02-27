/** @type {import('next').NextConfig} */
const nextConfig = {
  // تفعيل وضع الإنتاج الصارم لتحسين الأداء والأمان
  reactStrictMode: true,
  swcMinify: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 1. منع المتصفح من تخمين نوع الملفات (حماية من Nikto)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          
          // 2. منع وضع الموقع في iframe (حماية من Clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          
          // 3. تفعيل فلتر الحماية XSS في المتصفحات
          { key: 'X-XSS-Protection', value: '1; mode=block' },

          // 4. إجبار استخدام HTTPS المشفر (HSTS)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          
          // 5. حماية خصوصية المصدر (Referrer Policy)
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          
          // 6. قفل الصلاحيات الحساسة (Permissions Policy)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

          // 7. سياسة أمان المحتوى (CSP) - النسخة المتوافقة مع جوجل أدسنس
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com; " + 
                   "style-src 'self' 'unsafe-inline'; " +
                   "img-src 'self' data: https://pagead2.googlesyndication.com https://*.google-analytics.com; " +
                   "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; " +
                   "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;"
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;