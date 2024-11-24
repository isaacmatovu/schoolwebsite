

import  { useState,useEffect } from 'react';
import '../styles/contact.css';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

 

  // Validation function
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Name is required';
      isValid = false;
    } else if (formData.fullName.length < 2) {
      tempErrors.fullName = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (validateForm()) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      setSubmitStatus('error');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (name, label, type = 'text', placeholder) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={errors[name] ? 'error' : ''}
          placeholder={placeholder}
          rows="4"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={errors[name] ? 'error' : ''}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <p className="error-message animate-shake">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="contact-section">
      <div className="container">
        <div className="header animate-fade-in">
          <h2>Contact Us</h2>
          <p>Have questions? We would  love to hear from you. Send us a message and we will respond as soon as possible.</p>
        </div>

        <div className="content-grid">
          {/* Contact Information */}
          <div className="contact-info card">
            <h3>Contact Information</h3>
            
            <div className="info-items">
              {[
                { Icon: MapPin, title: 'Address', lines: ['123 Education Street', 'Knowledge City, KN 12345'] },
                { Icon: Phone, title: 'Phone', lines: ['Main: (555) 123-4567', 'Admissions: (555) 123-4568'] },
                { Icon: Mail, title: 'Email', lines: ['info@school.edu', 'admissions@school.edu'] },
                { Icon: Clock, title: 'Office Hours', lines: ['Monday - Friday: 8:00 AM - 4:30 PM', 'Saturday - Sunday: Closed'] }
              ].map(({ Icon, title, lines }, index) => (
                <div key={title} className="info-item animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Icon className="icon" />
                  <div>
                    <h4>{title}</h4>
                    {lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form card">
            <h3>Send us a Message</h3>
            
            {submitStatus && (
              <div className={`alert ${submitStatus}`}>
                {submitStatus === 'success' ? (
                  <><CheckCircle className="icon" />Message sent successfully!</>
                ) : (
                  <><AlertCircle className="icon" />Failed to send message. Please try again.</>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {renderFormField('fullName', 'Full Name', 'text', 'John Doe')}
              {renderFormField('email', 'Email', 'email', 'johndoe@example.com')}
              {renderFormField('subject', 'Subject', 'text', 'How can we help?')}
              {renderFormField('message', 'Message', 'textarea', 'Your message here...')}

              <button
                type="submit"
                disabled={isSubmitting}
                className={isSubmitting ? 'submitting' : ''}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {setTimeout(()=>{
                   submitStatus === 'success'
                },1000)}
              </button>
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ContactSection;