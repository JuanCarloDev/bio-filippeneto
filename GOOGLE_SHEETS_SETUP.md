# Configuração Google Sheets - Mentoria A Voz Que Vende

## 🎯 Método Mais Simples (Recomendado)

### 1. Criar Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Renomeie para "Mentoria A Voz Que Vende - Inscrições"
4. Adicione os cabeçalhos na primeira linha:
   - **A1**: Nome
   - **B1**: WhatsApp
   - **C1**: Instagram
   - **D1**: Data/Hora
   - **E1**: Fonte

### 2. Pegar o ID da Planilha

1. Na URL da planilha, copie o ID:
   ```
   https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit
                                        ↑ Copie esta parte ↑
   ```

### 3. Criar Service Account (Google Cloud Console)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs e Serviços > Credenciais**
4. Clique em **Criar Credenciais > Conta de Serviço**
5. Dê um nome e clique em **Criar**
6. Pule as permissões opcionais e clique em **Concluído**
7. Na lista, clique na conta criada
8. Vá na aba **Chaves** > **Adicionar Chave** > **Criar Nova Chave**
9. Escolha **JSON** e baixe o arquivo

### 4. Configurar Variáveis de Ambiente

No arquivo `.env.local`, adicione:

```bash
GOOGLE_SHEETS_ID=SEU_ID_DA_PLANILHA_AQUI
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=email-da-conta-de-servico@projeto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
```

### 5. Compartilhar a Planilha

1. Na planilha, clique em **Compartilhar**
2. Adicione o email da conta de serviço
3. Dê permissão de **Editor**

### 6. Método Alternativo com Google Forms

**Opção A - Google Form Integration:**

1. **Criar Form**:

   - Vá em [Google Forms](https://forms.google.com)
   - Novo formulário com campos:
     - Nome (Texto curto)
     - WhatsApp (Texto curto)
     - Instagram (Texto curto)

2. **Conectar à Planilha**:

   - No Form: Menu 3 pontos > "Selecionar destino de resposta"
   - Criar nova planilha ou usar existente

3. **Pegar URL de Envio**:

   - No Form: "Enviar" > Link > Copiar URL
   - Exemplo: `https://docs.google.com/forms/d/e/ABC.../formResponse`

4. **Configurar no .env.local**:
   ```bash
   GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/SEU_FORM_ID/formResponse
   ```

## 🚀 Resultado Final

✅ **Com Google Sheets ID**: Dados vão direto para planilha  
✅ **Com Google Forms**: Mais confiável e sem Apps Script  
✅ **Automático**: Data/hora preenchida automaticamente  
✅ **Simples**: Só configurar uma variável de ambiente

## 📝 Campos Salvos

- Nome completo
- WhatsApp para contato
- Instagram (@usuario)
- Data/hora da inscrição
- Fonte: "Mentoria A Voz Que Vende"
