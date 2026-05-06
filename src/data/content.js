export const profile = {
  name: "Okta Ramji Saputra",
  tagline: "Web Developer • UI/UX Designer",
  taglineSub: "Crafting web experiences with clean code & thoughtful design",
  email: "oktaramji10@gmail.com",
  phone: "08885963424",
  linkedin: "https://www.linkedin.com/in/oktaramji/",
  github: "https://github.com/okttaacx",
  location: "Malang, Jawa Timur",
  about: `Mahasiswa S1 Informatika Universitas Muhammadiyah Malang dengan fokus pada pengembangan web dan desain UI/UX. Berpengalaman membangun aplikasi web responsif dan scalable menggunakan PHP (Laravel), React.js, dan Node.js, serta merancang pengalaman pengguna yang intuitif melalui Figma. Berorientasi pada solusi, dengan semangat belajar tinggi dan kemampuan bekerja secara mandiri maupun dalam tim untuk menghasilkan produk digital yang fungsional dan bernilai.`,
  education: {
    degree: "S1 Informatika",
    university: "Universitas Muhammadiyah Malang",
    period: "2022 – 2026",
    gpa: "3.76 / 4.00",
    thesis: "Pengembangan Sistem Informasi Jaringan Orang Kerja Dinas Tenaga Kerja Kota Batu Menggunakan Metode Prototyping"
  }
};

export const skills = {
  programming: ["HTML", "CSS", "JavaScript", "PHP (Laravel)", "React.js", "Node.js"],
  database: ["MySQL", "phpMyAdmin", "MongoDB"],
  tools: ["GitHub", "VS Code", "Figma", "Canva"],
  soft: ["Adaptable", "Problem Solving", "Attention to Detail", "Collaborative"]
};

