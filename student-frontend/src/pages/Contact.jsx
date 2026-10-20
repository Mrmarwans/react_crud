import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState();

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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        // Start loading
        setIsLoading(true);
        
        try {
           // With your actual API call:
await fetch('http://127.0.0.1:8000/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
            // Success
            alert('✓ Message sent successfully! We will get back to you soon.');
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setErrors({});
        } catch (error) {
            // Handle error
            alert('❌ Failed to send message. Please try again.');
        } finally {
            // Stop loading
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)',
                padding: '48px 32px',
                borderRadius: '0 0 32px 32px',
                marginBottom: '32px',
                boxShadow: '0 8px 32px rgba(30, 64, 175, 0.15)'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '38px',
                        fontWeight: '800',
                        color: '#fff',
                        letterSpacing: '-0.8px',
                        marginBottom: '12px'
                    }}>
                        Get in Touch
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.85)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px 48px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    alignItems: 'start'
                }}>
                    
                    {/* Contact Information Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* Email Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '18px',
                            padding: '24px',
                            border: '1px solid #e5eaf5',
                            boxShadow: '0 2px 12px rgba(30, 64, 175, 0.06)',
                            transition: 'all 0.3s ease'
                        }} className="contact-info-card">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px'
                            }}>
                                <svg style={{ width: '28px', height: '28px', color: '#1a56db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                                Email Address
                            </h3>
                            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '8px' }}>
                                Send us an email anytime
                            </p>
                            <a href="mailto:contact@example.com" style={{
                                fontSize: '14px',
                                color: '#1a56db',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}>
                                contact@example.com
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '18px',
                            padding: '24px',
                            border: '1px solid #e5eaf5',
                            boxShadow: '0 2px 12px rgba(30, 64, 175, 0.06)',
                            transition: 'all 0.3s ease'
                        }} className="contact-info-card">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px'
                            }}>
                                <svg style={{ width: '28px', height: '28px', color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                                Phone Number
                            </h3>
                            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '8px' }}>
                                Call us during business hours
                            </p>
                            <a href="tel:+1234567890" style={{
                                fontSize: '14px',
                                color: '#16a34a',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}>
                                +1 (234) 567-890
                            </a>
                        </div>

                        {/* Working Hours Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '18px',
                            padding: '24px',
                            border: '1px solid #e5eaf5',
                            boxShadow: '0 2px 12px rgba(30, 64, 175, 0.06)',
                            transition: 'all 0.3s ease'
                        }} className="contact-info-card">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px'
                            }}>
                                <svg style={{ width: '28px', height: '28px', color: '#ca8a04' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                                Working Hours
                            </h3>
                            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '8px' }}>
                                We're here to help
                            </p>
                            <p style={{ fontSize: '14px', color: '#ca8a04', fontWeight: '600' }}>
                                Mon - Fri: 9AM - 6PM
                            </p>
                            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                                Weekend: Closed
                            </p>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '18px',
                        padding: '32px',
                        border: '1px solid #e5eaf5',
                        boxShadow: '0 2px 12px rgba(30, 64, 175, 0.06)',
                        gridColumn: 'span 1'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '8px'
                        }}>
                            Send us a Message
                        </h2>
                        <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '24px' }}>
                            Fill out the form and we'll respond within 24 hours
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        marginBottom: '8px'
                                    }}>
                                        Full Name <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            fontSize: '14px',
                                            border: errors.name ? '1.5px solid #ef4444' : '1.5px solid #e5eaf5',
                                            borderRadius: '12px',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'Inter, sans-serif',
                                            background: errors.name ? '#fef2f2' : '#fff'
                                        }}
                                        onFocus={(e) => {
                                            if (!errors.name) {
                                                e.target.style.borderColor = '#1a56db';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.name) {
                                                e.target.style.borderColor = '#e5eaf5';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    {errors.name && (
                                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email & Phone in Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" style={{
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            color: '#1e293b',
                                            marginBottom: '8px'
                                        }}>
                                            Email <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                fontSize: '14px',
                                                border: errors.email ? '1.5px solid #ef4444' : '1.5px solid #e5eaf5',
                                                borderRadius: '12px',
                                                outline: 'none',
                                                transition: 'all 0.2s ease',
                                                fontFamily: 'Inter, sans-serif',
                                                background: errors.email ? '#fef2f2' : '#fff'
                                            }}
                                            onFocus={(e) => {
                                                if (!errors.email) {
                                                    e.target.style.borderColor = '#1a56db';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (!errors.email) {
                                                    e.target.style.borderColor = '#e5eaf5';
                                                    e.target.style.boxShadow = 'none';
                                                }
                                            }}
                                        />
                                        {errors.email && (
                                            <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label htmlFor="phone" style={{
                                            display: 'block',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            color: '#1e293b',
                                            marginBottom: '8px'
                                        }}>
                                            Phone <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '400' }}>(Optional)</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 234 567 890"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                fontSize: '14px',
                                                border: '1.5px solid #e5eaf5',
                                                borderRadius: '12px',
                                                outline: 'none',
                                                transition: 'all 0.2s ease',
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#1a56db';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e5eaf5';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        marginBottom: '8px'
                                    }}>
                                        Subject <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this regarding?"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            fontSize: '14px',
                                            border: errors.subject ? '1.5px solid #ef4444' : '1.5px solid #e5eaf5',
                                            borderRadius: '12px',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'Inter, sans-serif',
                                            background: errors.subject ? '#fef2f2' : '#fff'
                                        }}
                                        onFocus={(e) => {
                                            if (!errors.subject) {
                                                e.target.style.borderColor = '#1a56db';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.subject) {
                                                e.target.style.borderColor = '#e5eaf5';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    {errors.subject && (
                                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        marginBottom: '8px'
                                    }}>
                                        Message <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell us more about your inquiry..."
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            fontSize: '14px',
                                            border: errors.message ? '1.5px solid #ef4444' : '1.5px solid #e5eaf5',
                                            borderRadius: '12px',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'Inter, sans-serif',
                                            resize: 'vertical',
                                            background: errors.message ? '#fef2f2' : '#fff'
                                        }}
                                        onFocus={(e) => {
                                            if (!errors.message) {
                                                e.target.style.borderColor = '#1a56db';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.1)';
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.message) {
                                                e.target.style.borderColor = '#e5eaf5';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    {errors.message && (
                                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '14px 24px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#fff',
                                        background: isLoading 
                                            ? 'linear-gradient(135deg, #94a3b8, #64748b)' 
                                            : 'linear-gradient(135deg, #1a56db, #1e40af)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isLoading 
                                            ? '0 2px 8px rgba(100, 116, 139, 0.2)' 
                                            : '0 4px 14px rgba(26, 86, 219, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        opacity: isLoading ? 0.7 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isLoading) {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 6px 20px rgba(26, 86, 219, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isLoading) {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 14px rgba(26, 86, 219, 0.3)';
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg 
                                                style={{ 
                                                    width: '18px', 
                                                    height: '18px',
                                                    animation: 'spin 1s linear infinite'
                                                }} 
                                                fill="none" 
                                                viewBox="0 0 24 24"
                                            >
                                                <circle 
                                                    style={{ opacity: 0.25 }} 
                                                    cx="12" 
                                                    cy="12" 
                                                    r="10" 
                                                    stroke="currentColor" 
                                                    strokeWidth="4"
                                                />
                                                <path 
                                                    style={{ opacity: 0.75 }} 
                                                    fill="currentColor" 
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg style={{ width: '18px', height: '18px', transform: 'rotate(-45deg)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* Inline styles for hover effects */}
            <style>{`
                .contact-info-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(30, 64, 175, 0.12) !important;
                }
                
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @media (max-width: 768px) {
                    h1 { font-size: 28px !important; }
                    .contact-info-card { margin-bottom: 0 !important; }
                }
            `}</style>
        </div>
    );
}

export default Contact;