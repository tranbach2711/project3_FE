import React from "react";
import '../index.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-16 sm:py-24 lg:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-2xl font-semibold">Contact Us</h4>
            <p className="mt-4">ABC NGO</p>
            <p>205 Doi Can, District Ba Dinh, City Ha Noi</p>
            <p>Email: contact@abcngo.org</p>
            <p>Phone: +84 123 456 789</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/projects" className="text-gray-300 hover:text-white">Projects</a></li>
              <li><a href="/volunteer" className="text-gray-300 hover:text-white">Volunteer</a></li>
              <li><a href="/donate" className="text-gray-300 hover:text-white">Donate</a></li>
              <li><a href="/news" className="text-gray-300 hover:text-white">News & Events</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-2xl font-semibold">Connect</h4>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebook className="text-white text-2xl hover:text-indigo-500" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <FaTwitter className="text-white text-2xl hover:text-indigo-500" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram className="text-white text-2xl hover:text-indigo-500" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <FaLinkedin className="text-white text-2xl hover:text-indigo-500" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-2xl font-semibold">Subscribe to Our Newsletter</h4>
            <p className="mt-4 text-gray-300">Get the latest updates from us.</p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 text-center text-gray-400">
          <p>&copy; 2025 ABC NGO. All rights reserved.</p>
          <a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a> |
          <a href="/terms-of-use" className="text-gray-300 hover:text-white"> Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
