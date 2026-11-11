export const profile = {
  name: "Okta Ramji Saputra",
  tagline: "Fullstack Developer • Backend & Frontend",
  taglineSub: "Crafting web experiences with clean code & thoughtful design",
  email: "oktaramji10@gmail.com",
  phone: "08885963424",
  linkedin: "https://www.linkedin.com/in/oktaramji/",
  github: "https://github.com/okttaacx",
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
    subtitle: "Job Seekers Networking & Management Information System",
    description: "A web-based platform designed for managing job seeker records for the Batu City Department of Manpower. Developed using the prototyping method to deliver an efficient digital solution for local workforce placement.",
    stack: ["PHP Laravel", "MySQL", "HTML", "CSS"],
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M8 10h12M8 14h8M8 18h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>  <circle cx="21" cy="18" r="4" fill="currentColor"/>  <path d="M19.5 18l1 1 2-2" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Centralized Data Management", "Training Program Monitoring", "Paperless Workflow"],
    github: "https://github.com/okttaacx/tugasakhir.git",
    live: "", 
    features: [
      {
        name: "New Account Registration",
        desc: "Public registration portal for Batu City residents to gain system access, complete with email validation and secure credential creation.",
        img: "/sijoker-register.png" 
      },
      {
        name: "Role-Based Authentication",
        desc: "Secure login gateway with Role-Based Access Control (RBAC) for applicants and administrators to safeguard data privacy and integrity.",
        img: "/sijoker-login.png" 
      },
      {
        name: "Vocational Training Catalog",
        desc: "Interactive catalog presenting available training programs with real-time updates on schedules, venues, and remaining seat quotas.",
        img: "/Daftar_Pelatihan.png"
      },
      {
        name: "Applicant Profile Management",
        desc: "Enables applicants to input and maintain personal details, education history, and skillsets as master talent records in the department database.",
        img: "/sijoker-profil.png"
      },
      {
        name: "Digital Document Upload",
        desc: "Online submission system for administrative files (national ID, educational diplomas, etc.), advancing paperless governance initiatives.",
        img: "/sijoker-upload.png"
      },
      {
        name: "Training Management System (Admin CRUD)",
        desc: "Administrative dashboard for creating, updating, and managing vocational training programs as well as instructor schedules.",
        img: "/sijoker-pelatihan.png"
      },
      {
        name: "Admin Verification & Validation",
        desc: "Document review and verification workflow for administrators to assess and update applicant approval statuses (accepted/rejected).",
        img: "/sijoker-validasi.png"
      }
    ]
  },
  {
    id: 2,
    title: "Vehicle Booking System",
    type: "web",
    subtitle: "Enterprise Fleet & Vehicle Reservation System",
    description: "A web-based fleet reservation and monitoring platform built for a nickel mining enterprise. Features real-time operational dashboards, a two-tier approval workflow, Gantt schedule tracking, fuel consumption monitoring, and routine service scheduling.",
    stack: ["PHP (CodeIgniter 4)", "Angular", "MySQL"],
    color: "green",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M5 17l1.8-6.2A2 2 0 018.7 9.5h10.6a2 2 0 011.9 1.3L23 17" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>  <rect x="3.5" y="17" width="21" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>  <circle cx="8.5" cy="22.5" r="2" fill="currentColor"/>  <circle cx="19.5" cy="22.5" r="2" fill="currentColor"/>  <path d="M8 13.5h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>  <circle cx="21" cy="6" r="4" fill="currentColor"/>  <path d="M19.3 6l1.1 1.1L22.7 5" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Two-Tier Approval Workflow", "Weekly Gantt Chart Calendar", "Fuel & Service Monitoring"],
    github: "https://github.com/okttaacx/fullstack-vehicle-booking",
    live: "",
    features: [
      {
        name: "Login & Authentication",
        desc: "Role-based authentication portal (Admin and Approver) ensuring that all actions and data views strictly adhere to assigned access privileges.",
        img: "/vbs-login.png"
      },  
      {
        name: "Real-Time Monitoring Dashboard",
        desc: "Live operational hub displaying vehicle counts, total bookings, pending approvals, and average fuel consumption, complemented by 7-day trend graphs, fleet ownership metrics, availability rates, and maintenance reminders.",
        img:  "/vbs-dashboard.png"
      },
      {
        name: "Fleet & Vehicle Management",
        desc: "Searchable and filterable fleet registry categorized by vehicle type and ownership (company-owned vs. leased), providing insights on fuel economy and maintenance schedules, along with full CRUD operations.",
        img:  "/vbs-kendaraan.png"
      },
      {
        name: "Admin Booking Management",
        desc: "Centralized reservation management console tracking booking codes, vehicles, drivers, requesters, and travel periods, complete with status indicators, filtering, and Excel report export by date range.",
        img:  "/vbs-pemesanan.png"
      },
      {
        name: "Vehicle Utilization Calendar",
        desc: "Weekly Gantt chart visualizing schedules across all vehicles in individual timeline rows, color-coded by approval and trip status (Pending L1, Pending L2, Approved, Completed) with intuitive date navigation.",
        img:  "/vbs-kalender.png"
      },
      {
        name: "Driver Management",
        desc: "Comprehensive driver directory detailing contact info, driver license numbers, automated expiration alerts, trip assignment history, and CRUD management.",
        img : "/vbs-driver.png"
      },
      {
        name: "User & Approver Administration",
        desc: "Dedicated administrative portal to manage system accounts, edit user roles (Admin/Approver), and assign multi-tier approval levels (Level 1 or Level 2).",
        img: "/vbs-user.png"
      },
      {
        name: "Audit & Activity Log",
        desc: "Comprehensive system audit trail recording critical actions (logins, reservations, maintenance updates) with actor identification, timestamps, and IP addresses, accompanied by keyword search and date filters.",
        img: "/vbs-riwayat.png"
      },
      {
        name: "Self-Service Password Management",
        desc: "Secure self-service password update form requiring current password verification prior to saving new credentials.",
        img: "/vbs-ganti-password.png"
      },
      {
        name: "In-App Notifications",
        desc: "Floating sidebar notification bell with unread count badges and periodic polling, alerting admins when bookings are ready for completion sign-off with direct navigation links.",
        img: "/vbs-notifikasi.png"
      },
      {
        name: "Multi-Tier Approval Portal",
        desc: "Dedicated interface for Approver roles to review booking requests assigned to their tier, displaying trip itineraries, travel purposes, and inline one-click Approve/Reject actions.",
        img: "/vbs-approval.png"
      },
      {
        name: "Excel Report Generation",
        desc: "Exportable .xlsx operational reports filtered by date range, detailing starting/ending odometers, trip distances, refueled quantities, and completion logs.",
        img: "/vbs-excel.png"
      },
    ]
  },
  {
    id: 3,
    title: "Toko Listrik Berkah",
    type: "web",
    subtitle: "POS & Retail Inventory Management System",
    description: "A modern web-based Point of Sale (POS) and inventory management system designed for electrical equipment retailers. Engineered for fast execution, streamlined stock control, and automated financial reporting.",
    stack: ["React.js", "Node.js", "MongoDB"],
    color: "yellow",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M4 20V12l10-7 10 7v8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>  <rect x="10" y="15" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M12 15v9" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>  <circle cx="14" cy="11" r="2" stroke="currentColor" stroke-width="1.4" fill="none"/>  <path d="M4 12h20" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`,
    highlights: ["Integrated Sales Reporting", "Dynamic Transaction Filters", "Cashier & Inventory Control"],
    github: "https://github.com/okttaacx/toko_berkah_listrik_blitar.git",
    live: "",
    features: [
      {
        name: "Multi-Role Authentication",
        desc: "Secure user authentication dividing roles between Admin and Cashier, ensuring strict access boundaries and structured retail store operations.",
        img: "/toko-laporan.png"
      },
      {
        name: "Cashier Registration & Onboarding",
        desc: "Dedicated cashier registration module that auto-provisions staff accounts with appropriate permissions, streamlining onboarding while safeguarding administrative settings.",
        img: "/toko-register-kasir.png"
      },
      {
        name: "Point of Sale (POS) Terminal",
        desc: "Fast-paced cashier checkout terminal enabling instant product search, real-time cart adjustments, and seamless payment processing.",
        img: "/toko-transaksi.png"
      },
      {
        name: "Admin Control Panel",
        desc: "Centralized back-office console for inventory supervision, featuring product CRUD operations, stock-level monitoring, and real-time operational insights.",
        img: "/toko-dashboard-admin.png"
      },
      {
        name: "Product & Stock Inventory",
        desc: "Structured product catalog displaying real-time stock levels, pricing, and fast-action tools for editing and deleting inventory entries.",
        img: "/toko-daftar-barang.png"
      },
      {
        name: "Transaction History & Ledger",
        desc: "Comprehensive transaction history log with dynamic date, month, and year filters, as well as on-demand PDF receipt printing.",
        img: "/toko-riwayat-transaksi.png"
      },
      {
        name: "Sales Analytics & Performance",
        desc: "In-depth analytics dashboard visualizing gross revenue, transaction counts, units sold, and best-selling product rankings.",
        img: "/toko-analitik.png"
      },
      {
        name: "Digital Invoices & Receipts",
        desc: "Automated digital receipt generation providing itemized transaction breakdowns ready for instant printing or PDF export.",
        img: "/toko-nota.png"
      }
    ]
  },
  {
    id: 4,
    title: "FlowBoost",
    type: "mobile",
    subtitle: "Motivational Mobile Application",
    description: "A Flutter-based mobile application offering curated motivational video content. Designed in Figma with a user-centric approach, featuring modern responsive interfaces.",
    stack: ["Flutter", "Figma", "Dart"],
    color: "coral",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect x="6" y="3" width="16" height="22" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M10 8h8M10 12h8M10 16h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>  <circle cx="18" cy="20" r="3.5" fill="currentColor"/>  <path d="M16.8 20l.8.8 1.6-1.6" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M9 3.5 C9 3.5 14 5.5 19 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
    highlights: ["Figma UI/UX Design", "Integrated Video Playback", "Responsive & Intuitive UX"],
    github: "https://github.com/Firdig/Flowboost-mobileapp.git",
    figma: "https://www.figma.com/design/DKMYWMdf6pzBcBUszDaVzl/Untitled?node-id=0-1&p=f",
    live: "",
    features: [
      {
        name: "Topic & Category System",
        desc: "Allows users to discover inspiring content tailored to specific themes through an intuitive, categorized navigation structure.",
        img: "/kategori_vidio.png"
      },
      {
        name: "Curated Video Feed",
        desc: "Displays an organized catalog of motivational videos, enabling users to easily browse and select inspiring content.",
        img: "/daftar_vidio.png"
      },
      {
        name: "Seamless Playback Experience",
        desc: "Smooth, responsive media player with a minimalist UI for distraction-free content viewing.",
        img: "/tonton_vidio.png"
      },
      {
        name: "Saved & Favorite Collection",
        desc: "Personal bookmarking feature allowing users to curate and quickly revisit their favorite inspirational videos.",
        img: "/vidio_favorit.png"
      },
      {
        name: "Social Sharing Integration",
        desc: "Enables seamless sharing of motivational clips across various social media platforms to spread positive inspiration.",
        img: "/share_vidio.png"
      },
      {
        name: "Offline Video Downloads",
        desc: "Local download capability allowing users to enjoy motivational content offline without requiring an active internet connection.",
        img: "/downlod_vidio.png"
      }
    ]
  },
  {
    id: 5,
    title: "SINTA 3 Journal Publication",
    subtitle: "Peer-Reviewed Scientific Research",
    description: "Academic research paper on the development of a web-based employment networking information system using the prototyping methodology. Published in a nationally accredited SINTA 3 indexed journal.",
    stack: ["Research", "Web Development", "Prototyping"],
    color: "sage",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M7 4h10l4 4v16a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5" fill="none"/>  <path d="M17 4v4h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>  <path d="M10 12h8M10 15.5h8M10 19h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>  <circle cx="20" cy="20" r="4" fill="currentColor"/>  <path d="M18 20h4M20 18v4" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    highlights: ["SINTA 3 Nationally Indexed", "Prototyping Methodology", "Employment Information Systems"],
    github: null,
    live: "https://jurnal.polbeng.ac.id/index.php/ISI/article/view/1374"
  },
  {
    id: 6,
    title: "Toko Sembako Berkah",
    type: "web",
    subtitle: "UI/UX E-Commerce Website Design",
    description: "End-to-end UI/UX design for the “Toko Sembako Berkah” online grocery platform crafted in Figma. Focused on clean aesthetics, responsive layouts, and an intuitive user experience to optimize online grocery shopping.",
    stack: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3H4v5h5V3zM24 3h-5v5h5V3zM9 20H4v5h5v-5zM24 20h-5v5h5v-5zM17 10h-6v8h6v-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Modern UI/UX Design", "Responsive & User-Centric", "Interactive E-Commerce Prototype"],
    github: null,
    figma: "https://www.figma.com/design/SXlrwVddViJ6ICwKUKX6Tw/Untitled?node-id=0-1&t=iwqOD0uJYcW9vuZN-1",
    live: "",
    features: [
      {
        name: "Customer Login Page",
        desc: "A clean and modern sign-in interface designed for quick and friction-free user authentication.",
        img: "/login-user-sembako.png"
      },
      {
        name: "User Registration Page",
        desc: "A responsive onboarding screen for new shoppers, featuring an intuitive form layout and a direct entry point for administrators.",
        img: "/register-sembako.png"
      },
      {
        name: "Admin Login Page",
        desc: "A professional, dedicated administrator sign-in page providing secure access to the store's backend dashboard.",
        img: "/admin-sembako.png"
      },
      {
        name: "Customer Storefront & Home",
        desc: "The primary discovery landing page featuring categorized items, recommended grocery essentials, and instant filters for effortless product discovery.",
        img: "/home-user-sembako.png"
      },
      {
        name: "Product Categories Page",
        desc: "Structured category directory helping shoppers quickly explore staple goods grouped by type and department.",
        img: "/kategori-user-sembako.png"
      },
      {
        name: "Product Detail Page",
        desc: "Comprehensive product view showcasing high-resolution photos, pricing details, specifications, and a direct 'Add to Cart' CTA.",
        img: "/detail-produk-user-sembako.png"
      },
      {
        name: "Shopping Cart Page",
        desc: "Interactive cart interface allowing users to adjust quantities, review selected groceries, and preview total costs before checkout.",
        img: "/keranjang-user-sembako.png"
      },
      {
        name: "Checkout & Payment Flow",
        desc: "Streamlined multi-step checkout screen encompassing delivery address inputs, order summaries, and payment method selection.",
        img: "/checkout-pembayaran-sembako.png"
      },
      {
        name: "Order History & Tracking",
        desc: "Customer transaction ledger displaying past purchases, delivery fulfillment statuses, and itemized receipts.",
        img: "/riwayat-order-sembako.png"
      },
      {
        name: "User Profile Management",
        desc: "Personal account settings page for managing contact information, shipping addresses, and personal credentials.",
        img: "/profil-user-sembako.png"
      },
      {
        name: "Admin Analytics Dashboard",
        desc: "Back-office management dashboard summarizing key retail indicators such as total inventory, monthly gross revenue, and sales trend graphs.",
        img: "/dashboard-admin.png"
      },
      {
        name: "Product Management Page",
        desc: "Comprehensive inventory management portal enabling administrators to add, modify, catalog, and remove grocery stock listings.",
        img: "/product-management-admin.png"
      }
    ]
  },
  {
    id: 7,
    title: "HealthTalk",
    type: "mobile",
    subtitle: "Healthcare Mobile App UI/UX Design",
    description: "UI/UX design for the “HealthTalk” mobile application created in Figma, prioritizing intuitive navigation, accessibility, and modern visual design. Conceived as a collaborative digital health platform where users ask wellness questions, share experiences, and read verified health articles.",
    stack: ["Figma", "Mobile UI", "UX Research"],
    color: "coral",
    icon: `<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 9v10M9 14h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlights: ["Digital Health Community", "Intuitive Navigation", "Modern Mobile UI"],
    github: null,
    figma: "https://www.figma.com/design/Qm0lPxvVrXwBhvycaGSQaM/HealthTalk?node-id=0-1&p=f&t=bzrmg0Ulcu6pE4gX-0",
    live: "",
    features: [
      {
        name: "Splash Screen",
        desc: "Minimalist introductory screen presenting the app's brand identity and logo before seamlessly transitioning into the onboarding flow.",
        img: "/healtalk-android.png"
      },
      {
        name: "Sign In Page",
        desc: "A sleek, uncluttered login interface allowing returning users to quickly access community forums and health discussions.",
        img: "/login-healtalk.png"
      },
      {
        name: "Sign Up & Onboarding",
        desc: "A responsive registration interface designed to make the account creation process quick, clear, and user-friendly.",
        img: "/signup-healtalk.png"
      },
      {
        name: "Community Home & Feed",
        desc: "Dynamic home feed presenting trending healthcare discussions, popular topics, and quick search tools to connect users with shared medical experiences.",
        img: "/home-popular-healtalk.png"
      },
      {
        name: "Following & Subscribed Feed",
        desc: "Dedicated timeline delivering the latest posts and answers from trusted doctors, specialists, and followed community members.",
        img: "/follows-healtalk.png"
      },
      {
        name: "Ask Question & Create Post",
        desc: "Interactive discussion creator allowing users to ask health-related questions, add relevant tags, and solicit feedback from the community.",
        img: "/ask-healtalk.png"
      },
      {
        name: "Notifications & Activity Center",
        desc: "Centralized notification hub tracking discussion replies, community upvotes, user interactions, and app updates.",
        img: "/notification-healtalk.png"
      },
      {
        name: "User Profile Page",
        desc: "Comprehensive profile screen displaying user biography, active discussions, bookmarked answers, and community engagement history.",
        img: "/profile-healtalk.png"
      },
      {
        name: "Explore & Search Page",
        desc: "Advanced search interface for locating medical topics, certified contributors, and related forum discussions quickly.",
        img: "/search-healtalk.png"
      },
    ]
  }
];

export const experiences = [
    {
    role: "Full-Stack Developer (Contract)",
    company: "Sagara Asia Teknologi",
    period: "September 2026 – Present",
    type: "work",
    points: [
      "Built an e-commerce platform using Vue 3, TypeScript, NestJS, and PostgreSQL, translating Figma designs into responsive interfaces.",
      "Engineered core B2B workflows for System Distributor, covering business catalogs, order processing, and admin dashboards.",
      "Integrated frontend apps with NestJS REST APIs and maintained the CEO Suite room booking system."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Batu City Department of Manpower (Disnaker Kota Batu)",
    period: "July 2025 – September 2025",
    type: "work",
    points: [
      "Engineered 5 core modules for the SiJoker platform using Laravel and MySQL, covering authentication, digital document management, and reporting.",
      "Validated and classified ~600 applicant records across 9 vocational training programs utilizing advanced Excel analytical functions.",
      "Systematically monitored and documented training sessions, enhancing institutional workflow efficiency and record accuracy."
    ]
  },
  {
    role: "Creative Economy Division Member",
    company: "Informatics Student Association — University of Muhammadiyah Malang",
    period: "October 2023 – July 2024",
    type: "org",
    link: "https://drive.google.com/file/d/1LTTDYLefdhCdfgxiDzc3XIwTNAG4wVUo/view?usp=sharing",
    points: [
      "Designed engaging promotional content for social media channels (Instagram) using Canva to boost student reach.",
      "Facilitated cross-divisional communication and coordinated public relations initiatives to support organization-wide programs."
    ]
  },
  {
    role: "Publication, Decoration & Documentation (PDD) Staff",
    company: "Informatics Anniversary Committee — University of Muhammadiyah Malang",
    period: "2024",
    type: "committee",
    points: [
      "Designed event promotional assets (posters, banners, and social media creative) using Canva to maximize event awareness.",
      "Directed event photography and videography documentation for institutional archives and post-event publication materials."
    ]
  },
  {
    role: "Public Relations Staff",
    company: "PERMIKOMNAS East Java Region XI Congress Committee",
    period: "2024",
    type: "committee",
    points: [
      "Coordinated communications with ~25 computer science student organization delegations across universities in East Java.",
      "Maintained external stakeholder relationships to ensure the smooth, professional execution of regional congress agendas."
    ]
  },
  {
    role: "Liaison Officer (LO)",
    company: "Informatics Connection Committee — University of Muhammadiyah Malang",
    period: "2024",
    type: "committee",
    points: [
      "Mentored and guided incoming freshmen throughout the Informatics Connection orientation activities.",
      "Facilitated event orientations, guiding participants through program schedules and activity workflows.",
      "Maintained event discipline and crowd management to ensure a structured and conducive learning environment."
    ]
  },
  {
    role: "Public Relations & Sponsorship Staff",
    company: "Leadership & Organizational Management Training (DKMO) Committee — University of Muhammadiyah Malang",
    period: "2024",
    type: "committee",
    points: [
      "Established strategic communication and negotiated partnerships with external parties to meet event logistical and operational needs.",
      "Spearheaded outreach efforts to identify, secure, and manage sponsor relationships and funding."
    ]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Full Stack Open",
    subtitle: "International Certificate",
    issuer: "University of Helsinki",
    year: "2026",
    description:
      "Successfully completed the 5 ECTS Full Stack Open online curriculum with the highest distinction (Grade 5). Acquired in-depth expertise in modern full-stack development covering React, Node.js, Express, MongoDB, REST APIs, token authentication, and automated application testing.",
    link: "https://bit.ly/sertifikat-fullstackopen",
    color: "green",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M8 12l2.5 2.5L16 9"/></svg>`,
    highlights: [
      "Graduated with Grade 5 (Top Honor)",
      "React & Node.js",
      "MongoDB & REST APIs",
      "Authentication & Testing"
    ]
  },
  {
    id: 2,
    title: "JavaScript Essentials 1 & 2",
    subtitle: "Course Completion Certificates",
    issuer: "Cisco Networking Academy",
    year: "2026",
    description:
      "Completed the two-part JavaScript course series by Cisco Networking Academy, mastering fundamental through intermediate programming concepts including functions, objects, arrays, DOM manipulation, and asynchronous programming.",
    link: "https://bit.ly/sertifikat-javascript",
    color: "yellow",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M8 17c0 0 1.5-1 1.5-3.5V10"/>
    <path d="M12.5 10v4.5c0 1.5.8 2.5 2.5 2.5s2.5-1 2.5-2.5"/>
  </svg>`,
    highlights: [
      "JavaScript Fundamentals",
      "DOM Manipulation",
      "Asynchronous Programming",
      "Cisco Networking Academy"
    ]
  },
  {
    id: 3,
    title: "Intellectual Property (Copyright): Document Scanner & Digital Archive",
    subtitle: "Computer Software Copyright",
    issuer: "Ministry of Law of the Republic of Indonesia",
    credentialId: "001077149",
    year: "2026",
    description:
      "Officially registered computer software copyright for a digital document scanning and archiving platform. Developed collaboratively with an academic research team at the University of Muhammadiyah Malang.",
    link: "https://bit.ly/hki-okta",
    color: "blue",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><text x="12" y="16" font-size="10" text-anchor="middle" fill="currentColor" stroke="none" font-family="Arial" font-weight="bold">C</text></svg>`,
    highlights: [
      "Officially Registered with Ministry of Law",
      "Automated Digital Archiving",
      "Collaborative Research Team"
    ]
  },
  {
    id: 4,
    title: "Test of Academic English Proficiency (TAEP)",
    subtitle: "English Language Proficiency Certificate",
    issuer: "University of Muhammadiyah Malang",
    credentialId: "SPs7K-MZhm1bY",
    year: "2026",
    description:
      "English language proficiency credential issued by the UMM Language Center with a TAEP score of 455, assessing Listening, Grammar, and Reading competencies for professional and academic communication.",
    link: "https://drive.google.com/file/d/11IHPsPA_aj3vKfQlHs_tOewb0yiDhxA1/view?usp=sharing",
    color: "purple",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M8 8h6M8 16h4"/></svg>`,
    highlights: [
      "Score 455 (Proficient)",
      "Listening, Grammar & Reading",
      "UMM Language Center",
      "Valid through 2028"
    ]
  }
];