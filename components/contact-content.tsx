"use client";

import { useState } from "react";
import { Button, Card, Input, Label, Textarea, Typography } from "poyraz-ui/atoms";

export function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    const subject = encodeURIComponent(`Portfolio Contact - ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    );

    window.location.href = `mailto:poyrazavsever@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-sm border-border p-4">
        <Typography variant="large" className="text-base">
          Contact
        </Typography>
        <div className="mt-4 space-y-3">
          <div>
            <Typography variant="small" className="text-muted-foreground">
              E-mail
            </Typography>
            <a
              href="mailto:poyrazavsever@gmail.com"
              className="text-sm text-red-600 hover:underline"
            >
              poyrazavsever@gmail.com
            </a>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Response
            </Typography>
            <Typography variant="small">Usually within 24 hours.</Typography>
          </div>
        </div>
      </Card>

      <Card className="rounded-sm border-border p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your message..."
              className="min-h-28 rounded-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-sm" disabled={!isValid}>
              Send
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
