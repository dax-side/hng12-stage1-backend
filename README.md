```
# Number Classification API 🔢

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://hng12-stage1-backend.vercel.app)  
[![GitHub License](https://img.shields.io/github/license/yourusername/hng12-stage1-backend)](LICENSE)

An API that classifies numbers into mathematical categories (prime, perfect, Armstrong) and provides interesting facts from [NumbersAPI](http://numbersapi.com).

## API Endpoint 🌐
```
GET /api/classify-number?number={integer}
```

## Features ✨
- Prime number verification
- Perfect number detection
- Armstrong/narcissistic number identification
- Digit sum calculation
- Even/odd classification
- Math-related fun facts

## Tech Stack 💻
- **Backend**: Node.js + Express
- **HTTP Client**: Axios
- **Middleware**: CORS
- **Deployment**: Vercel
- **Testing**: Manual testing with curl/Postman

## Installation 🛠️
```bash
# Clone repository
git clone https://github.com/yourusername/hng12-stage1-backend.git

# Install dependencies
npm install

# Start development server
npm start
```

## Usage Examples 📖
### Basic Request
```bash
curl "https://hng12-stage1-backend.vercel.app/api/classify-number?number=371"
```

### Sample Response (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}
```

### Error Response (400 Bad Request)
```bash
curl "https://hng12-stage1-backend.vercel.app/api/classify-number?number=abc"
```
```json
{
  "number": "abc",
  "error": true
}
```

## Test Cases 🧪
| Number | Command | What to Verify |
|--------|---------|----------------|
| **6** | `curl ...?number=6` | `"is_perfect": true` |
| **-153** | `curl ...?number=-153` | `"properties": ["armstrong", "odd"]` |
| **0** | `curl ...?number=0` | `"properties": ["even"]` |
| **8128** | `curl ...?number=8128` | `"is_perfect": true` |

## Deployment 🚀
1. Create a Vercel account
2. Connect your GitHub repository
3. Configure settings:
   ```yaml
   Build Command:    (leave empty)
   Install Command:  npm install
   Output Directory: (leave empty)
   ```
4. Deploy! Vercel will auto-deploy on Git pushes

## License 📄
MIT License - see [LICENSE](LICENSE) for details.

```

---

### Key Sections Included:
1. **Badges**: Deployment status + license
2. **Clear Endpoint Documentation**
3. **Installation Instructions**
4. **Curl Examples** with sample responses
5. **Critical Test Cases**
6. **Vercel Deployment Guide**
7. **Technology Stack** overview

This README provides everything users need to understand, test, and deploy your API. Customize the GitHub links and add screenshots if needed! 🚀
