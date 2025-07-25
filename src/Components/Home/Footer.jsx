import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className=''>
            <Slide cascade damping={0.2} triggerOnce direction='down'  >
                <footer className="footer sm:footer-horizontal bg-gray-900 p-10 rounded-2xl inter-font text-gray-50 py-20 my-10">
                    <aside>
                        <div className="relative">
                            <Link to="/" className="flex items-center ">
                                <div className="">
                                    <img
                                        src="https://i.postimg.cc/0yHTF6Kn/logo.png" 
                                        alt="App Logo"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <span className="font-extrabold absolute text-xl mt-4 left-4">Nestora</span>
                            </Link>
                        </div>
                        <p className='max-w-xs'>
                            Your trusted gateway to buy, sell,
                            <br />
                            and explore properties across Bangladesh.
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </Slide>

        </div>
    );
};

export default Footer;