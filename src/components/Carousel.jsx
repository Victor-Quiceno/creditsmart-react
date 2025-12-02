import { useState } from 'react';

export default function Carousel() {
    const images = [
        '/images/banner1.png',
        '/images/banner2.png',
        '/images/banner3.png'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Imagen actual */}
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            />

            {/* Botones de navegación */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                ›
            </button>

            {/* Indicadores */}
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: currentIndex === index ? '#1e293b' : '#cbd5e1',
                            margin: '0 4px',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}