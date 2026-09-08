/* ==========================================================
   RVIOTECH PRODUCT LIFECYCLE
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        const scenes =
            document.querySelectorAll(".scene");


        const labels =
            document.querySelectorAll(
                ".progress-labels button"
            );


        const progressFill =
            document.querySelector(
                ".progress-fill"
            );


        const total =
            scenes.length;


        let current =
            0;


        let timer = null;


        const interval =
            3000;



        /* ==================================================
           SHOW SCENE
        ================================================== */

        function showScene(index) {


            if (index < 0) {

                index =
                    total - 1;

            }


            if (index >= total) {

                index =
                    0;

            }


            current =
                index;



            /* ----------------------------------------------
               SCENES
            ---------------------------------------------- */

            scenes.forEach(
                (scene, i) => {

                    scene.classList.toggle(
                        "active",
                        i === current
                    );

                }
            );



            /* ----------------------------------------------
               LABELS
            ---------------------------------------------- */

            labels.forEach(
                (label, i) => {

                    label.classList.toggle(
                        "active",
                        i === current
                    );

                }
            );



            /* ----------------------------------------------
               PROGRESS
            ---------------------------------------------- */

            const percentage =
                (current / (total - 1)) * 100;


            progressFill.style.width =
                percentage + "%";



            /* ----------------------------------------------
               RESTART TIMER ANIMATION
            ---------------------------------------------- */

            restartTimer();

        }



        /* ==================================================
           NEXT
        ================================================== */

        function nextScene() {

            showScene(
                current + 1
            );

        }



        /* ==================================================
           TIMER
        ================================================== */

        function startTimer() {

            clearInterval(timer);


            timer =
                setInterval(
                    nextScene,
                    interval
                );

        }


        function restartTimer() {

            clearInterval(timer);


            timer =
                setInterval(
                    nextScene,
                    interval
                );

        }



        /* ==================================================
           CLICKABLE LABELS
        ================================================== */

        labels.forEach(
            (label, index) => {

                label.addEventListener(
                    "click",
                    () => {

                        showScene(index);

                    }
                );

            }
        );



        /* ==================================================
           KEYBOARD
        ================================================== */

        document.addEventListener(
            "keydown",
            event => {


                if (
                    event.key === "ArrowRight"
                ) {

                    showScene(
                        current + 1
                    );

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    showScene(
                        current - 1
                    );

                }

            }
        );



        /* ==================================================
           PAUSE WHEN MOUSE IS OVER ANIMATION
        ================================================== */

        const lifecycle =
            document.querySelector(
                ".lifecycle"
            );


        lifecycle.addEventListener(
            "mouseenter",
            () => {

                clearInterval(timer);

            }
        );


        lifecycle.addEventListener(
            "mouseleave",
            () => {

                startTimer();

            }
        );



        /* ==================================================
           INITIALIZE
        ================================================== */

        showScene(0);


    }
);