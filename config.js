const config = {
    communityName: "Independent Homies",
    pageTitle: "Independent Homies - ArmA Reforger Community",
    discordInviteLink: "https://discord.gg/d8rDJ5FDBt",

    // Hero section
    heroTagline: "Spojeni pro vítězství, vedeni taktikou.",
    ctaButtonText: "Připojte se k elitě",
    discordButtonText: "Discord",

    // About section
    aboutSectionTitle: "O naší komunitě",
    aboutText: `
        Independent Homies je komunitou, kde se každá bitva stává společným úspěchem. Naši členové, od začátečníků po veterány, sdílejí lásku k taktice a přátelství.
    `,
    communityHighlights: [
        { text: "Společné dobrodružství", icon: "fa-users" },
        { text: "Pravidelné akce a operace", icon: "fa-calendar-alt" },
        { text: "Trénink a rozvoj dovedností", icon: "fa-graduation-cap" },
        { text: "Jednota v boji", icon: "fa-handshake" }
    ],
    aboutLogo: 'logo2.png',

    // Server section
    serverSectionTitle: "Naše bojiště",
    serverStatusChecking: "Kontroluji...",
    serverJoinButtonText: "Připojit se k serveru",

    // Gallery section
    gallerySectionTitle: "Galerie bojů",
    galleryModalCloseText: "×",
    galleryModalPrevText: "❮",
    galleryModalNextText: "❯",

    // Apply section
    applySectionTitle: "Přidejte se k nám",
    applyButtonText: "Odeslat přihlášku",

    // Team section
    teamSectionTitle: "Náš tým",

    // Footer
    footerText: "Všechna práva vyhrazena.",

    // Scroll to top
    scrollToTopText: "Nahoru",

    // Custom alert
    customAlertCloseText: "OK",

    // Form validation messages
    formValidationMessages: {
        nameRequired: "Prosím, zadejte své jméno.",
        invalidEmail: "Prosím, zadejte platnou e-mailovou adresu.",
    },

    // Application success message
    applicationSuccessMessage: "Děkujeme za vaši přihlášku! Brzy ji přezkoumáme a dáme vám vědět.",

    servers: [
        {
            name: "Hlavní server",
            ip: "134.255.222.42:8290",
            battlemetricsID: "27493438"
        },
        {
            name: "Tréninkový server",
            ip: "134.255.228.13:20600",
            battlemetricsID: "27689161"
        },
    ],

    galleryImages: [
        'gallery.png', 'gallery2.png', 'gallery3.png', 'gallery4.png', 'gallery5.png',
        'gallery6.png', 'gallery7.png', 'gallery8.png', 'gallery9.png', 'gallery10.png',
        'gallery11.png', 'gallery12.png', 'gallery13.png', 'gallery14.png', 'gallery15.png',
        'gallery16.png', 'gallery17.png', 'gallery18.png', 'gallery19.png', 'gallery20.png',
    ],

    backgroundImages: {
        hero: ['background3.png', 'background4.png', 'background5.png', 'background6.png', 'background7.png'],
        server: 'background2.png',
        apply: 'background3.png'
    },
    backgroundChangeInterval: 5000, // ms

    teamMembers: [
        {
            name: "Pipin",
            role: "Administrátor",
            image: "logo.png",
            description: "Mentor, který rád předává své znalosti novým členům týmu.",
            steam: "https://steamcommunity.com/id/nekecey/",
            showSocials: false
        },
        {
            name: "Pipin",
            role: "Zakladatel",
            image: "member.png",
            description: "Mistr utajených operací a dlouhodobých střetů.",
            steam: "https://steamcommunity.com/id/nekecey/",
            showSocials: true
        },
        {
            name: "Pipin",
            role: "Vedení",
            image: "logo2.png",
            description: "Inovátor s talentem pro vymýšlení nečekaných taktik a strategií.",
            steam: "https://steamcommunity.com/id/nekecey/",
            showSocials: false
        },
    ]
};