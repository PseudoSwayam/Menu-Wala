import React from 'react';

// --- HOW TO CUSTOMIZE WELCOME SCREEN IMAGES & LINKS ---
// To add your own menu items to the animated welcome screen, simply edit the `menuItems` array below.
//
// Each object in the array represents one image tile. You can add, remove, or modify these objects.
//
// Each object needs three properties:
// 1. `id`: A unique number for each item.
// 2. `src`: The URL for the image. This can be a link to an image online or a path to a local file.
// 3. `link`: The destination URL when the image is clicked (e.g., your Google Drive menu link).
//
// --- HOW TO GET A GOOGLE DRIVE SHARE LINK ---
// a. Right-click your file in Google Drive and select "Share", then "Share" again.
// b. Under "General access", change "Restricted" to "Anyone with the link".
// c. Click "Copy link" and paste it as the `link` value below.
//
// Example:
// {
//   id: 1,
//   src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Your image
//   link: 'https://docs.google.com/document/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ_12345/edit?usp=sharing', // Your link
// },
// --- END OF CUSTOMIZATION GUIDE ---

const menuItems = [
    { id: 1, src: 'https://picsum.photos/seed/menu-wala-1/300/300', link: '#' },
    { id: 2, src: 'https://picsum.photos/seed/menu-wala-2/300/300', link: '#' },
    { id: 3, src: 'https://picsum.photos/seed/menu-wala-3/300/300', link: '#' },
    { id: 4, src: 'https://picsum.photos/seed/menu-wala-4/300/300', link: '#' },
    { id: 5, src: 'https://picsum.photos/seed/menu-wala-5/300/300', link: '#' },
    { id: 6, src: 'https://picsum.photos/seed/menu-wala-6/300/300', link: '#' },
    { id: 7, src: 'https://picsum.photos/seed/menu-wala-7/300/300', link: '#' },
    { id: 8, src: 'https://picsum.photos/seed/menu-wala-8/300/300', link: '#' },
    { id: 9, src: 'https://picsum.photos/seed/menu-wala-9/300/300', link: '#' },
    { id: 10, src: 'https://picsum.photos/seed/menu-wala-10/300/300', link: '#' },
    { id: 11, src: 'https://picsum.photos/seed/menu-wala-11/300/300', link: '#' },
    { id: 12, src: 'https://picsum.photos/seed/menu-wala-12/300/300', link: '#' },
    { id: 13, src: 'https://picsum.photos/seed/menu-wala-13/300/300', link: '#' },
    { id: 14, src: 'https://picsum.photos/seed/menu-wala-14/300/300', link: '#' },
    { id: 15, src: 'https://picsum.photos/seed/menu-wala-15/300/300', link: '#' },
    { id: 16, src: 'https://picsum.photos/seed/menu-wala-16/300/300', link: '#' },
    { id: 17, src: 'https://picsum.photos/seed/menu-wala-17/300/300', link: '#' },
    { id: 18, src: 'https://picsum.photos/seed/menu-wala-18/300/300', link: '#' },
    { id: 19, src: 'https://picsum.photos/seed/menu-wala-19/300/300', link: '#' },
    { id: 20, src: 'https://picsum.photos/seed/menu-wala-20/300/300', link: '#' },
    { id: 21, src: 'https://picsum.photos/seed/menu-wala-21/300/300', link: '#' },
    { id: 22, src: 'https://picsum.photos/seed/menu-wala-22/300/300', link: '#' },
    { id: 23, src: 'https://picsum.photos/seed/menu-wala-23/300/300', link: '#' },
    { id: 24, src: 'https://picsum.photos/seed/menu-wala-24/300/300', link: '#' },
    { id: 25, src: 'https://picsum.photos/seed/menu-wala-25/300/300', link: '#' },
    // Add more menu items here if you wish
];


// We duplicate the items to create enough content for a seamless loop
const repeatedItems = [...menuItems, ...menuItems, ...menuItems, ...menuItems]; 

interface WelcomeScreenProps {
    show: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ show }) => {
    return (
        <div 
            className={`fixed inset-0 bg-bg-primary z-50 overflow-hidden transition-transform duration-1000 ease-in-out ${show ? 'translate-y-0' : '-translate-y-full'}`}
            style={{ pointerEvents: show ? 'auto' : 'none' }}
        >
            
            {/* This is the large, animated canvas that scrolls diagonally */}
            <div 
                className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] animate-marquee-diagonal"
                style={{ willChange: 'transform' }} // Performance optimization
            >
                {/* A rotated container to align the grid diagonally. Scaled up to avoid showing edges on wide screens. */}
                <div className="w-full h-full rotate-[-30deg] scale-125">
                
                    {/* The grid of clickable images, with more columns for a fullscreen layout */}
                    <div className="grid grid-cols-10 gap-4 p-4">
                        {repeatedItems.map((item, index) => (
                            <a 
                                key={`${item.id}-${index}`} 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block w-full aspect-square transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-accent-teal/30 hover:z-10"
                                aria-label={`View item ${item.id}`}
                            >
                                <img
                                    src={item.src}
                                    alt={`Menu item ${item.id}`}
                                    className="w-full h-full object-cover rounded-2xl shadow-lg shadow-black/60 border-2 border-white/10"
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
