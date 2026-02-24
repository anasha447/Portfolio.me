import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Download, Loader2, CheckCircle2 } from 'lucide-react';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const formData = new FormData(e.target);
        formData.append("access_key", "60e8cf24-3032-4ee8-982b-3d0fe22fc2aa");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                e.target.reset();
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } catch {
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <motion.div className="flex flex-col gap-8 items-center lg:items-start order-2 lg:order-1" variants={itemVariants}>
                        <div className={`${GLASS} p-8 flex flex-col gap-8 w-full`}>
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

                        {/* ═══ Download CV Button ═══ */}
                        <div className="pt-4 flex justify-center w-full">
                            <a
                                href="/Anas_Habib_Resume.pdf"
                                download="Anas_Habib_Resume.pdf"
                                className="bg-[#003049]/40 backdrop-blur-md border border-[#F8F9FA]/20 text-[#F8F9FA] hover:border-[#F77F00] hover:text-[#F77F00] px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all w-max shadow-lg group font-exo font-bold text-sm uppercase tracking-widest"
                            >
                                <Download size={20} aria-hidden="true" className="group-hover:translate-y-1 transition-transform" />
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    {/* ─── Contact Form ─── */}
                    <motion.div variants={itemVariants} className="order-1 lg:order-2 w-full">
                        <div className="bg-[#001c2b]/50 backdrop-blur-xl border border-[#F8F9FA]/10 rounded-2xl p-8 min-h-[500px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center text-center gap-4"
                                    >
                                        <CheckCircle2 size={64} className="text-[#F77F00]" />
                                        <h3 className="font-exo font-bold text-2xl text-[#F8F9FA]">Message Sent!</h3>
                                        <p className="font-roboto text-[#F8F9FA]/70">
                                            Message sent successfully! I will get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="mt-4 text-[#F77F00] hover:underline font-exo text-sm font-bold uppercase tracking-wider"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col"
                                    >
                                        <div className="flex flex-col gap-1 mb-4">
                                            <label htmlFor="name" className="font-exo text-xs font-bold text-[#F8F9FA]/50 uppercase tracking-widest px-1">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                className="w-full bg-[#003049]/40 border border-[#F8F9FA]/10 rounded-lg p-3 text-[#F8F9FA] font-roboto focus:outline-none focus:border-[#F77F00] transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 mb-4">
                                            <label htmlFor="email" className="font-exo text-xs font-bold text-[#F8F9FA]/50 uppercase tracking-widest px-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                className="w-full bg-[#003049]/40 border border-[#F8F9FA]/10 rounded-lg p-3 text-[#F8F9FA] font-roboto focus:outline-none focus:border-[#F77F00] transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 mb-4">
                                            <label htmlFor="subject" className="font-exo text-xs font-bold text-[#F8F9FA]/50 uppercase tracking-widest px-1">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                required
                                                className="w-full bg-[#003049]/40 border border-[#F8F9FA]/10 rounded-lg p-3 text-[#F8F9FA] font-roboto focus:outline-none focus:border-[#F77F00] transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 mb-6">
                                            <label htmlFor="message" className="font-exo text-xs font-bold text-[#F8F9FA]/50 uppercase tracking-widest px-1">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                required
                                                rows="5"
                                                placeholder="how can i help you"
                                                className="w-full bg-[#003049]/40 border border-[#F8F9FA]/10 rounded-lg p-3 text-[#F8F9FA] font-roboto placeholder:text-[#F8F9FA]/20 focus:outline-none focus:border-[#F77F00] transition-colors resize-none"
                                            />
                                        </div>

                                        {errorMessage && (
                                            <p className="text-red-500 text-sm font-roboto mb-4 italic">{errorMessage}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#F77F00] hover:bg-[#F77F00]/90 text-[#F8F9FA] font-exo font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#F77F00]/20 hover:shadow-[#F77F00]/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

