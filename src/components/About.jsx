import { useEffect } from 'react';
import img1 from '../images/baller.jpeg';
import img2 from '../images/girl.jpg';
import img3 from '../images/esther.jpeg';
import img4 from '../images/josh.jpeg';
import img5 from '../images/football.jpg';
import img6 from '../images/tennis.jpg';
import img7 from '../images/basketball.jpg';
import '../styles/About.css';

function About() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .card, .activities, .about-talking, .mission');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="about-section">
        <div className="about-talking">
          <div className="image-about">
            <img src={img2} className='about-img' alt="school" />
          </div>
          <div className='about-txt'>
            <h1 className="fade-in">About the school</h1>
            <p className='para-txt fade-in'>
              Founded in 1995, Excellence Academy began with a vision to provide world-class education while nurturing character and creativity. Starting with just 50 students, we have grown into a leading institution with over 1,000 students from diverse backgrounds. Our campus spans 15 acres of lush greenery, featuring state-of-the-art facilities including science labs, a performing arts center, and modern sports facilities. We maintain small class sizes to ensure personalized attention for every student.
            </p>
          </div>
        </div>

        <div className="container-about">
          <div className="mission">
            <h1>Our mission</h1>
            <p>To provide learner-centered education and research that empowers our youth to forge a better world</p>
          </div>
        </div>

        <h1 className="fade-in">Meet our staff</h1>
        <div className="container-about">
          <div className="card">
            <img src={img4} alt='headteacher' />
            <p>The Headmaster</p>
          </div>
          <div className="card">
            <img src={img1} alt='director of studies' />
            <p>Director of Studies</p>
          </div>
          <div className="card">
            <img src={img3} alt='board director' />
            <p>Director Board of Governors</p>
          </div>
        </div>

        <h1 className="fade-in">Activities of the school</h1>
        <div className="container-about">
          <div className="activities">
            <img src={img5} alt="football" />
            <p>Football is one of the loved sports here where we usually have yearly competitions with different schools</p>
          </div>
          <div className="activities">
            <img src={img6} alt="tennis" />
            <p>Tennis, wow what else could be more entertaining than tennis sport for both the boys and girls.</p>
          </div>
          <div className="activities">
            <img src={img7} alt="basketball" />
            <p>Basketball, and here we get one of the toughest games at school but also enjoyable at the same time</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;