export const projects = [
  {
    id: 1,
    title: "SiJoker",
    type: "desktop",
    subtitle: "Sistem Informasi Orang Kerja",
    description: "Sistem berbasis web untuk pengelolaan data pencari kerja Dinas Tenaga Kerja Kota Batu. Menggunakan metode prototyping untuk menciptakan solusi digital bagi penyaluran tenaga kerja lokal.",
    stack: ["PHP Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M8 10h12M8 14h8M8 18h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>  <circle cx="21" cy="18" r="4" fill="currentColor"/>  <path d="M19.5 18l1 1 2-2" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Manajemen Data Terpusat", "Sistem Monitoring Pelatihan", "Alur Kerja Paperless"],
    github: "https://github.com/okttaacx/tugasakhir.git",
    live: "", 
    features: [
      {
        name: "Registrasi Akun Baru",
        desc: "Fitur pendaftaran bagi masyarakat Kota Batu untuk mendapatkan akses ke dalam sistem. Meliputi validasi email dan pembuatan kredensial akun pendaftar.",
        img: "/sijoker-register.png" 
      },
      {
        name: "Autentikasi Login",
        desc: "Gerbang masuk aman bagi pendaftar dan admin. Membedakan hak akses (role-based access) untuk menjaga keamanan data dan privasi pengguna.",
        img: "/sijoker-login.png" 
      },
      {
        name: "Katalog Daftar Pelatihan Kerja",
        desc: "Halaman utama yang menyajikan berbagai program pelatihan tersedia, lengkap dengan jadwal, lokasi, dan sisa kuota secara real-time.",
        img: "/Daftar_Pelatihan.png"
      },
      {
        name: "Manajemen Profil Pendaftar",
        desc: "Fitur untuk melengkapi identitas diri, riwayat pendidikan, dan keahlian sebagai data master pencari kerja di database Disnaker.",
        img: "/sijoker-profil.png"
      },
      {
        name: "Digital Document Upload",
        desc: "Sistem pengunggahan berkas administrasi (KTP, Ijazah, dll) secara digital, mendukung gerakan paperless di lingkungan pemerintahan.",
        img: "/sijoker-upload.png"
      },
      {
        name: "Sistem Manajemen Pelatihan (CRUD Admin)",
        desc: "Dashboard bagi pengelola untuk melakukan input, pembaruan, dan penghapusan data program pelatihan serta manajemen jadwal instruktur.",
        img: "/sijoker-pelatihan.png"
      },
      {
        name: "Validasi & Verifikasi Admin",
        desc: "Proses seleksi berkas oleh admin untuk memberikan status validasi (diterima/ditolak) bagi setiap pendaftar pelatihan.",
        img: "/sijoker-validasi.png"
      }
    ]
  },
  {
    id: 2,
    title: "FlowBoost",
    type: "mobile",
    subtitle: "Aplikasi Mobile Motivasi",
    description: "Aplikasi mobile Flutter dengan fitur video motivasi. UI/UX dirancang dengan Figma, pendekatan user-friendly dengan tampilan responsif dan modern.",
    stack: ["Flutter", "Figma", "Dart"],
    color: "coral",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="6" y="3" width="16" height="22" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M10 8h8M10 12h8M10 16h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>  <circle cx="18" cy="20" r="3.5" fill="currentColor"/>  <path d="M16.8 20l.8.8 1.6-1.6" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M9 3.5 C9 3.5 14 5.5 19 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
    highlights: ["Desain UI/UX Figma", "Video motivasi terintegrasi", "Responsive & user-friendly"],
    github: "https://github.com/Firdig/Flowboost-mobileapp.git",
    figma: "https://www.figma.com/design/DKMYWMdf6pzBcBUszDaVzl/Untitled?node-id=0-1&p=f",
    live: "",
    features: [
      {
        name: "Sistem Kategori Vidio",
        desc: "Memungkinkan pengguna mengeksplorasi motivasi berdasarkan topik spesifik melalui antarmuka kategori yang terorganisir.",
        img: "/kategori_vidio.png"
      },
      {
        name: "Katalog Daftar Vidio",
        desc: "Menampilkan daftar lengkap video motivasi yang tersedia, memudahkan pengguna memilih konten yang ingin ditonton.",
        img: "/daftar_vidio.png"
      },
      {
        name: "Pengalaman Tonton Vidio",
        desc: "Pemutar video yang mulus dengan interface minimalis untuk kenyamanan maksimal saat menyerap materi inspiratif.",
        img: "/tonton_vidio.png"
      },
      {
        name: "Koleksi Vidio Favorit",
        desc: "Fitur bookmark untuk menyimpan video pilihan ke dalam daftar koleksi pribadi agar dapat diakses kembali kapan saja.",
        img: "/vidio_favorit.png"
      },
      {
        name: "Fitur Berbagi (Share)",
        desc: "Memudahkan pengguna untuk menyebarkan semangat positif dengan membagikan video inspiratif ke berbagai platform media sosial.",
        img: "/share_vidio.png"
      },
      {
        name: "Fitur Unduhan (Download)",
        desc: "Menyediakan opsi unduhan video agar pengguna dapat menonton konten motivasi secara offline tanpa kendala koneksi internet.",
        img: "/downlod_vidio.png"
      }
    ]
  },
  {
    id: 3,
    title: "Toko Listrik Berkah",
    type: "web",
    subtitle: "Aplikasi Kasir & Manajemen",
    description: "Aplikasi kasir dan manajemen inventaris berbasis web untuk toko kelistrikan. Dibangun menggunakan arsitektur modern untuk memastikan performa yang cepat, pengelolaan data yang efisien, dan kemudahan dalam pelaporan.",
    stack: ["React.js", "Node.js", "MongoDB"],
    color: "yellow",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M4 20V12l10-7 10 7v8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>  <rect x="10" y="15" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M12 15v9" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>  <circle cx="14" cy="11" r="2" stroke="currentColor" stroke-width="1.4" fill="none"/>  <path d="M4 12h20" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`,
    highlights: ["Laporan Penjualan Terintegrasi", "Filter Transaksi Dinamis", "Manajemen Kasir & Stok"],
    github: "https://github.com/okttaacx/toko_berkah_listrik_blitar.git",
    live: "",
    features: [
      {
        name: "Sistem Login Multi-Role",
        desc: "Fitur autentikasi pengguna dengan dua peran utama (Admin dan Kasir) yang memastikan keamanan akses sistem serta pembagian hak akses sesuai fungsi, sehingga operasional toko berjalan lebih terstruktur dan terkontrol.",
        img: "/toko-laporan.png"
      },
      {
        name: "Registrasi Kasir",
        desc: "Fitur pendaftaran khusus kasir yang memungkinkan penambahan akun baru dengan role otomatis sebagai kasir, sehingga proses onboarding karyawan menjadi lebih cepat, terstruktur, dan aman tanpa mengganggu akses admin.",
        img: "/toko-register-kasir.png"
      },
      {
        name: "Point of Sale (POS)",
        desc: "Antarmuka kasir berbasis Point of Sale (POS) yang memungkinkan pengelolaan transaksi secara efisien melalui pencarian produk, manajemen keranjang, dan proses checkout instan.",
        img: "/toko-transaksi.png"
      },
      {
        name: "Admin Control Panel",
        desc: "Dashboard terpusat untuk admin dalam mengelola inventaris toko, termasuk fitur CRUD (Create, Read, Update, Delete) produk, monitoring stok, serta akses laporan dan data operasional secara real-time.",
        img: "/toko-dashboard-admin.png"
      },
      {
        name: "Daftar Barang",
        desc: "Halaman manajemen data produk yang menampilkan seluruh daftar barang beserta informasi stok, harga, dan aksi pengelolaan seperti edit dan hapus secara terstruktur.",
        img: "/toko-daftar-barang.png"
      },
      {
        name: "Riwayat Transaksi",
        desc: "Halaman yang menampilkan riwayat seluruh transaksi penjualan secara terstruktur, dilengkapi fitur filter berdasarkan tanggal, bulan, dan tahun serta opsi cetak struk dalam format PDF.",
        img: "/toko-riwayat-transaksi.png"
      },
      {
        name: "Laporan Penjualan Toko",
        desc: "Laporan analitik yang menampilkan performa penjualan secara komprehensif, termasuk total pendapatan, jumlah transaksi, total barang terjual, serta daftar produk terlaris berdasarkan volume penjualan.",
        img: "/toko-analitik.png"
      },
      {
      name: "Struk & Nota Digital",
      desc: "Sistem pembuatan nota transaksi digital yang menampilkan rincian pembelian secara lengkap dan dapat dicetak atau disimpan dalam format PDF sebagai bukti pembayaran.",
      img: "/toko-nota.png"
      }
    ]
  },
  {
    id: 4,
    title: "Jurnal SINTA 3",
    subtitle: "Penelitian Ilmiah Terindeks",
    description: "Penelitian terkait pengembangan sistem informasi jaringan tenaga kerja berbasis web menggunakan metode prototyping. Terpublikasi di jurnal terindeks SINTA 3.",
    stack: ["Research", "Web Development", "Prototyping"],
    color: "sage",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M7 4h10l4 4v16a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M17 4v4h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>  <path d="M10 12h8M10 15.5h8M10 19h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>  <circle cx="20" cy="20" r="4" fill="currentColor"/>  <path d="M18 20h4M20 18v4" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    highlights: ["Terindeks SINTA 3", "Metode prototyping", "Sistem informasi tenaga kerja"],
    github: null,
    live: "https://jurnal.polbeng.ac.id/index.php/ISI/article/view/1374"
  },
  {
    id: 5,
    title: "Toko Sembako Berkah",
    type: "web",
    subtitle: "UI/UX Website Design",
    description: "Merancang desain UI/UX website “Toko Sembako Berkah” menggunakan Figma dengan tampilan modern, responsif, dan mudah digunakan untuk meningkatkan kenyamanan pengguna saat berbelanja online.",
    stack: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3H4v5h5V3zM24 3h-5v5h5V3zM9 20H4v5h5v-5zM24 20h-5v5h5v-5zM17 10h-6v8h6v-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Desain UI/UX Modern", "Responsif & User-Friendly", "Prototyping Berbelanja Online"],
    github: null,
    figma: "https://www.figma.com/design/SXlrwVddViJ6ICwKUKX6Tw/Untitled?node-id=0-1&t=iwqOD0uJYcW9vuZN-1",
    live: "",
    features: [
      {
        name: "Login User Page",
        desc: "Halaman login dengan tampilan modern dan sederhana yang memudahkan pengguna masuk ke akun secara cepat dan nyaman.",
        img: "/login-user-sembako.png"
      },
      {
        name: "Register Page",
        desc: "Halaman registrasi untuk pengguna yang belum memiliki akun dengan tampilan sederhana, responsif, serta tersedia tombol “Masuk Admin” untuk akses admin.",
        img: "/register-sembako.png"
      },
      {
        name: "Admin Login Page",
        desc: "Halaman login admin dengan tampilan sederhana dan profesional untuk memudahkan admin mengakses dashboard dan mengelola website.",
        img: "/admin-sembako.png"
      },
      {
        name: "User Home Page",
        desc: "Halaman utama pengguna untuk melihat dan membeli produk sembako dengan fitur kategori, produk rekomendasi, serta filter produk yang memudahkan pencarian barang.",
        img: "/home-user-sembako.png"
      },
      {
        name: "Product Category Page",
        desc: "Halaman kategori produk sembako yang memudahkan pengguna melihat dan memilih produk berdasarkan jenis kategori yang tersedia.",
        img: "/kategori-user-sembako.png"
      },
      {
        name: "Product Detail Page",
        desc: "Halaman detail produk yang menampilkan informasi lengkap produk sembako seperti gambar, harga, deskripsi, dan tombol tambah ke keranjang.",
        img: "/detail-produk-user-sembako.png"
      },
      {
        name: "Shopping Cart Page",
        desc: "Halaman keranjang belanja untuk melihat daftar produk yang dipilih, mengatur jumlah barang, dan melihat total pembayaran.",
        img: "/keranjang-user-sembako.png"
      },
      {
        name: "Checkout & Payment Page",
        desc: "Halaman checkout dan pembayaran untuk menyelesaikan pesanan dengan informasi alamat, detail produk, dan metode pembayaran.",
        img: "/checkout-pembayaran-sembako.png"
      },
      {
        name: "Order History Page",
        desc: "Halaman riwayat pesanan untuk melihat daftar order, status pembelian, dan detail transaksi pengguna.",
        img: "/riwayat-order-sembako.png"
      },
      {
        name: "User Profile Page",
        desc: "Halaman profil pengguna untuk melihat dan mengelola informasi akun serta data pribadi pengguna.",
        img: "/profil-user-sembako.png"
      },
      {
        name: "Admin Dashboard Page",
        desc: "Halaman dashboard admin untuk melihat ringkasan data toko seperti total produk, pendapatan bulan ini, serta grafik penjualan.",
        img: "/dashboard-admin.png"
      },
      {
        name: "Product Management Page",
        desc: "Halaman manajemen produk untuk menambah, mengedit, menghapus, dan mengelola data produk sembako pada website.",
        img: "/product-management-admin.png"
      }
    ]
  },
  {
    id: 6,
    title: "HealthTalk",
    type: "mobile",
    subtitle: "Desain UI/UX Aplikasi Kesehatan",
    description: "Merancang desain UI/UX aplikasi mobile “HealthTalk” menggunakan Figma dengan fokus pada kemudahan navigasi, kenyamanan pengguna, dan tampilan modern. Aplikasi dirancang sebagai platform diskusi kesehatan digital yang memungkinkan pengguna untuk bertanya, berbagi pengalaman, dan membaca informasi kesehatan.",
    stack: ["Figma", "Mobile UI", "UX Research"],
    color: "coral",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 9v10M9 14h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Platform Diskusi Digital", "Sistem Navigasi Intuitif", "Desain Mobile Responsif"],
    github: null,
    figma: "https://www.figma.com/design/Qm0lPxvVrXwBhvycaGSQaM/HealthTalk?node-id=0-1&p=f&t=bzrmg0Ulcu6pE4gX-0",
    live: "",
    features: [
      {
        name: "Splash Screen (Healtalk App)",
        desc: "Halaman tampilan awal aplikasi “Healtalk” dengan desain UI/UX sederhana yang menampilkan logo dan nama aplikasi sebagai pengenalan sebelum masuk ke halaman utama.",
        img: "/healtalk-android.png"
      },
      {
        name: "Login Page",
        desc: "Halaman login dengan tampilan sederhana dan modern untuk memudahkan pengguna masuk ke akun dan mengakses fitur diskusi kesehatan.",
        img: "/login-healtalk.png"
      },
      {
        name: "Register Page",
        desc: "Halaman registrasi untuk pengguna baru dengan desain sederhana dan responsif agar proses pembuatan akun lebih mudah dan nyaman.",
        img: "/signup-healtalk.png"
      },
      {
        name: "Home Page",
        desc: "Halaman utama aplikasi untuk melihat diskusi kesehatan, topik populer, serta fitur pencarian agar pengguna lebih mudah menemukan informasi dan berbagi pengalaman kesehatan.",
        img: "/home-popular-healtalk.png"
      },
      {
        name: "Following Page",
        desc: "Halaman untuk melihat postingan dan diskusi terbaru dari akun yang diikuti pengguna dalam aplikasi kesehatan.",
        img: "/follows-healtalk.png"
      },
      {
        name: "Ask & Post Page",
        desc: "Halaman utama aplikasi untuk melihat diskusi kesehatan, topik populer, serta fitur pencarian agar pengguna lebih mudah menemukan informasi dan berbagi pengalaman kesehatan.",
        img: "/ask-healtalk.png"
      },
      {
        name: "Notification Page",
        desc: "Halaman notifikasi untuk melihat informasi terbaru seperti balasan diskusi, aktivitas pengguna, dan update pada aplikasi.",
        img: "/notification-healtalk.png"
      },
      {
        name: "Profile Page",
        desc: "Halaman profil pengguna untuk melihat dan mengelola informasi akun, postingan, serta aktivitas diskusi kesehatan pengguna.",
        img: "/profile-healtalk.png"
      },
      {
        name: "Search Page",
        desc: "Halaman pencarian untuk menemukan topik kesehatan, pengguna, dan diskusi dengan lebih cepat dan mudah.",
        img: "/search-healtalk.png"
      },
    ]
  }
];

