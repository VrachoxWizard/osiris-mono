export interface WorkProject {
    slug: string;
    client: string;
    industry: { hr: string; en: string };
    year: string;
    services: string[];
    liveUrl: string;
    image: string;
    summary: { hr: string; en: string };
    challenge: { hr: string; en: string };
    solution: { hr: string; en: string };
}

export const workProjects: WorkProject[] = [
    {
        slug: "atasol",
        client: "ATASOL",
        industry: { hr: "Terapija i wellness", en: "Therapy & Wellness" },
        year: "2025",
        services: ["web"],
        liveUrl: "https://www.atasol.hr/",
        image: "/work/atasol.png",
        summary: {
            hr: "Web stranica za psihoterapeutsku praksu fokusiranu na somatski pristup i rad s traumom.",
            en: "A website for a somatic psychotherapy practice focused on body-centered trauma work.",
        },
        challenge: {
            hr: "Tema zahtijeva povjerenje i smirenost, a stranica je trebala djelovati profesionalno bez hladnoće kliničkog pristupa.",
            en: "The subject matter calls for trust and calm, and the site needed to feel professional without the coldness of a clinical approach.",
        },
        solution: {
            hr: "Mirna vizualna atmosfera, jasna navigacija prema uslugama i naručivanju termina te prostor za edukativni sadržaj.",
            en: "A calm visual atmosphere, clear navigation toward services and booking, and room for educational content.",
        },
    },
    {
        slug: "dogan-septem-interijeri",
        client: "Dogan Septem Interijeri",
        industry: { hr: "Interijeri", en: "Interior Design" },
        year: "2025",
        services: ["web"],
        liveUrl: "https://www.doganseptem-interijeri.hr/",
        image: "/work/dogan-septem-interijeri.png",
        summary: {
            hr: "Web stranica za studio specijaliziran za vrhunske adaptacije i uređenje interijera.",
            en: "A website for a studio specializing in premium interior adaptations and design.",
        },
        challenge: {
            hr: "Vizualni rad nosi cijelu priču, a stranica je trebala prezentirati projekte bez odvlačenja pažnje od samog dizajna.",
            en: "The visual work has to carry the story, and the site needed to present projects without distracting from the design itself.",
        },
        solution: {
            hr: "Minimalan, fotografijom vođen prikaz projekata s naglaskom na kvalitetu izrade.",
            en: "A minimal, photography-led presentation of projects with an emphasis on craftsmanship.",
        },
    },
    {
        slug: "anamarija-estates",
        client: "AnaMarija Estates",
        industry: { hr: "Nekretnine", en: "Real Estate" },
        year: "2025",
        services: ["web"],
        liveUrl: "https://nekretnine-web.vercel.app/",
        image: "/work/anamarija-estates.png",
        summary: {
            hr: "Web stranica za agenciju za nekretnine usmjerenu na odabrane nekretnine u Zagrebu i na Jadranu.",
            en: "A website for a real estate agency focused on selected properties in Zagreb and along the Adriatic.",
        },
        challenge: {
            hr: "Klijentela očekuje diskreciju i kvalitetu, ne agresivnu prodaju, pa je stranica trebala djelovati suzdržano i profinjeno.",
            en: "The clientele expects discretion and quality, not an aggressive sales pitch, so the site needed to feel restrained and refined.",
        },
        solution: {
            hr: "Velike fotografije nekretnina, jednostavna pretraga i naglasak na životnom stilu umjesto na cijenama.",
            en: "Large property photography, straightforward search, and an emphasis on lifestyle rather than price tags.",
        },
    },
    {
        slug: "produkt-auto",
        client: "Produkt Auto",
        industry: { hr: "Automobili", en: "Automotive" },
        year: "2025",
        services: ["web"],
        liveUrl: "https://produktauto.com/",
        image: "/work/produkt-auto.png",
        summary: {
            hr: "Web stranica za prodavaonicu rabljenih vozila s naglaskom na provjerenu kvalitetu.",
            en: "A website for a used vehicle dealership built around verified quality.",
        },
        challenge: {
            hr: "Kupci rabljenih vozila su oprezni, pa je stranica trebala odmah komunicirati transparentnost i povjerenje.",
            en: "Used car buyers are cautious, so the site needed to communicate transparency and trust immediately.",
        },
        solution: {
            hr: "Jasan prikaz ponude vozila, istaknuta inspekcija u 150 točaka i izravan kontakt putem poziva i WhatsAppa.",
            en: "A clear vehicle listing layout, a highlighted 150-point inspection, and direct contact via call and WhatsApp.",
        },
    },
    {
        slug: "dolce-torte-zagreb",
        client: "Dolce Torte Zagreb",
        industry: { hr: "Slastičarstvo", en: "Bakery & Confectionery" },
        year: "2025",
        services: ["web"],
        liveUrl: "https://dolcetorte.hr/",
        image: "/work/dolce-torte-zagreb.png",
        summary: {
            hr: "Web stranica za slastičarnicu iz Zagreba specijaliziranu za torte i kolače.",
            en: "A website for a Zagreb bakery specializing in cakes and pastries.",
        },
        challenge: {
            hr: "Proizvod se prodaje vizualno, pa je stranica trebala staviti fotografije torti u prvi plan uz jednostavan put do narudžbe.",
            en: "The product sells on looks, so the site needed to put cake photography front and center with a simple path to ordering.",
        },
        solution: {
            hr: "Galerija proizvoda, jasna kategorizacija ponude i istaknut poziv na kontakt za narudžbe.",
            en: "A product gallery, clear categorization of the offering, and a prominent contact call to action for orders.",
        },
    },
];

export function getWorkProject(slug: string) {
    return workProjects.find((project) => project.slug === slug);
}
