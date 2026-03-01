/** @type {import('next').NextConfig} */
const nextConfig = {
  // تفعيل وضع الإنتاج الصارم لتحسين الأداء
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 1. سياسة أمان المحتوى (CSP) - تسمح فقط لملفاتك وسكريبتات جوجل أدسنس بالعمل
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com; " + 
                   "style-src 'self' 'unsafe-inline'; " +
                   "img-src 'self' data: https://pagead2.googlesyndication.com https://*.google-analytics.com; " +
                   "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; " +
                   "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;"
          },

          // 2. حماية ضد الـ Clickjacking (يمنع وضع موقعك داخل iframe)
          { key: 'X-Frame-Options', value: 'DENY' },

          // 3. منع المتصفح من تخمين نوع الملفات (Nosniff)
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // 4. التحكم في البيانات المرسلة عند الانتقال لمواقع تانية (Referrer Policy)
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // 5. إجبار استخدام HTTPS المشفر لمدة سنة (HSTS)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }
        ],
      },
    ]
  },
};

module.exports = nextConfig;