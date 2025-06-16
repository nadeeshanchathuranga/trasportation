import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Phone, CreditCard, Shield, Star, Users, Fuel, Settings, CheckCircle } from 'lucide-react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

export default function BookingPage() {
  const [selectedInsurance, setSelectedInsurance] = useState('basic');
  const [selectedPayment, setSelectedPayment] = useState('card');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Secure your perfect vehicle in just a few steps. All bookings include 24/7 support and comprehensive insurance options.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vehicle Details - Enhanced */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Toyota Prius 2020"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  Premium Choice
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Toyota Prius 2020</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>5 Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Fuel className="w-4 h-4" />
                    <span>Hybrid</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Settings className="w-4 h-4" />
                    <span>Automatic</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Insured</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  Well-maintained hybrid vehicle with excellent fuel efficiency. Perfect for both city driving and long-distance travel.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-bold text-green-600">$45/day</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Weekly Rate</span>
                    <span className="font-bold text-green-600">$280/week</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">Air Conditioned</span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">GPS Navigation</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">Bluetooth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form - Enhanced with Multiple Columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Booking Details
              </h3>

              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+94 77 123 4567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Driver License Number *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="DL123456789"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>21-25</option>
                        <option>26-35</option>
                        <option>36-45</option>
                        <option>46-55</option>
                        <option>55+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Rental Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date *</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time *</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>01:00 PM</option>
                        <option>02:00 PM</option>
                        <option>03:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date *</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Time *</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>01:00 PM</option>
                        <option>02:00 PM</option>
                        <option>03:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>Colombo - Main Office</option>
                        <option>Colombo - Airport</option>
                        <option>Kandy - City Center</option>
                        <option>Galle - Fort Area</option>
                        <option>Negombo - Beach Road</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location *</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>Same as pickup</option>
                        <option>Colombo - Main Office</option>
                        <option>Colombo - Airport</option>
                        <option>Kandy - City Center</option>
                        <option>Galle - Fort Area</option>
                        <option>Negombo - Beach Road</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Insurance Options */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Insurance Coverage
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedInsurance === 'basic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedInsurance('basic')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Basic</h5>
                        <span className="text-sm font-medium text-green-600">Free</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Third-party liability</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Basic theft protection</li>
                      </ul>
                    </div>
                    <div
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedInsurance === 'premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedInsurance('premium')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Premium</h5>
                        <span className="text-sm font-medium text-green-600">$8/day</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Full coverage</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Zero deductible</li>
                      </ul>
                    </div>
                    <div
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedInsurance === 'comprehensive' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedInsurance('comprehensive')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Comprehensive</h5>
                        <span className="text-sm font-medium text-green-600">$15/day</span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Premium + roadside</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Personal accident</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    Payment Method
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment('card')}
                    >
                      <h5 className="font-semibold text-gray-900 mb-2">Credit/Debit Card</h5>
                      <p className="text-sm text-gray-600">Pay securely with your card</p>
                    </div>
                    <div
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment('paypal')}
                    >
                      <h5 className="font-semibold text-gray-900 mb-2">PayPal</h5>
                      <p className="text-sm text-gray-600">Quick payment with PayPal</p>
                    </div>
                  </div>

                  {selectedPayment === 'card' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Additional Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Child seats, GPS, additional driver, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>Google Search</option>
                        <option>Social Media</option>
                        <option>Friend/Family</option>
                        <option>Advertisement</option>
                        <option>Travel Agency</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded" required />
                    <div className="text-sm text-gray-700">
                      <p className="mb-2">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                      <p>I confirm that I am at least 21 years old and hold a valid driver's license.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  >
                    Complete Booking - $315 Total
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    You will receive a confirmation email within 5 minutes
                  </p>
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Secure Booking</h4>
            <p className="text-sm text-gray-600">SSL encrypted payments</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-sm text-gray-600">Round-the-clock assistance</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Best Price</h4>
            <p className="text-sm text-gray-600">Guaranteed lowest rates</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Top Rated</h4>
            <p className="text-sm text-gray-600">4.8/5 customer rating</p>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
