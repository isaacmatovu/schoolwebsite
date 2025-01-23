import '../styles/Homepage.css';
import { useEffect, useState } from 'react';

// Import optimized images
import backgroundImageSmall from '../images/back-small.webp';
import backgroundImageMedium from '../images/back-medium.webp';
import backgroundImageLarge from '../images/back-large.webp';
// Fallback JPEG versions
import backgroundImageSmallJpg from '../images/back-small.jpg';
import backgroundImageMediumJpg from '../images/back-medium.jpg';
import backgroundImageLargeJpg from '../images/back-large.jpg';

export function HomePage() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Determine which image to load based on screen size
        const imageToLoad = new Image();
        if (windowWidth <= 768) {
            imageToLoad.src = backgroundImageSmall;
        } else if (windowWidth <= 1024) {
            imageToLoad.src = backgroundImageMedium;
        } else {
            imageToLoad.src = backgroundImageLarge;
        }

        imageToLoad.onload = () => setImageLoaded(true);

        // Animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener('resize', handleResize);
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, [windowWidth]);

    // Get the appropriate background image based on screen size
    const getBackgroundImage = () => {
        if (windowWidth <= 768) {
            return { webp: backgroundImageSmall, jpg: backgroundImageSmallJpg };
        } else if (windowWidth <= 1024) {
            return { webp: backgroundImageMedium, jpg: backgroundImageMediumJpg };
        }
        return { webp: backgroundImageLarge, jpg: backgroundImageLargeJpg };
    };

    const { webp, jpg } = getBackgroundImage();

    return (
        <div 
            className={`main-wrapper ${imageLoaded ? 'bg-loaded' : ''}`}
            style={{
                '--bg-webp': `url(${webp})`,
                '--bg-jpg': `url(${jpg})`
            }}
        >
            {/* Preload current image size */}
            <link 
                rel="preload" 
                as="image" 
                href={webp}
                type="image/webp"
            />
            <link 
                rel="preload" 
                as="image" 
                href={jpg}
                type="image/jpeg"
            />
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