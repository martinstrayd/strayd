export default async function handler(req, res) {
  try {
    res.status(200).json({ message: "Serverless function is alive" });
  } catch (error) {
    res.status(500).json({ error: "Function crashed", details: error.message });
  }
}
 
