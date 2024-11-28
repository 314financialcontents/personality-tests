# Personal Test Application

A bilingual (English/Spanish) personality assessment questionnaire built with React and Material-UI.

## Features

- 28 question personality assessment
- Bilingual support (English/Spanish)
- User authentication via keys
- Real-time form validation
- Responsive Material-UI design
- i18n internationalization

## Technologies

- React 18
- Material-UI v6
- i18next
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone [repository-url]
```
2. Install dependencies:
```sh
npm install
```
3. Start development server
```sh
npm run dev
```

## Building for Production
```sh
npm run build
```

## Environment Setup

### Local Development
1. Create `.env` file in root directory:
```sh
VITE_API_ENDPOINT=your_api_endpoint_here
```
2. Add .env to .gitignore:
```sh
.env
.env.local
```

### GitHub Deployment
1. Create GitHub Actions workflow:
```sh
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```
2. Set repository secrets:
I'll add a section about environment setup to the README.

```markdown
## Environment Setup

### Local Development
1. Create `.env` file in root directory:
```sh
VITE_API_ENDPOINT=your_api_endpoint_here
```

2. Create `.env.example` for documentation:
```sh
VITE_API_ENDPOINT=your_api_endpoint_here
```

3. Add `.env` to `.gitignore`:
```
.env
.env.local
```

### GitHub Deployment
1. Create GitHub Actions workflow:
```sh
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```

2. Set repository secrets:
- Go to repository Settings > Secrets and Variables > Actions
- Add New Repository Secret:
  - Name: `VITE_API_ENDPOINT`
  - Value: Your API endpoint URL

3. Configure GitHub Pages:
- Go to repository Settings > Pages
- Set source to "GitHub Actions"

The environment variable will be automatically injected during build process via GitHub Actions.

