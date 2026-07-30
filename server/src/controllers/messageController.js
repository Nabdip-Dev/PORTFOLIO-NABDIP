import { Message } from "../models/Message.js";
import { sendMail } from "../utils/mailer.js";

/** Public: submit the contact form. Saves to DB and emails the admin. */
export async function submit(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const doc = await Message.create({ name, email, subject, message });

    if (process.env.CONTACT_NOTIFY_EMAIL) {
      sendMail({
        to: process.env.CONTACT_NOTIFY_EMAIL,
        subject: `New contact message: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    }

    res.status(201).json({ success: true, message: "Message sent", data: { id: doc._id } });
  } catch (err) {
    next(err);
  }
}

/** Admin: list messages, optionally filtered by read status. */
export async function getAll(req, res, next) {
  try {
    const { read } = req.query;
    const query = {};
    if (read !== undefined) query.read = read === "true";
    const items = await Message.find(query).sort("-createdAt");
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

export async function markRead(req, res, next) {
  try {
    const item = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const item = await Message.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
