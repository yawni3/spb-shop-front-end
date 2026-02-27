import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./style/feedback.css";
import successSound from "../assets/sounds/softringtone.mp3";


const FeedbackModal = ({ isOpen, onClose }) => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    message: ""
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
    .then(() => {

      setToast("Feedback sent 🐾");
      const audio = new Audio(successSound);
      audio.volume = 0.6;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 3000);

    })
    .catch(() => {
      setToast("Error sending message 😿");
      setTimeout(() => setToast(null), 3000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        {toast && <div className="toast">{toast}</div>}

        <h2>Send Feedback 🧁</h2>

        <form onSubmit={sendEmail}>
          <input
            name="username"
            placeholder="Your name"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message..."
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send 🍰</button>
        </form>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
};

export default FeedbackModal;
