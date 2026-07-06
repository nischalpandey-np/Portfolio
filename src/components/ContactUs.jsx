import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    // User's existing web3forms key
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
            background: "#333",
            color: "#fff",
            borderRadius: "100px",
          },
        });
        event.target.reset();
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Unable to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 py-4 text-xl md:text-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:border-primary focus:bg-gray-50 dark:focus:bg-white/5 transition-all duration-300 rounded-none";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.15 }}
      id="contact-us"
      className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 pt-32 pb-40 text-gray-900 dark:text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
        {/* Left Side: Massive Text */}
        <div className="flex flex-col justify-start border-t border-gray-200 dark:border-gray-800 pt-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[18vw] sm:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-outline text-outline-hover cursor-default"
          >
            LET'S
            <br />
            TALK.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-md mt-8 leading-relaxed"
          >
            Have a project, opportunity, or just want to connect? I am actively
            looking for new frontend developer roles.
          </motion.p>
        </div>

        {/* Right Side: Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          onSubmit={onSubmit}
          className="flex flex-col gap-8 w-full border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your Name"
              className={inputBase}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="yourname@example.com"
              className={inputBase}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-message"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              name="message"
              placeholder="Tell me about your idea..."
              className={`${inputBase} resize-none`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`self-start md:self-end mt-4 px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg font-black uppercase tracking-widest hover:bg-primary dark:hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center min-w-[200px] ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "SENDING..." : "SEND"}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactUs;
