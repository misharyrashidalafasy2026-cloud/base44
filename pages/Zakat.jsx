import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Info, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS = [
  { key: "cash", label: "Cash & Bank Balances" },
  { key: "gold", label: "Gold (value in USD)" },
  { key: "silver", label: "Silver (value in USD)" },
  { key: "investments", label: "Investments" },
  { key: "business", label: "Business Assets" },
  { key: "receivables", label: "Receivables" },
  { key: "liabilities", label: "Eligible Liabilities" },
];

export default function Zakat() {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const total = FIELDS.reduce((sum, f) => sum + (parseFloat(values[f.key]) || 0), 0);
  const net = Math.max(total - (parseFloat(values.liabilities) || 0), 0);

  const calculate = () => {
    setResult(net * 0.025);
  };

  return (
    <>
      <PageHero
        eyebrow="Zakat"
        title="Give Your Zakat With Confidence."
        subtitle="Fulfill your obligatory charity through dedicated, accountable pathways — with clear policies on how your Zakat is handled and where it goes."
        arabic="زكاة"
      />

      {/* What is Zakat */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-2xl font-semibold">What Is Zakat?</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Zakat is the obligatory annual charity in Islam — a fixed portion (2.5%) of qualifying wealth
                given to eligible recipients, purifying one's wealth and supporting those in need.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-2xl font-semibold">Who Is Eligible?</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Zakat is distributed to the eight categories described in the Qur'an (9:60) — including the poor,
                the needy, those in debt, and those striving in difficult circumstances — through verified pathways.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-2xl font-semibold">How We Handle It</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Zakat is kept separate, distributed according to its rules, and reported transparently. We do not
                mix Zakat with general funds or use it for operational expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Zakat Calculator" title="Estimate Your Zakat" />
          <div className="mt-12 rounded-2xl border border-border bg-card p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <Label htmlFor={f.key} className="text-sm font-medium">{f.label}</Label>
                  <Input
                    id={f.key}
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={values[f.key] || ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="mt-1.5"
                  />
                </div>
              ))}
            </div>
            <Button onClick={calculate} className="mt-6 w-full bg-primary text-primary-foreground hover:bg-forest">
              <Calculator className="mr-2 h-4 w-4" /> Calculate Zakat (2.5%)
            </Button>
            {result !== null && (
              <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
                <div className="text-sm font-medium text-muted-foreground">Estimated Zakat Due</div>
                <div className="mt-1 font-heading text-4xl font-semibold text-primary">
                  ${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Based on net qualifying assets of ${net.toLocaleString()}</div>
              </div>
            )}
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-300/40 bg-amber-50/60 p-4 text-xs text-amber-900/80">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p>
                This calculator provides educational guidance only and does not replace personalized religious
                advice from a qualified scholar. Where jurisprudential differences exist, consult a scholar you trust.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Give Your Zakat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Policy */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Zakat Policy & Reporting" title="Accountability You Can Trust" />
          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p><strong className="text-foreground">Separation of funds.</strong> Zakat is held and distributed separately from general donations, in accordance with its religious rules.</p>
            <p><strong className="text-foreground">Eligible recipients only.</strong> Distribution follows the eight categories defined in the Qur'an, verified through documented processes.</p>
            <p><strong className="text-foreground">Reporting.</strong> Zakat collection and distribution figures are published in our transparency reports as verified data becomes available.</p>
            <p><strong className="text-foreground">No operational use.</strong> Zakat is not used for administration, technology, or overhead — only for eligible beneficiaries.</p>
          </div>
        </div>
      </section>
    </>
  );
}