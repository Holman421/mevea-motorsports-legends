import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSplitTextAnimations = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        const splitTextElements = document.querySelectorAll(".split-text");

        splitTextElements.forEach((element) => {
            const text = element.textContent || "";

            element.textContent = "";

            const chars = text.split("").map((char) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                span.style.display = "inline-block";
                span.style.opacity = "0";
                span.style.transform = "translateY(20px)";
                return span;
            });

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

export const initCardAnimations = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        // Get all card elements in the cards section
        const cardSection = document.querySelector("#cardsSection");
        const cards = document.querySelectorAll("#cardsSection > div.grid > div");
        const transitionAmount = "15%";

        if (cards.length === 3) {
            gsap.fromTo(cards[0],
                { y: `-${transitionAmount}` },
                {
                    y: `${transitionAmount}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cardSection,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    }
                }
            );

            gsap.fromTo(cards[2],
                { y: `${transitionAmount}` },
                {
                    y: `-${transitionAmount}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cardSection,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    }
                }
            );
        }
    });
};

export const initAllAnimations = (): void => {
    initSplitTextAnimations();
    initBackgroundAnimation();
    initCardAnimations();
};