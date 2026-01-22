import React from "react";
import { motion } from "framer-motion";

// Testimonial data
const testimonials = [
  {
    quote:
      "Vanshika developed a fantastic website for us. His attention to detail and responsiveness were exceptional. Highly recommended!",
    name: "Client A",
    title: "CEO of TechCorp",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Working with Vanshika was a pleasure. He's a skilled developer who always goes the extra mile to deliver quality work.",
    name: "Colleague B",
    title: "Senior Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "The portfolio website Vanshika built is amazing. It's clean, modern, and perfectly showcases his abilities.",
    name: "Client C",
    title: "Founder of InnovateX",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

// Reusable Testimonial Card
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.2,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg"
    >
      <p className="text-gray-300 italic mb-6">“{testimonial.quote}”</p>

      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Testimonials Section
export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 bg-black px-6">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-20">
        Testimonials
      </h2>

      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
