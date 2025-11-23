# Mood Journal

Mood Journal is a simple Node/Express/Mongo app for logging daily mood entries.

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `SESSION_SECRET`.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`
4. Open http://localhost:3000

## Deployment
- Use MongoDB Atlas for production DB.
- Deploy to Heroku / Azure / DigitalOcean; set environment variables accordingly.
- Ensure `.env` contains MONGO_URI and SESSION_SECRET.

## Notes
- This project uses express-session with connect-mongo for sessions.
- All code includes comments for Assignment 3 requirements.
