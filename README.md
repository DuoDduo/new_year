# Future Vision Generator

A **Next.js 13 client-side application** that allows users to generate a personalized **letter from their future self** for the year 2026 using AI. Users can **copy the letter**, **share it**, or **download it as a PDF**.

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Folder Structure](#folder-structure)
* [Contributing](#contributing)
* [License](#license)

---

## Demo

![Future Vision Generator Preview](./demo-preview.png)
*(Include a screenshot or GIF of the app in action)*

Live Demo: *(if hosted on Vercel or Netlify)*

---

## Features

* Generate a **personalized vision letter** for 2026.
* AI-powered text generation via `/api/vision-letter`.
* Copy the letter to clipboard.
* Download the letter as a **PDF**.
* Reset form to create multiple letters.
* Modern, responsive UI with **glass-effect design**.
* Dark-themed styling with gradients for visual appeal.

---

## Tech Stack

* **Next.js 13** (App Router)
* **React** (Client Components)
* **Tailwind CSS** (UI Styling)
* **JavaScript/TypeScript**
* **jsPDF** (Download letters as PDF)
* Optional: **OpenAI API** or custom backend for AI letter generation

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/future-vision-generator.git
cd future-vision-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables (if using AI API):

```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Enter your **name**.
2. Enter your **goals for 2026**.
3. Click **Generate My Future Letter**.
4. Once the letter is generated, you can:

   * Copy it to the clipboard.
   * Download it as a PDF.
   * Reset to create a new letter.

---

## Folder Structure

```
future-vision-generator/
│
├─ components/
│   ├─ VisionLetterSection.tsx
│   └─ AiSurpriseSection.tsx
│
├─ pages/ or app/
│   └─ page.tsx
│
├─ public/
│   └─ demo-preview.png
│
├─ styles/
│   └─ globals.css
│
├─ package.json
└─ README.md
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

---

## License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for details.

---

## Acknowledgements

* Inspired by futuristic productivity tools and personal growth apps.
* Built with love ❤️ using **Next.js** and **Tailwind CSS**.
