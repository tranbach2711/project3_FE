import React from 'react';
import { FaAward, FaHandsHelping, FaGlobe, FaRegSmile } from 'react-icons/fa';

const handleDonate = () => {
    const userSession = sessionStorage.getItem('userSession');
    if (!userSession) {
        alert('Please log in before donating.');
        navigate('/auth'); // Điều hướng tới trang đăng nhập
        return;
    }
    // Nếu đã đăng nhập, chuyển đến trang donate
    navigate(`/donate/${program.id}`);
};

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
            <p className="text-lg mb-6 text-center">
                Welcome to our company! We are dedicated to providing the best service in the industry.
            </p>

            {/* Mission and Vision */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Mission & Vision</h2>
                <p className="text-lg mb-6 text-center">
                    Empowering communities and creating sustainable solutions for a better future.
                </p>
            </div>

            {/* Core Values */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <FaRegSmile className="text-indigo-500 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Integrity</h3>
                        <p>We uphold the highest standards of integrity in all our actions.</p>
                    </div>
                    <div>
                        <FaGlobe className="text-indigo-500 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Sustainability</h3>
                        <p>Committed to sustainable practices and environmental stewardship.</p>
                    </div>
                    <div>
                        <FaHandsHelping className="text-indigo-500 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Community Focus</h3>
                        <p>Dedicated to making a positive impact in the communities we serve.</p>
                    </div>
                    <div>
                        <FaAward className="text-indigo-500 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold">Excellence</h3>
                        <p>Striving for excellence in everything we do.</p>
                    </div>
                </div>
            </div>

            {/* Impact Statistics */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-500">1M+</h3>
                        <p>Lives Impacted</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-500">500+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-500">20+</h3>
                        <p>Countries Served</p>
                    </div>
                </div>
            </div>

            {/* Timeline of Milestones */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Journey</h2>
                <div className="timeline-container">
                    <div className="timeline-item">
                        <h3 className="text-xl font-semibold">2005</h3>
                        <p>Company founded.</p>
                    </div>
                    <div className="timeline-item">
                        <h3 className="text-xl font-semibold">2010</h3>
                        <p>First major project launched.</p>
                    </div>
                    <div className="timeline-item">
                        <h3 className="text-xl font-semibold">2020</h3>
                        <p>Expanded to international markets.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Testimonials</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>"ABC NGO's efforts have truly transformed our community. We are grateful for their dedication and support."</p>
                        <span>- Tran Bach, Community Leader</span>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>"Thanks to the incredible work of ABC NGO, we've been able to provide better resources to those in need."</p>
                        <span>- Nguyen Phong, Partner Organization</span>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <img src="http://localhost:5173/images/people/bach.jpg" alt="Team Member" className="rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Tran Bach</h3>
                        <p>CEO</p>
                    </div>
                    <div>
                        <img src="http://localhost:5173/images/people/huy.jpg" alt="Team Member" className="rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Đinh Huy</h3>
                        <p>Head of Marketing</p>
                    </div>
                    <div>
                        <img src="http://localhost:5173/images/people/phong.jpg" alt="Team Member" className="rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Nguyen Phong</h3>
                        <p>Chief Operations Officer</p>
                    </div>
                    <div>
                        <img src="http://localhost:5173/images/people/vu.jpg" alt="Team Member" className="rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Nguyen Vu</h3>
                        <p>Founder</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-8">
                <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleDonate}
                        className="bg-indigo-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-600">Donate Now</button>
                </div>
            </div>
            <div className="map-container mb-8">
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
        </div>
    );
};

export default AboutUs;
