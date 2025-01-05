import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
            <p className="text-lg mb-6 text-center">
                Welcome to our company! We are dedicated to providing the best service
                in the industry. Our team of professionals is here to help you with
                whatever you need.
            </p>
            <div className="map-container mb-6">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.897033410396!2d105.8175658153292!3d21.037236785993803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8d4e8ababb%3A0x4d4b6d3e9212d40!2zMjg1IMSQ4buZaSBD4bqnbiwgVHLhuqduIEJhbjgsIEJhIMSQw7RuZywgSMOyYSBOb2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1635472485623!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="team-section text-center">
                <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                <p className="text-lg mb-4">
                    Meet our team of experts who are passionate about what they do.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
