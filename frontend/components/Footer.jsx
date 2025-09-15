import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-primary-500">
              Boganto
            </div>
            <p className="text-navy-300 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Your premium destination for literary excellence and book discovery.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-400 hover:text-primary-500 transition-colors duration-200 p-2 hover:bg-navy-800 rounded-full"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-400 hover:text-primary-500 transition-colors duration-200 p-2 hover:bg-navy-800 rounded-full"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-400 hover:text-primary-500 transition-colors duration-200 p-2 hover:bg-navy-800 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-400 hover:text-primary-500 transition-colors duration-200 p-2 hover:bg-navy-800 rounded-full"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-1 sm:space-y-2">
              <Link
                href="/"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Home
              </Link>
              <Link
                href="/featured"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Featured
              </Link>
              <Link
                href="/latest"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Latest
              </Link>
              <Link
                href="/"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Blog
              </Link>
              <Link
                href="/admin"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white">Popular Categories</h3>
            <div className="space-y-1 sm:space-y-2">
              <Link
                href="/category/fiction"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Fiction
              </Link>
              <Link
                href="/category/science"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Science
              </Link>
              <Link
                href="/category/history"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                History
              </Link>
              <Link
                href="/category/self-help"
                className="block text-navy-300 hover:text-primary-500 transition-colors duration-200 text-sm py-1"
              >
                Self Help
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-navy-300 text-sm">
                  123 Library Avenue, Book City
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-navy-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span className="text-navy-300 text-sm">
                  hello@boganto.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-navy-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col items-center text-center space-y-4 sm:flex-row sm:justify-between sm:text-left sm:space-y-0">
            <p className="text-navy-400 text-xs sm:text-sm">
              © 2024 Boganto. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <Link
                href="/privacy"
                className="text-navy-400 hover:text-primary-500 text-xs sm:text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-navy-400 hover:text-primary-500 text-xs sm:text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer