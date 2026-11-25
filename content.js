/* Everything you might want to change lives in this file. */
window.SITE = {
  email: "jiyar080@gmail.com",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jiyarathod/" },
    { name: "GitHub", href: "https://github.com/CozyJiya" },
  ],

  steps: [
    { title: "Listen", text: "Surveys and interviews to learn what people need before deciding what to make.", bg: "#BAD797", fg: "#3E2723", r: -2 },
    { title: "Define", text: "Sort findings into clear problems, user flows and priorities.", bg: "#FFEDAC", fg: "#3E2723", r: 1.5 },
    { title: "Design", text: "Wireframes first, then a visual system that keeps every screen consistent.", bg: "#F4C9D6", fg: "#3E2723", r: -1 },
    { title: "Build & test", text: "Prototype or code it, put it in front of people, and refine.", bg: "#282B4A", fg: "#FFF4D6", r: 2 },
  ],
  // Scribbles inside the crumpled paper balls, and both sides of the yellow note.
  ideas: ["logo idea no. 14 (no.)", "make it pop??", "final_v7_FINAL.fig"],
  reminder: ["save the file!!", "saved it. twice."],
  // The music behind the headphones, one song for day and one for night. Both are free to use as long as the credit stays.
  // file is in this site's folder; backup is used only if that file cannot load.
  song: {
    day: { title: "Teddy Bear Waltz", by: "Kevin MacLeod", from: "https://incompetech.com", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/", file: "assets/music/teddy-bear-waltz.mp3", backup: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Teddy_Bear_Waltz_%28ISRC_USUAN1700064%29.mp3" },
    night: { title: "Sinfonia No. 5", by: "J. S. Bach, played by Kevin MacLeod", from: "https://incompetech.com", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/", file: "assets/music/sinfonia-no-5.mp3", backup: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sinfonia_Number_5_%28ISRC_USUAN1100673%29.mp3" },
  },
  // Notes on the pink stack; each click peels to the next one.
  lookingFor: ["an excuse to buy more yarn", "the pen I just had", "my next hobby", "five more minutes of sleep"],
  // The about me page. kind "tags" draws pills, "list" draws rows (left, right, small line under), "line" is one line of text; wide takes the full width.
  about: [
    { h: "Education", kind: "list", wide: true, items: [["B.Tech AIML", "Universal AI University, Karjat", "2023–2027"]] },
    { h: "Skills", kind: "tags", items: ["UI/UX design", "User research", "Wireframing", "Prototyping", "Front-end development", "Back-end development", "Databases", "Machine learning", "Prompt engineering"] },
    { h: "Tools", kind: "tags", items: ["Figma", "FigJam", "Claude Design", "Canva", "VS Code", "Notion", "MySQL", "Jupyter Notebook"] },
    { h: "I code in", kind: "line", items: ["Python", "JavaScript", "HTML", "CSS", "SQL"] },
    { h: "I speak", kind: "line", items: ["English", "Hindi", "Marathi"] },
  ],

  /* The "more about me" drawing book: three cards to a page, new pages appear by themselves.
     Paste your addresses between the quotes; a name with an empty address shows as plain text. */
  craft: [
    { t: "Crochet", d: "One more row, I promise.", art: "yarn", bg: "#F4C9D6", links: [["Instagram", "https://www.instagram.com/_heymeraki_/?hl=en"]] },
    { t: "Novels", d: "Writing stories and getting far too attached to the characters.", art: "novel", bg: "#FFEDAC", links: [["Amazon", "https://amzn.in/d/0anS6Dr8"]] },
    { t: "Content creation", d: "Film it, cut it, watch it one last time. Again.", art: "film", bg: "#BAD797", links: [["YouTube", "https://www.youtube.com/@cozystar"]] },
    { t: "Painting", d: "And sketching. Paint on my hands is part of it.", art: "paint", bg: "#FFEDAC", links: [] },
    { t: "Junk journalling", d: "Tickets, wrappers, ribbons. Everything gets a page.", art: "junk", bg: "#F4C9D6", links: [] },
    { t: "Crafts", d: "If it can be cut, glued or tied, I’m in.", art: "crafts", bg: "#BAD797", links: [] },
    { t: "Puzzles", d: "Edges first. Always.", art: "puzzle", bg: "#BAD797", links: [] },
    { t: "Shopping", d: "“Just looking.” I was not just looking.", art: "bags", bg: "#FFEDAC", links: [] },
  ],
  // Fills the empty space on the last page.
  craftNext: { t: "And whatever comes next", d: "I love starting new hobbies, so this book is never finished." },

  // The first colour is the original cover. fg is the lettering on that cover.
  palette: [
    { hex: "#5D0703", name: "Bordeaux", fg: "#FFEDAC" },
    { hex: "#BAD797", name: "Vert pastel", fg: "#3E2723" },
    { hex: "#FFEDAC", name: "Jaune crème", fg: "#5D0703" },
    { hex: "#3E2723", name: "Marron foncé", fg: "#FFEDAC" },
    { hex: "#F4C9D6", name: "Rose poudré", fg: "#5D0703" },
    { hex: "#282B4A", name: "Midnight indigo", fg: "#FFEDAC" },
  ],

  // The swatches and book covers while the lamp is on.
  paletteNight: [
    { hex: "#CF4A4D", name: "Valiant Poppy", fg: "#FFF4EA" },
    { hex: "#DC7668", name: "Mecca Orange", fg: "#3A1A2F" },
    { hex: "#FFA67A", name: "Usugaki", fg: "#572F48" },
    { hex: "#817965", name: "Dried Herbs", fg: "#FFF0E2" },
    { hex: "#4E4C5E", name: "Kachi Indigo", fg: "#FFC9A9" },
    { hex: "#572F48", name: "Dulcet Violet", fg: "#FFA67A" },
  ],

  /* The book is built from this list, in this order. To add a project, copy a block and change it.
     - details: the rows on its page. Empty values are left out.
     - hosted / live / code / proto: where it runs, its link, its repository, its Figma prototype. Rows and buttons appear once filled.
     - shots: up to two screenshots for the left page; without them the drawing named in "art" is used.
     - steps, gallery, learned: only for projects with a full case study page. */
  projects: {
    fino: {
      title: "Fino", toc: "Smart expense tracker", type: "Internship", bg: "#282B4A", fg: "#FFF4D6",
      line: "A smart expense tracker that turns everyday spending into charts, summaries and PDF reports.",
      desc: "A personal expense tracker that logs spending, shows the month on charts, keeps track of subscriptions and turns it all into a PDF report.",
      company: "Riamona Luxury and Fashion Brands Pvt. Ltd.",
      details: [["Company", "Riamona Luxury and Fashion Brands Pvt. Ltd."], ["Role", "AI Engineer Intern"], ["When", "21 April to 20 July 2026"], ["Built with", "HTML, CSS, JavaScript, SQL, Chart.js, jsPDF, html2canvas"], ["Tools", "Supabase, Formspree, Figma"], ["AI used", "Kiro, Claude"]],
      hosted: "GitHub Pages", live: "https://cozyjiya.github.io/Fino/", code: "https://github.com/CozyJiya/Fino",
      shots: [{ src: "assets/fino-landing.png", w: 1010, h: 636, alt: "Fino landing page" }, { src: "assets/fino-dashboard.png", w: 1023, h: 631, alt: "Fino dashboard" }],
      about: {
        h: "What is Fino?",
        lead: "Fino is a web app for keeping track of money, day by day. You log what you spend and what you receive, and it keeps the totals, charts and reports up to date.",
        paras: ["Before Fino, people were using notes apps, spreadsheets and paper, with no set categories, no checks and no summary at the end of the month. Fino puts all of that in one place and one screen, on a dark, space-inspired interface made to work just as well on a phone."],
        features: [
          ["Spend and received", "Add an amount, a date, a note and a category. There are 14 categories for spending and 8 for money coming in. Anything can be edited or deleted later."],
          ["Dashboard", "Net balance, monthly net and daily average at the top, an interactive graph below, and the latest transactions."],
          ["Reports", "Daily and monthly charts, a breakdown by category, and a PDF to download."],
          ["Subscriptions and income", "Set a monthly payment or your income once, and Fino adds it by itself every month."],
          ["Your own account", "Username sign-in, profile photo, currency, CSV export, and the choice to clear your data or delete the account."],
          ["Private by design", "Eight database tables, each behind row-level security. Your money data is yours alone; only reviews and questions are shared."],
          ["Landing page", "Features, how it works, pricing, and a contact form that sends real email."],
          ["Community", "A question and answer page and reviews, written by signed-in users."],
        ],
      },
      story: {
        h: "The internship",
        lead: "Riamona is a luxury and fashion company in Navi Mumbai with a small technical team of its own. I joined remotely as an AI Engineer Intern for three months, along with three other interns.",
        paras: [
          "It ran as a customer and developer role-play. Each of us wrote a requirements document for a product, then we swapped, so everyone was a customer for one person and a developer for another. I was the customer for Delude, a habit tracker.",
          "As a developer, I received another intern’s expense tracker, with the freedom to change it and add to it. I named it Fino and took it all the way: technical specification, UX, design, front end, back end, testing, demo and final delivery. After that, I built its public landing page and finished with research on payment integration.",
        ],
        weeks: [
          ["Week 1", "Requirements, technical specification, UX requirements, Figma mockups and Supabase setup"],
          ["Week 2", "Front end finished: adding, editing, deleting, categories and security rules"],
          ["Week 3", "Testing, bug fixes, edge cases and performance"],
          ["Week 4", "Demo to the customer, feedback and fixes"],
          ["Weeks 5 to 7", "Passwords, phone numbers, monthly income, profile photos, and deleting data or an account"],
          ["Weeks 8 to 9", "The public landing page"],
          ["Weeks 10 to 11", "Community, reviews, contact email, subscriptions, currency, CSV export and the final presentation"],
          ["Weeks 12 to 13", "Research on payment integration"],
        ],
      },
      galTitle: "Inside Fino",
      gallery: [
        { src: "assets/fino-landing.png", w: 1010, h: 636, t: "Landing page", d: "One promise up front, “Every rupee, perfectly tracked”, with a preview of the dashboard." },
        { src: "assets/fino-dashboard.png", w: 1023, h: 631, t: "Dashboard", d: "Net balance, monthly net and daily average, with the balance over time below." },
        { src: "assets/fino-add.png", w: 685, h: 368, t: "Add a transaction", d: "Spend or received, an amount, a date, a note and a category." },
        { src: "assets/fino-summary.png", w: 683, h: 369, t: "Reports", d: "Daily activity, the month’s spending by category, and the full breakdown below." },
        { src: "assets/fino-reports.png", w: 1039, h: 561, t: "Monthly and yearly", d: "What came in, what went out and what was saved, ready to download as a PDF." },
        { src: "assets/fino-subscriptions.png", w: 671, h: 361, t: "Subscriptions", d: "Recurring payments, added automatically on the day you choose." },
        { src: "assets/fino-community.png", w: 679, h: 365, t: "Community", d: "Questions and answers between people who use Fino." },
        { src: "assets/fino-pricing.png", w: 686, h: 369, t: "Pricing", d: "Three plans side by side under “Honest pricing. No surprises.”" },
      ],
      tools: ["HTML & CSS", "JavaScript", "SQL", "Chart.js", "jsPDF", "html2canvas", "Supabase", "Formspree", "Figma", "GitHub", "Kiro", "Claude"],
      learned: "Playing both the customer and the developer showed me how real requirements get written, questioned and agreed.",
    },
    solar: {
      title: "Solar Benefit Calculator", toc: "Web app, Encosym Solutions", type: "Internship", bg: "#FFEDAC", fg: "#3E2723", art: "solar",
      desc: "A web app that estimates what a home could save with solar power, from the size of the rooftop and where it is.",
      company: "Encosym Solutions",
      details: [["Company", "Encosym Solutions"], ["Role", "Frontend Developer & Project Intern"], ["When", "2 months"], ["Team", "Group project"], ["My part", "Front-end design and build, savings logic, testing"], ["Built with", "HTML, CSS, JavaScript"], ["AI used", ""]],
      hosted: "", live: "", code: "", shots: [],
    },
    hanger: {
      title: "Hanger", toc: "Fashion app, UI/UX", type: "College project", bg: "#A5BDE1", fg: "#6E1E3B",
      line: "A fashion shopping app where you put together the whole outfit before you buy it.",
      desc: "A UI/UX project taken from a survey and interviews to high-fidelity screens. You build a look on a mannequin, mix in what you already own, and buy the rest.",
      company: "",
      details: [["Role", "UX researcher and UI/UX designer"], ["Research", "Survey and interviews"], ["Design", "Mood board, low-fi, mid-fi, high-fi"], ["Made in", "Figma"], ["AI used", "None, all done by hand"]],
      hosted: "", live: "", code: "", post: "",
      proto: "https://www.figma.com/proto/DHqZgudsNp7sWwbWxbDQ9L/Application?node-id=27-549&t=ayFRCv3Pxw520yO9-1",
      shots: [{ src: "assets/hanger/moodboard-cut.webp", w: 994, h: 692, alt: "Hanger mood board with powder blue, dried plum, golden yellow and ivory" }],
      plate: { board: { src: "assets/hanger/moodboard-cut.webp", w: 994, h: 692, alt: "Hanger mood board with powder blue, dried plum, golden yellow and ivory" }, phones: [{ src: "assets/hanger/hi-home.png", w: 116, h: 262, t: "Home" }, { src: "assets/hanger/hi-build-9.png", w: 120, h: 268, t: "A finished outfit on the mannequin" }, { src: "assets/hanger/hi-build-10.png", w: 120, h: 268, t: "Saved outfits" }] },
      coverPhones: [{ src: "assets/hanger/hi-start.png", w: 117, h: 262, t: "Start" }, { src: "assets/hanger/hi-home.png", w: 116, h: 262, t: "Home" }, { src: "assets/hanger/hi-build-9.png", w: 120, h: 268, t: "A finished outfit on the mannequin" }, { src: "assets/hanger/hi-build-10.png", w: 120, h: 268, t: "Saved outfits" }, { src: "assets/hanger/hi-build-2.png", w: 120, h: 303, t: "Choosing a top" }],
      about: {
        h: "What is Hanger?",
        lead: "Hanger is a fashion shopping app built around the whole outfit. You dress a mannequin piece by piece, see the total as you go, and save the look or buy it.",
        paras: ["Shopping apps usually sell one item at a time and leave you to imagine the rest. Hanger puts the top, bottom, shoes and accessories together, next to the clothes you already have at home."],
        features: [
          ["Build an outfit", "Add a top or dress, a bottom, footwear and accessories to the mannequin. The total price changes with every piece."],
          ["Use what you own", "Mark the clothes you already own, then filter by owned items or by your closet when you add a piece."],
          ["Made to fit", "A short setup asks for your measurements and sizes, so a product page can recommend the right one."],
          ["Your style", "Pick streetwear, minimalist, casual, athleisure or formal, and the app knows what to show first."],
          ["My outfits", "Saved looks for every plan, from hanging out with friends to a wedding, with owned and favourite filters."],
          ["Search to bag", "Search, filters, product pages with buyer ratings, and a bag with quantities and a coupon."],
        ],
      },
      stages: [
        { h: "Research", d: "I started with a survey and interviews, to learn how people discover, compare and buy clothes, and where shopping apps let them down. What I heard shaped the features before I drew a single screen." },
        { h: "Low-fi", d: "The first sketches, when the app was still called Yoink!. Boxes and lines only, to settle the flow from sign-up to checkout.", board: { src: "assets/hanger/lowfi.png", w: 1005, h: 767, alt: "Nine hand-drawn low-fidelity screens, from start to checkout", bg: "#F5FAFF" } },
        { h: "Mid-fi", d: "Grey screens in Figma with real spacing and real content, and the first version of the mannequin.", groups: [
          { size: 168, list: [{ src: "assets/hanger/mid-start.png", w: 187, h: 416, t: "Start" }, { src: "assets/hanger/mid-gender.png", w: 187, h: 416, t: "Gender" }, { src: "assets/hanger/mid-fit.png", w: 187, h: 416, t: "Your fit" }, { src: "assets/hanger/mid-style.png", w: 186, h: 416, t: "Your style" }, { src: "assets/hanger/mid-signin.png", w: 187, h: 416, t: "Sign in" }] },
          { size: 118, list: [{ src: "assets/hanger/mid-home.png", w: 85, h: 190, t: "Home" }, { src: "assets/hanger/mid-search.png", w: 85, h: 190, t: "Search" }, { src: "assets/hanger/mid-product.png", w: 85, h: 190, t: "Product" }, { src: "assets/hanger/mid-outfits.png", w: 85, h: 190, t: "My outfits" }], wide: { src: "assets/hanger/mid-builder.png", w: 484, h: 362, alt: "Mid-fidelity outfit builder flow with a mannequin" } },
        ] },
        { h: "Mood board", d: "Glass, denim, satin, cake and old cars. The board gave Hanger its colours, its softness and its sense of humour: shopping is a good form of therapy.", board: { src: "assets/hanger/moodboard-cut.webp", w: 994, h: 692, alt: "Mood board of fabrics, shoes, cars, cakes and a colour palette", bg: "" }, colors: [["Powder Blue", "#A5BDE1"], ["Dried Plum", "#6E1E3B"], ["Golden Yellow", "#F9DD8A"], ["Ivory", "#F7F6D7"]] },
        { h: "High-fi", d: "The mood board becomes an interface, and Yoink! becomes Hanger, with a wordmark to match.", groups: [
          { t: "From the first tap", size: 160, list: [{ src: "assets/hanger/hi-start.png", w: 117, h: 262, t: "Start" }, { src: "assets/hanger/hi-gender.png", w: 117, h: 262, t: "Gender" }, { src: "assets/hanger/hi-fit.png", w: 117, h: 262, t: "Your fit" }, { src: "assets/hanger/hi-style.png", w: 118, h: 262, t: "Your style" }, { src: "assets/hanger/hi-signup.png", w: 117, h: 262, t: "Sign up" }, { src: "assets/hanger/hi-home.png", w: 116, h: 262, t: "Home" }] },
          { t: "Building an outfit", size: 176, steps: true, list: [{ src: "assets/hanger/hi-build-1.png", w: 120, h: 268, t: "Bare mannequin" }, { src: "assets/hanger/hi-build-2.png", w: 120, h: 303, t: "Choose a top" }, { src: "assets/hanger/hi-build-3.png", w: 120, h: 268, t: "The top is on" }, { src: "assets/hanger/hi-build-4.png", w: 120, h: 305, t: "Choose a bottom" }, { src: "assets/hanger/hi-build-5.png", w: 120, h: 268, t: "The skirt is on" }, { src: "assets/hanger/hi-build-6.png", w: 120, h: 303, t: "Choose a bag" }, { src: "assets/hanger/hi-build-7.png", w: 120, h: 268, t: "Three pieces" }, { src: "assets/hanger/hi-build-8.png", w: 120, h: 305, t: "Choose the shoes" }, { src: "assets/hanger/hi-build-9.png", w: 120, h: 268, t: "The whole look" }, { src: "assets/hanger/hi-build-10.png", w: 120, h: 268, t: "Saved" }] },
        ] },
        { h: "Empty states", d: "Even nothing should feel like something. Each empty screen gets a small drawing in the same plum ink.", groups: [{ size: 230, list: [{ src: "assets/hanger/empty-search.png", w: 249, h: 555, t: "No results" }, { src: "assets/hanger/empty-error.png", w: 249, h: 555, t: "Something went wrong" }, { src: "assets/hanger/empty-bag.png", w: 249, h: 555, t: "Empty bag" }, { src: "assets/hanger/empty-offline.png", w: 249, h: 555, t: "Offline" }] }] },
      ],
      galTitle: "", gallery: [],
      tools: ["Figma", "Survey", "Interviews", "Wireframing", "Prototyping", "Visual design"],
    },
    garden: {
      title: "Garden of Your Story", toc: "A night garden of stories", type: "Personal project", bg: "#0F2140", fg: "#F0E6C8",
      line: "A night garden on the web where every flower holds someone’s story.",
      desc: "Draw a flower, leave a story with it, and plant it in a shared night garden. Click any bloom to read what someone else planted.",
      company: "",
      details: [["For", "Personal project"], ["Role", "Designed and built by Jiya Rathod"], ["Front end", "HTML, CSS, JavaScript"], ["Back end", "Cloudflare Workers"], ["AI used", "ChatGPT"]],
      hosted: "GitHub Pages", live: "https://cozyjiya.github.io/garden-of-your-story/", code: "https://github.com/CozyJiya/garden-of-your-story", post: "",
      shots: [{ src: "assets/garden-home-close.png", w: 1500, h: 960, alt: "Garden of Your Story: hand-drawn flowers growing on a hill under the stars" }, { src: "assets/garden-story-close.png", w: 800, h: 560, alt: "A story opened beside its hand-drawn yellow flower" }],
      about: {
        h: "What is it?",
        lead: "Garden of Your Story is a night garden on the web. Anyone can draw a flower, leave a story with it, and plant it for other people to find.",
        paras: ["I built it as a safe space for anyone with a story to tell, whether it is about struggle, survival or hope. You can plant yours as openly or as anonymously as you like. Your words might be exactly what someone else needs to keep going."],
        features: [
          ["Draw your flower", "A small canvas with brush colours, sizes, an eraser and undo. Your marks bloom in the garden exactly as you made them."],
          ["Plant your story", "Write as much or as little as feels safe. A name is optional, and without one you are Anonymous."],
          ["Walk through the garden", "Hover over a plant to see who planted it. Click it to read their story beside their own flower."],
          ["Help, close by", "The first flower is mine. It welcomes you and points you to Tele-MANAS on 14416 in India, or findahelpline.com anywhere else."],
          ["Shared by everyone", "Each flower and story is saved through a Cloudflare Worker, so the same garden grows for every visitor."],
          ["Made for hands", "Drawing works with a mouse or a finger, so people can plant from a phone too."],
        ],
      },
      galTitle: "In the garden",
      gallery: [
        { src: "assets/garden-home.png", w: 1917, h: 1027, t: "The garden", d: "Stars, a moon, and a row of hand-drawn flowers growing along the hill." },
        { src: "assets/garden-story.png", w: 920, h: 900, fw: 440, t: "A story", d: "The flower someone drew, with the words they planted below it." },
      ],
      tools: ["HTML & CSS", "JavaScript", "Canvas", "Cloudflare Workers", "GitHub Pages", "ChatGPT"],
    },
    dear: {
      title: "Dear Life", toc: "Photo journal for friends", type: "Personal project", bg: "#22356B", fg: "#F3E9D2",
      line: "A photo journal app I made for my friends, as a surprise.",
      desc: "Photos with the story behind them, a daily quiz that ends in a funny story, scrapbook journals, and games for when we all get together.",
      company: "",
      details: [["For", "My friends, as a surprise"], ["Role", "Designed and built by Jiya Rathod"], ["Status", "Working app"], ["Back end", "Supabase and two APIs"], ["AI used", "Claude Design, Claude Code"]],
      hosted: "", live: "", code: "", post: "",
      shots: [],
      plate: { phones: [{ src: "assets/dear/page.webp", w: 480, h: 1024, t: "A scrapbook page" }, { src: "assets/dear/start.webp", w: 480, h: 1024, t: "The opening screen" }, { src: "assets/dear/shelf.webp", w: 480, h: 1024, t: "The shelf of journals and games" }] },
      coverBg: "#22356B",
      coverPhones: [{ src: "assets/dear/albums.webp", w: 480, h: 1024, t: "Albums" }, { src: "assets/dear/page.webp", w: 480, h: 1024, t: "A scrapbook page" }, { src: "assets/dear/start.webp", w: 480, h: 1024, t: "The opening screen" }, { src: "assets/dear/shelf.webp", w: 480, h: 1024, t: "Shelf" }, { src: "assets/dear/games.webp", w: 480, h: 1024, t: "Games" }],
      about: {
        h: "What is Dear Life?",
        lead: "Dear Life is a photo journal app made for one group of friends. It holds our photos, the stories behind them, and a few reasons to open it every day.",
        paras: ["I made this working app as a surprise for my friends. The look comes from real scrapbooks: paper scraps, tape, old letters and stickers on a navy cover."],
        features: [
          ["Photos with a story", "Add a photo to an album, give it a title, and write the story behind it."],
          ["A daily quiz", "Ten questions, and none of them serious."],
          ["A funny story", "The result is a ridiculous little story with your friends in it, revealed at midnight."],
          ["A digital scrapbook", "Make journal pages with paper, photos, scraps, text and drawing."],
          ["Games for get-togethers", "Seven classic party games that work offline, for when everyone is in one room."],
          ["Your page", "Your year so far, your bestie, your nemesis and your latest quiz result."],
        ],
      },
      stages: [
        { h: "Photos and albums", d: "Home opens with the latest photo. Every photo lives in an album, with its title and its story.", groups: [{ size: 236, list: [{ src: "assets/dear/start.webp", w: 480, h: 1024, t: "The opening screen" }, { src: "assets/dear/home.webp", w: 480, h: 1024, t: "Home, with the latest photo" }, { src: "assets/dear/albums.webp", w: 480, h: 1024, t: "Albums" }] }] },
        { h: "Daily quiz", d: "Answer ten silly questions, then wait for midnight. The app turns the answers into a story about everyone.", groups: [{ size: 236, list: [{ src: "assets/dear/quiz.webp", w: 480, h: 1024, t: "Question one of ten" }, { src: "assets/dear/result.webp", w: 480, h: 1024, t: "The story, blurred because my friends are in it" }, { src: "assets/dear/you.webp", w: 480, h: 1024, t: "Your page" }] }] },
        { h: "Journal", d: "A digital scrapbook. Start with a blank page, then layer paper, photos, frames, tape and stickers until it feels like yours.", groups: [{ size: 236, list: [{ src: "assets/dear/editor.webp", w: 480, h: 1024, t: "A blank page" }, { src: "assets/dear/journal.webp", w: 480, h: 1024, t: "Pick a journal" }, { src: "assets/dear/page.webp", w: 480, h: 1024, t: "A finished page" }] }] },
        { h: "Games", d: "Offline games for when we get together: Guess the Number, Guess the Age, Would You Rather and more. Seven in all.", groups: [{ size: 236, list: [{ src: "assets/dear/shelf.webp", w: 480, h: 1024, t: "The shelf" }, { src: "assets/dear/games.webp", w: 480, h: 1024, t: "Pick a game" }] }] },
      ],
      galTitle: "", gallery: [],
      tools: ["Supabase", "Claude Design", "Claude Code"],
    },
  },
};
