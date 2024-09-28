let isClickingNavLink = false; // Flag to detect if the user clicked a nav link

// Function to update hori-selector position
function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnim = activeItemNewAnim.position();
    
    $(".hori-selector").css({
        "top": itemPosNewAnim.top + "px",
        "left": itemPosNewAnim.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
}

// Function to activate link and update the hori-selector position
function activateLink(element) {
    isClickingNavLink = true; // Set flag to true when a link is clicked

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    navItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Add active class to the clicked nav item
    element.parentElement.classList.add('active');

    // Scroll to section smoothly
    const url = element.getAttribute('data-url');
    document.querySelector(url).scrollIntoView({ behavior: 'smooth' });

    // Update hori-selector position
    test();

    // Allow scroll detection again after a short delay (500ms)
    setTimeout(function() {
        isClickingNavLink = false;
    }, 500);
}

// Scroll event listener to check which section is currently in view
function handleScroll() {
    if (isClickingNavLink) return; // If a nav link was clicked, skip this scroll detection

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    // Activate the corresponding nav link based on scroll position
    navLinks.forEach(link => {
        if (link.getAttribute("data-url") === `#${currentSection}`) {
            activateLink(link); // Call activateLink to update both the active link and selector
        }
    });
}

// Call the test() function and scroll handler on page load and scroll
$(document).ready(function () {
    setTimeout(function () {
        test();
    });

    $(window).on('scroll', function () {
        handleScroll(); // Activate nav link based on scroll
    });

    // Initially set active link for the current section
    handleScroll(); // Call on page load
});

// Handle window resize
$(window).on('resize', function () {
    setTimeout(function () {
        test();
    }, 500);
});

// Handle navbar toggler click
$(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () {
        test();
    });
});

document.getElementById("downloadButton").addEventListener("click", function() {
    // Start downloading the PDF file
    const link = document.createElement('a');
    link.href = 'asset/pdf/MD.Mostafizur Rahman CV.pdf'; // Replace with the actual path to your PDF
    link.download = 'MD.Mostafizur Rahman CV.pdf'; // Replace with the desired file name
    document.body.appendChild(link);
    link.click();
    
    // Remove the link after download
    document.body.removeChild(link);
    
    // Trigger a function after the PDF is downloaded
    link.addEventListener('click', function() {
        afterDownload();
    });
});

function afterDownload() {
    alert("PDF Downloaded!"); // Replace this with your desired action
}



const boxes = document.querySelectorAll(".box");

window.addEventListener('scroll', checkBoxes);

// Initial check to show boxes already in view
checkBoxes();

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}









// Get the button, form, and close elements
const openFormBtn = document.getElementById('openFormBtn');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Open the form with animation
openFormBtn.addEventListener('click', () => {
    popupForm.classList.remove('fade-out');
    popupForm.style.display = 'flex';
});

// Close the form with animation
closeFormBtn.addEventListener('click', () => {
    popupForm.classList.add('fade-out');
    setTimeout(() => {
        popupForm.style.display = 'none';
    }, 500); // Match this with the fadeOut animation duration
});

// Close the form when clicking outside the form container with animation
window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.classList.add('fade-out');
        setTimeout(() => {
            popupForm.style.display = 'none';
        }, 500); // Match this with the fadeOut animation duration
    }
});

// Handle form submission
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission

    // Hide the form and show the thank you message
    contactForm.style.display = 'none';
    thankYouMessage.style.display = 'block';
});



