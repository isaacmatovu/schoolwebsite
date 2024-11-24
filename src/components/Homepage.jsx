
import '../styles/Homepage.css';
import { useEffect } from 'react';

export function HomePage() {
    useEffect(() => {
        // Create observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        // Observe all elements with animate class
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach((el) => observer.observe(el));

        // Cleanup
        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="main-wrapper">
            <div className="container-txt">
                <h1 className="title-heading animate">
                    Lets brighten your future
                </h1>
                <hr className="divider animate"/>
                <p className="para-text animate">
                    We strive to empower students with knowledge, skills, and values needed 
                    to excel in an ever-changing world. Through innovative teaching methods 
                    and a comprehensive curriculum, we prepare our students to become confident, 
                    responsible, and successful global citizens.
                </p>
            </div>
        </div>
    );
}

export default HomePage;