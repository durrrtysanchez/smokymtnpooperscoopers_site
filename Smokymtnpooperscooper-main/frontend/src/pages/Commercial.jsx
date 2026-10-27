import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Check, ClipboardCheck, Dog, Home, MapPin, Phone, ShieldCheck, Sparkles, Trash2, Users, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const commercialServices = [
  { icon: Building2, title: 'Apartment Communities', text: 'Recurring pet waste cleanup designed for multi-family properties, common areas and dog-walk routes.' },
  { icon: Home, title: 'HOAs & Neighborhoods', text: 'Keep shared green spaces, sidewalks and community pet areas cleaner for residents and guests.' },
  { icon: Users, title: 'Property Managers', text: 'One local point of contact for scheduled service, recurring routes and multiple properties.' },
  { icon: Dog, title: 'Dog Parks & Pet Areas', text: 'Routine cleanup and waste removal for high-traffic pet areas where appearance and sanitation matter.' },
  { icon: Trash2, title: 'Waste Station Service', text: 'Pet waste station servicing and routine removal to help keep high-use areas maintained.' },
  { icon: Wrench, title: 'One-Time Cleanups', text: 'Property turnovers, neglected areas, seasonal cleanups and special projects.' }
];

const Commercial = () => (
  <>
    <SEO
      title="Commercial Pet Waste Removal Knoxville TN | Smoky Mountain"
      description="Commercial pet waste removal in Knoxville and East Tennessee for apartments, HOAs, property managers, dog parks, and shared pet areas. Request a custom service plan."
      path="/commercial"
      type="website"
    />
  <div className="min-h-screen bg-white text-slate-900">
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-emerald-950 text-sm md:text-base"><Sparkles className="w-7 h-7 text-emerald-700" /> Smoky Mountain Pooper Scoopers</Link>
        <div className="flex items-center gap-3"><Link to="/" className="hidden md:block text-emerald-800 font-semibold hover:text-emerald-600">Residential</Link><a href="tel:865-343-1142" className="hidden sm:flex items-center gap-2 text-emerald-800 font-bold"><Phone className="w-4 h-4" /> 865-343-1142</a><Link to="/quote"><Button className="bg-emerald-700 hover:bg-emerald-800">Request Quote</Button></Link></div>
      </div>
    </header>

    <main>
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80" alt="Property management team" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/95 to-emerald-900/70" /></div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-lime-400 text-emerald-950 px-4 py-2 rounded-full font-black mb-6"><Building2 className="w-4 h-4" /> COMMERCIAL PET WASTE SERVICE</div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">Keep your property clean.<br /><span className="text-lime-300">We'll handle the poop.</span></h1>
              <p className="text-xl text-emerald-100 mt-6 max-w-2xl leading-relaxed">Professional recurring pet waste removal for apartments, HOAs, property managers, businesses, dog parks and commercial properties throughout Knoxville and East Tennessee.</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8"><Link to="/quote"><Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-emerald-950 font-black px-8 py-6">Get a Commercial Quote <ArrowRight className="w-5 h-5 ml-2" /></Button></Link><a href="tel:865-343-1142"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-950 px-8 py-6"><Phone className="w-5 h-5 mr-2" /> Call 865-343-1142</Button></a></div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 text-sm text-emerald-100"><span className="flex items-center gap-2"><Check className="w-4 h-4 text-lime-300" /> Recurring schedules</span><span className="flex items-center gap-2"><Check className="w-4 h-4 text-lime-300" /> Local service</span><span className="flex items-center gap-2"><Check className="w-4 h-4 text-lime-300" /> Custom plans</span></div>
            </div>
            <div className="bg-white rounded-3xl p-7 md:p-8 text-slate-900 shadow-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-emerald-700">Built for property managers</p>
              <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mt-2">A cleaner property without adding another job to your staff.</h2>
              <div className="space-y-4 mt-6">{['Scheduled recurring service', 'Pet waste station maintenance', 'One-time & seasonal cleanups', 'Flexible service frequencies', 'Multi-property service options'].map(item => <div key={item} className="flex gap-3 items-start"><div className="mt-0.5 rounded-full bg-lime-100 p-1"><Check className="w-4 h-4 text-emerald-700" /></div><span className="font-semibold text-slate-700">{item}</span></div>)}</div>
              <Link to="/quote" className="block mt-7"><Button className="w-full bg-emerald-700 hover:bg-emerald-800 py-6 font-bold">Request Property Assessment</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-emerald-50">
        <div className="container mx-auto px-4 max-w-6xl"><div className="max-w-3xl mx-auto text-center"><p className="text-emerald-700 font-black uppercase tracking-widest">Commercial solutions</p><h2 className="text-3xl md:text-5xl font-black text-emerald-950 mt-2">Service that fits your property</h2><p className="text-lg text-slate-600 mt-4">Different properties have different problems. We build the cleanup schedule around your traffic, pet areas and property needs.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">{commercialServices.map(({ icon: Icon, title, text }) => <div key={title} className="bg-white rounded-2xl p-7 border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"><div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center"><Icon className="w-6 h-6 text-emerald-700" /></div><h3 className="text-xl font-black text-emerald-950 mt-5">{title}</h3><p className="text-slate-600 mt-2 leading-relaxed">{text}</p></div>)}</div></div>
      </section>

      <section className="py-20 bg-white"><div className="container mx-auto px-4 max-w-6xl"><div className="grid lg:grid-cols-2 gap-14 items-center"><div><p className="text-emerald-700 font-black uppercase tracking-widest">Why work with us?</p><h2 className="text-3xl md:text-5xl font-black text-emerald-950 mt-2">Your property looks better when the pet areas are handled.</h2><p className="text-lg text-slate-600 mt-5 leading-relaxed">Pet waste is more than an eyesore. In shared spaces it can create complaints, odors and an unpleasant experience for residents and visitors. A dependable cleanup schedule lets your team focus on the property while we focus on the mess.</p><div className="grid sm:grid-cols-2 gap-5 mt-8">{[{i:ShieldCheck,t:'Professional service'},{i:ClipboardCheck,t:'Scheduled routes'},{i:MapPin,t:'Local coverage'},{i:Users,t:'Property-friendly communication'}].map(({i:Icon,t}) => <div key={t} className="flex items-center gap-3 font-bold text-emerald-900"><Icon className="w-6 h-6 text-emerald-700" />{t}</div>)}</div></div><div className="rounded-3xl overflow-hidden shadow-2xl h-[420px]"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85" alt="Dog enjoying a clean outdoor space" className="w-full h-full object-cover" /></div></div></div></section>

      <section className="py-20 bg-slate-950 text-white"><div className="container mx-auto px-4 max-w-5xl text-center"><p className="text-lime-300 font-black uppercase tracking-widest">Simple process</p><h2 className="text-3xl md:text-5xl font-black mt-2">From quote to clean property</h2><div className="grid md:grid-cols-4 gap-6 mt-12">{[['01','Request','Tell us about the property and service area.'],['02','Assess','We will determine the right service plan.'],['03','Schedule','Choose a recurring schedule that works.'],['04','Maintain','We show up and keep the pet areas clean.']].map(([num,title,text]) => <div key={num} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left"><div className="text-lime-300 text-2xl font-black">{num}</div><h3 className="text-xl font-black mt-4">{title}</h3><p className="text-slate-300 mt-2">{text}</p></div>)}</div></div></section>

      <section className="py-20 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white"><div className="container mx-auto px-4 max-w-4xl text-center"><Sparkles className="w-10 h-10 text-lime-300 mx-auto" /><h2 className="text-4xl md:text-6xl font-black mt-4">Your staff has better things to do than scoop poop.</h2><p className="text-xl text-emerald-100 mt-5">Let's build a commercial cleanup plan for your property.</p><div className="flex flex-col sm:flex-row justify-center gap-4 mt-8"><Link to="/quote"><Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-emerald-950 font-black px-10 py-6">Request Commercial Quote <ArrowRight className="w-5 h-5 ml-2" /></Button></Link><a href="tel:865-343-1142"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900 px-10 py-6"><Phone className="w-5 h-5 mr-2" /> Call Us</Button></a></div></div></section>

      <section className="py-16 bg-emerald-50"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-black text-center text-emerald-950">Commercial FAQ</h2><div className="grid md:grid-cols-2 gap-5 mt-8">{[['Do you service apartment communities?','Yes. We can build recurring routes around common areas, pet stations and high-traffic spaces.'],['Can you service multiple properties?','Yes. Tell us about the locations when requesting your quote so we can plan the service efficiently.'],['Do you offer one-time cleanups?','Yes. We can quote neglected areas, property turnovers and seasonal cleanup projects.'],['Can you maintain pet waste stations?','Yes. Pet waste station servicing can be included in a commercial service plan.']].map(([q,a]) => <div key={q} className="bg-white rounded-2xl p-6 border border-emerald-100"><h3 className="font-black text-emerald-950">{q}</h3><p className="text-slate-600 mt-2 leading-relaxed">{a}</p></div>)}</div></div></section>
    </main>

    <footer className="bg-emerald-950 text-emerald-100 py-10"><div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-5 items-center"><div><div className="font-black text-white">Smoky Mountain Pooper Scoopers</div><div className="text-sm mt-1">Commercial pet waste removal • Knoxville & East Tennessee</div></div><div className="flex gap-5 items-center"><a href="tel:865-343-1142" className="font-bold hover:text-white">865-343-1142</a><Link to="/quote" className="font-bold text-lime-300 hover:text-lime-200">Get a Quote</Link></div></div></footer>
  </div>
  </>
);

export default Commercial;
