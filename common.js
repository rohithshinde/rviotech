/* =========================================================
   RVIOTECH WEBSITE
   COMMON JAVASCRIPT
========================================================= */


/* =========================================================
   GOOGLE ANALYTICS 4
========================================================= */

(function () {

    const GA_MEASUREMENT_ID = "G-KM7MVBKHQF";

    /* Load Google Analytics */

    const script = document.createElement("script");

    script.async = true;

    script.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        GA_MEASUREMENT_ID;

    document.head.appendChild(script);


    /* Initialize GA4 */

    window.dataLayer =
        window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag(
        "js",
        new Date()
    );

    gtag(
        "config",
        GA_MEASUREMENT_ID
    );

})();


/* =========================================================
   MICROSOFT CLARITY
========================================================= */

(function () {

    const CLARITY_PROJECT_ID = "yj5jes6asp";

    (function (c, l, a, r, i, t, y) {

        c[a] = c[a] || function () {
            (c[a].q = c[a].q || []).push(arguments);
        };

        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;

        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);

    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

})();


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".rv-navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".rv-reveal");

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );
                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.querySelector(".rv-menu-toggle");

const navLinks =
    document.querySelector(".rv-nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("mobile-open");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close menu after selecting a page */

    navLinks.querySelectorAll("a").forEach(
        (link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove(
                    "mobile-open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        }
    );


    /* Reset menu when returning to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            navLinks.classList.remove(
                "mobile-open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}