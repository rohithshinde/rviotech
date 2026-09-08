/* ==========================================================
   RVIOTECH — CONTACT FORM
   Web3Forms Integration
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form) return;


    /* ======================================================
       WEB3FORMS ACCESS KEY
    ====================================================== */

    const WEB3FORMS_KEY =
        "b04ce79f-0d2a-4abf-bd9d-84ba1f7b1b3e";


    /* ======================================================
       FORM SUBMISSION
    ====================================================== */

    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* --------------------------------------------------
           GET FORM VALUES
        -------------------------------------------------- */

        const name =
            document.getElementById("name").value.trim();

        const company =
            document.getElementById("company").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const requirement =
            document.getElementById("requirement").value;

        const message =
            document.getElementById("message").value.trim();


        /* --------------------------------------------------
           VALIDATION
        -------------------------------------------------- */

        if (!name || !email || !requirement || !message) {

            status.textContent =
                "Please fill in all required fields.";

            status.classList.add("error");

            return;
        }


        /* --------------------------------------------------
           EMAIL VALIDATION
        -------------------------------------------------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            status.textContent =
                "Please enter a valid email address.";

            status.classList.add("error");

            return;
        }


        /* --------------------------------------------------
           BUTTON
        -------------------------------------------------- */

        const submitButton =
            form.querySelector(".contact-submit");

        const originalButtonText =
            submitButton.innerHTML;


        submitButton.disabled = true;

        submitButton.innerHTML =
            "SENDING...";


        status.classList.remove(
            "error",
            "success"
        );

        status.textContent =
            "Sending your enquiry...";


        /* ==================================================
           WEB3FORMS DATA
        ================================================== */

        const formData = new FormData();

        formData.append(
            "access_key",
            WEB3FORMS_KEY
        );

        formData.append(
            "name",
            name
        );

        formData.append(
            "company",
            company
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "phone",
            phone
        );

        formData.append(
            "requirement",
            requirement
        );

        formData.append(
            "message",
            message
        );


        /* --------------------------------------------------
           EMAIL SUBJECT
        -------------------------------------------------- */

        formData.append(
            "subject",
            "RVIOTECH Website Enquiry — " +
            requirement
        );


        /* --------------------------------------------------
           FROM NAME
        -------------------------------------------------- */

        formData.append(
            "from_name",
            "RVIOTECH Website"
        );


        /* --------------------------------------------------
           HONEYPOT SPAM PROTECTION
        -------------------------------------------------- */

        formData.append(
            "botcheck",
            ""
        );


        /* ==================================================
           SEND TO WEB3FORMS
        ================================================== */

        try {

            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",

                        body: formData
                    }
                );


            const result =
                await response.json();


            /* =================================================
               SUCCESS
            ================================================= */

            if (
                result.success === true
            ) {

                status.textContent =
                    "Thank you. Your enquiry has been received.";

                status.classList.remove(
                    "error"
                );

                status.classList.add(
                    "success"
                );


                form.reset();


                submitButton.innerHTML =
                    "ENQUIRY SENT ✓";


                /* ---------------------------------------------
                   RESTORE BUTTON
                --------------------------------------------- */

                setTimeout(() => {

                    submitButton.innerHTML =
                        originalButtonText;

                    submitButton.disabled =
                        false;

                }, 4000);


            }


            /* =================================================
               ERROR FROM WEB3FORMS
            ================================================= */

            else {

                throw new Error(
                    result.message ||
                    "Unable to send enquiry."
                );

            }


        }


        /* ==================================================
           NETWORK / SYSTEM ERROR
        ================================================== */

        catch (error) {

            console.error(
                "RVIOTECH contact form error:",
                error
            );


            status.textContent =
                "Unable to send your enquiry right now. " +
                "Please email info@rviotech.co.in";


            status.classList.remove(
                "success"
            );

            status.classList.add(
                "error"
            );


            submitButton.innerHTML =
                originalButtonText;

            submitButton.disabled =
                false;

        }

    });

});