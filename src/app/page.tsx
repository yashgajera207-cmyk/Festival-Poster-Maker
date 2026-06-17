import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  // Data arrays for various sections
  const industries = [
    { name: 'Solar', icon: 'fa-solar-panel' },
    { name: 'Jewellery', icon: 'fa-gem' },
    { name: 'Mobile Store', icon: 'fa-mobile-screen' },
    { name: 'Insurance', icon: 'fa-shield' },
    { name: 'Real Estate', icon: 'fa-building' },
    { name: 'Healthcare', icon: 'fa-heart' },
    { name: 'Automotive', icon: 'fa-car' },
    { name: 'E-commerce', icon: 'fa-cart-shopping' },
    { name: 'Construction', icon: 'fa-helmet' },
    { name: 'Beauty', icon: 'fa-spa' },
    { name: 'Upcoming', icon: 'fa-calendar' },
    { name: 'Education', icon: 'fa-graduation-cap' },
    { name: 'Fashion', icon: 'fa-tshirt' },
    { name: 'Food', icon: 'fa-utensils' },
    { name: 'Travel', icon: 'fa-plane' },
  ];

  const festivals = [
    'Holi', 'Makar Sankranti', 'Ganesh Chaturthi', 'Ram Navmi',
    'Pongal', 'Vasant panchami', 'Maha Shivratri', 'International Yoga Day',
    'Janmashtami', 'Navratri', 'Dussehra', 'Diwali'
  ];

  const features = [
    {
      icon: 'fa-image',
      title: 'Custom Frame',
      desc: 'Add your own Photo from Phone Gallery and Set in the Readymade Frame Layout with Company Details like Business Logo, Name, Mobile Number, Gmail ID, Website and Address.'
    },
    {
      icon: 'fa-pen-ruler',
      title: 'Custom Templates',
      desc: 'Our Creative Designer will Design specific Customize Poster Design to meet Customers Business Requirements with latest designs.'
    },
    {
      icon: 'fa-language',
      title: 'Multiple Language',
      desc: 'Festival Poster & Videos are available in Hindi, English, Gujarati, Marathi, Tamil etc languages. Includes Poster Text in Indian regional languages for the users.'
    },
    {
      icon: 'fa-share-nodes',
      title: 'Social Share',
      desc: 'Share post on Social Media Apps like WhatsApp, Facebook, Instagram, Twitter, Pinterest, Snapchat, YouTube, Insta Reels etc on one click.'
    },
    {
      icon: 'fa-images',
      title: 'Multiple Image Choice',
      desc: 'Lots of Awesome Posters & Video to opt one of your Choice. Unique Background, Frames Layout, Color Combination, Text, Video Effects, etc.'
    },
    {
      icon: 'fa-greeting',
      title: 'Greetings',
      desc: 'Greetings Cards Designs for all occasions such as Happy Birthday, Festival, Product Launch, Anniversary, Congratulations, RIP etc with quotes messages.'
    },
  ];

  const services = [
    { name: 'Own Logo Design', icon: 'fa-paint-brush' },
    { name: 'Visiting Card Design', icon: 'fa-id-card' },
    { name: 'Own Photo Post Design', icon: 'fa-photo-film' },
    { name: 'WhatsApp Status Saver', icon: 'fa-share' },
    { name: 'AI Image Generator', icon: 'fa-wand-sparkles' },
    { name: 'Own Mini Website', icon: 'fa-globe' },
  ];

  const testimonials = [
    {
      name: 'R Reekki Singh rajput',
      text: 'Festival Poster app is very easy to use...It has wide range of temple making it so easy to create professional looking poster..We are share our creations directly to social media and impress our friends... I recommend to download the application'
    },
    {
      name: 'SP Santhosh Pm',
      text: 'The "Festival Poster Maker & Diwali" app is a great tool for creating personalized festival posters. It is easy to use and does not require any prior design or photo editing experience.'
    },
    {
      name: 'SK Samiya Kazmi',
      text: 'Recommend Festival Post to everyone who loves sending creative wishes. The app is designed beautifully and is extremely user-friendly. You can edit and download in less than a minute.'
    },
  ];

  const stats = [
    { label: 'Total Downloads', value: '10M+', icon: 'fa-download' },
    { label: 'Premium Clients', value: '5L+', icon: 'fa-crown' },
    { label: 'Active Users', value: '8L+', icon: 'fa-users' },
    { label: 'App Rates', value: '4.5+', icon: 'fa-star' },
  ];

  const faqs = [
    'Can I view free images and videos?',
    'Can I add my own text?',
    'Can I add multiple businesses?',
    'How to add custom images?'
  ];

  return (
    <main className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      {/* Navigation with Login/Register */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-xl">
            <i className="fas fa-calendar-alt text-orange-500"></i>
            <span>Festival<span className="text-orange-500">Post</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition shadow-sm hover:shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-28 text-center bg-gradient-to-b from-orange-50/80 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#f3d9c9_1px,transparent_1px)] [background-size:30px_30px] opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 text-orange-600 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <i className="fas fa-wand-magic-sparkles text-orange-400"></i>
              Festival Post · Business Suite
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mx-1"></span>
              <span className="text-orange-400 font-normal">v3.0</span>
            </span>
          </div>

          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Promote Your Business with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              100K+ Images
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Best Digital Marketing app to promote your business for 365 Days. Save and share images with your business logo & company details.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-rocket"></i> Start Free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm hover:bg-white hover:border-orange-300 transition shadow-sm hover:shadow-md"
            >
              <i className="fas fa-play-circle"></i> Watch Demo
            </Link>
            <a href="#industries" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-gray-600 hover:text-orange-500 transition">
              Explore <i className="fas fa-arrow-right text-sm"></i>
            </a>
          </div>

          <div className="absolute -top-16 -right-16 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Industries Section with Images */}
      <section id="industries" className="px-6 py-20 bg-white/90 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold tracking-wide">
              <i className="fas fa-briefcase mr-1.5"></i> Industries
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">Business Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-2">
              For Daily Marketing and Advertisement Promotion large number New Posters are available for Business Categories & International Days
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {industries.map((cat, i) => (
              <div key={i} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100/80 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                <div className="relative h-32 w-full bg-gray-100">
                  {/* Using online placeholder images */}
                  <Image
                    src={`https://picsum.photos/seed/${cat.name}/400/300`}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white/90 backdrop-blur-sm">
                  <h4 className="font-semibold text-gray-700 text-sm">{cat.name}</h4>
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-100 rounded-full text-[10px] flex items-center justify-center text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Planner */}
      <section className="px-6 py-20 bg-gray-50/60 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
              <i className="fas fa-calendar-alt mr-1.5"></i> planner
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">Festival Planner 2026</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-2">
              View upcoming festivals, set reminders, and prepare your marketing designs ahead of time all from one app.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {festivals.map((fest, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-orange-500 text-lg mb-2 group-hover:scale-110 transition">
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="font-semibold text-gray-700 text-sm">{fest}</h4>
                <span className="text-[10px] text-gray-400 block mt-0.5">2026</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
              <i className="fas fa-crown mr-1.5"></i> features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">Awesome Features</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-2">
              Ready to use Festival Posters with Creative Layout Options for Advertisement on Social Media to Promote Business Online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/90 hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/60 rounded-full -mt-6 -mr-6"></div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-md mb-5">
                  <i className={`fas ${feat.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 bg-gray-50/70 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
              <i className="fas fa-boxes mr-1.5"></i> services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800">All-in-One Marketing Solutions</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-2">Everything you need to create, design, and market your brand one place.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
                <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 group-hover:bg-orange-100 transition flex items-center justify-center text-orange-500 text-3xl mb-3">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h4 className="font-semibold text-gray-700">{service.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Testimonials */}
      <section className="px-6 py-20 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-20">
            {stats.map((stat, i) => (
              <div key={i} className="bg-gray-50/80 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <i className={`fas ${stat.icon} text-orange-400 text-3xl mb-3`}></i>
                <div className="text-4xl md:text-5xl font-extrabold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
              <i className="fas fa-quote-left mr-1.5"></i> testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">Trusted by Festival Post Worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex text-amber-400 text-sm mb-3">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-gray-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
              <i className="fas fa-circle-question mr-1.5"></i> FAQ
            </span>
            <h2 className="text-4xl font-bold mt-4 text-gray-800">Your Questions Answered</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/90 p-6 divide-y divide-gray-100">
            {faqs.map((q, idx) => (
              <div key={idx} className="py-4 flex justify-between items-center group cursor-pointer hover:bg-orange-50/30 px-3 -mx-3 rounded-xl transition">
                <span className="text-gray-700 font-medium text-sm">{q}</span>
                <i className="fas fa-chevron-down text-gray-400 text-xs group-hover:text-orange-400 transition"></i>
              </div>
            ))}
            <div className="pt-4 text-center text-sm text-gray-400">
              <i className="fas fa-envelope mr-1"></i> Still have a question? Ask your question here
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Grow Your Business with <br className="sm:hidden" /> Festival Post
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            We help you create professional festival creatives that drive engagement and business growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-orange-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-50"
            >
              <i className="fas fa-gem"></i> Get Started
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-orange-600/30 text-white border border-white/30 rounded-xl font-semibold backdrop-blur-sm hover:bg-orange-600/40 transition"
            >
              <i className="fas fa-headset"></i> Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white border-t border-gray-100/90 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <i className="fas fa-calendar-alt text-orange-400"></i>
            <span>Festival Post</span>
            <span className="text-sm font-normal text-gray-400 ml-1">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-orange-500 transition"><i className="fab fa-twitter mr-1"></i> Twitter</a>
            <a href="#" className="hover:text-orange-500 transition"><i className="fab fa-instagram mr-1"></i> Instagram</a>
            <a href="#" className="hover:text-orange-500 transition"><i className="fab fa-linkedin mr-1"></i> LinkedIn</a>
            <a href="#" className="hover:text-orange-500 transition">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition">Terms</a>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <i className="fas fa-arrow-trend-up text-orange-300"></i>
            <span>v3.0 · pro</span>
          </div>
        </div>
      </footer>
    </main>
  );
}