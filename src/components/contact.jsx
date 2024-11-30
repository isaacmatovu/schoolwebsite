import  { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import '../styles/contact.css';



const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const sectionsRef = useRef([]);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 50) return 'Name must be less than 50 characters';
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return 'Name can only contain letters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Invalid email format';
    return '';
  };

 // Improved Phone Regex
 const validatePhone = (phone) => {
  if (!phone.trim()) return '';  // Optional field
  
  // More comprehensive phone number validation
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
  
  if (!phoneRegex.test(phone.trim())) {
    return 'Invalid phone number format (e.g., +1 (555) 123-4567)';
  }
  return '';
};


  const validateMessage = (message) => {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    if (message.trim().length > 500) return 'Message must be less than 500 characters';
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError
    });

    return !nameError && !emailError && !phoneError && !messageError;
  };

  // Input change handler with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate individual field as user types
    let error = '';
    switch(name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate entire form before submission
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      // Add your form submission logic here (e.g., API call)
      alert('Form submitted successfully!');
      
      // Optional: Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };

  useEffect(() => {
   
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    // Add null check and use optional chaining
    if (sectionsRef.current) {
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section);
      });
    }
  
    // Cleanup function with additional safety checks
    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []); // Dependency array remains empty if ref doesn't change

  return (
    <div className="contact-page">
      <div 
        ref={(el) => sectionsRef.current[0] = el} 
        className="contact-header scroll-section"
      >
        <h1>Contact Us</h1>
        <p>We would  love to hear from you! Fill out the form below.</p>
      </div>

      <div className="contact-container">
        <div 
          ref={(el) => sectionsRef.current[1] = el} 
          className="contact-info scroll-section"
        >
          <div className="contact-detail">
            <Mail className="contact-icon" />
            <div>
              <h3>Email</h3>
              <p>support@example.com</p>
            </div>
          </div>
          <div className="contact-detail">
            <Phone className="contact-icon" />
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin className="contact-icon" />
            <div>
              <h3>Address</h3>
              <p>123 Tech Lane, Innovation City</p>
            </div>
          </div>
        </div>

        <form 
          ref={(el) => sectionsRef.current[2] = el} 
          className="contact-form scroll-section" 
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <User className="input-icon" />
            <input 
              type="text" 
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                {errors.name}
              </div>
            )}
          </div>
          <div className="form-group">
            <Mail className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                {errors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <Phone className="input-icon" />
            <input 
              type="tel" 
              name="phone"
              placeholder="Your Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                {errors.phone}
              </div>
            )}
          </div>
          <div className="form-group">
            <MessageCircle className="input-icon" />
            <textarea 
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
            />
            {errors.message && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                {errors.message}
              </div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            <Send /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;