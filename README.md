# @sequential/input-sanitization

Input sanitization and rate limiting middleware for protecting against XSS, injection, and abuse.

## Installation

```bash
npm install @sequential/input-sanitization
```

## Usage

```javascript
import {{ middleware }} from '@sequential/input-sanitization';
import express from 'express';

const app = express();
app.use(middleware());
```

## Configuration

```javascript
const config = {{
  // options
}};
app.use(middleware(config));
```

## API

### middleware(config)

Express middleware factory.

**Parameters:**
- `config` (object) - Configuration options

**Returns:** Express middleware function

## Express Integration

Works with Express.js and compatible frameworks:

```javascript
app.use(middleware(config));

app.get('/api/endpoint', (req, res, next) => {{
  // Middleware available in req
}});
```

## Related Packages

- [@sequential/server-utilities](../server-utilities) - Server utilities
- [@sequential/response-formatting](../response-formatting) - Response formatting

## License

MIT
