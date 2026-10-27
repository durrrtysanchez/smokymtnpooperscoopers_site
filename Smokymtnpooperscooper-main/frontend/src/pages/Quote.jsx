import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);\n  const [submitting, setSubmitting] = useState(false);\n  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', propertyType: 'Residential', dogs: '1', frequency: 'Weekly', service: 'Recurring yard cleanup', message: ''
  });

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/smokymtnpooperscoopers@protonmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          propertyType: formData.propertyType,
          dogs: formData.dogs,
          frequency: formData.frequency,
          service: formData.service,
          message: formData.message || 'None',
          _subject: `New Pooper Scoopers Quote Request - ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _url: window.location.href
        })
      });

      if (!response.ok) throw new Error('The quote service returned an error.');

      const result = await response.json();
      if (result.success === false) throw new Error(result.message || 'The quote could not be submitted.');

      setSubmitted(true);
    } catch (submissionError) {
      setError('We could not submit the quote right now. Please call 865-343-1142 or email smokymtnpooperscoopers@protonmail.com.');
      console.error(submissionError);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center mb-6"><Check className="w-8 h-8 text-emerald-700" /></div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-950">Your quote request is ready.</h1>
          <p className="mt-4 text-emerald-700">Your quote request was submitted successfully. We will follow up using the contact information you provided.</p>
          <a href="tel:865-343-1142" className="inline-flex items-center mt-8 px-6 py-3 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800"><Phone className="w-5 h-5 mr-2" /> Call 865-343-1142</a>
          <div className="mt-6"><Link to="/" className="text-emerald-700 font-semibold hover:underline">Return to home</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">\n      <SEO title="Get a Free Pet Waste Removal Quote | Knoxville TN" description="Request a fast quote for residential or commercial pet waste removal in Knoxville and East Tennessee." path="/quote" />
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-emerald-950"><Sparkles className="w-7 h-7 text-emerald-700" /> Smoky Mountain Pooper Scoopers</Link>
          <a href="tel:865-343-1142" className="hidden sm:flex items-center gap-2 text-emerald-800 font-bold"><Phone className="w-4 h-4" /> 865-343-1142</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <Link to="/" className="inline-flex items-center text-emerald-100 hover:text-white mb-8"><ArrowLeft className="w-4 h-4 mr-2" /> Back to home</Link>
              <div className="inline-flex items-center gap-2 bg-lime-400 text-emerald-950 px-4 py-2 rounded-full font-extrabold mb-6"><Sparkles className="w-4 h-4" /> FREE QUOTE</div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">Tell us about your yard.<br /><span className="text-lime-300">We'll handle the mess.</span></h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mt-6">Get a fast, no-pressure quote for residential or commercial pet waste removal in the Knoxville and East Tennessee area.</p>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm md:text-base text-emerald-50"><span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" /> No contracts required</span><span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" /> Flexible scheduling</span><span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" /> Local service</span></div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6 md:p-10">
              <div className="mb-8"><h2 className="text-2xl md:text-3xl font-bold text-emerald-950">Request your quote</h2><p className="text-slate-600 mt-2">The more details you provide, the more accurately we can quote your service.</p></div>
              <div className="grid md:grid-cols-2 gap-5">
                <label className="font-semibold text-slate-700">Name<input required name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-emerald-600" placeholder="Your name" /></label>
                <label className="font-semibold text-slate-700">Phone<input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-emerald-600" placeholder="865-555-5555" /></label>
                <label className="font-semibold text-slate-700">Email<input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-emerald-600" placeholder="you@example.com" /></label>
                <label className="font-semibold text-slate-700">Service address<input required name="address" value={formData.address} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-emerald-600" placeholder="Street, city, ZIP" /></label>
                <label className="font-semibold text-slate-700">Property type<select name="propertyType" value={formData.propertyType} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal bg-white"><option>Residential</option><option>Apartment / Multi-Family</option><option>HOA / Community</option><option>Commercial</option><option>Dog Park / Recreation</option></select></label>
                <label className="font-semibold text-slate-700">Number of dogs<select name="dogs" value={formData.dogs} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal bg-white"><option>1</option><option>2</option><option>3</option><option>4+</option><option>Multiple households / property</option></select></label>
                <label className="font-semibold text-slate-700">Service frequency<select name="frequency" value={formData.frequency} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal bg-white"><option>Weekly</option><option>Twice weekly</option><option>Bi-weekly</option><option>Monthly</option><option>One-time cleanup</option><option>Not sure yet</option></select></label>
                <label className="font-semibold text-slate-700">What do you need?<select name="service" value={formData.service} onChange={handleChange} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal bg-white"><option>Recurring yard cleanup</option><option>Initial / deep cleanup</option><option>Pet waste station service</option><option>Commercial property cleanup</option><option>Multiple properties</option></select></label>
              </div>
              <label className="block mt-5 font-semibold text-slate-700">Anything else we should know?<textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-emerald-600" placeholder="Gate instructions, yard size, number of stations, special requests, etc." /></label>
              <Button type="submit" size="lg" className="w-full mt-6 bg-lime-500 hover:bg-lime-600 text-emerald-950 font-black text-lg py-6"><Send className="w-5 h-5 mr-2" /> Get My Free Quote</Button>
              <p className="text-xs text-slate-500 text-center mt-3">Submitting opens your email app with the quote request prepared for us.</p>
            </form>

            <aside className="space-y-5">
              <div className="bg-emerald-950 text-white rounded-3xl p-7 shadow-xl"><p className="text-lime-300 font-black uppercase tracking-wide">Weekly special</p><div className="text-5xl font-black mt-2">$14.99</div><p className="text-emerald-100 mt-2">Weekly service offer*</p><div className="border-t border-emerald-800 my-5" /><p className="font-bold">First cleaning FREE</p><p className="text-sm text-emerald-200 mt-1">when you sign up for recurring weekly service.</p><p className="text-xs text-emerald-300 mt-4">*Final pricing can vary by property size, pet count and service requirements.</p></div>
              <div className="bg-white rounded-3xl border border-emerald-100 p-7 shadow-sm"><h3 className="font-bold text-xl text-emerald-950">Prefer to talk?</h3><p className="text-slate-600 mt-2">Call or email us directly and we'll help you figure out the right service.</p><a href="tel:865-343-1142" className="flex items-center gap-3 mt-5 text-emerald-800 font-bold"><Phone className="w-5 h-5" /> 865-343-1142</a><a href="mailto:smokymtnpooperscoopers@protonmail.com" className="flex items-start gap-3 mt-4 text-emerald-800 font-semibold break-all"><Mail className="w-5 h-5 flex-shrink-0 mt-1" /> smokymtnpooperscoopers@protonmail.com</a><div className="flex items-start gap-3 mt-4 text-slate-600"><MapPin className="w-5 h-5 flex-shrink-0 mt-1" /> Knoxville & East Tennessee</div></div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Quote;
