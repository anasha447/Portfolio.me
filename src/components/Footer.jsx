export default function Footer() {
    return (
        <footer className="relative z-10 py-8 bg-[#001c2b] border-t border-[#F8F9FA]/5">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-['Train_One'] text-2xl text-[#F8F9FA] mb-2">
                    ANAS HABIB
                </h2>
                <p className="font-exo text-xs text-[#F8F9FA]/40 uppercase tracking-widest">
                    © {new Date().getFullYear()} All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
