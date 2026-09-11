import type { Project, ResearchPaper, HardwareSpec, AchievementItem, SkillCategory } from '../types';

export const PROFILE_INFO = {
  name: 'Harihara Subramanian V',
  preferredName: 'Harihara',
  title: 'Autonomous Robotics & Embedded Systems Engineer • AI/ML & Computer Vision',
  institution: 'VIT Vellore & IIT Madras (Dual Degree)',
  degrees: [
    {
      degree: 'B.Tech in Information Technology',
      institution: 'Vellore Institute of Technology (VIT Vellore)',
      year: '2022 – 2026',
      metric: 'CGPA: 9.04 / 10.0',
    },
    {
      degree: 'BS in Data Science & Applications',
      institution: 'Indian Institute of Technology (IIT) Madras',
      year: 'Dual Degree (Ongoing)',
      metric: 'Specialization: ML & Computational Statistics',
    },
  ],
  location: 'Vellore / Chennai, Tamil Nadu, India',
  email: 'harishv2911@gmail.com',
  phone: '+91 93423 46217',
  github: 'https://github.com/Harihara-Subramanian-V',
  linkedin: 'https://www.linkedin.com/in/harihara-subramanian-v/',
  about: `I am an undergraduate engineer operating at the intersection of autonomous robotics, embedded microcontrollers (ESP32-S3, STM32, AVR), computer vision pipelines, and computational data science. Currently pursuing a B.Tech in IT at VIT Vellore alongside a BS in Data Science from IIT Madras.

My technical focus spans closed-loop robotic kinematics, inertial sensor fusion (MPU6050 complementary filtering), OpenCV spectral analysis, and defensive cybersecurity tooling.`,
  stats: [
    { label: 'Academic CGPA', value: '9.04' },
    { label: 'Echo Prometheus', value: '1st Place' },
    { label: 'Robo Soccer', value: 'Semi-Finalist' },
    { label: 'Active Papers', value: '4' },
  ],
};

export const HARDWARE_INVENTORY: HardwareSpec[] = [
  {
    name: 'ESP32-S3 Dual-Core SoC',
    tag: 'ESP32-S3-WROOM',
    architecture: 'Xtensa 32-bit LX7 Dual-Core (240 MHz)',
    clockSpeed: '240 MHz',
    useCase: 'Autonomous Robotics Kinematics, ESP-NOW Low Latency Mesh & IMU Sensor Fusion',
    protocols: ['Wi-Fi 802.11 b/g/n', 'Bluetooth 5.0 (LE)', 'I2C (400kHz)', 'SPI (40MHz)', 'UART', 'PWM'],
    status: 'PRIMARY',
  },
  {
    name: 'Raspberry Pi 4 Model B',
    tag: 'RPI4-ARM64',
    architecture: 'Quad-Core ARM Cortex-A72 (64-bit)',
    clockSpeed: '1.8 GHz',
    useCase: 'Edge Computer Vision Inference, Multi-Filter Processing & Spectrometry Sinks',
    protocols: ['Gigabit Ethernet', 'Dual-Band WiFi 5', 'PCIe Gen 2', 'I2C', 'SPI', 'GPIO'],
    status: 'ACTIVE',
  },
  {
    name: 'STM32 ARM Cortex-M4 Controller',
    tag: 'STM32F401/411',
    architecture: 'ARM 32-bit Cortex-M4 with FPU',
    clockSpeed: '168 MHz',
    useCase: 'High-Precision Motor Actuation, DMA Data Capture & Hardware Timer Loops',
    protocols: ['CAN Bus 2.0B', 'SPI', 'I2C', 'USART', 'DMA Channels'],
    status: 'ACTIVE',
  },
  {
    name: 'ESP8266 Wi-Fi Transceiver Node',
    tag: 'NodeMCU-ESP12E',
    architecture: 'Tensilica L106 32-bit RISC',
    clockSpeed: '80 / 160 MHz',
    useCase: 'Distributed IoT Telemetry & Wireless Sensor Networks',
    protocols: ['Wi-Fi 2.4 GHz', 'I2C', 'SPI', '10-bit ADC'],
    status: 'ACTIVE',
  },
  {
    name: 'ATmega328P Microcontroller',
    tag: 'Arduino-AVR-Uno',
    architecture: 'AVR 8-bit Microcontroller',
    clockSpeed: '16 MHz',
    useCase: 'Gyrobot Kinematics, Station-Point Stabilization & Ultrasonic Ranging',
    protocols: ['UART', 'SPI', 'I2C', 'Hardware Timers / PWM'],
    status: 'STANDBY',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 'Core', experience: '3+ Years', description: 'Primary language for AI/ML, Computer Vision, CLI automation, and backend services.' },
      { name: 'C++', level: 'Advanced', experience: '2+ Years', description: 'Embedded firmware, robotics balance algorithms, and microcontroller kinematics.' },
      { name: 'C', level: 'Proficient', experience: '2 Years', description: 'Low-level hardware interfacing, registers, memory control, and microcontrollers.' },
      { name: 'TypeScript / JavaScript', level: 'Proficient', experience: '2 Years', description: 'Interactive web dashboards, data visualization, and frontend tooling.' },
      { name: 'SQL', level: 'Proficient', experience: '2 Years', description: 'Relational data modeling, complex queries, and database optimization.' },
      { name: 'R', level: 'Intermediate', experience: '1+ Years', description: 'Statistical modeling, exploratory data analysis, and distribution testing.' },
      { name: 'Bash / Shell', level: 'Proficient', experience: '2+ Years', description: 'Linux automation, system administration, and build scripting.' },
    ],
  },
  {
    title: 'Embedded Systems & Robotics',
    skills: [
      { name: 'ESP32 & ESP8266', level: 'Advanced', experience: '2+ Years', description: 'Dual-core Wi-Fi/BLE architecture, ESP-NOW protocol, and remote hardware actuation.' },
      { name: 'Arduino & AVR', level: 'Advanced', experience: '3 Years', description: 'Hardware prototyping, sensor fusion (IMU, ultrasonic, IR), and PWM motor control.' },
      { name: 'STM32 Microcontrollers', level: 'Proficient', experience: '1+ Years', description: 'ARM Cortex-M architecture, register configuration, and peripheral interfaces.' },
      { name: 'Robotic Kinematics & PID', level: 'Proficient', experience: '2 Years', description: 'Closed-loop feedback tuning, station-point stabilization, and gesture glove mapping.' },
      { name: 'Sensor Fusion (MPU6050)', level: 'Advanced', experience: '2 Years', description: 'Complementary filters, accelerometer/gyroscope integration, and drift compensation.' },
      { name: 'Communication Protocols', level: 'Advanced', experience: '2+ Years', description: 'I2C, SPI, UART, CAN Bus 2.0B, and low-latency RF wireless communication.' },
    ],
  },
  {
    title: 'AI, Computer Vision & Data Science',
    skills: [
      { name: 'OpenCV', level: 'Advanced', experience: '2+ Years', description: 'Spatial transformations, Sobel edge filters, morphological operations, and video processing.' },
      { name: 'NumPy & Pandas', level: 'Advanced', experience: '3 Years', description: 'High-speed matrix math, dataset transformations, and tensor preprocessing.' },
      { name: 'Data Augmentation', level: 'Advanced', experience: '2 Years', description: 'Synthetic data generation, noise injection, and dataset balancing algorithms.' },
      { name: 'Scikit-Learn', level: 'Proficient', experience: '2 Years', description: 'Classical machine learning pipelines, regression, clustering, and model validation.' },
      { name: 'Spectrometry Deconvolution', level: 'Proficient', experience: '1+ Years', description: 'Computational analysis of chemical absorption spectrums and dye ratio optimization.' },
    ],
  },
  {
    title: 'Systems, Security & Tooling',
    skills: [
      { name: 'Linux / Unix', level: 'Advanced', experience: '3 Years', description: 'Kernel tools, permissions, daemon management, and development environment setup.' },
      { name: 'Git & GitHub', level: 'Advanced', experience: '3 Years', description: 'Branching strategies, CI/CD automation, and open-source project maintenance.' },
      { name: 'Cryptographic Tooling', level: 'Proficient', experience: '2 Years', description: 'Base64, ROT ciphers, XOR keystream analysis, and defensive CTF challenge tooling.' },
      { name: 'REST APIs & Flask', level: 'Proficient', experience: '2 Years', description: 'Lightweight microservices, ML model inference endpoints, and web backends.' },
    ],
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Color Analyzer & Bio-Diesel Catalyst Data Augmentation',
    domain: 'Computer Vision & Chemical Catalysis',
    status: 'IN PROGRESS',
    description:
      'Developing computer-vision-based colorimetric spectral analysis and data augmentation algorithms for bio-diesel reaction telemetry and catalyst optimization.',
    focusAreas: ['OpenCV', 'Data Augmentation', 'Spectrometry Analysis', 'Catalysis Telemetry'],
    leadRole: 'Author & Algorithm Developer',
    abstract:
      'This research focuses on utilizing computer vision techniques to analyze colorimetric changes during chemical catalysis reactions. By applying automated spatial and spectral transformations, the pipeline synthesizes balanced training sets to predict catalyst efficacy with minimal experimental iterations.',
  },
  {
    id: 'paper-2',
    title: 'Machine Learning Algorithms for Dye Mixture Ratio Analysis',
    domain: 'Machine Learning & Spectroscopic Deconvolution',
    status: 'IN PROGRESS',
    description:
      'Computational deconvolution of complex multi-solute dye absorption spectrums to predict precise solute ratios using regression and neural mapping.',
    focusAreas: ['ML Deconvolution', 'Feature Extraction', 'Absorption Spectrum Modeling', 'NumPy/Pandas'],
    leadRole: 'Primary Researcher',
    abstract:
      'Investigates mathematical deconvolution of overlapping absorption spectra in complex multi-solute dye mixtures. Machine learning regression models extract discrete concentration ratios directly from spectrophotometer curve signatures with high precision.',
  },
  {
    id: 'paper-3',
    title: 'AI Application in Hybrid Dye Suggestions from VIBGYOR',
    domain: 'AI Heuristics & Spectral Color Optimization',
    status: 'IN PROGRESS',
    description:
      'Intelligent recommendation engine synthesizing target color phenotypes from fundamental VIBGYOR spectral components with minimal dye consumption.',
    focusAreas: ['VIBGYOR Color Mapping', 'Optimization Heuristics', 'Spectroscopic Prediction'],
    leadRole: 'Lead Author',
    abstract:
      'Proposes an optimization heuristic that calculates exact multi-component dye blending ratios required to reach target industrial color coordinates while minimizing material waste and cost.',
  },
  {
    id: 'paper-4',
    title: 'AI-ML Model for Bio-Diesel Data Analysis & Degradation Operations',
    domain: 'Photocatalysis & Computational Modeling',
    status: 'IN PROGRESS',
    description:
      'Predictive modeling for photocatalytic degradation kinetics and adsorption rate operations across augmented bio-fuel reaction datasets.',
    focusAreas: ['Reaction Kinetics', 'Photocatalytic Degradation', 'Mathematical Rate Modeling'],
    leadRole: 'Co-Author & Modeling Lead',
    abstract:
      'Applies non-linear regression and kinetic modeling to predict degradation rates of organic pollutants under photocatalytic treatment, establishing reliable rate-constant estimates from augmented experimental telemetry.',
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '1st Place Winner – Echo Prometheus',
    organization: 'Indian Institute of Technology (IIT) Madras',
    date: '2024',
    category: 'HACKATHON',
    badge: '1st Place Champion',
    badgeType: 'gold',
    description:
      'Secured 1st place in Echo Prometheus conducted by IIT Madras, engineering autonomous algorithm pipelines and rapid prototyping under high competitive pressure.',
    tags: ['IIT Madras', 'Echo Prometheus', 'Championship', 'Autonomous Systems'],
  },
  {
    id: 'ach-robo-soccer',
    title: 'Semi-Finalist – Robo Soccer Championship',
    organization: 'Indian Institute of Technology (IIT) Madras',
    date: '2024',
    category: 'ROBOTICS',
    badge: 'Robo Soccer Semi-Finalist',
    badgeType: 'silver',
    description:
      'Advanced to the competitive Semi-Finals in the Robo Soccer tournament at IIT Madras, architecting high-torque omni-drive kinematics, responsive ball-handling mechanisms, and low-latency RF wireless control.',
    tags: ['IIT Madras', 'Robo Soccer', 'Semi-Finalist', 'Robotics Kinematics', 'Wireless RF'],
  },
  {
    id: 'ach-2',
    title: 'Finalist – Vortex 2.0',
    organization: 'IEEE SSN Chennai',
    date: '2024',
    category: 'HACKATHON',
    badge: 'Finalist Honors',
    badgeType: 'amber',
    description:
      'Selected as a Finalist in the Vortex 2.0 hackathon conducted by IEEE SSN Chennai for architecting resilient, high-throughput computational workflows.',
    tags: ['IEEE SSN', 'Vortex 2.0', 'Finalist', 'System Architecture'],
  },
  {
    id: 'ach-ethical-hacking',
    title: 'Ethical Hacking Certification & Coursework',
    organization: 'NPTEL / SWAYAM (IIT Kharagpur / MHRD)',
    date: '2024',
    category: 'CYBERSEC',
    badge: 'NPTEL Certified',
    badgeType: 'emerald',
    description:
      'Comprehensive coursework and hands-on laboratory training in Ethical Hacking, covering network reconnaissance, vulnerability analysis, web application security, buffer overflows, and defensive countermeasures.',
    tags: ['NPTEL', 'SWAYAM', 'Ethical Hacking', 'Penetration Testing', 'Cyber Defense'],
  },
  {
    id: 'ach-3',
    title: 'Robotics Engineer – roboVITics Club',
    organization: 'Official Robotics Club of VIT Vellore',
    date: '2023 – Present',
    category: 'ROBOTICS',
    badge: 'Core Contributor',
    badgeType: 'amber',
    description:
      'Core contributor at roboVITics, engineering autonomous robotic hardware, IMU-based gesture control systems (Nightslips), and microcontroller sensor buses.',
    tags: ['roboVITics', 'VIT Vellore', 'Gesture Bot', 'ESP32', 'IMU Kinematics'],
  },
  {
    id: 'ach-4',
    title: 'Cyber Security Contributor',
    organization: 'White Hats Club @ VIT Vellore',
    date: '2023 – Present',
    category: 'CYBERSEC',
    badge: 'Club Member',
    badgeType: 'cyan',
    description:
      'Active participant in defensive cybersecurity, CTF challenges, cryptographic puzzles, and network vulnerability mitigation suites.',
    tags: ['White Hats', 'Cyber Security', 'CTF', 'Cryptography', 'VIT Vellore'],
  },
  {
    id: 'ach-5',
    title: 'Algorithmic Strategy & Tactical Chess',
    organization: 'Competitive Chess & Game Theory',
    date: 'Ongoing',
    category: 'ACADEMIC',
    badge: 'Tactical Strategy',
    badgeType: 'gold',
    description:
      'Active chess tactician applying Minimax decision trees, positional pawn structure analysis, and heuristic risk modeling to algorithmic software design.',
    tags: ['Chess Strategy', 'Minimax Theory', 'Game Theory', 'Tactical Analysis'],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'image-augmentation',
    title: 'Image Augmentation Pipeline',
    subtitle: 'Computer vision pipeline for image dataset expansion with OpenCV',
    description:
      'A high-performance computer vision toolchain leveraging OpenCV and spatial transforms (Sobel edge detection, Gaussian blur, thresholding, noise injection) to multiply dataset diversity for deep learning.',
    longDescription:
      'Engineered a complete spatial transformation and image augmentation engine designed for computer vision and deep learning datasets. Supports Sobel filter edge detection, noise injection, blurring, matrix transforms, and real-time canvas visualizers.',
    category: 'AI_ML_CV',
    categoryLabel: 'Computer Vision & AI',
    techStack: ['Python', 'OpenCV', 'NumPy', 'Pandas', 'Flask'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V/Image-Augmentation-using-Python',
    status: 'ACTIVE',
    year: '2024',
    featured: true,
    simulatorType: 'augmentation',
    keyHighlights: [
      'Multi-filter kernel processing (Sobel, Gaussian Blur, Invert, Threshold)',
      'High-speed array processing with NumPy',
      'Interactive visualizer built with Canvas 2D',
    ],
  },
  {
    id: 'data-augmentation',
    title: 'Tabular Data Augmentation Engine',
    subtitle: 'High-throughput numeric & tabular dataset augmentation engine',
    description:
      'Data synthesis and augmentation toolchain for statistical datasets and ML training pipelines, generating synthetic permutations and noise-injected samples to prevent overfitting.',
    longDescription:
      'Comprehensive Python framework for tabular and numeric dataset augmentation, statistical distribution sampling, and feature space multiplication.',
    category: 'AI_ML_CV',
    categoryLabel: 'Computer Vision & AI',
    techStack: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V/Data-Augmentation-using-Python',
    status: 'COMPLETED',
    year: '2024',
    featured: true,
    keyHighlights: [
      'Statistical sampling & synthetic permutation generation',
      'High-speed tabular vector processing with Pandas/NumPy',
      'Dataset balancing and variance expansion',
    ],
  },
  {
    id: 'gyrobot-station',
    title: 'Gyrobot with Station-Point Stabilization',
    subtitle: 'Autonomous station-point kinematics and balance control system',
    description:
      'Autonomous balancing and station-point positioning system with real-time closed-loop PID feedback control and hardware sensor telemetry.',
    longDescription:
      'Station-point stabilization platform engineered with high-frequency inertial measurement feedback loops, closed-loop PID velocity tuning, and microcontroller integration.',
    category: 'ROBOTICS_IOT',
    categoryLabel: 'Robotics & Embedded',
    techStack: ['C++', 'Arduino AVR', 'PID Kinematics', 'MPU6050', 'I2C'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V/gyrobot-using-station-point',
    status: 'ACTIVE',
    year: '2024',
    featured: true,
    keyHighlights: [
      'Discrete PID balance control algorithm',
      'Station-point position holding with ultrasonic sensors',
      'Low-latency hardware telemetry over I2C',
    ],
  },
  {
    id: 'gesture-bot',
    title: 'GestureBot & Nightslips Glove',
    subtitle: 'Wireless IMU gesture-controlled robotic vehicle',
    description:
      'Wearable IMU-based hand gesture control system transmitting real-time pitch and roll angles to an omni-directional robotic vehicle via low-latency RF wireless.',
    longDescription:
      'Engineered an IMU-based wearable controller that maps spatial hand orientations to motor drive vectors in real-time, featuring complementary filtering to eliminate accelerometer vibration noise.',
    category: 'ROBOTICS_IOT',
    categoryLabel: 'Robotics & Embedded',
    techStack: ['ESP32-S3', 'C++', 'MPU6050', 'ESP-NOW', 'Robotics Kinematics'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V',
    status: 'ACTIVE',
    year: '2024',
    featured: true,
    keyHighlights: [
      'Low-latency ESP-NOW wireless transmission (<5ms)',
      'MPU6050 complementary filter for drift-free orientation',
      'High-torque motor driver H-Bridge control',
    ],
  },
  {
    id: 'white-hats-ctf',
    title: 'Cybersecurity Utilities & CTF Suite',
    subtitle: 'Defensive crypto reversing & security workbench',
    description:
      'Comprehensive security workbench with Base64/Hex/ROT13 cryptographic decoders, port analysis utilities, and CTF challenge tooling.',
    longDescription:
      'Developed defensive cybersecurity utilities for CTF competitions including Base64 deobfuscation, ROT cipher breakers, XOR keystream analyzers, and defensive security scripts.',
    category: 'CYBERSEC',
    categoryLabel: 'Cyber Security',
    techStack: ['Python', 'Linux Shell', 'Cryptography', 'Socket APIs'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V/WHITE_HATS-CLUB',
    status: 'ACTIVE',
    year: '2024',
    keyHighlights: [
      'Cryptographic decoding and deobfuscation suite',
      'Network socket port inspection scripts',
      'Automated challenge test runners',
    ],
  },
  {
    id: 'flight-reservation',
    title: 'Air Ticket Reservation System',
    subtitle: 'CLI reservation state machine & seating algorithm',
    description:
      'Modular flight reservation and ticket management system built with robust data validation, seat allocation matrices, and transaction logging.',
    longDescription:
      'Terminal-based flight reservation system featuring structured booking workflows, seat availability map rendering, fare calculation engines, and file-based state persistence.',
    category: 'SYSTEMS_CLI',
    categoryLabel: 'Systems & Software',
    techStack: ['Python', 'OOP Architecture', 'State Machine', 'CLI'],
    githubUrl: 'https://github.com/Harihara-Subramanian-V',
    status: 'COMPLETED',
    year: '2023',
    keyHighlights: [
      'Seat map matrix visualizer',
      'Robust input validation & exception handling',
      'File-based booking state persistence',
    ],
  },
];
