
/**
 * SectionTitle — Reusable branded title with a sleek animated underline
 * Removes the heavy pill background for a cleaner, modern look.
 */
export default function SectionTitle({ children, className = '' }) {
    // Colors:
    // Text: F77F00 (Orange)
    // Underline Glow: D62828 (Red)

    return (
        <div className={`relative flex flex-col items-center justify-center gap-2 mb-10 overflow-visible ${className}`}>
            <div className="relative px-8 py-3 rounded-full bg-[#003049]/40 backdrop-blur-sm border border-[#F8F9FA]/5 shadow-[0_10px_25px_-5px_rgba(214,40,40,0.4)]">
                <h2 className="font-['Train_One'] font-normal text-2xl md:text-4xl text-[#F77F00] text-center tracking-wider relative z-10">
                    {children}
                </h2>
            </div>
        </div>
    );
}
