import WebSocket, { RawData } from "ws";
const StockData = require("../models/StockData");

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; // Replace with your Finnhub API key

let stockSymbols: string[] = ["AAPL", "GOOG", "MSFT", "NVDA", "TSLA"];
let ws: WebSocket;

interface TradeData {
  s: string; // Symbol
  p: number; // Price
  t: number; // Timestamp
}

interface TradeMessage {
  type: "trade";
  data: TradeData[];
}

interface PingMessage {
  type: "ping";
}

// Promise to handle WebSocket readiness
let wsReadyPromise: Promise<void>;

export const initializeWebSocket = () => {
  ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

  wsReadyPromise = new Promise((resolve, reject) => {
    ws.on("open", () => {
      console.log("Connected to Finnhub WebSocket API");

      // Subscribe to initial stock symbols
      stockSymbols.forEach((symbol) => {
        ws.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
      });

      // Polling: Send a ping message to the server every 3 seconds to keep the connection alive
      setInterval(() => {
        ws.send(JSON.stringify({ type: "ping" } as PingMessage));
      }, 3000);

      resolve();
    });

    ws.on("message", async (data: RawData) => {
      const message: TradeMessage = JSON.parse(data.toString());

      console.log("Received a message ", message);
      if (message.type === "trade") {
        message.data.forEach(async (trade: TradeData) => {
          console.log(
            `Symbol: ${trade.s}, Price: ${trade.p}, Time: ${new Date(
              trade.t
            ).toLocaleTimeString()}`
          );
          try {
            const stock = new StockData({
              symbol: trade.s,
              price: trade.p,
              timestamp: trade.t,
            });
            await stock.save();
            console.log("Saved trade data to MongoDB");
          } catch (error) {
            console.error("Error saving trade data:", (error as Error).message);
          }
        });
      }
    });

    ws.on("close", () => {
      console.log("Disconnected from Finnhub WebSocket API");
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error: ${error.message}`);
      reject(error);
    });
  });
};

export const addStock = async (symbol: string) => {
  await wsReadyPromise;
  if (!stockSymbols.includes(symbol)) {
    stockSymbols.push(symbol);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "subscribe", symbol: `NASDAQ:${symbol}` })
      );
      console.log(`Subscribed to ${symbol}`);
    }
  }
};

export const removeStock = async (symbol: string) => {
  await wsReadyPromise;
  if (stockSymbols.includes(symbol)) {
    stockSymbols = stockSymbols.filter((s) => s !== symbol);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ type: "unsubscribe", symbol: `NASDAQ:${symbol}` })
      );
      console.log(`Unsubscribed from ${symbol}`);
    }
  }
};
