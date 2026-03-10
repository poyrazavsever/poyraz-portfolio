"use client";

import { useState } from "react";
import { Button, Card, Input, Label, Typography } from "poyraz-ui/atoms";

export function NewsletterContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValid = name.trim() && email.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    const subject = encodeURIComponent(`Newsletter Subscription - ${name.trim()}`);
    const body = encodeURIComponent(
      `Hello,\n\nI want to subscribe to the weekly "Poyraz ile Yazilim" newsletter.\n\nName: ${name.trim()}\nEmail: ${email.trim()}`,
    );

    window.location.href = `mailto:poyrazavsever@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-sm border-border p-4">
        <Typography variant="large" className="text-base">
          Weekly Software Newsletter
        </Typography>
        <Typography variant="small" className="mt-1 text-muted-foreground">
          Mail version of Poyraz ile Yazilim.
        </Typography>

        <div className="mt-4 space-y-3">
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Schedule
            </Typography>
            <Typography variant="small">Every Sunday</Typography>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground">
              What you get
            </Typography>
            <Typography variant="small">Weekly software agenda and practical notes.</Typography>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Delivery
            </Typography>
            <Typography variant="small">Directly to your inbox.</Typography>
          </div>
        </div>
      </Card>

      <Card className="rounded-sm border-border p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="newsletter-name">Name</Label>
            <Input
              id="newsletter-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="rounded-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-sm" disabled={!isValid}>
              Subscribe
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
