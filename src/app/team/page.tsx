"use client";
import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Link to Home */}
            <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/creavate-logo.png"
                alt="Creavate - Smart Digital Solutions"
                width={150}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Back to Home Button */}
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Page Title */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet the <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate minds behind Creavate - dedicated to bringing your ideas to life
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {/* Team Member 1 Card */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-200">
            <div className="text-center">
              {/* Profile Photo */}
              <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full mx-auto mb-6 overflow-hidden relative">
                <Image
                  src="/team/mohamad.jpg"
                  alt="Mohammed badran"
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Name and Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mohammed badran</h2>
              <p className="text-blue-600 font-semibold text-lg mb-4">Co-Founder & Developer</p>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                Passionate about creating innovative digital solutions and helping students succeed. 
                Specializes in web development and mobile applications.
              </p>
            </div>
          </div>

          {/* Team Member 2 Card */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-200">
            <div className="text-center">
              {/* Profile Photo */}
              <div className="w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mx-auto mb-6 overflow-hidden relative">
                <Image
                  src="/team/partner.jpg"
                  alt="Maha Al Jazzar"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              
              {/* Name and Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Maha Al Jazzar</h2>
              <p className="text-green-600 font-semibold text-lg mb-4">Co-Founder & Designer</p>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                Creative mind focused on user experience and design excellence. 
                Expert in circuit design and technical solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 mb-8">
            Ready to work together on your next project?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/#contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Start Your Project
            </Link>
            <Link 
              href="/" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
