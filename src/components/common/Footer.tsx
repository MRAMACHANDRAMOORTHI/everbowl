import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Instagram, Youtube, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../utils/constants'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Ever Bowl</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nourish Naturally. Live Vibrantly. Hand-crafted organic bowls, smoothies, and juices straight from nature to your doorstep.
            </p>
            <p className="text-emerald-400 font-medium text-sm">
              "Taste Nature. Feel the Difference."
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/menu" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm">
                Menu
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm">
                About
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm">
                Contact
              </Link>
              <Link to="/careers" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm">
                Careers
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">{CONTACT_INFO.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">{CONTACT_INFO.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">{CONTACT_INFO.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Share your #EverBowl moments with us!
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Ever Bowl. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}