1. Backend Part:
   Used Finnhub API to get the US stocks data in real time. I am using websocket to get live stock prices, it will fetch the live prices every second and save it to my MONGODB database automatically.

2. Frontend Part:
   As my database is getting updated live, so I am just making requests from frontend to get these updated values from the database every 5 seconds.

Note: You can observe real time updates when the US market is open. For now, I am only wrote code for getting 5 stocks(GOOGLE, MICROSOFT, TESLA, NVIDIA and APPLE) but didn't implement changing stock feature as I saw your email lately and did not have time to implement & submit.

How to run the application:

1. Clone or download the project from the GitHub repo: https://github.com/KhajakutubuddinMohammad/FomoFactory_Assessment
2. Open 2 terminals, one for frontend and one for backend.
3. In first terminal, do
   --> cd frontend
   --> npm i
   --> npm run dev
4. In second terminal, do
   --> cd backend
   --> npm i
   --> npx ts-node-dev src/app.ts
5. If the browser didn't start at port 3000 automatically, open localhost:3000 in browser. You can check in Inspect > Network tab, the requests from the frontend localhost:3000 made to the backend every 5 seconds to get the live stock price.
6. In second terminal, after running above commands, you can see that websocket is continuously getting the live stock prices from the API and updating the MONGODB database.

If you have any issues or questions, please let me know.
