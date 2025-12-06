I asked ChatGPT how to improve language output cause gemini live flash has a tendecy to respont some words in English even if Germen was detected.

Below is what CharGPT suggests, would you agree? (Don't start to implementing yet)

- I added new versions of context.md (as a replacement):
  - context_en.md is pure English
  - context_de.md is pure German


What CharGPT suggests:

Flow Diagram (simple):

```
Audio → Gemini ↓
response.audio_transcription.delta
  contains { transcript, language }
↓
onLanguageDetected(language)
↓
switch context (DE / EN)
↓
send update: { update: { systemInstruction: ... } }
↓
Gemini continues with correct language + correct context
```

Explaination:

- Gemini Live gives you the language in every transcription event, so detection is trivial
- Gemini Live supports dynamic system-instruction updates
- By switching context immediately after detecting language, you prevent mixed-language leakage early.
- You avoid restarting the WebSocket connection

Code changes:

```
handleWebSocketMessage(data)
{
  try {
    const message = JSON.parse(data);
    console.log('Received WebSocket message:', message);

    // Detect language from transcription
    if( message.type === "response.audio_transcription.delta" && message.language )
      this.onLanguageDetected(message.language);

    // ...

onLanguageDetected(language)
{
  const lang = language.startsWith('de') ? 'de'
             : language.startsWith('en') ? 'en'
             : 'en';

  if (this.currentLanguage === lang)
    return;

  console.log("Detected user language:", lang);

  this.currentLanguage = lang;

  // Load correct context
  this.context = lang === 'de'
    ? VOICE_AGENT_CONFIG.contextDE
    : VOICE_AGENT_CONFIG.contextEN;

  // Rebuild system instruction
  const systemInstruction =
    VOICE_AGENT_CONFIG.systemInstructionTemplate.replace(
      '{context}',
      this.context
    );

  const updateMessage = {
    update: {
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    }
  };

  console.log("Updating system instruction for language:", lang);
  this.ws.send(JSON.stringify(updateMessage));
}
```
