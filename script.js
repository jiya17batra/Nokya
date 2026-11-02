/* =====================================================================
   1. VINTAGE RETRO BEEP SYNTHESIZER (Web Audio API)
   ===================================================================== */
let audioCtx = null;
function playBeep(freq = 680, duration = 0.05, type = 'sine') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {
    // Fallback gracefully if audio blocked
  }
}

/* =====================================================================
   2. DATA REPOSITORY
   ===================================================================== */
const DATA = {
  techStack: [
    {
      title: "TECH STACK",
      lines: [
        "HTML · CSS · JavaScript",
        "Python · SQL · Gen AI",
        "React · AWS"
      ],
      pageIndicator: "Press 3"
    },
    {
      title: "TOOLS & CREATIVE TECH STACK",
      lines: [
        "Figma · Canva · Power BI",
        "VS Code · Git · GitHub",
        "Generative AI · AI Tools"
      ],
      pageIndicator: "Press 3"
    }
  ],

  projects: [
    {
      title: "Banking Transaction Analysis",
      desc: "Turning transaction data into meaningful insights through interactive dashboards.",
      link: "https://jiya17batra.github.io/Banking-Transaction-Analysis/"
    },
    {
      title: "AI Company Research Assistant",
      desc: "Exploring AI-powered research to simplify company analysis and discovery.",
      link: "https://ai-company-research-aame3ra1t-jiya17batra-2918s-projects.vercel.app/"
    },
    {
      title: "Good Morning, India",
      desc: "A creative digital tribute blending Indian classical music, design and animation.",
      link: "https://good-morning-india-psi.vercel.app/"
    },
    {
      title: "Nazariya Booth (Photo Booth)",
      desc: "An experiential design concept bringing creativity and interactive storytelling together.",
      link: "https://github.com/jiya17batra"
    }
  ],

  career: [
    {
      company: "Infosys",
      role: "Software Developer Trainee",
      period: "Jun – Nov 2024"
    },
    {
      company: "DYSL-DRDO",
      role: "Drone Simulation Team Lead",
      period: "Apr – May 2025"
    },
    {
      company: "Tech Roxx",
      role: "Content Strategist & Design Intern",
      period: "Jun – Sep 2026"
    }
  ],

  creative: [
    {
      name: "Pancha Mahabhuta",
      desc: "Bringing the five elements to life through motion and visual storytelling.",
      link: "https://jiya17batra.github.io/Pancha-Mahabhuta/"
    },
    {
      name: "Ved-Aura",
      desc: "Exploring cultural aesthetics through creative animation and visual design.",
      link: "https://jiya17batra.github.io/Ved-Aura----HTML-CSS-GSAP-drippin-in-smooth-vibes/"
    },
    {
      name: "Ice Cream Palette",
      desc: "A playful colour exploration through flavour-inspired visuals and animation.",
      link: "https://jiya17batra.github.io/Ice-Cream-Palette/"
    }
  ],

  learning: [
    {
      institution: "Vignan's Institute of Management & Technology for Women",
      degree: "B.Tech — Computer Science & Engineering",
      period: "2022–2026",
      score: "CGPA-8.2/10"
    },
    {
      institution: "Deeksha Model High School",
      degree: "SSC- Telangana",
      period: "2020",
      score: "CGPA-9.8/10"
    }
  ],

  progressItems: [
    { title: "WhatsApp-Style Portfolio", link: "https://jiya-portfolio-2en7.vercel.app/" },
    { title: "Portfolio Times", link: "https://jiya17batra.github.io/The-Portfolio-Times/" },
    { title: "Personal Portfolio Website", link: "https://jiya17batra.github.io/Interactive-Portfolio/" },
    { title: "Nokia-Style Portfolio — YOU'RE HERE! ;)", current: true }
  ],

  life: [
    {
      title: "01. National-Level Representation — 2026",
      desc: "Honoured to represent Telangana at the National Youth Exchange.",
      link: "https://lnkd.in/p/djrd6avd"
    },
    {
      title: "02. Team Leadership Recognition — 2024",
      desc: "Recognized by Dr. G. Satheesh Reddy, Former DRDO Chairman, for team leadership.",
      link: "https://www.instagram.com/p/DVyVHf8E4KJ/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
    }
  ]
};

