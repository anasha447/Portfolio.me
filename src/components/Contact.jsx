import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';

const GLASS =
    'bg-[#003049]/30 backdrop-blur-sm border border-[#F8F9FA]/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]';

const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Contact() {
    return (
        <motion.section
            id="contact"
            className="relative z-10 px-6 md:px-16 lg:px-24 py-24 pb-32"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-14">
                {/* ═══ Section Title ═══ */}
                <SectionTitle>Contact Me</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* ─── Contact Info ─── */}
                    <motion.div className="flex flex-col gap-8" variants={itemVariants}>
                        <div className={`${GLASS} p-8 flex flex-col gap-8`}>
                            <h3 className="font-exo font-bold text-2xl text-[#F8F9FA]">
                                Get in Touch
                            </h3>


                            <div className="flex flex-col gap-6">
                                {/* Email */}
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#F77F00]/10 border border-[#F77F00]/20 flex items-center justify-center text-[#F77F00] group-hover:bg-[#F77F00] group-hover:text-white transition-all duration-300">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-[#F8F9FA]/50 font-roboto font-bold">
                                            Mail Address
                                        </span>
                                        <span className="text-[#F8F9FA] font-roboto text-lg break-all">
                                            anashabib0101@gmail.com
                                        </span>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#F77F00]/10 border border-[#F77F00]/20 flex items-center justify-center text-[#F77F00] group-hover:bg-[#F77F00] group-hover:text-white transition-all duration-300">
                                        <Phone size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-[#F8F9FA]/50 font-roboto font-bold">
                                            Phone
                                        </span>
                                        <span className="text-[#F8F9FA] font-roboto text-lg">
                                            +91 7984191716
                                        </span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#F77F00]/10 border border-[#F77F00]/20 flex items-center justify-center text-[#F77F00] group-hover:bg-[#F77F00] group-hover:text-white transition-all duration-300">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-[#F8F9FA]/50 font-roboto font-bold">
                                            Location
                                        </span>
                                        <span className="text-[#F8F9FA] font-roboto text-lg">
                                            Lucknow, India
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Contact Form ─── */}
                    <motion.div variants={itemVariants}>
                        <form className={`${GLASS} p-8 flex flex-col gap-6`}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-exo text-sm font-bold text-[#F8F9FA]/70 uppercase tracking-wide">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="bg-[#001c2b]/50 border border-[#F8F9FA]/10 rounded-xl px-4 py-3 text-[#F8F9FA] font-exo placeholder:text-[#F8F9FA]/20 focus:outline-none focus:border-[#F77F00]/50 focus:ring-1 focus:ring-[#F77F00]/50 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="font-exo text-sm font-bold text-[#F8F9FA]/70 uppercase tracking-wide">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="Tell me about your project..."
                                    className="bg-[#001c2b]/50 border border-[#F8F9FA]/10 rounded-xl px-4 py-3 text-[#F8F9FA] font-exo placeholder:text-[#F8F9FA]/20 focus:outline-none focus:border-[#F77F00]/50 focus:ring-1 focus:ring-[#F77F00]/50 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="button"
                                className="mt-2 bg-[#F77F00] hover:bg-[#F77F00]/90 text-white font-exo font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#F77F00]/20 hover:shadow-[#F77F00]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
