"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const tagline = "create & innovate";
  const INSTAGRAM_URL = "https://instagram.com/crea.vate"; // change to your real handle

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Cache form element to avoid React synthetic event pooling issues after await
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) {
        setSubmitMessage("Thanks! Your message was sent.");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitMessage(data.error || "Sorry, something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      if (currentIndex < tagline.length) {
        setTypedText(tagline.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/creavate-logo.png"
                alt="Creavate - Smart Digital Solutions"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#services" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  What We Offer
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  Our Projects
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <Link href="/team" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  Meet the Team
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a href="#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-gray-100">
                <a href="#about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-50">
                  About Us
                </a>
                <a href="#services" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-50">
                  What We Offer
                </a>
                <a href="#projects" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-50">
                  Our Projects
                </a>
                <Link href="/team" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-50">
                  Meet the Team
                </Link>
                <a href="#contact" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-gray-50">
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-20 -left-20 w-60 h-60 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-30 animate-float-delayed"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-20 animate-float-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl mb-6">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-blue-600">Creavate</span>
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-3xl font-semibold text-blue-600 mb-8 min-h-[2.5rem]">
                {typedText}<span className="animate-pulse">|</span>
              </p>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                We transform ideas into reality through smart digital solutions. 
                From websites to mobile apps, from career development to circuit designs - 
                we&apos;re your complete innovation partner.
              </p>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/#contact" className="group bg-gradient-to-r from-gray-700 to-gray-800 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                  Start Your Project
                  <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <Link href="/team" className="group border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-white">
                  Meet Us
                  <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-left space-y-6">
                <h3 className="text-3xl font-semibold text-gray-900">Our Story</h3>
                <div className="space-y-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Creavate was born from a passion for innovation and helping others succeed. 
                    After graduating, we started by working on senior projects and helping fellow 
                    students bring their ideas to life.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We quickly realized that our team had the skills and dedication to become 
                    professional developers, helping not just students, but businesses and 
                    individuals achieve their digital goals.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Today, we&apos;re proud to offer comprehensive solutions that go beyond 
                    traditional web development - we&apos;re your partners in innovation.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">What Makes Us Different</h3>
                <ul className="space-y-6 text-left">
                  {[
                    "Complete digital solutions from concept to deployment",
                    "Career development services (CVs, portfolios, LinkedIn)",
                    "Private courses for university students",
                    "Student-focused approach with real-world experience"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="text-blue-600 mr-4 text-xl group-hover:scale-110 transition-transform duration-300">✓</span>
                      <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              Comprehensive digital solutions tailored to your needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Website Design & Development",
                  description: "Custom websites that engage visitors and drive results"
                },
                {
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  title: "Mobile App Development",
                  description: "Native and cross-platform mobile applications"
                },
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Circuit Simulation Designs",
                  description: "Advanced electronic circuit design and simulation"
                },
                {
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                  title: "CVs, Resumes & Portfolios",
                  description: "Professional career documents that stand out"
                },
                {
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                  title: "Backend API Integration",
                  description: "Robust backend systems and API development"
                },
                {
                  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                  title: "LinkedIn Profile Optimization",
                  description: "Professional LinkedIn profiles that attract opportunities"
                }
              ].map((service, index) => (
                <div key={index} className="group bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 via-white to-gray-50 p-12 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Special Student Services</h3>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                We understand the challenges university students face. That&apos;s why we offer private courses 
                and mentorship to help you succeed in your academic and professional journey.
              </p>
              <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Learn About Our Courses
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              From student projects to business solutions - see how we bring ideas to life
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  gradient: "from-blue-100 to-gray-100",
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  color: "text-blue-600",
                  title: "E-Commerce Platform",
                  description: "Full-stack e-commerce solution with modern UI/UX"
                },
                {
                  gradient: "from-green-100 to-blue-100",
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  color: "text-green-600",
                  title: "Student Portfolio App",
                  description: "Mobile app for students to showcase their work"
                },
                {
                  gradient: "from-purple-100 to-pink-100",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  color: "text-purple-600",
                  title: "IoT Smart Home System",
                  description: "Connected home automation with circuit design"
                }
              ].map((project, index) => (
                <div key={index} className="group bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-blue-200">
                  <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <svg className={`w-20 h-20 ${project.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={project.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              Ready to start your next project or need help with your career? 
              Let&apos;s discuss how we can help you succeed.
            </p>
            
            {/* Contact Card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-12 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Information */}
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                          <p className="text-gray-600">creavate0@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                          <p className="text-gray-600">Lebanon</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Response Time</h4>
                          <p className="text-gray-600">Within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Form */}
                  <form className="text-left" onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h3>
                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Your Phone Number" 
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Your Message" 
                          rows={4}
                          name="message"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                      {submitMessage && (
                        <p className="text-sm text-gray-600 mt-2">{submitMessage}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <button className="group bg-gradient-to-r from-gray-700 to-gray-800 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Start Your Project
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Get Career Help
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Creavate</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Smart Digital Solutions for your business needs. We create innovative solutions that drive growth and success.
              </p>
              <div className="flex space-x-4">
                {/* Instagram */}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 1017.5 13 5.5 5.5 0 0012 7.5zm0 2A3.5 3.5 0 1115.5 13 3.5 3.5 0 0112 9.5zm5.75-3.25a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z"/>
                  </svg>
                </a>
                {/* Gmail (mailto) */}
                <a href="mailto:creavate0@gmail.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 13.065L1.5 6h21L12 13.065zM3 7.8V18a2 2 0 002 2h14a2 2 0 002-2V7.8l-9 5.8-9-5.8z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-300">Projects</a></li>
                <li><a href="/team" className="text-gray-300 hover:text-white transition-colors duration-300">Team</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Web Development</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Mobile Apps</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Career Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Student Courses</a></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Creavate. All rights reserved. | Smart Digital Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