export const experiences = [
  {
    role: "Magang — Web Developer",
    company: "Dinas Tenaga Kerja Kota Batu",
    period: "Juli 2025 – September 2025",
    type: "work",
    points: [
      "Membangun 5 modul utama pada sistem SiJoker (berbasis Laravel & MySQL), mencakup autentikasi, manajemen dokumen, hingga pelaporan.",
      "Memvalidasi dan mengklasifikasikan ±600 data peserta ke dalam 9 program pelatihan menggunakan fungsi analitik tingkat lanjut pada Excel.",
      "Memonitor serta mendokumentasikan pelaksanaan kegiatan pelatihan secara sistematis untuk menjaga efisiensi administrasi instansi."
    ]
  },
  {
    role: "Anggota Ekonomi Kreatif",
    company: "Himpunan Mahasiswa Teknik Informatika — Universitas Muhammadiyah Malang",
    period: "Oktober 2023 – Juli 2024",
    type: "org",
    points: [
      "Mendesain konten promosi media sosial (Instagram) menggunakan Canva",
      "Mengelola komunikasi dan koordinasi antar divisi sebagai bagian tim Humas"
    ]
  },
  {
    role: "Divisi Publikasi, Dekorasi, dan Dokumentasi (PDD)",
    company: "Panitia Dies Natalis Informatika — Universitas Muhammadiyah Malang",
    period: "2024",
    type: "committee",
    points: [
      "Mendesain materi publikasi acara (poster, banner, dan konten media sosial) menggunakan Canva untuk meningkatkan visibilitas kegiatan.",
      "Bertanggung jawab dalam pengelolaan dokumentasi acara berupa foto dan video sebagai arsip serta bahan publikasi."
    ]
  },
  {
    role: "Divisi Humas",
    company: "Panitia Musyawarah Wilayah PERMIKOMNAS Wilayah XI Jawa Timur",
    period: "2024",
    type: "committee",
    points: [
      "Mengelola komunikasi dan koordinasi dengan ±25 perwakilan organisasi mahasiswa dari berbagai kampus di wilayah Jawa Timur.",
      "Berperan dalam menjaga hubungan eksternal serta mendukung kelancaran pelaksanaan kegiatan."
    ]
  },
  {
    role: "Divisi Liaison Officer (LO)",
    company: "Panitia Informatics Connection — Universitas Muhammadiyah Malang ",
    period: "2024",
    type: "committee",
    points: [
      "Mendampingi mahasiswa baru selama rangkaian kegiatan Informatics Connection berlangsung.",
      "Membantu peserta dalam memahami alur kegiatan dan informasi acara.",
      "Mengarahkan peserta agar kegiatan berjalan tertib dan kondusif."
    ]
  },
  {
    role: "Divisi Humas dan Sponsorship",
    company: "Panitia Diklat Kepemimpinan dan Manajemen Organisasi (DKMO) — Universitas Muhammadiyah Malang",
    period: "2024",
    type: "committee",
    points: [
      "Menjalin komunikasi dan kerja sama dengan pihak eksternal untuk mendukung kebutuhan acara.",
      "Bertanggung jawab dalam pencarian serta pengelolaan sponsorship kegiatan."
    ]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Hak Cipta (HKI): Document Scanner & Archive Digital",
    subtitle: "Program Komputer",
    issuer: "Kementerian Hukum RI",
    credentialId: "001077149",
    year: "2025",
    description: "Program komputer pemindai dan arsip dokumen digital yang terdaftar resmi sebagai Hak Cipta. Dikembangkan bersama tim peneliti di bawah naungan Universitas Muhammadiyah Malang.",
    link: "https://bit.ly/hki-okta",
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><text x="12" y="16" font-size="10" text-anchor="middle" fill="currentColor" stroke="none" font-family="Arial" font-weight="bold">C</text></svg>`,
    highlights: ["Terdaftar Resmi di Kemenkumham", "Sistem Arsip Digital Otomatis", "Kolaborasi Tim Peneliti"]
  }
];