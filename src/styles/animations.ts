
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes a split text animation for elements with the 'split-text' class
 * The animation reveals text character by character when scrolled into view
 */
export const initSplitTextAnimations = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        // Get all elements with the split-text class
        const splitTextElements = document.querySelectorAll(".split-text");

        splitTextElements.forEach((element) => {
            // Get the text content and split it into characters
            const text = element.textContent || "";

            // Clear the current content
            element.textContent = "";

            // Create spans for each character and append them to the element
            const chars = text.split("").map((char) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for actual spaces
                span.style.display = "inline-block";
                span.style.opacity = "0";
                span.style.transform = "translateY(20px)";
                return span;
            });

            // Append all characters to the element
            chars.forEach((char) => {
                element.appendChild(char);
            });

            // Create the animation
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.01,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    });
};

/**
 * Animates a background element based on scroll position
 * Used for elements with the 'scroll-bg' class
 */
export const initBackgroundAnimation = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        const bgElements = document.querySelectorAll(".scroll-bg");
        const sections = document.querySelectorAll(".scroll-section");

        bgElements.forEach((element, index) => {
            const section = sections[index] || element.closest(".scroll-section");

            if (section) {
                gsap.fromTo(
                    element,
                    {
                        x: "-50%",
                        y: "-25%"
                    },
                    {
                        x: "50%",
                        y: "125%",
                        ease: "power1.inOut",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom center",
                            scrub: true
                        }
                    }
                );
            }
        });
    });
};

// Export a function that initializes all animations
export const initAllAnimations = (): void => {
    initSplitTextAnimations();
    initBackgroundAnimation();
};