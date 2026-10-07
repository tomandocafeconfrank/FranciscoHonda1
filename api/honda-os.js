const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyqWE9TWG2pPGHZBcTvZ6TTtBIrSvXHv2PZ7KuYj-ZRUTT5KoYjRF38dODwnLVvu2Gt/exec";

const ALLOWED_SHEETS = [
  "MODELOS",
  "VERSIONES",
  "ESPECIFICACIONES",
  "RENDIMIENTO",
  "CAPACIDADES",
  "EQUIPAMIENTO",
  "NOMENCLATURAS"
];

module.exports = async function handler(req, res) {
  try {
    const sheet = req.query.sheet || "MODELOS";

    if (!ALLOWED_SHEETS.includes(sheet)) {
      return res.status(400).json({
        ok: false,
        error: "Hoja no disponible"
      });
    }

    const url = `${APP_SCRIPT_URL}?sheet=${encodeURIComponent(sheet)}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "No se pudo consultar Honda OS"
    });
  }
};
