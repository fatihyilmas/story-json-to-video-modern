
import express from "express";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

// Placeholder render endpoint (no heavy work yet)
app.post("/render", async (req, res) => {
  res.json({ status: "received", meta: req.body?.meta ?? null });
});

const port = Number(process.env.PORT ?? 10000);
app.listen(port, () => {
  console.log("server listening on", port);
});
