import React, { useEffect } from 'react';
import { Award, ShieldCheck, Sparkles, Truck, Users } from 'lucide-react';
import './aboutUs.css';
import { toTop } from '../utilities/toTop';

export default function AboutUs() {
  const stats = [
    { label: 'Active Customers', value: '50K+' },
    { label: 'Premium Products', value: '1,200+' },
    { label: 'Customer Rating', value: '4.9/5' },
    { label: 'Countries Served', value: '25+' },
  ];

  const features = [
    {
      icon: <Sparkles className="feature_icon" />,
      title: 'Curated Excellence',
      description: 'Hand-picked premium tech and lifestyle products designed to elevate your daily routine.',
    },
    {
      icon: <ShieldCheck className="feature_icon" />,
      title: 'Guaranteed Quality',
      description: 'Every product in our catalog undergoes strict quality testing before reaching your door.',
    },
    {
      icon: <Truck className="feature_icon" />,
      title: 'Express Delivery',
      description: 'Fast, secure, and fully tracked global shipping right to your doorstep.',
    },
    {
      icon: <Award className="feature_icon" />,
      title: 'Dedicated Support',
      description: 'Our customer support team is available 24/7 to assist with any questions or orders.',
    },
  ];

  useEffect(()=>{
    toTop();
  },[])

  return (
    <main className="about_us">
      {/* Hero Header */}
      <section className="about_hero">
        <span className="hero_badge">Our Story</span>
        <h1 className="hero_title">
          Redefining Modern <span className="highlight">E-Commerce</span>
        </h1>
        <p className="hero_subtitle">
          We bring together cutting-edge technology, sleek design, and uncompromising quality to create a shopping experience tailored to modern tastes.
        </p>
      </section>

      {/* Brand Visual Banner */}
      <section className="about_banner">
        <div className="banner_card">
          <div className="banner_text">
            <h2>Crafted for those who value performance & elegance.</h2>
            <p>
              Founded with a mission to simplify online shopping without sacrificing aesthetic quality, LUXESTORE brings high-grade laptops, smartphones, and accessories under one refined roof.
            </p>
          </div>
        </div>
      </section>

      {/* Key Numbers / Stats */}
      <section className="stats_section">
        {stats.map((stat, index) => (
          <div key={index} className="stat_card">
            <h3 className="stat_value">{stat.value}</h3>
            <p className="stat_label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Core Values / Features Grid */}
      <section className="features_section">
        <div className="section_header">
          <h2>Why Choose Us</h2>
          <p>Built around reliability, speed, and premium product selection.</p>
        </div>

        <div className="features_grid">
          {features.map((feature, index) => (
            <div key={index} className="feature_card">
              <div className="icon_container">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}