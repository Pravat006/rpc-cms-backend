"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAll = exports.seedDefaultAdmin = void 0;
const logger_1 = __importDefault(require("./app/config/logger"));
const config_1 = __importDefault(require("./app/config"));
const user_model_1 = require("./app/modules/user/user.model");
const user_interface_1 = require("./app/modules/user/user.interface");
const global_settings_model_1 = require("./app/modules/global-settings/global-settings.model");
const page_model_1 = require("./app/modules/page/page.model");
const faculty_model_1 = require("./app/modules/faculty/faculty.model");
const team_model_1 = require("./app/modules/team/team.model");
const post_model_1 = require("./app/modules/post/post.model");
const gallery_model_1 = require("./app/modules/gallery/gallery.model");
const testimonial_model_1 = require("./app/modules/testimonial/testimonial.model");
const SEED_IMAGE = "https://res.cloudinary.com/dlrmkxmh7/image/upload/v1767624710/ram-pharma-uploads/dyueklrtl2ot3xerf4d9.jpg";
const UNSPLASH_IMAGES = {
    backgrounds: {
        campus: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop",
        classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop",
        library: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop",
        labs: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop",
        seminar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop",
        cafeteria: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920&auto=format&fit=crop",
        transport: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920&auto=format&fit=crop",
        hostel: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1920&auto=format&fit=crop"
    },
    features: {
        admission: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
        research: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop",
        students: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop",
        books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop"
    },
    people: {
        principal: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        vicePrincipal: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        president: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        faculty1: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        faculty2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
        studentMale: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        studentFemale: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    }
};
const seedDefaultAdmin = async () => {
    try {
        const adminEmail = config_1.default.DEFAULT_ADMIN_EMAIL;
        const existingAdmin = await user_model_1.User.findOne({
            $or: [
                { email: adminEmail },
                { phone: config_1.default.DEFAULT_ADMIN_PHONE }
            ]
        });
        if (!existingAdmin) {
            await user_model_1.User.create({
                name: 'System Administrator',
                email: adminEmail,
                phone: config_1.default.DEFAULT_ADMIN_PHONE,
                password: config_1.default.DEFAULT_ADMIN_PASSWORD,
                role: user_interface_1.UserRole.ADMIN,
                status: user_interface_1.UserStatus.ACTIVE,
            });
            logger_1.default.info(`[SEED] Default admin user created (${adminEmail})`);
        }
        else {
            logger_1.default.info('[SEED] Admin user already exists');
        }
    }
    catch (error) {
        logger_1.default.error(`[SEED] Error seeding admin user: ${error}`);
    }
};
exports.seedDefaultAdmin = seedDefaultAdmin;
const seedGlobalSettings = async () => {
    await global_settings_model_1.GlobalSettings.deleteMany({});
    await global_settings_model_1.GlobalSettings.create({
        siteName: "Ram Pharmacy College",
        location: "At/Po-Sonepur, Odisha",
        logo: SEED_IMAGE,
        logoAlt: "Ram Pharmacy Logo",
        contact: {
            phones: ["+91 1234567890", "+91 9876543210"],
            emails: ["info@rampharmacollege.com", "admission@rampharmacollege.com"],
            address: {
                title: "Main Campus",
                lines: ["Ram Pharmacy College", "At/Po-Sonepur, Dist-Subarnapur", "Odisha, PIN-767017"]
            }
        },
        socialLinks: {
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        },
        menus: {
            header: [
                { label: "Home", url: "/", order: 0 },
                { label: "About Us", url: "/about-us", order: 1 },
                { label: "Courses", url: "/courses", order: 2 },
                { label: "Faculty", url: "/faculties", order: 3 },
                { label: "Placement", url: "/placement", order: 4 },
                { label: "Blogs", url: "/blogs", order: 5 },
                { label: "Gallery", url: "/gallery", order: 6 },
                { label: "Contact", url: "/contact-us", order: 7 }
            ],
            footerQuickLinks: [
                { label: "Admissions", url: "/admission", order: 0 },
                { label: "Fee Structure", url: "/fees", order: 1 },
                { label: "Gallery", url: "/gallery", order: 2 }
            ]
        },
        navigation: {
            mainMenu: [
                { title: "Home", href: "/", order: 0 },
                {
                    title: "About Us",
                    href: "#",
                    order: 1,
                    items: [
                        { title: "Who We Are", href: "/about-us" },
                        { title: "President's Message", href: "/president" },
                        { title: "Principal's Message", href: "/principal" },
                        { title: "Vice Principal's Message", href: "/vice-principal" },
                        { title: "Faculty", href: "/faculties" }
                    ]
                },
                {
                    title: "Academics",
                    href: "#",
                    order: 2,
                    items: [
                        { title: "Courses Offered", href: "/courses" },
                        { title: "B. Pharm", href: "/b-pharm" },
                        { title: "Admissions", href: "/admission" }
                    ]
                },
                {
                    title: "Facilities",
                    href: "#",
                    order: 3,
                    items: [
                        { title: "Central Library", href: "/library" },
                        { title: "Laboratories", href: "/laboratories" },
                        { title: "Hostel", href: "/hostel" },
                        { title: "Cafeteria", href: "/cafeteria" },
                        { title: "Transportation", href: "/transportation" },
                        { title: "Seminar Hall", href: "/seminar-hall" }
                    ]
                },
                { title: "Placement", href: "/placement", order: 4 },
                { title: "Blogs", href: "/blogs", order: 5 },
                { title: "Gallery", href: "/gallery", order: 6 },
                { title: "Contact Us", href: "/contact-us", order: 7 }
            ]
        }
    });
    logger_1.default.info("[SEED] Global Settings seeded");
};
const seedPages = async () => {
    await page_model_1.Page.deleteMany({});
    // 1. Home Page
    await page_model_1.Page.create({
        title: "B. Pharmacy College",
        slug: "home",
        metaDescription: "Select A Career Path with the best pharmacy college in Gujarat.",
        backgroundImage: "https://images.unsplash.com/photo-1607398027609-fbd1a06fb5d4?q=80&w=1470&auto=format&fit=crop",
        isPublished: true,
        sections: [
            {
                type: "hero-slider",
                order: 0,
                data: {
                    banners: [
                        {
                            title: "B. Pharmacy College",
                            subtitle: 'Select A Career Path with the best pharmacy college in Gujarat "B. Pharmacy College".',
                            buttonText: "Apply Now",
                            buttonLink: "/apply",
                            backgroundImage: "https://images.unsplash.com/photo-1607398027609-fbd1a06fb5d4?q=80&w=1470&auto=format&fit=crop"
                        },
                        {
                            title: "World-Class Library",
                            subtitle: "Access over 50,000 books and digital resources in our state-of-the-art learning center.",
                            buttonText: "Explore Resources",
                            buttonLink: "/library",
                            backgroundImage: "https://images.unsplash.com/photo-1758876442636-23f3153af92c?q=80&w=1470&auto=format&fit=crop"
                        },
                        {
                            title: "Research Excellence",
                            subtitle: "Join our cutting-edge research programs with advanced laboratory facilities and expert faculty.",
                            buttonText: "Learn More",
                            buttonLink: "/research",
                            backgroundImage: "https://images.unsplash.com/photo-1576670159805-622729b5b9eb?q=80&w=1470&auto=format&fit=crop"
                        }
                    ],
                    autoPlayInterval: 5000
                }
            },
            {
                type: "features-grid",
                order: 1,
                data: {
                    features: [
                        { icon: "ScrollText", title: "Certified College", description: "We are Approved by Government of Gujarat, PCI (Pharmacy Council of India), AICTE (ALL India Council for Technical Education) Delhi & Affiliated to GTU, Ahmedabad." },
                        { icon: "GraduationCap", title: "B. Pharm Course", description: "B. Pharmacy College introduce four-year B.Pharm Course in the year of 2006 with the intake of 100 students that has been designed to enhance the skills of the students." }
                    ]
                }
            },
            {
                type: "about-hero",
                order: 2,
                data: {
                    label: "About Us",
                    title: "B. Pharmacy College",
                    paragraphs: [
                        'B. Pharmacy College was founded in the year 2006, by the "Nutan Education Trust" a trust founded by Shri J. R Patel and Shri R. R. Patel with the aim of developing able professionals in the field of pharmaceutical sciences.',
                        "B. Pharmacy College is recognized by Government of Gujarat, Approved by PCI (Pharmacy Council of India), AICTE (All India Council for Technical Education) Delhi & Affiliated to GTU(Gujarat Technological University) Ahmedabad. The College is well-equipped with research facilities to meet research requirements of various departments.",
                        "The institute comprises of spacious buildings that have every possible amenity required to impart professional education & constantly seeking to upgrade the quality of education by actively participating in research & skill development so as to remain always on the cutting edge."
                    ],
                    imageSrc: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
                    imageAlt: "B. Pharmacy College Campus",
                    cta: { text: "Read More", link: "/about-us" }
                }
            },
            {
                type: "contact-cta",
                order: 3,
                data: {
                    title: "Join Us For Your Better Future",
                    description: "The institute is well-developed, with contemporary conveniences and state-of-the-art facilities. The relaxed and friendly campus atmosphere allows students to focus on their academics, conduct research, and participate in various leisure activities.",
                    buttonText: "Contact Us",
                    buttonLink: "/contact-us",
                    imageSrc: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000"
                }
            },
            {
                type: "leadership-grid",
                order: 4,
                data: {
                    members: [
                        { name: "Mr. Jagdish Patel", role: "President", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop", qualifications: "M.A, LL.B" },
                        { name: "Mr. Rajesh Patel", role: "Vice President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", qualifications: "B.E, MBA" },
                        { name: "Dr. Bhawanishankar Madhira", role: "Principal", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop", qualifications: "M. Pharm, Ph.D" }
                    ]
                }
            },
            {
                type: "stats-counters",
                order: 5,
                data: {
                    featuredImage: "https://images.unsplash.com/photo-1576670159805-622729b5b9eb?q=80&w=1470&auto=format&fit=crop",
                    stats: [
                        { value: "3+", field: "Acres Of Campus" },
                        { value: "18+", field: "Faculty Members" },
                        { value: "7+", field: "Lab Assistance" },
                        { value: "2,000+", field: "Total Students" }
                    ]
                }
            },
            {
                type: "services-grid",
                order: 6,
                data: {
                    title: "What We Offered",
                    description: "Here is some of ordinary facilities which we offer to our students to improve their knowledge and skills which helps them to achieve their goal in pharmaceutical industries.",
                    services: [
                        { icon: "FlaskConical", serviceTitle: "Well Equipped Laboratories", serviceDescription: "We have well equipped laboratories for the each departments where student acquire knowledge and skills." },
                        { icon: "BookOpen", serviceTitle: "Full Stacked Library", serviceDescription: "Well stocked with the latest books and research publications, Our library is open to all students,& faculty members." },
                        { icon: "Monitor", serviceTitle: "Proper Class Rooms", serviceDescription: "The classrooms are fully furnished with state of-the-art technology to be at par with the standards set by the world's best institutes." },
                        { icon: "Presentation", serviceTitle: "Seminar Hall & Auditorium", serviceDescription: "The college has well-furnished centralized air conditioned seminar hall, with seating capacity of 200 attached with all equipments." },
                        { icon: "Building2", serviceTitle: "Hostel for Boys & Girls", serviceDescription: "We ensure that each student opting for a hostel has a good environment where they can study and spend some time relaxing." },
                        { icon: "Bus", serviceTitle: "Transport Facility", serviceDescription: "We provide the best transportation service for faculties, staff members and students with the flexible and competitive fare." }
                    ]
                }
            },
            {
                type: "testimonials",
                order: 7,
                data: {
                    feedbacks: [
                        { name: "Rahul Sharma", profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "The facilities at Ram Pharmacy College are top-notch. The labs are well-equipped, and the library has every book a student could need.", reviewPoint: 5.0 },
                        { name: "Priya Patel", profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "The faculty is incredibly supportive and knowledgeable. They guide us not just in academics but also in our career paths.", reviewPoint: 4.8 },
                        { name: "Amit Kumar", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "I love the campus environment! It's peaceful and perfect for studying. The hostel facilities are also very comfortable.", reviewPoint: 4.9 },
                        { name: "Sneha Gupta", profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "The placement cell works really hard. Almost all my seniors got placed in good pharmaceutical companies.", reviewPoint: 5.0 },
                        { name: "Vikram Singh", profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "The practical exposure we get here is amazing. The college organizes regular industry visits and guest lectures.", reviewPoint: 4.7 },
                        { name: "Anjali Desai", profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop", feedbackDescription: "Ram Pharmacy College has given me the confidence to pursue my dreams. The curriculum is updated and relevant.", reviewPoint: 4.9 }
                    ]
                }
            },
            {
                type: "latest-news",
                order: 8,
                data: {
                    articles: [
                        { title: "Advancements in Pharmaceutical Technology", featuredImage: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000&auto=format&fit=crop", date: "October 15, 2024", author: "Dr. A. K. Singh", categories: ["Technology", "Research"] },
                        { title: "The Future of Clinical Pharmacy in India", featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", date: "September 28, 2024", author: "Prof. S. R. Patel", categories: ["Career", "Pharmacy Practice"] },
                        { title: "Exploring Herbal Medicines: A Modern Approach", featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop", date: "August 10, 2024", author: "Dr. M. J. Shah", categories: ["Herbal", "Science"] }
                    ]
                }
            }
        ]
    });
    // 2. About Us Page
    await page_model_1.Page.create({
        title: "About Us",
        slug: "about-us",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.campus,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "About Us", subtitle: "KNOW MORE", image: UNSPLASH_IMAGES.backgrounds.campus } },
            {
                type: "about-hero",
                order: 1,
                data: {
                    label: "Who We Are",
                    title: "B. Pharmacy College",
                    paragraphs: [
                        "Established in 2018, Ram Pharmacy College is a premier institution dedicated to pharmaceutical education.",
                        "Our mission is to foster a learning environment that encourages innovation, research, and ethical practice."
                    ],
                    imageSrc: UNSPLASH_IMAGES.backgrounds.campus,
                    cta: { text: "View Gallery", link: "/gallery" },
                    reversed: false
                }
            },
            {
                type: "quality-policy",
                order: 2,
                data: {
                    imageSrc: UNSPLASH_IMAGES.backgrounds.labs,
                    policy: {
                        subtitle: "QUALITY POLICY",
                        title: "Commitment to Excellence",
                        description: [
                            "We are committed to providing quality pharmacy education and training to students to make them competent professionals.",
                            "We strive to achieve excellence in all our endeavors by continuously upgrading our infrastructure and human resources."
                        ]
                    },
                    visionMission: [
                        {
                            title: "Our Vision",
                            description: "To be a premier institute of pharmaceutical sciences, seeking excellence in education, research, and patient care."
                        },
                        {
                            title: "Our Mission",
                            description: "To produce competent pharmacists with entrepreneurship and leadership skills to serve society and the profession."
                        }
                    ]
                }
            },
            {
                type: "stats-counters",
                order: 3,
                data: { featuredImage: UNSPLASH_IMAGES.features.research, stats: [{ value: "500+", field: "Students" }, { value: "50+", field: "Faculty" }] }
            },
            {
                type: "facilities-grid",
                order: 4,
                data: {
                    label: "CAMPUS LIFE",
                    title: "Our Facilities",
                    facilities: [
                        { facilityName: "Laboratories", featuredImage: UNSPLASH_IMAGES.backgrounds.labs, ctaLink: "/laboratories" },
                        { facilityName: "Library", featuredImage: UNSPLASH_IMAGES.backgrounds.library, ctaLink: "/library" },
                        { facilityName: "Modern Classroom", featuredImage: UNSPLASH_IMAGES.backgrounds.classroom, ctaLink: "/class" },
                        { facilityName: "Seminar Hall", featuredImage: UNSPLASH_IMAGES.backgrounds.seminar, ctaLink: "/seminar-hall" },
                        { facilityName: "Hostel", featuredImage: UNSPLASH_IMAGES.backgrounds.hostel, ctaLink: "/hostel" },
                        { facilityName: "Play Ground", featuredImage: UNSPLASH_IMAGES.features.students, ctaLink: "/cafeteria" },
                        { facilityName: "Wifi Campus", featuredImage: UNSPLASH_IMAGES.backgrounds.campus, ctaLink: "/transportation" }
                    ]
                }
            }
        ]
    });
    // 3. Contact Us Page
    await page_model_1.Page.create({
        title: "Contact Us",
        slug: "contact-us",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.campus,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Contact Us", subtitle: "GET IN TOUCH", image: UNSPLASH_IMAGES.backgrounds.campus } },
            {
                type: "address-section",
                order: 1,
                data: {
                    label: "SATY TUNED WITH US",
                    title: "Feel Free To Contact Us",
                    contacts: [
                        {
                            iconType: "EMAIL",
                            label: "Email Us",
                            values: ["bph220owner@gtu.edu.in"]
                        },
                        {
                            iconType: "CALL",
                            label: "Call us",
                            values: ["+91-9825407379", "+91-9979209444"]
                        },
                        {
                            iconType: "LOCATION",
                            label: "Find Us",
                            values: ["Rampura (kakanpur), Taluka - Godhra, District - Panchmahal, Gujarat, India."]
                        }
                    ]
                }
            },
            {
                type: "contact-form",
                order: 2,
                data: {
                    label: "CONTACT WITH US",
                    title: "Have Any Questions?",
                    description: [
                        "We are here to help you. If you have any questions or queries, please feel free to contact us. Our team will get back to you as soon as possible.",
                        "You can also visit our campus during working hours for direct assistance."
                    ],
                    socialLinks: [
                        { icon: "facebook", url: "https://facebook.com" },
                        { icon: "twitter", url: "https://twitter.com" },
                        { icon: "instagram", url: "https://instagram.com" },
                        { icon: "linkedin", url: "https://linkedin.com" }
                    ]
                }
            },
            {
                type: "google-map",
                order: 3,
                data: {
                    googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117676.864900719!2d73.479763!3d22.824611!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39609e3b001177e3%3A0xa07edbccec9b1024!2sB.%20Pharmacy%20College%20Rampura%20(Kakanpur)!5e0!3m2!1sen!2sus!4v1767384794917!5m2!1sen!2sus"
                }
            }
        ]
    });
    // 4. Academic Pages
    await page_model_1.Page.create({
        title: "Courses",
        slug: "courses",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.classroom,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Our Courses", subtitle: "ACADEMIC PROGRAMS", image: UNSPLASH_IMAGES.backgrounds.classroom } },
            {
                type: "services-grid",
                order: 1,
                data: {
                    label: "ACADEMIC PROGRAMS",
                    title: "Undergraduate & Diploma Courses",
                    services: [
                        { title: "B. Pharm", description: "Bachelor of Pharmacy is a 4-year undergraduate degree program.", icon: "GraduationCap", link: "/courses/b-pharm", image: UNSPLASH_IMAGES.features.books },
                        { title: "D. Pharm", description: "Diploma in Pharmacy is a 2-year diploma program.", icon: "Award", link: "/courses/d-pharm", image: UNSPLASH_IMAGES.backgrounds.labs }
                    ]
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Bachelor of Pharmacy (B. Pharm)",
        slug: "b-pharm",
        backgroundImage: UNSPLASH_IMAGES.features.books,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Bachelor of Pharmacy (B. Pharm)", subtitle: "UNDERGRADUATE PROGRAM", image: UNSPLASH_IMAGES.features.books } },
            {
                type: "about-hero",
                order: 1,
                data: {
                    label: "COURSE DETAILS",
                    title: "Bachelor of Pharmacy (B. Pharm)",
                    paragraphs: ["The Bachelor of Pharmacy (B.Pharm) is an undergraduate academic degree in the field of pharmacy. In India, B.Pharm is a four-year program."],
                    imageSrc: UNSPLASH_IMAGES.features.books,
                    cta: { text: "Apply Now", link: "/apply" }
                }
            },
            {
                type: "eligibility-list",
                order: 2,
                data: {
                    sections: [
                        {
                            title: "Eligibility Criteria",
                            criteria: [{ text: "Passed 10+2 with Science (PCB/PCM)" }, { text: "Lateral entry for D.Pharm holders" }]
                        },
                        {
                            title: "Career Opportunities",
                            criteria: [{ text: "Clinical Research" }, { text: "Marketing" }, { text: "Production" }, { text: "Quality Control" }]
                        }
                    ]
                }
            }
        ]
    });
    // 5. Placement Page
    await page_model_1.Page.create({
        title: "Training & Placement Cell",
        slug: "placement",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.seminar,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Training & Placement Cell", subtitle: "LET'S MEET MEMBERS", image: UNSPLASH_IMAGES.backgrounds.seminar } },
            {
                type: "info-card",
                order: 1,
                data: {
                    title: "Training & Placement Cell",
                    label: "LET'S MEET A MEMBERS OF",
                    description: ["As per the directive of GTU, Placement cell is formed at the institute.", "The club will work towards ensuring that every student gets an excellent placement."],
                    featuredImage: UNSPLASH_IMAGES.features.students
                }
            },
            {
                type: "placement-activities",
                order: 2,
                data: {
                    headerText: "Activities:",
                    activities: [{ text: "Career counseling and placement." }, { text: "Organizing mock-interviews." }, { text: "Arranging local campus interviews." }]
                }
            },
            {
                type: "placement-team",
                order: 3,
                data: {
                    label: "MEET OUR TEAM",
                    title: "Placement Cell Members",
                    description: [
                        "Our dedicated placement team works tirelessly to bridge the gap between industry and academia.",
                        "We ensure every student gets the best opportunity to kickstart their career."
                    ],
                    members: [
                        {
                            name: "Dr. Bhawanishankar Madhira",
                            role: "Principal",
                            profileImage: UNSPLASH_IMAGES.people.principal,
                            email: "principal@rampharmacy.edu",
                            phone: "+91-9876543210"
                        },
                        {
                            name: "Mr. Vishwakarma Singh",
                            role: "Co-ordinator",
                            profileImage: UNSPLASH_IMAGES.people.faculty1,
                            email: "placement@rampharmacy.edu",
                            phone: "+91-9876543211"
                        }
                    ]
                }
            }
        ]
    });
    // 6. Facility Pages (Library, etc.)
    await page_model_1.Page.create({
        title: "Central Library",
        slug: "library",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.library,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Central Library", subtitle: "KNOWLEDGE CENTER", image: UNSPLASH_IMAGES.backgrounds.library } },
            {
                type: "info-card",
                order: 1,
                data: {
                    title: "Library",
                    label: "KNOWLEDGE CENTER",
                    description: ["Our Library is the heart of the institution, housing a vast collection of pharmaceutical books."],
                    featuredImage: UNSPLASH_IMAGES.features.books
                }
            },
            {
                type: "multi-image-carousel",
                order: 2,
                data: { images: [UNSPLASH_IMAGES.backgrounds.library, UNSPLASH_IMAGES.features.books, UNSPLASH_IMAGES.features.students] }
            },
            {
                type: "stats-counters",
                order: 3,
                data: {
                    featuredImage: UNSPLASH_IMAGES.backgrounds.library,
                    stats: [{ value: "15000+", field: "Books" }, { value: "50+", field: "Journals" }]
                }
            },
            {
                type: "other-facilities-carousel",
                order: 4,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: UNSPLASH_IMAGES.backgrounds.labs, slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: UNSPLASH_IMAGES.backgrounds.seminar, slug: "seminar-hall" },
                        { name: "Hostel", featured_image: UNSPLASH_IMAGES.backgrounds.hostel, slug: "hostel" },
                        { name: "Cafeteria", featured_image: UNSPLASH_IMAGES.backgrounds.cafeteria, slug: "cafeteria" },
                        { name: "Transportation", featured_image: UNSPLASH_IMAGES.backgrounds.transport, slug: "transportation" }
                    ]
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Hostel",
        slug: "hostel",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.hostel,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Hostel", subtitle: "HOME AWAY FROM HOME", image: UNSPLASH_IMAGES.backgrounds.hostel } },
            {
                type: "info-card",
                order: 1,
                data: {
                    title: "Hostel",
                    label: "HOME AWAY FROM HOME",
                    description: ["We provide comfortable and safe hostel facilities for students."],
                    featuredImage: UNSPLASH_IMAGES.backgrounds.hostel
                }
            },
            {
                type: "amenities-grid",
                order: 2,
                data: {
                    label: "HOSTEL AMENITIES",
                    title: "Our Facilities",
                    amenities: [{ icon: "Wifi", name: "High Speed Wifi" }, { icon: "Shield", name: "24/7 Security" }, { icon: "Utensils", name: "Hygienic Mess" }]
                }
            },
            {
                type: "stats-counters",
                order: 3,
                data: {
                    featuredImage: UNSPLASH_IMAGES.features.students,
                    stats: [{ value: "400+", field: "Capacity" }, { value: "100%", field: "Ragging Free" }]
                }
            },
            {
                type: "other-facilities-carousel",
                order: 4,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: UNSPLASH_IMAGES.backgrounds.labs, slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: UNSPLASH_IMAGES.backgrounds.seminar, slug: "seminar-hall" },
                        { name: "Hostel", featured_image: UNSPLASH_IMAGES.backgrounds.hostel, slug: "hostel" },
                        { name: "Cafeteria", featured_image: UNSPLASH_IMAGES.backgrounds.cafeteria, slug: "cafeteria" },
                        { name: "Transportation", featured_image: UNSPLASH_IMAGES.backgrounds.transport, slug: "transportation" }
                    ]
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Transportation",
        slug: "transportation",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.transport,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Transportation", subtitle: "SAFE COMMUTE", image: UNSPLASH_IMAGES.backgrounds.transport } },
            {
                type: "info-card",
                order: 1,
                data: {
                    title: "Transportation",
                    label: "SAFE COMMUTE",
                    description: ["We ensure that students can reach the college on time and safely."],
                    featuredImage: UNSPLASH_IMAGES.backgrounds.transport
                }
            },
            {
                type: "route-charges",
                order: 2,
                data: {
                    label: "SAFE COMMUTE",
                    title: "Transportation Charges",
                    description: "Our transportation network covers all nearby locations.",
                    routeCharges: [
                        { startLocation: "Godhra", endLocation: "Tuva", charge: "13200" },
                        { startLocation: "Halol", endLocation: "Tuva", charge: "19200" }
                    ]
                }
            },
            {
                type: "other-facilities-carousel",
                order: 3,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: UNSPLASH_IMAGES.backgrounds.labs, slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: UNSPLASH_IMAGES.backgrounds.seminar, slug: "seminar-hall" },
                        { name: "Hostel", featured_image: UNSPLASH_IMAGES.backgrounds.hostel, slug: "hostel" },
                        { name: "Cafeteria", featured_image: UNSPLASH_IMAGES.backgrounds.cafeteria, slug: "cafeteria" },
                        { name: "Transportation", featured_image: UNSPLASH_IMAGES.backgrounds.transport, slug: "transportation" }
                    ]
                }
            }
        ]
    });
    // 7. Messages
    await page_model_1.Page.create({
        title: "Message from Principal",
        slug: "principal",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Message from Principal", subtitle: "MESSAGE FROM", image: SEED_IMAGE } },
            {
                type: "about-hero",
                order: 1,
                data: {
                    label: "MESSAGE FROM Principal",
                    title: "Dr. Principal Name",
                    paragraphs: ["It is my great pleasure to welcome you to B. Pharmacy College. Pharmaceuticals is a field that sits at the intersection of science and healthcare."],
                    imageSrc: SEED_IMAGE
                }
            }
        ]
    });
    // 8. Remaining Academic & Messages
    await page_model_1.Page.create({
        title: "Our Academic Programs",
        slug: "academic-programs",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Our Academic Programs", subtitle: "ACADEMIC", image: SEED_IMAGE } },
            { type: "about-hero", order: 1, data: { label: "ACADEMIC", title: "Our Academic Programs", paragraphs: ["We offer a range of pharmaceutical courses designed to meet industry standards."], imageSrc: SEED_IMAGE } },
            { type: "eligibility-list", order: 2, data: { sections: [{ title: "Courses Offered", criteria: [{ text: "B. Pharm - 4 Years" }, { text: "D. Pharm - 2 Years" }] }] } }
        ]
    });
    await page_model_1.Page.create({
        title: "Message from Vice Principal",
        slug: "vice-principal",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Message from Vice Principal", subtitle: "MESSAGE FROM", image: SEED_IMAGE } },
            { type: "about-hero", order: 1, data: { label: "MESSAGE FROM Vice Principal", title: "Prof. Vice Principal Name", paragraphs: ["Welcome to B. Pharmacy College. As Vice Principal, I am honored to support a vibrant community."], imageSrc: SEED_IMAGE } }
        ]
    });
    await page_model_1.Page.create({
        title: "Message from President",
        slug: "president",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Message from President", subtitle: "MESSAGE FROM", image: SEED_IMAGE } },
            { type: "about-hero", order: 1, data: { label: "MESSAGE FROM President", title: "Shri J. R. Patel", paragraphs: ["Nutan Education Trust was founded with the vision of providing quality technical education."], imageSrc: SEED_IMAGE } }
        ]
    });
    // 9. Remaining Facilities
    await page_model_1.Page.create({
        title: "Laboratories",
        slug: "laboratories",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Laboratories", subtitle: "PRACTICAL LEARNING", image: SEED_IMAGE } },
            { type: "info-card", order: 1, data: { title: "Laboratories", label: "PRACTICAL LEARNING", description: ["We believe in learning by doing. Our institution boasts state-of-the-art laboratories."], featuredImage: SEED_IMAGE } },
            {
                type: "lab-details",
                order: 2,
                data: {
                    label: "DEPARTMENTS",
                    title: "Specialized Laboratories",
                    items: [
                        {
                            title: "Pharmaceutics Lab",
                            description: [
                                "Equipped with tablet punching machines and coating pans.",
                                "Facilities for formulation development and evaluation.",
                                "Advanced dissolution test apparatus."
                            ]
                        },
                        {
                            title: "Pharmaceutical Chemistry Lab",
                            description: [
                                "Modern fume hoods and safety equipment.",
                                "Synthesis and analysis of drug compounds.",
                                "Spectrophotometers and other analytical instruments."
                            ]
                        },
                        {
                            title: "Pharmacology Lab",
                            description: [
                                "Computer-aided drug design software.",
                                "Animal simulation models for ethical learning.",
                                "Physiological recording systems."
                            ]
                        }
                    ],
                    images: [
                        { image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop", name: "Chemistry Analysis" },
                        { image: "https://images.unsplash.com/photo-1581093458891-95896e007e0e?q=80&w=1470&auto=format&fit=crop", name: "Microscopy" },
                        { image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop", name: "Drug Formulation" }
                    ]
                }
            },
            { type: "stats-counters", order: 3, data: { image: SEED_IMAGE, stats: [{ value: "15+", field: "Labs" }, { value: "500+", field: "Instruments" }] } },
            {
                type: "other-facilities-carousel",
                order: 4,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d", slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", slug: "seminar-hall" },
                        { name: "Hostel", featured_image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5", slug: "hostel" },
                        { name: "Cafeteria", featured_image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24", slug: "cafeteria" },
                        { name: "Transportation", featured_image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957", slug: "transportation" }
                    ]
                }
            }
        ]
    });
    // New Admission Page
    await page_model_1.Page.create({
        title: "Admissions",
        slug: "admission",
        backgroundImage: SEED_IMAGE,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "B. Pharmacy Admission", subtitle: "ADMISSION INFO", image: SEED_IMAGE } },
            {
                type: "post-grid",
                order: 1,
                data: {
                    label: "ADMISSION INFO",
                    title: "B. Pharmacy Admission",
                    category: "admission"
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Seminar Hall",
        slug: "seminar-hall",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.seminar,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Seminar Hall", subtitle: "EVENTS", image: UNSPLASH_IMAGES.backgrounds.seminar } },
            { type: "info-card", order: 1, data: { title: "Seminar Hall", label: "EVENTS", description: ["Our air-conditioned Seminar Hall is the venue for various academic events."], featuredImage: UNSPLASH_IMAGES.backgrounds.seminar } },
            {
                type: "other-facilities-carousel",
                order: 2,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: UNSPLASH_IMAGES.backgrounds.labs, slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: UNSPLASH_IMAGES.backgrounds.seminar, slug: "seminar-hall" },
                        { name: "Hostel", featured_image: UNSPLASH_IMAGES.backgrounds.hostel, slug: "hostel" },
                        { name: "Cafeteria", featured_image: UNSPLASH_IMAGES.backgrounds.cafeteria, slug: "cafeteria" },
                        { name: "Transportation", featured_image: UNSPLASH_IMAGES.backgrounds.transport, slug: "transportation" }
                    ]
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Cafeteria",
        slug: "cafeteria",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.cafeteria,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Cafeteria", subtitle: "REST & REFRESH", image: UNSPLASH_IMAGES.backgrounds.cafeteria } },
            { type: "info-card", order: 1, data: { title: "Cafeteria", label: "REST & REFRESH", description: ["Good food leads to a good mood. Our cafeteria offers nutritious meals."], featuredImage: UNSPLASH_IMAGES.backgrounds.cafeteria } },
            { type: "multi-image-carousel", order: 2, data: { images: [UNSPLASH_IMAGES.backgrounds.cafeteria, UNSPLASH_IMAGES.features.students] } },
            {
                type: "other-facilities-carousel",
                order: 3,
                data: {
                    gallery: [
                        { name: "Laboratories", featured_image: UNSPLASH_IMAGES.backgrounds.labs, slug: "laboratories" },
                        { name: "Seminar Hall", featured_image: UNSPLASH_IMAGES.backgrounds.seminar, slug: "seminar-hall" },
                        { name: "Hostel", featured_image: UNSPLASH_IMAGES.backgrounds.hostel, slug: "hostel" },
                        { name: "Cafeteria", featured_image: UNSPLASH_IMAGES.backgrounds.cafeteria, slug: "cafeteria" },
                        { name: "Transportation", featured_image: UNSPLASH_IMAGES.backgrounds.transport, slug: "transportation" }
                    ]
                }
            }
        ]
    });
    await page_model_1.Page.create({
        title: "Our Blogs",
        slug: "blogs",
        backgroundImage: UNSPLASH_IMAGES.features.books,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Latest From Our Blog", subtitle: "INSIGHTS & UPDATES", image: UNSPLASH_IMAGES.features.books } },
            { type: "post-grid", order: 1, data: {} }
        ]
    });
    await page_model_1.Page.create({
        title: "Photo Gallery",
        slug: "gallery",
        backgroundImage: UNSPLASH_IMAGES.features.students,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Campus Photo Gallery", subtitle: "MOMENTS AT RAM PHARMACY", image: UNSPLASH_IMAGES.features.students } },
            { type: "gallery-grid", order: 1, data: {} }
        ]
    });
    logger_1.default.info("[SEED] Pages seeded");
};
// Inserted Classroom Page
const seedClassroomPage = async () => {
    await page_model_1.Page.create({
        title: "Classroom & Academic Infrastructure",
        slug: "class",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.classroom,
        isPublished: true,
        sections: [
            { type: "page-header", order: 0, data: { title: "Classroom & Academic Infrastructure", subtitle: "ACADEMIC", image: UNSPLASH_IMAGES.backgrounds.classroom } },
            {
                type: "about-hero",
                order: 1,
                data: {
                    label: "ACADEMIC",
                    title: "Classroom & Academic Infrastructure",
                    paragraphs: [
                        "We provide modern classrooms equipped with the latest technology to enhance the learning experience.",
                        "Our infrastructure is designed to create a conducive environment for both theoretical and practical learning."
                    ],
                    imageSrc: UNSPLASH_IMAGES.backgrounds.classroom
                }
            },
            {
                type: "eligibility-list",
                order: 2,
                data: {
                    sections: [
                        {
                            title: "Infrastructure Features",
                            criteria: [
                                { text: "Smart Classrooms with Interactive Whiteboards and Projectors." },
                                { text: "Spacious and Well-ventilated Lecture Halls." },
                                { text: "High-speed Wi-Fi connectivity throughout the academic block." },
                                { text: "Dedicated Seminar Halls for guest lectures and workshops." }
                            ]
                        }
                    ]
                }
            }
        ]
    });
};
const seedFaculty = async () => {
    await faculty_model_1.Faculty.deleteMany({});
    await faculty_model_1.Faculty.create([
        {
            name: "Dr. Arvind Sharma",
            role: "Principal",
            department: "Pharmaceutics",
            profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
            experience: "15+ Years",
            qualifications: ["M. Pharm", "Ph.D"],
            order: 0
        },
        {
            name: "Prof. Neha Gupta",
            role: "Associate Professor",
            department: "Pharmacology",
            profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
            experience: "10+ Years",
            qualifications: ["M. Pharm"],
            order: 1
        },
        {
            name: "Dr. Rajesh Patel",
            role: "Assistant Professor",
            department: "Pharmaceutical Chemistry",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
            experience: "8+ Years",
            qualifications: ["M. Pharm", "Ph.D"],
            order: 2
        },
        {
            name: "Ms. Priya Varma",
            role: "Assistant Professor",
            department: "Pharmacognosy",
            profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
            experience: "5+ Years",
            qualifications: ["M. Pharm"],
            order: 3
        },
        {
            name: "Mr. Sanjay Mehta",
            role: "Assistant Professor",
            department: "Quality Assurance",
            profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
            experience: "7+ Years",
            qualifications: ["M. Pharm"],
            order: 4
        },
        {
            name: "Dr. Ananya Iyer",
            role: "Associate Professor",
            department: "Pharmaceutics",
            profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
            experience: "12+ Years",
            qualifications: ["M. Pharm", "Ph.D"],
            order: 5
        }
    ]);
    logger_1.default.info("[SEED] Faculty seeded");
};
const seedTeam = async () => {
    await team_model_1.TeamMember.deleteMany({});
    await team_model_1.TeamMember.create([
        // Leadership
        {
            name: "Mr. Jagdish Patel",
            role: "President",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
            category: "leadership",
            order: 0
        },
        {
            name: "Mr. Rajesh Patel",
            role: "Vice President",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
            category: "leadership",
            order: 1
        },
        {
            name: "Dr. Bhawanishankar Madhira",
            role: "Principal",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
            category: "leadership",
            order: 2
        },
        // Placement Team
        {
            name: "Dr. Bhawanishankar Madhira",
            role: "Principal",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
            email: "madhirag@gmail.com",
            phone: "+91-8860434068",
            category: "placement",
            order: 3
        },
        {
            name: "Mr. Vishwakarma Singh",
            role: "Co-ordinator",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
            email: "vishusingh1510@gmail.com",
            phone: "+91-8319084588",
            category: "placement",
            order: 4
        },
        {
            name: "Mr. Vikas Agnihotri",
            role: "Faculty Member",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
            email: "agnihotri9312@gmail.com",
            phone: "+91-8982079312",
            category: "placement",
            order: 5
        }
    ]);
    logger_1.default.info("[SEED] Team seeded");
};
const seedPosts = async () => {
    await post_model_1.Post.deleteMany({});
    await post_model_1.Post.create([
        {
            title: "Advances in Pharmaceutical Sciences 2024",
            slug: "advances-2024",
            image: UNSPLASH_IMAGES.features.research,
            content: "Full article content about pharmaceutical advances...",
            excerpt: "Latest trends in pharmaceutical research.",
            category: "blog",
            isPublished: true,
            publishDate: new Date("2024-12-24")
        },
        {
            title: "Traditional vs Modern Medicine: A Study",
            slug: "medicine-study",
            image: UNSPLASH_IMAGES.features.research,
            content: "Comparative study of traditional and modern medicine...",
            excerpt: "Understanding the bridge between two worlds.",
            category: "blog",
            isPublished: true,
            publishDate: new Date("2024-11-12")
        },
        {
            title: "Career Paths after B. Pharmacy Degree",
            slug: "career-paths",
            image: UNSPLASH_IMAGES.features.books,
            content: "Explore various career opportunities after graduation...",
            excerpt: "Guide to pharmacy careers.",
            category: "blog",
            isPublished: true,
            publishDate: new Date("2024-11-05")
        },
        {
            title: "ADMISSION TO MQ/NRI SEATS 2025",
            slug: "admission-nri-2025",
            image: UNSPLASH_IMAGES.features.admission,
            content: "Details about MQ/NRI quota admissions...",
            excerpt: "Admission notification for 2025.",
            category: "admission",
            isPublished: true,
            publishDate: new Date("2025-10-16")
        },
        {
            title: "B. Pharmacy Admission Advertisement",
            slug: "admission-advertisement",
            image: UNSPLASH_IMAGES.features.admission,
            content: "Official advertisement for B.Pharm admissions...",
            excerpt: "Apply now for B.Pharm.",
            category: "admission",
            isPublished: true,
            publishDate: new Date("2025-10-16")
        }
    ]);
    logger_1.default.info("[SEED] Posts seeded");
};
const seedGallery = async () => {
    await gallery_model_1.GalleryImage.deleteMany({});
    const images = [
        "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1480&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1632&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583912267550-d44d2a3c7159?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=1470&auto=format&fit=crop"
    ];
    await gallery_model_1.GalleryImage.create(images.map((url, index) => ({
        url,
        alt: `Gallery Image ${index + 1}`,
        album: "General",
        order: index
    })));
    logger_1.default.info("[SEED] Gallery seeded");
};
const seedTestimonials = async () => {
    await testimonial_model_1.Testimonial.deleteMany({});
    await testimonial_model_1.Testimonial.create([
        {
            name: "Rahul Sharma",
            profileImage: UNSPLASH_IMAGES.people.studentMale,
            feedback: "The facilities at Ram Pharmacy College are top-notch. The labs are well-equipped, and the library has every book a student could need.",
            rating: 5.0,
            isPublished: true
        },
        {
            name: "Priya Patel",
            profileImage: UNSPLASH_IMAGES.people.studentFemale,
            feedback: "The faculty is incredibly supportive and knowledgeable. They guide us not just in academics but also in our career paths.",
            rating: 4.8,
            isPublished: true
        },
        {
            name: "Amit Kumar",
            profileImage: UNSPLASH_IMAGES.people.studentMale,
            feedback: "I love the campus environment! It's peaceful and perfect for studying. The hostel facilities are also very comfortable.",
            rating: 4.9,
            isPublished: true
        },
        {
            name: "Sneha Gupta",
            profileImage: UNSPLASH_IMAGES.people.studentFemale,
            feedback: "The placement cell works really hard. Almost all my seniors got placed in good pharmaceutical companies.",
            rating: 5.0,
            isPublished: true
        },
        {
            name: "Vikram Singh",
            profileImage: UNSPLASH_IMAGES.people.studentMale,
            feedback: "The practical exposure we get here is amazing. The college organizes regular industry visits and guest lectures.",
            rating: 4.7,
            isPublished: true
        },
        {
            name: "Anjali Desai",
            profileImage: UNSPLASH_IMAGES.people.studentFemale,
            feedback: "Ram Pharmacy College has given me the confidence to pursue my dreams. The curriculum is updated and relevant.",
            rating: 4.9,
            isPublished: true
        }
    ]);
    logger_1.default.info("[SEED] Testimonials seeded");
};
const seedFacultyPage = async () => {
    await page_model_1.Page.deleteMany({ slug: "faculties" });
    await page_model_1.Page.create({
        title: "Faculties",
        slug: "faculties",
        backgroundImage: UNSPLASH_IMAGES.backgrounds.campus,
        isPublished: true,
        sections: [
            {
                type: "page-header",
                order: 0,
                data: {
                    title: "Our Faculties",
                    subtitle: "MEET OUR TEAM",
                    image: UNSPLASH_IMAGES.backgrounds.campus
                }
            },
            {
                type: "faculty-grid",
                order: 1,
                data: {
                // Data will be fetched by component from Faculty collection
                }
            }
        ]
    });
    logger_1.default.info("[SEED] Faculty page seeded");
};
const seedAll = async () => {
    await (0, exports.seedDefaultAdmin)();
    await seedGlobalSettings();
    await seedPages();
    await seedClassroomPage();
    await seedFacultyPage();
    await seedFaculty();
    await seedTeam();
    await seedPosts();
    await seedGallery();
    await seedTestimonials();
    await seedNavigation();
    logger_1.default.info("[SEED] All data seeded successfully");
};
exports.seedAll = seedAll;
const navigation_model_1 = require("./app/modules/navigation/navigation.model");
const seedNavigation = async () => {
    await navigation_model_1.Navigation.deleteMany({});
    // Helper to find page ID by path/slug
    // Note: In real app, we should look up page IDs. For now, we seed basic structure.
    // If strict linking is needed, we would need to fetch all pages first.
    const menu = [
        { label: "Home", type: "link", path: "/", order: 0 },
        {
            label: "About", type: "dropdown", path: "/about", order: 1,
            children: [
                { label: "About Us", type: "link", path: "/about-us", order: 0 },
                { label: "Message from Principal", type: "link", path: "/principal", order: 1 },
                { label: "Message from Vice Principal", type: "link", path: "/vice-principal", order: 2 },
                { label: "Message from President", type: "link", path: "/president", order: 3 },
            ]
        },
        {
            label: "Academic", type: "dropdown", path: "/academic", order: 2,
            children: [
                { label: "Courses", type: "link", path: "/courses", order: 0 },
                { label: "Faculties", type: "link", path: "/faculties", order: 1 },
                { label: "Class", type: "link", path: "/class", order: 2 },
            ]
        },
        {
            label: "Facilities", type: "dropdown", path: "/facilities", order: 3,
            children: [
                { label: "Library", type: "link", path: "/library", order: 0 },
                { label: "Laboratories", type: "link", path: "/laboratories", order: 1 },
                { label: "Seminar Hall", type: "link", path: "/seminar-hall", order: 2 },
                { label: "Hostel", type: "link", path: "/hostel", order: 3 },
                { label: "Cafeteria", type: "link", path: "/cafeteria", order: 4 },
                { label: "Transportation", type: "link", path: "/transportation", order: 5 },
            ]
        },
        { label: "Placement", type: "link", path: "/placement", order: 4 },
        { label: "Gallery", type: "link", path: "/gallery", order: 5 },
        { label: "Admission", type: "link", path: "/admission", order: 6 }, // Is admission a page? It was seeded as posts category?
        { label: "Blog", type: "link", path: "/blogs", order: 7 },
        { label: "Contact Us", type: "link", path: "/contact-us", order: 8 },
    ];
    // Optional: Try to link pages if they exist (best effort)
    const pages = await page_model_1.Page.find({});
    // Recursive function to link pages
    const linkPages = (items) => {
        return items.map(item => {
            if (item.path) {
                // Try to find page with matching slug (assuming path is /slug)
                // If path is /, look for 'home'
                let slug = item.path.replace(/^\//, '');
                if (slug === "")
                    slug = "home";
                const page = pages.find(p => p.slug === slug);
                if (page) {
                    item.page = page._id;
                }
            }
            if (item.children) {
                item.children = linkPages(item.children);
            }
            return item;
        });
    };
    await navigation_model_1.Navigation.create({ menu: linkPages(menu) });
    logger_1.default.info("[SEED] Navigation seeded");
};
//# sourceMappingURL=seeder.js.map