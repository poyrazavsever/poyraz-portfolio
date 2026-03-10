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

    const subject = encodeURIComponent(`Bülten Aboneliği - ${name.trim()}`);
    const body = encodeURIComponent(
      `Merhaba,\n\nHaftalık "Poyraz ile Yazılım" bültenine abone olmak istiyorum.\n\nAd Soyad: ${name.trim()}\nE-posta: ${email.trim()}`,
    );

    window.location.href = `mailto:poyrazavsever@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="grid gap-3 md:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-sm border-border p-4">
        <Typography variant="large" className="text-base">
          Haftalık Yazılım Bülteni
        </Typography>
        <Typography variant="small" className="mt-1 text-muted-foreground">
          Poyraz ile Yazılım&apos;ın e-posta versiyonu.
        </Typography>

        <div className="mt-4 space-y-3">
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Yayın Günü
            </Typography>
            <Typography variant="small">Her pazar</Typography>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Seni neler bekliyor
            </Typography>
            <Typography variant="small">Haftalık yazılım gündemi ve pratik notlar.</Typography>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground">
              Teslimat
            </Typography>
            <Typography variant="small">Doğrudan e-posta kutuna.</Typography>
          </div>
        </div>
      </Card>

      <Card className="rounded-sm border-border p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="newsletter-name">Ad Soyad</Label>
            <Input
              id="newsletter-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Adın soyadın"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newsletter-email">E-posta</Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ornek@eposta.com"
              className="rounded-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-sm" disabled={!isValid}>
              Abone Ol
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
