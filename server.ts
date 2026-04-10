import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API for scoring logic
  app.post("/api/process-scoring", (req, res) => {
    const { clients } = req.body;
    
    // Realistic Scoring Logic (Simulating Python/Pandas behavior)
    // 1. Clean data
    // 2. Apply weights
    // 3. Categorize
    
    const results = (clients || []).map((client: any) => {
      let score = 500; // Base score
      
      // Antigüedad (Simulated)
      if (client.yearsActive) score += client.yearsActive * 20;
      
      // Mora penalization
      if (client.moraDays > 90) score = 400; // Auto-fail
      else if (client.moraDays > 30) score -= 150;
      else if (client.moraDays > 0) score -= 50;
      
      // Fibex Bonus
      if (client.isFibex) score += 100;
      
      // Cap score
      score = Math.min(1000, Math.max(0, score));
      
      let level = "D";
      let status = "Rechazado";
      let amount = 0;
      
      if (score >= 900) { level = "A"; status = "Aprobado"; amount = 5000; }
      else if (score >= 700) { level = "B"; status = "Revisión"; amount = 3000; }
      else if (score >= 500) { level = "C"; status = "Revisión"; amount = 1000; }
      
      return { ...client, score, level, status, amount };
    });

    setTimeout(() => {
      res.json({
        status: "success",
        message: "Datos procesados con lógica de scoring BETINA v1.0",
        results
      });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
