import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ---------- DATA ---------- */
const experiences = [
  {
    role: "Software Engineer Intern",
    company: "HackerRank",
    duration: "2025",
    description:
      "Earned the HackerRank Software Engineer Intern certification by demonstrating strong problem-solving skills, proficiency in data structures and algorithms, and practical coding abilities through real-world programming assessments.",
  },

  {
    role: "Smart India Hackathon – Internal Round Selection",
    company: "Smart India Hackathon (SIH)",
    duration: "2025",
    description:
      "Cleared the internal selection round of SIH 2025 by presenting a technically sound solution using software engineering principles.",
  },

  {
    role: "AI & Design Thinking Workshop Participant",
    company: "MeitY, Government of India",
    description:
      "Built mini AI prototypes involving data preprocessing, model training, and evaluation within the design thinking lifecycle.",
  },
];

/* ---------- EXPERIENCE ITEM ---------- */
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        {/* DOT */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />

        {/* LINE */}
        <motion.div
          className={`absolute ${
            idx % 2 === 0 ? "-top-8" : "-bottom-8"
          } w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />

        {/* CARD */}
        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  /* ---------- MOBILE ---------- */
  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, x }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => i / experiences.length),
    [],
  );

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-20">Experience</h2>

          {/* TIMELINE */}
          <div className="relative flex w-full max-w-6xl">
            {experiences.map((exp, idx) => (
              <ExperienceItem
                key={idx}
                exp={exp}
                idx={idx}
                start={thresholds[idx]}
                end={thresholds[idx] + 1 / experiences.length}
                scrollYProgress={scrollYProgress}
                layout={isMobile ? "mobile" : "desktop"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// import { useScroll, useTransform } from "framer-motion";
// import { useEffect } from "react";

// const experiences = [
//   {
//     role: "Web Developer",
//     company: "Brain Mentors",
//     duration: "2022 - Present",
//     description:
//       "Built and maintained responsive web applications using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software.",
//   },
//   {
//     role: "Frontend Developer",
//     company: "Tech Solutions",
//     duration: "2021 - 2022",
//     description:
//       "Developed user interfaces and interactive web components. Optimized web performance and ensured cross-browser compatibility.",
//   },
//   {
//     role: "Intern",
//     company: "Innovate Inc.",
//     duration: "2020 - 2021",
//     description:
//       "Assisted in the development of a new e-commerce platform. Gained experience in full-stack development and agile methodologies.",
//   },
// ];

// function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout })
// {
//     const scale = useTransform(scrollYProgress, [start, end], [0, 1])
//     const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
//     const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0])
//     const x = useTransform(scrollYProgress, [start, end], [-24, 0])

//     if (layout === "desktop") {
//         return (
//             <div className="relative flex flex-1 justify-center items-center min-w-0">
//                 <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
//                     style={{
//                     scale,opacity
//                 }}>

//                 </motion.div>
//                 <motion.div className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
//                     style={{ height: 40, opacity }}></motion.div>
//                 <motion.article className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"}
//                 bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
//                     style={{ opacity, y, maxWidth: "90vw" }}
//                     transition={{ duration: 0.4, delay: idx * 0.15 }}>
//                     <h3 className="">
//                         {exp.role}
//                     </h3>
//                     <p className="text-md text-gray-400 mb-3">
//                         {exp.company}|{exp.duration}

//                     </p>
//                     <p className="text-md text-gray-300 break-words">
//                         {exp.description}
//                     </p>
//                 </motion.article>

//             </div>
//         )
//     }
//     return (
//       <div className="relative flex items-start">
//         <motion.div
//           className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadoe-[0_0_0_8px_rbga(255,255,255,0.1)]"
//           style={{ scale, opacity }}
//         ></motion.div>

//         <motion.article
//           className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
//           style={{ opacity, x }}
//           transition={{ duration: 0.4, delay: idx * 0.15 }}
//         >
//           <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
//           <p className="text-sm text-gray-400 mb-2 break-words">
//             {exp.company}|{exp.duration}
//           </p>
//           <p className="text-sm text-gray-300 break-words">{exp.description}</p>
//         </motion.article>
//       </div>
//     );

// }

// export default function Experience() {
//     const sceneRef = useRef(null);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkMobile = () => setIsMobile(window.innerWidth < 768);
//         checkMobile();
//         window.addEventListener("resize", checkMobile)
//         return ()=> window.removeEventListener("resize",checkMobile)
//     }, [])

//     const SCENE_HEIGHT_WH = isMobile ? 160 * experiences.length : 120 * experiences.length;

//     const { scrollYProgress } = useScroll({
//         target: sceneRef,
//         offset:["start start","end end"]
//     })

//     const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), [])
//     const lineSize=useTransform(scrollYProgress,(v)=>`${v*100}%`)

//     return (
//         <section id="experience" className="relative bg-black text-white">
//             <div ref={sceneRef}
//                 style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
//                 className="relative">
//                 <div className="sticky top-0 h-screen flex flex-col">
//                     <h2 className="sticky top-0 h-screen flex flex-col">
//                         <h2 className="">
//                             Experience
//                         </h2>
//                     </h2>
//                 </div>

//             </div>

//         </section>
//     )
// }

// import React, { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const experiences = [
//   {
//     role: "Web Developer",
//     company: "Brain Mentors",
//     duration: "2022 - Present",
//     description:
//       "Built and maintained responsive web applications using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software.",
//   },
//   {
//     role: "Frontend Developer",
//     company: "Tech Solutions",
//     duration: "2021 - 2022",
//     description:
//       "Developed user interfaces and interactive web components. Optimized web performance and ensured cross-browser compatibility.",
//   },
//   {
//     role: "Intern",
//     company: "Innovate Inc.",
//     duration: "2020 - 2021",
//     description:
//       "Assisted in the development of a new e-commerce platform. Gained experience in full-stack development and agile methodologies.",
//   },
// ];

// const ExperienceItem = ({
//   experience,
//   index,
//   start,
//   end,
//   scrollYProgress,
//   layout,
// }) => {
//   const scale = useTransform(scrollYProgress, [start, end], [0.85, 1]);
//   const opacity = useTransform(scrollYProgress, [start, end], [0.4, 1]);
//   const y = useTransform(
//     scrollYProgress,
//     [start, end],
//     [index % 2 === 0 ? 40 : -40, 0],
//   );

//   return (
//     <motion.div
//       style={{ scale, opacity, y }}
//       className={`relative max-w-xl p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg
//         ${layout === "desktop" && index % 2 === 0 ? "ml-auto" : ""}`}
//     >
//       <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
//       <p className="text-sm text-gray-400">
//         {experience.company} • {experience.duration}
//       </p>
//       <p className="mt-3 text-gray-300">{experience.description}</p>
//     </motion.div>
//   );
// };

// export default function Experience() {
//   const sceneRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: sceneRef,
//     offset: ["start end", "end start"],
//   });

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return (
//     <section
//       ref={sceneRef}
//       id="experience"
//       className="relative py-32 bg-black overflow-hidden"
//     >
//       <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-20">
//         Experience
//       </h2>

//       <div className="relative max-w-6xl mx-auto space-y-24 px-6">
//         {experiences.map((exp, idx) => (
//           <ExperienceItem
//             key={idx}
//             experience={exp}
//             index={idx}
//             layout={isMobile ? "mobile" : "desktop"}
//             scrollYProgress={scrollYProgress}
//             start={idx / experiences.length}
//             end={(idx + 1) / experiences.length}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
