import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Phone, Check, Star, Clock, ShieldCheck, MapPin, Sparkles, ArrowRight, Building2, Dog } from 'lucide-react';

const services = [
  { title: 'Weekly Poop Scooping', text: 'Keep your yard consistently clean with dependable recurring service.', price: '$14.99/week', icon: Clock },
  { title: 'One-Time Cleanups', text: 'Need a yard reset before guests, moving, selling, or spring cleaning? We can help.', price: 'Get a quote', icon: Sparkles },
  { title: 'Commercial Pet Waste', text: 'Service for apartments, HOAs, property managers, dog parks, and pet-friendly properties.', price: 'Custom plans', icon: Building2 },
  { title: 'Pet Waste Stations', text: 'Keep shared pet areas cleaner with scheduled station service and waste removal.', price: 'Get a quote', icon: Dog },
];

const faqs = [
  ['How much does weekly service cost?', 'Weekly service starts at $14.99 for qualifying residential service. Your exact price can vary based on property size, number of dogs, and service needs.'],
  ['Is the first cleaning really free?', 'Yes. The first cleaning is free when you sign up for recurring weekly service. Final eligibility and pricing are confirmed when we quote your property.'],
  ['Do I need a contract?', 'No long-term contract is required for standard residential service. We keep scheduling simple and flexible.'],
  ['What areas do you serve?', 'We serve the greater Knoxville and East Tennessee area. Send us your address through the quote form and we will confirm service availability.'],
  ['Do you clean commercial properties?', 'Yes. We offer recurring and one-time pet waste cleanup for apartments, HOAs, property managers, dog parks, pet areas, and other commercial properties.'],
];