/* =====================================================================
   3. NAVIGATION STATE CONTROLLER
   ===================================================================== */
let currentScreen = 'intro';
let subIndex = 0;
let cameraStream = null;

const screenViewPort = document.getElementById('screenViewPort');
const bottomLeftPrompt = document.getElementById('bottomLeftPrompt');
const bottomRightPrompt = document.getElementById('bottomRightPrompt');

function render() {
  const bottomBar = document.getElementById('screenBottomBar');
  if (bottomBar) bottomBar.style.display = (currentScreen === 'intro') ? 'none' : 'flex';

  if (currentScreen !== 'camera' && cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  switch (currentScreen) {
    case 'intro':
      renderIntro();
      break;
    case 'menu':
      renderMenu();
      break;
    case 'about':
      renderAbout();
      break;
    case 'tech':
      renderTech();
      break;
    case 'projects':
      renderProjects();
      break;
    case 'career':
      renderCareer();
      break;
    case 'creative':
      renderCreative();
      break;
    case 'learning':
      renderLearning();
      break;
    case 'pixels':
      renderPixels();
      break;
    case 'life':
      renderLife();
      break;
    case 'contact':
      renderContact();
      break;
    case 'resume':
      renderResume();
      break;
    case 'camera':
      renderCamera();
      break;
    default:
      renderMenu();
  }
}

/* =====================================================================
   4. SCREEN RENDERERS
   ===================================================================== */

// 1. INTRO / BOOT SCREEN
function renderIntro() {
  const bottomBar = document.getElementById('screenBottomBar');
  if (bottomBar) bottomBar.style.display = 'none';

  screenViewPort.innerHTML = `
    <div class="h-full w-full flex items-center justify-center overflow-hidden select-none">
      <div class="transform -translate-x-6 scale-[1.28] flex flex-col items-center justify-center">
        <img 
          src="img.png" 
          alt="CLOCK IT" 
          class="retro-sprite max-h-[195px] w-auto object-contain pointer-events-none drop-shadow-xs"
        />
      </div>
    </div>
  `;
}
   
// 2. MAIN MENU
function renderMenu() {
  bottomLeftPrompt.textContent = "Select";
  bottomRightPrompt.textContent = "Press 1-0";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-start overflow-y-auto lcd-scroll px-0.5 space-y-[2.8px] text-[12px] font-bold text-[#1a2512]">
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('1')">
        <span class="font-extrabold text-[#2a381c]">Press 1</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">About me</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('2')">
        <span class="font-extrabold text-[#2a381c]">Press 2</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">My Developer Toolkit</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('3')">
        <span class="font-extrabold text-[#2a381c]">Press 3</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Project Gallery</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('4')">
        <span class="font-extrabold text-[#2a381c]">Press 4</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Career Timeline</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('5')">
        <span class="font-extrabold text-[#2a381c]">Press 5</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Creative Archive</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('6')">
        <span class="font-extrabold text-[#2a381c]">Press 6</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Learning Journey</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('7')">
        <span class="font-extrabold text-[#2a381c]">Press 7</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Pixels of Progress</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('8')">
        <span class="font-extrabold text-[#2a381c]">Press 8</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Life Beyond Code</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('9')">
        <span class="font-extrabold text-[#2a381c]">Press 9</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Contact me</span>
      </div>
      <div class="flex justify-between items-center cursor-pointer hover:bg-[#8e9c77] px-1 py-0.5 rounded" onclick="pressKey('0')">
        <span class="font-extrabold text-[#2a381c]">Press 0</span>
        <span class="tracking-tight text-right flex-1 ml-3 font-semibold">Download Resume</span>
      </div>
    </div>
  `;
}

// 3. ABOUT ME SCREEN
function renderAbout() {
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 2";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1 text-center">
      <div>
        <h2 class="text-lg font-black text-[#1b2612] tracking-tight mb-2">Hello there, I'm Jiya!</h2>
        <p class="text-[12px] leading-snug font-medium text-[#202c16] px-1">
          A creative mind blending design, code & curiosity to make the digital world a little more delightful.
        </p>
      </div>
      
      <div class="my-auto py-2">
        <p class="text-[13px] font-bold text-[#1b2713] tracking-tight">Frontend Developer</p>
        <p class="text-[11.5px] font-semibold text-[#29361a] mt-0.5">Design. Create. Grow.</p>
      </div>
      
      <div class="w-full h-[1px] bg-[#2d3a20]/20 mb-1"></div>
    </div>
  `;
}

// 4. TECH STACK SCREEN
function renderTech() {
  const page = DATA.techStack[subIndex % DATA.techStack.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = page.pageIndicator;

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1.5 px-1">
      <h2 class="text-center text-[15px] font-black uppercase tracking-tight text-[#1a2512]">
        ${page.title}
      </h2>

      <div class="flex items-center justify-between my-auto py-1">
        <button onclick="handleNavPrev()" class="text-sm font-black px-1.5 py-1 text-[#2d3a20] hover:scale-125 cursor-pointer">&lt;</button>
        
        <div class="flex-1 text-center space-y-2 px-1">
          ${page.lines.map(line => `<div class="text-[13px] font-semibold tracking-wide text-[#1c2713]">${line}</div>`).join('')}
        </div>

        <button onclick="handleNavNext()" class="text-sm font-black px-1.5 py-1 text-[#2d3a20] hover:scale-125 cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1.5 pb-1">
        <span class="w-2 h-2 rounded-full ${subIndex === 0 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        <span class="w-2 h-2 rounded-full ${subIndex === 1 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
      </div>
    </div>
  `;
}

// 5. PROJECT GALLERY (With clickable 🔗 link)
function renderProjects() {
  const proj = DATA.projects[subIndex % DATA.projects.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 4";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1">
      <h2 class="text-center text-sm font-black tracking-tight text-[#1a2512]">Project gallery</h2>

      <div class="flex items-center justify-between my-auto">
        <button onclick="handleNavPrev()" class="text-base font-black px-1 py-1 text-[#2d3a20] hover:scale-125 cursor-pointer">&lt;</button>
        
        <div class="flex-1 text-center px-1.5">
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="font-extrabold text-[13.5px] leading-snug text-[#182310] inline-flex items-center justify-center gap-1.5 hover:underline cursor-pointer">
            <span>${proj.title}</span>
            <span class="text-[11px] leading-none inline-block">🔗</span>
          </a>
          <p class="text-[11.5px] leading-tight font-medium text-[#25321a] mt-2">
            ${proj.desc}
          </p>
        </div>

        <button onclick="handleNavNext()" class="text-base font-black px-1 py-1 text-[#2d3a20] hover:scale-125 cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1 pb-1">
        ${DATA.projects.map((_, i) => `
          <span class="w-1.5 h-1.5 rounded-full ${subIndex === i ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        `).join('')}
      </div>
    </div>
  `;
}

// 6. CAREER TIMELINE
function renderCareer() {
  const job = DATA.career[subIndex % DATA.career.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 5";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1 text-center">
      <h2 class="text-sm font-black tracking-tight text-[#1a2512]">Career Timeline</h2>

      <div class="flex items-center justify-between my-auto">
        <button onclick="handleNavPrev()" class="text-base font-black px-1 py-1 text-[#2d3a20] cursor-pointer">&lt;</button>
        
        <div class="flex-1 px-1">
          <h3 class="text-[14px] font-extrabold text-[#17220f]">${job.company}</h3>
          <p class="text-[12.5px] font-bold text-[#233118] mt-1 leading-snug">${job.role}</p>
          <p class="text-[11px] font-semibold text-[#303f23] mt-2">${job.period}</p>
        </div>

        <button onclick="handleNavNext()" class="text-base font-black px-1 py-1 text-[#2d3a20] cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1 pb-1">
        ${DATA.career.map((_, i) => `
          <span class="w-1.5 h-1.5 rounded-full ${subIndex === i ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. CREATIVE ARCHIVE (With clickable 🔗 link)
function renderCreative() {
  const item = DATA.creative[subIndex % DATA.creative.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 4";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1 text-center">
      <h2 class="text-sm font-black tracking-tight text-[#1a2512]">Creative Archive</h2>

      <div class="flex items-center justify-between my-auto">
        <button onclick="handleNavPrev()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&lt;</button>
        
        <div class="flex-1 px-1.5">
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="font-extrabold text-[14px] text-[#192511] inline-flex items-center justify-center gap-1.5 hover:underline cursor-pointer">
            <span>${item.name}</span>
            <span class="text-[11px] leading-none inline-block">🔗</span>
          </a>
          <p class="text-[11.5px] font-medium leading-tight text-[#222e17] mt-2.5">
            ${item.desc}
          </p>
        </div>

        <button onclick="handleNavNext()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1 pb-1">
        ${DATA.creative.map((_, i) => `
          <span class="w-1.5 h-1.5 rounded-full ${subIndex === i ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        `).join('')}
      </div>
    </div>
  `;
}

// 8. LEARNING JOURNEY
function renderLearning() {
  const item = DATA.learning[subIndex % DATA.learning.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 7";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1 text-center">
      <h2 class="text-sm font-black tracking-tight text-[#1a2512]">Learning Journey</h2>

      <div class="flex items-center justify-between my-auto">
        <button onclick="handleNavPrev()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&lt;</button>
        
        <div class="flex-1 px-1">
          <h3 class="text-[12.5px] font-black leading-tight text-[#182310]">${item.institution}</h3>
          <p class="text-[11.5px] font-bold text-[#202c17] mt-1.5 leading-tight">${item.degree}</p>
          <div class="flex justify-between items-center text-[11px] font-extrabold text-[#2a381f] mt-3 px-2">
            <span>${item.score}</span>
            <span>${item.period}</span>
          </div>
        </div>

        <button onclick="handleNavNext()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1.5 pb-1">
        <span class="w-1.5 h-1.5 rounded-full ${subIndex === 0 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        <span class="w-1.5 h-1.5 rounded-full ${subIndex === 1 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
      </div>
    </div>
  `;
}

// 9. PIXELS OF PROGRESS
function renderPixels() {
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 8";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1">
      <h2 class="text-center text-[13px] font-black uppercase tracking-wider text-[#1a2512]">PIXELS OF PROGRESS</h2>

      <div class="space-y-2 my-auto px-1">
        <a href="${DATA.progressItems[0].link}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between text-[11.5px] font-bold text-[#1c2713] cursor-pointer hover:underline">
          <span>WhatsApp-Style Portfolio</span>
          <span class="text-[11px]">🔗</span>
        </a>
        <a href="${DATA.progressItems[1].link}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between text-[11.5px] font-bold text-[#1c2713] cursor-pointer hover:underline">
          <span>Portfolio Times</span>
          <span class="text-[11px]">🔗</span>
        </a>
        <a href="${DATA.progressItems[2].link}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between text-[11.5px] font-bold text-[#1c2713] cursor-pointer hover:underline">
          <span>Personal Portfolio Website</span>
          <span class="text-[11px]">🔗</span>
        </a>
        <div class="border-t border-[#2d3a20]/25 pt-1.5 text-[11.5px] font-black text-[#1a2611]">
          <div>Nokia-Style Portfolio —</div>
          <div class="text-[12px] text-[#131d0b] font-black tracking-wide">YOU'RE HERE! ;)</div>
        </div>
      </div>

      <div class="w-full h-[1px] bg-[#2d3a20]/20"></div>
    </div>
  `;
}

// 10. LIFE BEYOND CODE (With clickable 🔗 link)
function renderLife() {
  const item = DATA.life[subIndex % DATA.life.length];
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 9";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1 text-center">
      <h2 class="text-sm font-black tracking-tight text-[#1a2512]">Life beyond code</h2>

      <div class="flex items-center justify-between my-auto">
        <button onclick="handleNavPrev()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&lt;</button>
        
        <div class="flex-1 px-1">
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="font-black text-[13px] leading-tight text-[#182410] inline-flex items-center justify-center gap-1.5 hover:underline cursor-pointer">
            <span>${item.title}</span>
            <span class="text-[11px] leading-none inline-block">🔗</span>
          </a>
          <p class="text-[11.5px] leading-snug font-medium text-[#243118] mt-2.5 px-1">
            ${item.desc}
          </p>
        </div>

        <button onclick="handleNavNext()" class="text-base font-black px-1 text-[#2d3a20] cursor-pointer">&gt;</button>
      </div>

      <div class="flex justify-center gap-1 pb-1">
        <span class="w-1.5 h-1.5 rounded-full ${subIndex === 0 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
        <span class="w-1.5 h-1.5 rounded-full ${subIndex === 1 ? 'bg-[#1e2815]' : 'border border-[#1e2815]'}"></span>
      </div>
    </div>
  `;
}

// 11. CONTACT ME
function renderContact() {
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press 0";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-1 px-1">
      <div class="flex items-center justify-between px-1">
        <h2 class="text-sm font-black tracking-tight text-[#1a2512]">Contact me</h2>
        <span class="text-[11px] font-bold">↗</span>
      </div>

      <div class="space-y-2.5 my-auto px-1 text-[12px] font-bold text-[#1a2512]">
        <a href="mailto:jiya17batra@gmail.com" class="flex items-center gap-2 hover:underline">
          <span class="w-5 h-4 rounded bg-[#1e2815] text-[#9ba983] flex items-center justify-center text-[10px]">✉</span>
          <span class="truncate">jiya17batra@gmail.com</span>
        </a>
        
        <a href="https://linkedin.com/in/jiya17batra" target="_blank" class="flex items-center gap-2 hover:underline">
          <span class="w-5 h-4 rounded bg-[#1e2815] text-[#9ba983] flex items-center justify-center text-[10px] font-bold">in</span>
          <span>in/jiya17batra</span>
        </a>

        <a href="https://github.com/jiya17batra" target="_blank" class="flex items-center gap-2 hover:underline">
          <span class="w-5 h-4 rounded bg-[#1e2815] text-[#9ba983] flex items-center justify-center text-[10px]">🐱</span>
          <span>github.com/jiya17batra</span>
        </a>
      </div>

      <div class="w-full h-[1px] bg-[#2d3a20]/20"></div>
    </div>
  `;
}

// 12. DOWNLOAD RESUME / CV
function renderResume() {
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Press *";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-3 px-1 text-center">
      <div class="my-auto">
        <h2 class="text-xl font-black leading-tight text-[#16210f] tracking-tight">
          WANT THE<br>FULL STORY?
        </h2>
        <h3 class="text-xl font-black text-[#16210f] tracking-tight mt-1">
          GRAB MY CV!
        </h3>

        <div class="mt-4">
          <a href="mailto:jiya17batra@gmail.com?subject=Resume%20Request%20-%20Jiya%20Batra" class="inline-flex items-center gap-1.5 text-xs font-black tracking-wider text-[#1a2512] border-b border-[#1a2512] pb-0.5 hover:opacity-75">
            <span>TAKE A PEEK ;)</span>
            <span class="text-[11px]">↗</span>
          </a>
        </div>
      </div>

      <div class="w-full h-[1px] bg-[#2d3a20]/20 mb-1"></div>
    </div>
  `;
}

// 13. PHOTO BOOTH
function renderCamera() {
  bottomLeftPrompt.textContent = "Back";
  bottomRightPrompt.textContent = "Snap (*)";

  screenViewPort.innerHTML = `
    <div class="h-full flex flex-col justify-between pt-0.5 text-center">
      <h2 class="text-[12px] font-black uppercase tracking-tight text-[#1a2512]">CAPTURE THE MOMENT</h2>

      <div class="bg-[#f5f0e6] p-1.5 rounded-sm shadow-md mx-auto w-[184px] text-stone-800 border border-black/15">
        <div class="relative w-full h-[105px] bg-[#161a14] overflow-hidden rounded-xs flex items-center justify-center">
          <video id="webcamVideo" autoplay playsinline class="w-full h-full object-cover filter grayscale contrast-150 brightness-95"></video>
          <canvas id="photoCanvas" class="hidden w-full h-full object-cover filter grayscale contrast-150 brightness-95"></canvas>
          <div id="cameraPlaceholder" class="text-[10px] text-zinc-300 font-bold px-2">
            Click "Start Camera" or snap photo
          </div>
        </div>

        <div class="handwriting text-[10px] leading-tight text-zinc-800 mt-1 font-bold">
          A little hello from me,<br>a little memory of you.
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 pt-1 text-[10px] font-bold text-[#212f17]">
        <button onclick="initCamera()" class="px-2 py-0.5 bg-[#8e9d76] rounded text-[#131d0b] hover:bg-[#83916c] cursor-pointer">Start Cam</button>
        <button onclick="takeSnapshot()" class="px-2 py-0.5 bg-[#1e2815] rounded text-[#9ba983] hover:opacity-90 cursor-pointer">Snap Selfie</button>
      </div>
    </div>
  `;
}

/* =====================================================================
   5. PHOTO BOOTH LOGIC
   ===================================================================== */
async function initCamera() {
  playBeep(880, 0.08);
  const video = document.getElementById('webcamVideo');
  const placeholder = document.getElementById('cameraPlaceholder');
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
    if (video) {
      video.srcObject = cameraStream;
      if (placeholder) placeholder.style.display = 'none';
    }
  } catch (err) {
    if (placeholder) {
      placeholder.innerHTML = "Camera permission needed.<br>Simulating retro snap...";
    }
  }
}

function takeSnapshot() {
  playBeep(1200, 0.12, 'square');
  const video = document.getElementById('webcamVideo');
  const canvas = document.getElementById('photoCanvas');
  const placeholder = document.getElementById('cameraPlaceholder');

  if (video && canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 180;
    canvas.height = 105;
    if (video.videoWidth > 0) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#1e2417";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9ba983";
      ctx.beginPath();
      ctx.arc(90, 45, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(90, 110, 48, 0, Math.PI, true);
      ctx.fill();
    }
    video.classList.add('hidden');
    if (placeholder) placeholder.classList.add('hidden');
    canvas.classList.remove('hidden');
  }
}

/* =====================================================================
   6. USER INTERACTION & KEYPAD DISPATCHER
   ===================================================================== */
function switchScreen(screen, index = 0) {
  currentScreen = screen;
  subIndex = index;
  render();
}

function pressKey(key) {
  playBeep(700 + (key.charCodeAt(0) * 8), 0.04);
  
  const keyBtn = document.getElementById(`key-${key}`);
  if (keyBtn) {
    keyBtn.classList.add('pressed');
    setTimeout(() => keyBtn.classList.remove('pressed'), 120);
  }

  if (currentScreen === 'intro') {
    switchScreen('menu');
    return;
  }

  switch (key) {
    case '1':
      switchScreen('about');
      break;
    case '2':
      switchScreen('tech', 0);
      break;
    case '3':
      switchScreen('projects', 0);
      break;
    case '4':
      switchScreen('career', 0);
      break;
    case '5':
      switchScreen('creative', 0);
      break;
    case '6':
      switchScreen('learning', 0);
      break;
    case '7':
      switchScreen('pixels');
      break;
    case '8':
      switchScreen('life', 0);
      break;
    case '9':
      switchScreen('contact');
      break;
    case '0':
      switchScreen('resume');
      break;
    case '*':
      if (currentScreen === 'camera') {
        takeSnapshot();
      } else {
        handleSoftLeft();
      }
      break;
    case '#':
      switchScreen('camera');
      break;
  }
}

function handleSoftLeft() {
  playBeep(520, 0.05);
  if (currentScreen === 'menu' || currentScreen === 'intro') {
    switchScreen('about');
  } else {
    switchScreen('menu');
  }
}

function handleSoftRight() {
  playBeep(580, 0.05);
  handleNavNext();
}

function handleCenterSelect() {
  playBeep(640, 0.06);
  if (currentScreen === 'intro') {
    switchScreen('menu');
  } else if (currentScreen === 'menu') {
    switchScreen('about');
  } else {
    handleNavNext();
  }
}

function handleNavPrev() {
  playBeep(600, 0.04);
  if (subIndex > 0) {
    subIndex--;
  } else {
    if (currentScreen === 'tech') subIndex = DATA.techStack.length - 1;
    else if (currentScreen === 'projects') subIndex = DATA.projects.length - 1;
    else if (currentScreen === 'career') subIndex = DATA.career.length - 1;
    else if (currentScreen === 'creative') subIndex = DATA.creative.length - 1;
    else if (currentScreen === 'learning') subIndex = DATA.learning.length - 1;
    else if (currentScreen === 'life') subIndex = DATA.life.length - 1;
  }
  render();
}

function handleNavNext() {
  playBeep(640, 0.04);
  if (currentScreen === 'tech') {
    subIndex = (subIndex + 1) % DATA.techStack.length;
  } else if (currentScreen === 'projects') {
    subIndex = (subIndex + 1) % DATA.projects.length;
  } else if (currentScreen === 'career') {
    subIndex = (subIndex + 1) % DATA.career.length;
  } else if (currentScreen === 'creative') {
    subIndex = (subIndex + 1) % DATA.creative.length;
  } else if (currentScreen === 'learning') {
    subIndex = (subIndex + 1) % DATA.learning.length;
  } else if (currentScreen === 'life') {
    subIndex = (subIndex + 1) % DATA.life.length;
  }
  render();
}

/* =====================================================================
   7. HARDWARE KEYBOARD EVENT LISTENERS
   ===================================================================== */
window.addEventListener('keydown', (e) => {
  if (['0','1','2','3','4','5','6','7','8','9','*','#'].includes(e.key)) {
    pressKey(e.key);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    handleNavPrev();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    handleNavNext();
  } else if (e.key === 'Enter') {
    handleCenterSelect();
  } else if (e.key === 'Escape' || e.key === 'Backspace') {
    handleSoftLeft();
  } else if (e.key.toLowerCase() === 'c') {
    switchScreen('camera');
  }
});

bottomLeftPrompt.addEventListener('click', handleSoftLeft);

/* =====================================================================
   8. DYNAMIC AUTO-FIT TO SCREEN HEIGHT ON MOBILE
   ===================================================================== */
function adjustPhoneScale() {
  const phone = document.getElementById('phoneDevice');
  if (!phone) return;

  if (window.innerWidth < 768) {
    // Determine screen height and fit the 740px chassis without scroll/overflow
    const availableHeight = window.innerHeight - 20;
    const baseHeight = 740;
    const scale = Math.min(1, availableHeight / baseHeight);
    phone.style.transform = `scale(${scale})`;
    phone.style.transformOrigin = 'center center';
    phone.style.marginBottom = '0px';
  } else {
    // Reset to normal on laptops/desktops
    phone.style.transform = 'none';
  }
}

window.addEventListener('resize', adjustPhoneScale);
window.addEventListener('orientationchange', adjustPhoneScale);

/* =====================================================================
   9. INITIALIZE BOOT SEQUENCE
   ===================================================================== */
window.onload = function() {
  adjustPhoneScale();
  render();
  setTimeout(() => {
    if (currentScreen === 'intro') {
      playBeep(523, 0.08);
      setTimeout(() => playBeep(659, 0.08), 90);
      setTimeout(() => playBeep(784, 0.12), 180);
      switchScreen('menu');
    }
  }, 2800);
};
