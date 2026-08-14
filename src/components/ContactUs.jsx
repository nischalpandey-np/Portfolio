import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

const FloatingLabelInput = ({ id, name, type = "text", placeholder, label, required }) => (
  <div className="floating-label-group w-full relative">
    <input
      id={id}
      type={type}
      name={name}
      placeholder=" "
      required={required}
      className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 pt-6 pb-2 text-lg md:text-xl text-gray-900 dark:text-white outline-none focus:border-primary transition-all duration-300 peer"
      autoComplete="off"
    />
    <label
      htmlFor={id}
      className="absolute top-4 left-0 text-sm font-bold uppercase tracking-widest text-gray-400 pointer-events-none origin-left transition-all duration-300 peer-focus:text-primary peer-focus:scale-75 peer-focus:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-primary"
    >
      {label}
    </label>
  </div>
);

const FloatingLabelTextarea = ({ id, name, label, rows = 4, required }) => (
  <div className="floating-label-group w-full relative">
    <textarea
      id={id}
      name={name}
      placeholder=" "
      rows={rows}
      required={required}
      className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 pt-6 pb-2 text-lg md:text-xl text-gray-900 dark:text-white outline-none focus:border-primary transition-all duration-300 resize-none peer"
    />
    <label
      htmlFor={id}
      className="absolute top-4 left-0 text-sm font-bold uppercase tracking-widest text-gray-400 pointer-events-none origin-left transition-all duration-300 peer-focus:text-primary peer-focus:scale-75 peer-focus:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-primary"
    >
      {label}
    </label>
  </div>
);

const CopyButton = ({ value, label }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="copy-btn group flex items-center gap-2 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:bg-primary/5 px-4 py-2.5 rounded-full transition-all duration-300"
    >
      <span className="tooltip">{copied ? "Copied!" : "Copy"}</span>
      <span className="text-base">{copied ? "✓" : "📋"}</span>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
        {label}
      </span>
    </motion.button>
  );
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/nischalpandey-np", icon: "🐙" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nischal-pandey", icon: "💼" },
  { label: "Twitter", href: "https://twitter.com/nischalpandey", icon: "𝕏" },
];

/**
 * Contact Us Section Component
 * 
 * Renders a contact form integrated with Web3Forms API to send emails directly.
 * Features floating label inputs, validation, animated submission state, and social links.
 * 
 * @returns {JSX.Element} The contact section
 */
const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "fa9cf859-a5b6-4c9b-a820-646734f3ecac");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.", {
          style: {
            background: "#1e1e1e",
            color: "#fff",
            borderRadius: "100px",
          },
        });
        event.target.reset();
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.15 }}
      id="contact-us"
      className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 pt-32 pb-40 text-gray-900 dark:text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
        {/* Left Side: Heading + Social */}
        <div className="flex flex-col justify-start border-t border-gray-200 dark:border-gray-800 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-[18vw] sm:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-outline text-outline-hover cursor-default">
              LET'S
              <br />
              <span className="shimmer-text">TALK.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium max-w-sm mt-8 leading-relaxed"
          >
            Have a project, opportunity, or just want to connect? I'm actively
            looking for new frontend developer roles.
          </motion.p>

          {/* Quick contact actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <CopyButton value="nischalpandeynp@gmail.com" label="Copy Email" />
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mt-5"
          >
            {socialLinks.map((s) => (
              <motion.a
                whileTap={{ scale: 0.95 }}
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:bg-primary/5 px-4 py-2.5 rounded-full transition-all duration-300 group"
              >
                <span className="text-base">{s.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                  {s.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          onSubmit={onSubmit}
          className="flex flex-col gap-10 w-full border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <FloatingLabelInput
            id="contact-name"
            name="name"
            label="Your Name"
            required
          />
          <FloatingLabelInput
            id="contact-email"
            name="email"
            type="email"
            label="Email Address"
            required
          />
          <FloatingLabelTextarea
            id="contact-message"
            name="message"
            label="Tell me about your project..."
            rows={5}
            required
          />

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            id="contact-submit-btn"
            disabled={isSubmitting}
            className={`magnetic-btn self-start md:self-end mt-2 relative overflow-hidden px-12 py-5 rounded-full text-lg font-black uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] shadow-xl ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed bg-gray-500"
                : "bg-gradient-to-r from-primary to-accent hover:shadow-primary/40 hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactUs;