const Landing = () => (
  <>
    <SEO
      title="Pet Waste Removal Knoxville TN | Smoky Mountain Pooper Scoopers"
      description="Professional pet waste removal in Knoxville and East Tennessee. Weekly service starts at $14.99, plus one-time cleanups and commercial pet waste service."
      path="/"
    />
  <div className="landing-page bg-white text-emerald-950">
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-8 h-8 text-emerald-700 flex-shrink-0" />
          <span className="text-lg md:text-2xl font-extrabold text-emerald-900 leading-tight">Smoky Mountain Pooper Scoopers</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#services" className="text-emerald-800 hover:text-emerald-600 font-medium">Services</a>
          <a href="#why-us" className="text-emerald-800 hover:text-emerald-600 font-medium">Why Us</a>
          <Link to="/commercial" className="text-emerald-800 hover:text-emerald-600 font-medium">Commercial</Link>
          <a href="#faq" className="text-emerald-800 hover:text-emerald-600 font-medium">FAQ</a>
          <a href="tel:865-343-1142">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white"><Phone className="w-4 h-4 mr-2" />Call 865-343-1142</Button>
          </a>
        </nav>
        <a href="tel:865-343-1142" className="lg:hidden">
          <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white"><Phone className="w-4 h-4" /></Button>
        </a>
      </div>
    </header>

    <main>
      <section className="relative min-h-[640px" flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy&cs=srgb&fm=jpg&q=85" alt="Happy dog enjoying a clean backyard in East Tennessee" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-emerald-800/65" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-400/20 border border-lime-300/40 px-4 py-2 text-lime-200 font-semibold mb-6">Local pet waste removal • Knoxville & East Tennessee</div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">A cleaner yard.<br /><span className="text-lime-300">Less poop to worry about.</span></h1>
            <p className="mt-6 text-xl md:text-2xl text-emerald-50 max-w-2xl leading-relaxed">Reliable pet waste removal for busy homeowners, families, apartments, HOAs, and property managers across the greater Knoxville area.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/quote"><Button size="lg" className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-lg px-8 py-6">Get My Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
              <a href="tel:865-343-1142"><Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-emerald-950 font-bold text-lg px-8 py-6"><Phone className="w-5 h-5 mr-2" />Call Us</Button></a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-emerald-50">
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" />No long-term contracts</span>
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" />Flexible recurring service</span>
              <span className="flex items-center gap-2"><Check className="w-5 h-5 text-lime-300" />Locally operated</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-lime-400 text-emerald-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div><strong className="text-xl">Weekly service: $14.99</strong><span className="block md:inline md:ml-2">First cleaning FREE when you sign up for recurring weekly visits.</span></div>
          <Link to="/quote"><Button className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold">Claim the Offer <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-emerald-700 font-bold uppercase tracking-wider">Pet waste removal in Knoxville</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-emerald-950">Pick the service that fits your property</h2>
            <p className="mt-4 text-lg text-emerald-700">From a single messy yard to recurring service for an entire community, we keep pet areas cleaner without adding another chore to your list.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ title, text, price, icon: Icon }) => (
              <Card key={title} className="border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all">
                <CardHeader><Icon className="w-10 h-10 text-emerald-700 mb-2" /><CardTitle className="text-xl text-emerald-950">{title}</CardTitle></CardHeader>
                <CardContent><p className="text-emerald-700 min-h-[72px]">{text}</p><p className="font-extrabold text-2xl text-emerald-800 mt-5">{price}</p><Link to={title.includes('Commercial') ? '/commercial' : title.includes('Station') ? '/pet-waste-station-service' : title.includes('One-Time') ? '/one-time-yard-cleanup' : '/weekly-pooper-scooper-service'}><Button className="w-full mt-5 bg-emerald-700 hover:bg-emerald-800">Get Started</Button></Link></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-700 font-bold uppercase tracking-wider">Why Smoky Mountain Pooper Scoopers?</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-emerald-950">You have better things to do than scoop poop.</h2>
            <p className="mt-6 text-lg text-emerald-700 leading-relaxed">We make pet waste removal simple: request service, choose a schedule, and let us handle the dirty work. Our goal is a cleaner, more enjoyable yard for you, your family, and your pets.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl p-5 shadow-sm"><Clock className="w-9 h-9 text-emerald-700" /><h3 className="font-bold text-lg mt-3">Reliable scheduling</h3><p className="text-emerald-700 mt-1">Recurring service built around your routine.</p></div>
              <div className="bg-white rounded-xl p-5 shadow-sm"><ShieldCheck className="w-9 h-9 text-emerald-700" /><h3 className="font-bold text-lg mt-3">Professional service</h3><p className="text-emerald-700 mt-1">We treat your property with care and respect.</p></div>
              <div className="bg-white rounded-xl p-5 shadow-sm"><MapPin className="w-9 h-9 text-emerald-700" /><h3 className="font-bold text-lg mt-3">Local coverage</h3><p className="text-emerald-700 mt-1">Serving Knoxville and surrounding East Tennessee communities.</p></div>
              <div className="bg-white rounded-xl p-5 shadow-sm"><Sparkles className="w-9 h-9 text-emerald-700" /><h3 className="font-bold text-lg mt-3">Cleaner yards</h3><p className="text-emerald-700 mt-1">A simple way to take one unpleasant chore off your plate.</p></div>
            </div>
          </div>
          <div className="bg-emerald-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
            <p className="text-lime-300 font-bold uppercase tracking-wider">Ready to stop stepping around it?</p>
            <h3 className="text-3xl md:text-4xl font-extrabold mt-3">Get a fast quote for your yard.</h3>
            <p className="text-emerald-100 mt-4 text-lg">Tell us where you are, how many dogs you have, and how often you want service. We'll take it from there.</p>
            <Link to="/quote"><Button size="lg" className="mt-8 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold w-full">Get My Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
            <a href="tel:865-343-1142" className="mt-4 block text-center font-bold text-lime-300 hover:text-white">Or call 865-343-1142</a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12"><p className="text-emerald-700 font-bold uppercase tracking-wider">Residential + Commercial</p><h2 className="text-4xl md:text-5xl font-extrabold text-emerald-950 mt-2">One local company for pet waste cleanup</h2></div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-emerald-100"><CardHeader><CardTitle className="text-2xl">For homeowners</CardTitle></CardHeader><CardContent><ul className="space-y-3 text-emerald-700">{['Weekly recurring service','One-time yard cleanups','Simple online quote request','Flexible scheduling'].map(x => <li key={x} className="flex gap-2"><Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />{x}</li>)}</ul><Link to="/quote"><Button className="mt-6 bg-emerald-700 hover:bg-emerald-800">Get Residential Quote</Button></Link></CardContent></Card>
            <Card className="border-2 border-lime-400"><CardHeader><CardTitle className="text-2xl">For commercial properties</CardTitle></CardHeader><CardContent><ul className="space-y-3 text-emerald-700">{['Apartments & multifamily communities','HOAs & neighborhood common areas','Property managers','Dog parks & pet areas','Waste station service'].map(x => <li key={x} className="flex gap-2"><Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />{x}</li>)}</ul><Link to="/commercial"><Button className="mt-6 bg-emerald-700 hover:bg-emerald-800">Commercial Services</Button></Link></CardContent></Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12"><p className="text-emerald-700 font-bold uppercase tracking-wider">Questions?</p><h2 className="text-4xl md:text-5xl font-extrabold text-emerald-950 mt-2">Frequently asked questions</h2></div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(([question, answer], index) => <AccordionItem key={question} value={`item-${index}`} className="bg-white border-2 border-emerald-100 rounded-xl px-6"><AccordionTrigger className="text-left font-bold text-emerald-950">{question}</AccordionTrigger><AccordionContent className="text-emerald-700 leading-relaxed pb-5">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="flex justify-center gap-1 mb-4">{[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-lime-400 text-lime-400" />)}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Let's get your yard back under control.</h2>
          <p className="mt-4 text-emerald-100 text-lg">Serving Knoxville and the surrounding East Tennessee area.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><Link to="/quote"><Button size="lg" className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold px-8">Get a Free Quote</Button></Link><a href="tel:865-343-1142"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-950 px-8"><Phone className="w-5 h-5 mr-2" />865-343-1142</Button></a></div>
        </div>
      </section>
    </main>

    <footer className="bg-emerald-950 text-emerald-100 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div><div className="text-xl font-extrabold text-white">Smoky Mountain Pooper Scoopers</div><p className="mt-2">Pet waste removal in Knoxville & East Tennessee.</p></div>
        <div className="text-left md:text-right"><a href="tel:865-343-1142" className="block hover:text-lime-300">865-343-1142</a><a href="mailto:smokymtnpooperscoopers@protonmail.com" className="block hover:text-lime-300 break-all">smokymtnpooperscoopers@protonmail.com</a><div className="mt-3 flex md:justify-end gap-4"><Link to="/weekly-pooper-scooper-service" className="hover:text-lime-300">Weekly Service</Link><Link to="/one-time-yard-cleanup" className="hover:text-lime-300">One-Time Cleanup</Link><Link to="/pet-waste-station-service" className="hover:text-lime-300">Waste Stations</Link><Link to="/quote" className="hover:text-lime-300">Get a Quote</Link><Link to="/commercial" className="hover:text-lime-300">Commercial</Link></div></div>
      </div>
    </footer>
  </div>
  </>\n);

export default Landing;
