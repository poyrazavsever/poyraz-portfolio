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

    const subject = encodeURIComponent(`Portfolyo İletişim - ${name.trim()}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${name.trim()}\nE-posta: ${email.trim()}\n\nMesaj:\n${message.trim()}`,
    );

    window.location.href = `mailto:poyrazavsever@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-sm border-border p-4">
        <Typography variant="large" className="text-base">
          İletişim
        </Typography>
        <div className="mt-4 space-y-3">
          <div>
            <Typography variant="small" className="text-muted-foreground">
              E-posta
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
              Dönüş Süresi
            </Typography>
            <Typography variant="small">Genelde 24 saat içinde.</Typography>
          </div>
        </div>
      </Card>

      <Card className="rounded-sm border-border p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">Ad Soyad</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Adın soyadın"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email">E-posta</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ornek@eposta.com"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Mesaj</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Mesajını yaz..."
              className="min-h-28 rounded-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-sm" disabled={!isValid}>
              Gönder
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
