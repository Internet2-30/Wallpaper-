const wallpapers = [

    {
        src: "images/wallpaper-1.jpg",
        title: "NYSC Memory 1"
    },

    {
        src: "images/wallpaper-2.jpg",
        title: "NYSC Memory 2"
    },

    {
        src: "images/wallpaper-3.jpg",
        title: "NYSC Memory 3"
    },

    {
        src: "images/wallpaper-4.jpg",
        title: "NYSC Memory 4"
    },

    {
        src: "images/wallpaper-5.jpg",
        title: "NYSC Memory 5"
    },

    {
        src: "images/wallpaper-6.jpg",
        title: "NYSC Memory 6"
    },

    {
        src: "images/wallpaper-7.jpg",
        title: "NYSC Memory 7"
    },

    {
        src: "images/wallpaper-8.jpg",
        title: "NYSC Memory 8"
    },

    {
        src: "images/wallpaper-9.jpg",
        title: "NYSC Memory 9"
    },

    {
        src: "images/wallpaper-10.jpg",
        title: "NYSC Memory 10"
    }

];


const gallery =
    document.getElementById("gallery");

const viewer =
    document.getElementById("viewer");

const viewerImg =
    document.getElementById("viewerImg");

const viewerTitle =
    document.getElementById("viewerTitle");

const viewerIndex =
    document.getElementById("viewerIndex");

const search =
    document.getElementById("search");

const toast =
    document.getElementById("toast");


let current = 0;

let slideshowTimer = null;


/* DISPLAY WALLPAPERS */

function render(list = wallpapers) {

    gallery.innerHTML = "";

    document.getElementById("count")
        .textContent = list.length;


    if (list.length === 0) {

        gallery.innerHTML = `
            <p style="
                grid-column:1/-1;
                text-align:center;
                color:#718078;
                padding:40px;
            ">
                No wallpapers found.
            </p>
        `;

        return;
    }


    list.forEach(wallpaper => {

        const originalIndex =
            wallpapers.indexOf(wallpaper);


        const card =
            document.createElement("article");


        card.className = "card";


        card.innerHTML = `

            <img
                src="${wallpaper.src}"
                alt="${wallpaper.title}"
                loading="lazy"
            >

            <div class="card-info">

                <strong>
                    ${wallpaper.title}
                </strong>

                <small>
                    Open ›
                </small>

            </div>
        `;


        card.addEventListener(
            "click",
            () => openViewer(originalIndex)
        );


        gallery.appendChild(card);

    });

}



/* OPEN VIEWER */

function openViewer(index) {

    current = index;

    updateViewer();

    viewer.classList.add("open");

    document.body.style.overflow =
        "hidden";
}



/* CLOSE VIEWER */

function closeViewer() {

    viewer.classList.remove("open");

    document.body.style.overflow =
        "";
}



/* UPDATE VIEWER */

function updateViewer() {

    const item =
        wallpapers[current];


    viewerImg.src =
        item.src;


    viewerImg.alt =
        item.title;


    viewerTitle.textContent =
        item.title;


    viewerIndex.textContent =
        `${current + 1} of ${wallpapers.length}`;

}



/* NEXT */

function next() {

    current =
        (current + 1)
        % wallpapers.length;

    updateViewer();

}



/* PREVIOUS */

function prev() {

    current =
        (current - 1 + wallpapers.length)
        % wallpapers.length;

    updateViewer();

}



/* TOAST */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}



/* BUTTONS */

document
    .getElementById("closeViewer")
    .onclick = closeViewer;


document
    .getElementById("nextBtn")
    .onclick = next;


document
    .getElementById("prevBtn")
    .onclick = prev;



/* KEYBOARD CONTROLS */

document.addEventListener(
    "keydown",
    event => {

        if (!viewer.classList.contains("open"))
            return;


        if (event.key === "Escape")
            closeViewer();


        if (event.key === "ArrowRight")
            next();


        if (event.key === "ArrowLeft")
            prev();

    }
);



/* SEARCH */

search.addEventListener(
    "input",
    () => {

        const term =
            search.value
                .toLowerCase()
                .trim();


        const results =
            wallpapers.filter(
                wallpaper =>
                    wallpaper.title
                        .toLowerCase()
                        .includes(term)
            );


        render(results);

    }
);



/* RANDOM */

document
    .getElementById("randomBtn")
    .onclick = () => {

        const random =
            Math.floor(
                Math.random()
                * wallpapers.length
            );


        openViewer(random);

    };



/* FULLSCREEN */

document
    .getElementById("fullBtn")
    .onclick = async () => {

        try {

            if (!document.fullscreenElement) {

                await document.documentElement
                    .requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            showToast(
                "Fullscreen is not available."
            );

        }

    };



/* DOWNLOAD */

document
    .getElementById("downloadBtn")
    .onclick = () => {

        const item =
            wallpapers[current];


        const link =
            document.createElement("a");


        link.href =
            item.src;


        link.download =
            item.title
                .toLowerCase()
                .replace(/\s+/g, "-")
            + ".jpg";


        document.body.appendChild(link);

        link.click();

        link.remove();

    };



/* WALLPAPER */

document
    .getElementById("wallpaperBtn")
    .onclick = () => {

        const item =
            wallpapers[current];


        showToast(
            "Download the photo and choose 'Set as wallpaper' in your Gallery."
        );


        window.open(
            item.src,
            "_blank"
        );

    };



/* SLIDESHOW */

document
    .getElementById("slideshowBtn")
    .onclick = () => {

        const button =
            document.getElementById(
                "slideshowBtn"
            );


        if (slideshowTimer) {

            clearInterval(
                slideshowTimer
            );

            slideshowTimer = null;

            button.textContent = "▶";

            showToast(
                "Slideshow stopped"
            );

            return;

        }


        openViewer(current);


        slideshowTimer =
            setInterval(
                next,
                3500
            );


        button.textContent =
            "⏸";


        showToast(
            "Slideshow started"
        );

    };



/* START APP */

render();