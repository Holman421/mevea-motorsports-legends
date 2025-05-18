import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const initSplitTextAnimations = (): void => {
    const splitTextElements = document.querySelectorAll(".split-text");
    const splitTextInstances: SplitText[] = [];

    splitTextElements.forEach((element) => {
        const splitText = new SplitText(element, {
            type: "words",
            position: "relative"
        });

        splitTextInstances.push(splitText);

        gsap.set(splitText.words, {
            y: 20,
            opacity: 0
        });
        gsap.to(splitText.words, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: () => {
                setTimeout(() => {
                    splitText.revert();
                }, 500);
            },
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    window.addEventListener("resize", () => {
        splitTextInstances.forEach(instance => {
            if (instance && typeof instance.revert === 'function') {
                instance.revert();
            }
        });
    });
};

export const initBackgroundAnimation = (): void => {
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
};

export const initCardAnimations = (): void => {
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
};

export const initFormulaAnimation = (): void => {
    const formulaBg = document.querySelector("img[alt='Formule Background']");

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
                ease: "power2.out"
            }
        );
    }
};

export const initNavbarAnimation = (): void => {
    const navbar = document.querySelector("nav")!;
    gsap.to(navbar, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.0
    });
};

export const initAllAnimations = (): void => {
    initSplitTextAnimations();
    initBackgroundAnimation();
    initCardAnimations();
    initFormulaAnimation();
    initNavbarAnimation();
};