import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg mb-6">
                Welcome to our company! We are dedicated to providing the best service
                in the industry. Our team of professionals is here to help you with
                whatever you need.
            </p>
            <div className="map-container mb-6">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097376!2d144.9537353156805!3d-37.81627974202133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e1f1d3eb%3A0x2c0a1f6e68a5b1ed!2sMelbourne%20CBD%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1635472485623!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="team-section">
                <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                <p className="text-lg mb-4">
                    Meet our team of experts who are passionate about what they do.
                </p>
                {/* Add team member information here */}
            </div>
        </div>
    );
};

export default AboutUs;
