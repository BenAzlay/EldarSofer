# Eldar Sofer — Author Landing Page

Personal website for author **Eldar Sofer**, live at [eldarsofer.com](https://eldarsofer.com). The source code is public with the author's permission.

## Getting Started

### Prerequisites

- Node.js 18+
- A [Resend](https://resend.com/) account and API key

### Installation

```bash
git clone https://github.com/<your-username>/EldarSofer.git
cd EldarSofer
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from your Resend dashboard |
| `DESTINATION_EMAIL` | Address where contact-form emails are delivered |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## License

All written content and story PDFs are the intellectual property of Eldar Sofer. The source code is made public for reference.
