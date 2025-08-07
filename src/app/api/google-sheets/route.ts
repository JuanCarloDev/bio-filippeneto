import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, whatsapp, instagram } = body;

    // Validação básica
    if (!nome || !whatsapp || !instagram) {
      return NextResponse.json(
        { error: "Nome, WhatsApp e Instagram são obrigatórios" },
        { status: 400 }
      );
    }

    // Configuração das credenciais do Google Sheets
    const GOOGLE_SERVICE_ACCOUNT_EMAIL =
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
    const GOOGLE_PRIVATE_KEY =
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEETS_ID;

    console.log("Verificando configurações:", {
      hasEmail: !!GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!GOOGLE_PRIVATE_KEY,
      hasSheetId: !!GOOGLE_SHEET_ID,
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      sheetId: GOOGLE_SHEET_ID,
    });

    if (
      !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !GOOGLE_PRIVATE_KEY ||
      !GOOGLE_SHEET_ID
    ) {
      console.error("Variáveis de ambiente do Google Sheets não configuradas");
      return NextResponse.json(
        { error: "Configuração do Google Sheets não encontrada" },
        { status: 500 }
      );
    }

    // Autenticação JWT
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Conectar à planilha
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Selecionar a primeira aba ou criar se não existir
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: "Mentoria A Voz Que Vende",
        headerValues: ["Data/Hora", "Nome", "WhatsApp", "Instagram", "Fonte"],
      });
    }

    // Verificar se os cabeçalhos existem, se não, adicioná-los
    await sheet.loadHeaderRow();
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow([
        "Data/Hora",
        "Nome",
        "WhatsApp",
        "Instagram",
        "Fonte",
      ]);
    }

    // Adicionar nova linha com os dados
    const newRow = await sheet.addRow({
      "Data/Hora": new Date().toLocaleString("pt-BR"),
      Nome: nome,
      WhatsApp: whatsapp,
      Instagram: instagram,
      Fonte: "Mentoria A Voz Que Vende",
    });

    console.log("Inscrição adicionada ao Google Sheets:", {
      row: newRow.rowNumber,
      nome: nome,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inscrição enviada com sucesso!",
      rowNumber: newRow.rowNumber,
    });
  } catch (error) {
    console.error("Erro ao salvar no Google Sheets:", error);
    console.error("Stack:", error instanceof Error ? error.stack : error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
