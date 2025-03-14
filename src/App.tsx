import React, { useState } from 'react';
import { BookOpen, Users, MessageSquare, GraduationCap, Mail, Phone, MapPin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from './lib/supabase';

type FormData = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
};

function App() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      const { error } = await supabase
        .from('leads')
        .insert([data]);

      if (error) throw error;

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your form. Please try again.');
    }
  };

  const socialLinks = {
    whatsapp: "https://wa.me/7823065134",
    instagram: "https://instagram.com/your-handle",
    youtube: "https://youtube.com/@BachelorsLife03"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-[#b01c54]" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ITM Student Hub <span className="text-sm font-normal text-gray-500">(Unofficial)</span></h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="h-5 w-5" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                <Youtube className="h-5 w-5" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-[#b01c54]">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Get Real Insights from Current ITM Students
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-pink-100">
            Connect with students who are living the ITM experience right now
          </p>
          <div className="mt-8">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn bg-white text-[#b01c54] hover:bg-gray-50"
            >
              Chat with Current Students
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-100">
            <Users className="h-8 w-8 text-[#b01c54] mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Community</h3>
            <p className="text-gray-600">
              Connect with current ITM students and learn from their experiences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-100">
            <GraduationCap className="h-8 w-8 text-[#b01c54] mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Campus Life</h3>
            <p className="text-gray-600">
              Get insights about classes, faculty, facilities, and daily life at ITM
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-100">
            <MessageSquare className="h-8 w-8 text-[#b01c54] mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct Support</h3>
            <p className="text-gray-600">
              Get honest answers about courses, admission process, and student life
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="mt-12 sm:mt-16 bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Connect with Current Students</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#b01c54] focus:ring-[#b01c54]"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#b01c54] focus:ring-[#b01c54]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#b01c54] focus:ring-[#b01c54]"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Interested Course</label>
              <select
                {...register("course", { required: "Please select a course" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#b01c54] focus:ring-[#b01c54]"
              >
                <option value="">Select a course</option>
                <option value="btech">B.Tech</option>
                <option value="mtech">M.Tech</option>
                <option value="mba">MBA</option>
                <option value="bba">BBA</option>
                <option value="other">Other</option>
              </select>
              {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Questions for Current Students (Optional)</label>
              <textarea
                {...register("message")}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#b01c54] focus:ring-[#b01c54]"
                placeholder="Ask anything about campus life, courses, or student experience..."
              />
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Connecting...' : 'Connect with Students'}
              </button>
            </div>

            {isSubmitted && (
              <div className="text-center text-green-600 font-medium">
                Thank you! A current student will contact you soon.
              </div>
            )}

            {submitError && (
              <div className="text-center text-red-600 font-medium">
                {submitError}
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-center space-x-4">
            <Phone className="h-6 w-6 text-[#b01c54] flex-shrink-0" />
            <div>
              <h3 className="font-medium">Call Us</h3>
              <p className="text-gray-600">+91 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="h-6 w-6 text-[#b01c54] flex-shrink-0" />
            <div>
              <h3 className="font-medium">Email Us</h3>
              <p className="text-gray-600">info@itmhub-unofficial.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-[#b01c54] flex-shrink-0" />
            <div>
              <h3 className="font-medium">Visit Us</h3>
              <p className="text-gray-600">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 ITM Student Hub (Unofficial). A student-run resource platform.</p>
            <p className="mt-2">
              This is an independent platform run by students for prospective students.
              We are not affiliated with ITM Skills University or any of its institutions.
              All information provided is based on student experiences.
            </p>
            <div className="mt-6 flex justify-center space-x-6">
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                <Youtube className="h-5 w-5" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;