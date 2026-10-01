import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Phone, Mail, MapPin, Check, Star, Users, Award, Clock, Sparkles } from 'lucide-react';
import { testimonials, faqs, services, stats } from '../mock';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Landing = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact/`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-emerald-700" />
            <h1 className="text-xl md:text-2xl font-bold text-emerald-900">Smoky Mountain Pooper Scoopers</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-emerald-800 hover:text-emerald-600 transition-colors font-medium">Services</a>
            <a href="#about" className="text-emerald-800 hover:text-emerald-600 transition-colors font-medium">About</a>
            <a href="#contact" className="text-emerald-800 hover:text-emerald-600 transition-colors font-medium">Contact</a>
            <a href="tel:865-343-1142">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-300 hover:shadow-lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHlhcmR8ZW58MHx8fHwxNzgyNDE4MTYzfDA&ixlib=rb-4.1.0&q=85"
            alt="Happy dog in clean yard"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/85 to-emerald-700/80"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
              Your Yard, <span className="text-lime-300">Our Priority</span>
            </h2>
            <p className="text-xl md:text-2xl text-emerald-50 leading-relaxed max-w-2xl mx-auto">
              Professional pet waste removal service for the Smoky Mountain region. Reliable, affordable, and thorough.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact">
                <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-emerald-900 font-bold text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Get Free Quote
                </Button>
              </a>
              <a href="tel:865-343-1142">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 font-bold text-lg px-8 py-6 transition-all duration-300 hover:scale-105">
                  <Phone className="w-5 h-5 mr-2" />865-343-1142
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) =>
            <div key={index} className="text-center space-y-2 transform transition-transform duration-300 hover:scale-110">
                <div className="text-4xl md:text-5xl font-bold text-emerald-800">{stat.value}</div>
                <div className="text-emerald-700 font-medium">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold text-emerald-900">Our Services</h3>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">Flexible plans designed to keep your property clean and healthy</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) =>
            <Card key={service.id} className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${service.popular ? 'border-lime-500 shadow-lg' : 'border-emerald-200'}`}>
                {service.popular &&
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-lime-500 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>
                  </div>
              }
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl text-emerald-900">{service.name}</CardTitle>
                  <CardDescription className="text-emerald-600">{service.description}</CardDescription>
                  <div className="text-3xl font-bold text-emerald-800">{service.pricing}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) =>
                  <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" />
                        <span className="text-emerald-700">{feature}</span>
                      </li>
                  )}
                  </ul>
                  <Button className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 transition-all duration-300 hover:shadow-lg">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-900">Why Choose Us?</h3>
              <p className="text-lg text-emerald-700 leading-relaxed">At Smoky Mountain Pooper Scoopers, we understand that your time is valuable and your yard should be a clean, safe space for your family and pets. With years of experience serving the greater Knox County area, we've become the trusted choice for pet waste removal.

              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                  <Clock className="w-10 h-10 text-emerald-700" />
                  <h4 className="font-bold text-emerald-900">Reliable</h4>
                  <p className="text-sm text-emerald-600">On-time, every time</p>
                </div>
                <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                  <Award className="w-10 h-10 text-emerald-700" />
                  <h4 className="font-bold text-emerald-900">Professional</h4>
                  <p className="text-sm text-emerald-600">Trained & insured</p>
                </div>
                <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                  <Users className="w-10 h-10 text-emerald-700" />
                  <h4 className="font-bold text-emerald-900">Thorough</h4>
                  <p className="text-sm text-emerald-600">No spot missed</p>
                </div>
                <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                  <Sparkles className="w-10 h-10 text-emerald-700" />
                  <h4 className="font-bold text-emerald-900">Affordable</h4>
                  <p className="text-sm text-emerald-600">Fair pricing</p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1716216148534-ca4ae20ac202?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGRvZyUyMHlhcmR8ZW58MHx8fHwxNzgyNDE4MTYzfDA&ixlib=rb-4.1.0&q=85"
                alt="Professional service"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold text-emerald-900">What Our Clients Say</h3>
            <p className="text-xl text-emerald-700">Don't just take our word for it</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) =>
            <Card key={testimonial.id} className="border-2 border-emerald-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="w-5 h-5 fill-lime-500 text-lime-500" />
                  )}
                  </div>
                  <CardTitle className="text-xl text-emerald-900">{testimonial.name}</CardTitle>
                  <CardDescription className="text-emerald-600">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                  <div className="text-sm text-emerald-600 font-medium">{testimonial.service}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold text-emerald-900">Frequently Asked Questions</h3>
            <p className="text-xl text-emerald-700">Everything you need to know</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) =>
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="bg-white border-2 border-emerald-200 rounded-lg px-6 transition-all duration-300 hover:shadow-md">
                <AccordionTrigger className="text-left font-semibold text-emerald-900 hover:text-emerald-700 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-emerald-700 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold">Get In Touch</h3>
              <p className="text-xl text-emerald-100">Ready to enjoy a cleaner yard? Contact us today!</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-white/20">
                  <Phone className="w-6 h-6 text-lime-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <a href="tel:865-343-1142" className="text-emerald-100 hover:text-lime-300 transition-colors text-lg">865-343-1142</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-white/20">
                  <Mail className="w-6 h-6 text-lime-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <a href="mailto:smokymtnpooperscoopers@protonmail.com" className="text-emerald-100 hover:text-lime-300 transition-colors break-all">smokymtnpooperscoopers@protonmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-white/20">
                  <MapPin className="w-6 h-6 text-lime-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Service Area</h4>
                    <p className="text-emerald-100">Knoxville and the greater surrounding counties... 
Roane, Knox, Loudon, Anderson, Grainger, Blount</p>
                  </div>
                </div>
              </div>
              
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-900">Send Us a Message</CardTitle>
                  <CardDescription className="!font-bold !text-sm !text-[#121111]">We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500" />
                      
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500" />
                      
                    </div>
                    <div>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500" />
                      
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your service needs..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 resize-none" />
                      
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-6 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-lime-300" />
                <h4 className="font-bold text-lg text-white">Smoky Mountain Pooper Scoopers</h4>
              </div>
              <p className="text-sm">Professional pet waste removal service for the Smoky Mountain region.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-lime-300 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-lime-300 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-lime-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:865-343-1142" className="hover:text-lime-300 transition-colors">865-343-1142</a></li>
                <li><a href="mailto:smokymtnpooperscoopers@protonmail.com" className="hover:text-lime-300 transition-colors break-all">smokymtnpooperscoopers@protonmail.com</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Smoky Mountain Pooper Scoopers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Landing;