//These objects will lookup the element ids based on the url
const URL_LOOKUP = [
    {
        url: "#SF16",
        navId: "#sf16Nav",
        id: "#sf16",
        pageName: "SF16"
    }
];

//This is the current page that is being shown
var currentPage = "mainPage";

//Check the current location to see if we are supposed to be inside a navigation
function checkNavigation(event) {
    var navUrl = location.href;
    if (event != undefined && event.target != undefined) {
        navUrl = event.target.href;
    }

    //If the navUrl is still undefined then this function won't do anything
    if (navUrl == undefined) {
        return;
    }

    //This will only be false if we can prove that we are not on the main page
    var mainPage = true;
    for (i of URL_LOOKUP) {
        if (navUrl.endsWith(i.url)) {
            $(i.navId)[0].classList = ["active"];
            $(i.id)[0].hidden = false;
            mainPage = false;
            currentPage = i.pageName;
        } else {
            $(i.navId)[0].classList = [];
            $(i.id)[0].hidden = true;
        }
    }

    if (mainPage) {
        $("#mainPage")[0].hidden = false;
        pageName = "mainPage";
    } else {
        $("#mainPage")[0].hidden = true;
    }

    hideContent();
}

//Look up the associated content page id to the header id
//These must be in the same order that they appear on the page
const HEADER_LOOKUP = {
    "mainPage": [
        {
            header: "aboutMe",
            content: "#aboutMeContent"
        }
    ],
    "SF16": [
        {
            header: "ricoh",
            content: "#ricohContent"
        },
        {
            header: "ricohGoals",
            content: "#ricohGoalsContent"
        },
        {
            header: "ricohJob",
            content: "#ricohJobContent"
        },
        {
            header: "ricohSummary",
            content: "#ricohSummaryContent"
        }
    ]
};

//The lock for when it is OK to do a header mouse over
var headerLock = false;

//Show the content corresponding to the header
function headerMouseOver(event) {
    if (headerLock) {
        return;
    }
    //Lock this event
    headerLock = true;
    for (i of HEADER_LOOKUP[currentPage]) {
        if (event.target.id === i.header) {
            $(i.content)[0].hidden = false;
        } else {
            $(i.content)[0].hidden = true;
        }
    }
    //Start the timeout for unlocking this event
    setTimeout(() => headerLock = false, 50);
}

//Hide all of the other content than the first one
function hideContent() {
    var firstHeader = true;
    for (i of HEADER_LOOKUP[currentPage]) {
        var contentElement = $(i.content);
        if (firstHeader && contentElement != undefined) {
            contentElement[0].hidden = false;
            firstHeader = false;
        } else if (contentElement != undefined) {
            contentElement[0].hidden = true;
        }
    }
}

//Add a handler for on-load of the document
$(function() {
    //Check the URL to show the correct section if there should be one shown
    checkNavigation();

    //Apply the mouse over change event to every header
    for (i of $("h1")) {
        i.addEventListener("mouseenter", headerMouseOver);
    }
});
