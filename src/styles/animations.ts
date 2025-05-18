import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSplitTextAnimations = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        const splitTextElements = document.querySelectorAll(".split-text");

        splitTextElements.forEach((element) => {
            const text = element.textContent || "";
            element.textContent = "";

            // First, split by words to maintain word integrity
            const words = text.split(" ");
            const wordSpans = words.map(word => {
                const wordSpan = document.createElement("span");
                wordSpan.style.display = "inline-block";
                wordSpan.style.whiteSpace = "nowrap";
                wordSpan.style.marginRight = "0.25em"; // Add space between words

                // Then split each word into characters
                const chars = word.split("").map((char) => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.display = "inline-block";
                    span.style.opacity = "0";
                    span.style.transform = "translateY(20px)";
                    return span;
                });

                // Add characters to the word span
                chars.forEach(char => {
                    wordSpan.appendChild(char);
                });

                return { wordSpan, chars };
            });

            // Add words to the element
            wordSpans.forEach(({ wordSpan }) => {
                element.appendChild(wordSpan);
            });

            // Collect all character spans for animation
            const allChars = wordSpans.flatMap(({ chars }) => chars);

            // Create the animation
            gsap.to(allChars, {
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

export const initFormulaAnimation = (): void => {
    document.addEventListener("DOMContentLoaded", () => {
        const formulaBg = document.querySelector("#formulaBg");

        if (formulaBg) {
            gsap.fromTo(
                formulaBg,
                {
                    x: "-100%",
                    opacity: 0
                },
                {
                    x: "0%",
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: 0.3
                }
            );
        }
    });
};

export const initAllAnimations = (): void => {
    initSplitTextAnimations();
    initBackgroundAnimation();
    initCardAnimations();
    initFormulaAnimation();
};