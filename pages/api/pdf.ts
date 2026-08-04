import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  const { invoiceData, brandData, printOptions } = req.body;

  if (!invoiceData) {
    return res.status(400).json({
      message: "invoiceData is required",
    });
  }

  const data = encodeURIComponent(
    JSON.stringify({
      invoiceData,
      brandData,
      printOptions,
    }),
  );

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/print?data=${data}`;

  try {
    const response = await fetch(
      `https://production-sfo.browserless.io/pdf?token=${process.env.BROWSERLESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          options: {
            printBackground: true,
            preferCSSPageSize: true,
          },
          gotoOptions: {
            waitUntil: "networkidle0",
            timeout: 30000,
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();

      console.error(error);

      return res.status(response.status).json({
        status: response.status,
        error,
      });
    }

    const pdf = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=Invoice-${invoiceData.invoiceNo}.pdf`,
    );

    return res.send(pdf);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
