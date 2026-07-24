import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import "./contactUs.css";

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="contact_us">
      {/* Contact Info Sidebar */}
      <section className="information">
        <h1 className="title">Contact Us</h1>
        <p className="descriptions">
          Have questions or need assistance? We're here to help! Reach out to us via any of the channels below or send a message.
        </p>

        <div className="contact_details">
          {/* Address */}
          <div className="info_card address">
            <div className="icon_wrapper">
              <MapPin className="address_icon" />
            </div>
            <div className="address_content">
              <h2>Address</h2>
              <p>123 Commerce St, Suite 100, Tech City, TC 90210</p>
            </div>
          </div>

          {/* Phone */}
          <div className="info_card phone">
            <div className="icon_wrapper">
              <Phone className="phone_icon" />
            </div>
            <div className="phone_content">
              <h2>Phone</h2>
              <p>+212 6 XX XX XX XX</p>
            </div>
          </div>

          {/* Email */}
          <div className="info_card email">
            <div className="icon_wrapper">
              <Mail className="email_icon" />
            </div>
            <div className="email_content">
              <h2>Email</h2>
              <p>support@yourstore.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact_form_wrapper">
        <h2 className="form_title">Send a Message</h2>

        <form className="contact_form" onSubmit={handleSubmit}>
          <div className="form_row">
            <div className="input_group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="John Doe" required />
            </div>
            <div className="input_group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>
          </div>

          <div className="input_group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="How can we help?" required />
          </div>

          <div className="input_group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
          </div>

          <button type="submit" className="send_btn">Send Message</button>
        </form>
      </section>
    </main>
  );
}