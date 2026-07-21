const courseStreams = {
    business: {
        name: "Business Stream",
        description: "Students will learn how a FIRST team operates as organizations. Students will develop skills in marketing, fundraising, finance, leadership, communications, project management, sponsorship, event planning, and professional practices. Students will complete projects and assignments that prepare them to take on business positions on the Penticton Robotics FRC team.",
        chapters: [
            { unit: "Unit 1", title: "Intro to FIRST" },
            { unit: "Unit 2", title: "Professionalism" },
            { unit: "Unit 3", title: "Leadership" },
            { unit: "Unit 4", title: "Marketing" },
            { unit: "Unit 5", title: "Fundraising" },
            { unit: "Unit 6", title: "Finance" },
            { unit: "Unit 7", title: "Project Management" },
            { unit: "Unit 8", title: "Outreach" },
            { unit: "Unit 10", title: "Competition" }
        ]
    },
    build: {
        name: "Build Stream",
        description: "[Course Description Placeholder]",
        chapters: [
            { unit: "Unit 1", title: "[Build Unit 1 Placeholder]" },
            { unit: "Unit 2", title: "[Build Unit 2 Placeholder]" },
            { unit: "Unit 3", title: "[Build Unit 3 Placeholder]" }
        ]
    },
    programming: {
        name: "Programming Stream",
        description: "[Course Description Placeholder]",
        chapters: [
            { unit: "Unit 1", title: "[Programming Unit 1 Placeholder]" },
            { unit: "Unit 2", title: "[Programming Unit 2 Placeholder]" },
            { unit: "Unit 3", title: "[Programming Unit 3 Placeholder]" }
        ]
    }
};

let currentStreamKey = "business";

document.addEventListener("DOMContentLoaded", () => {
    // 0. Mobile Hamburger Navigation Toggle
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    if (hamburgerBtn && mobileDropdown) {
        hamburgerBtn.addEventListener("click", () => {
            mobileDropdown.classList.toggle("active");
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileDropdown.classList.remove("active");
            });
        });
    }

    // Top-level Navigation Screens
    const portalScreen = document.getElementById("portal-screen");
    const appInterface = document.getElementById("app-interface");
    
    // Portal Choice Actions
    const portalStreamCards = document.querySelectorAll(".portal-stream-card");
    
    // Menu Controls
    const btnBackHome = document.getElementById("btn-back-home");
    const logoBackHome = document.getElementById("back-to-portal");
    const chaptersNav = document.getElementById("chapters-nav");
    const streamButtons = document.querySelectorAll(".stream-btn");
    const btnDashboard = document.getElementById("btn-dashboard");
    
    // View Panels
    const homeView = document.getElementById("home-view");
    const chapterView = document.getElementById("chapter-view");

    // Homepage Elements
    const homeStreamTitle = document.getElementById("home-stream-title");
    const homeDescriptionContainer = document.getElementById("home-description-container");
    const homeObjectivesBox = document.getElementById("home-objectives-box");

    // Dynamic Unit View Elements
    const viewChapterNum = document.getElementById("view-chapter-num");
    const viewChapterName = document.getElementById("view-chapter-name");
    const viewChapterDesc = document.getElementById("view-chapter-desc");

    // 1. Landing Screen Event Handlers
    portalStreamCards.forEach(card => {
        card.addEventListener("click", () => {
            const chosenStream = card.getAttribute("data-select-stream");
            
            // Sync active header button style
            streamButtons.forEach(btn => {
                if (btn.getAttribute("data-stream") === chosenStream) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

            currentStreamKey = chosenStream;
            loadStream(chosenStream);
            
            // Switch from Portal Screen to App Screen
            portalScreen.style.display = "none";
            appInterface.style.display = "flex";
            showDashboard();
        });
    });

    // 2. Return to Main Selection Menu
    const returnToPortal = () => {
        appInterface.style.display = "none";
        portalScreen.style.display = "flex";
    };
    btnBackHome.addEventListener("click", returnToPortal);
    logoBackHome.addEventListener("click", returnToPortal);

    // 3. Main Stream Navigation Button Actions
    streamButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            streamButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            
            currentStreamKey = e.target.getAttribute("data-stream");
            loadStream(currentStreamKey);
            showDashboard();
        });
    });

    // Syllabus Menu Button
    btnDashboard.addEventListener("click", () => {
        showDashboard();
    });

    // Load Stream Data to Workspace
    function loadStream(streamKey) {
        const stream = courseStreams[streamKey];
        
        homeStreamTitle.textContent = stream.name;
        homeDescriptionContainer.innerHTML = `<p>${stream.description}</p>`;
        
        homeObjectivesBox.innerHTML = `<p>[Learning Objectives Placeholder]</p>`;

        // Populate Left-hand Units list
        chaptersNav.innerHTML = "";
        stream.chapters.forEach((chapter, index) => {
            const button = document.createElement("button");
            button.className = "nav-item";
            button.innerHTML = `<i class="fa-solid fa-folder"></i> ${chapter.unit}: ${chapter.title}`;
            button.addEventListener("click", () => showChapter(index));
            chaptersNav.appendChild(button);
        });
    }

    function showDashboard() {
        clearActiveSidebarItems();
        btnDashboard.classList.add("active");
        
        homeView.classList.add("active-view");
        chapterView.classList.remove("active-view");
    }

    function showChapter(index) {
        clearActiveSidebarItems();
        
        const navItems = chaptersNav.querySelectorAll(".nav-item");
        if (navItems[index]) {
            navItems[index].classList.add("active");
        }

        const chapter = courseStreams[currentStreamKey].chapters[index];

        homeView.classList.remove("active-view");
        chapterView.classList.add("active-view");

        viewChapterNum.textContent = chapter.unit;
        viewChapterName.textContent = chapter.title;
        
        // Dynamically insert Description Placeholder using unit details
        viewChapterDesc.textContent = `[Description Placeholder for ${chapter.unit}: ${chapter.title}]`;
    }

    function clearActiveSidebarItems() {
        btnDashboard.classList.remove("active");
        const navItems = chaptersNav.querySelectorAll(".nav-item");
        navItems.forEach(item => item.classList.remove("active"));
    }
});
