"use client"

export function FirebaseConfigCheck() {
  const missingVars: string[] = []

  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) missingVars.push("NEXT_PUBLIC_FIREBASE_API_KEY")
  if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) missingVars.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN")
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) missingVars.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID")
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) missingVars.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET")
  if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
    missingVars.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID")
  if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) missingVars.push("NEXT_PUBLIC_FIREBASE_APP_ID")

  if (missingVars.length === 0) return null

  const firebaseCredentials = {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDtZnU2X9xipsUyQ2gUhrpd6IIlBEAkdIg",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "projeto-hackaton-b0f9d.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "projeto-hackaton-b0f9d",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "projeto-hackaton-b0f9d.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "881695141288",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:881695141288:web:7a25d719dbacfbaf30c19d",
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl w-full bg-card border-2 border-border rounded-2xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configuração do Firebase</h1>
            <p className="text-sm text-muted-foreground">Adicione as variáveis de ambiente para começar</p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-foreground font-medium mb-1">Como adicionar as variáveis:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>
                  Clique no botão <strong className="text-foreground">Vars</strong> na barra lateral esquerda do v0
                </li>
                <li>
                  Clique em <strong className="text-foreground">+ Add Variable</strong>
                </li>
                <li>Copie o nome e valor de cada variável abaixo</li>
                <li>
                  Cole nos campos e clique em <strong className="text-foreground">Save</strong>
                </li>
                <li>Repita para todas as {missingVars.length} variáveis</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Variáveis para adicionar ({missingVars.length})
          </h3>

          {missingVars.map((varName) => (
            <div key={varName} className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-primary">{varName}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(firebaseCredentials[varName as keyof typeof firebaseCredentials])
                  }}
                  className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
                >
                  Copiar valor
                </button>
              </div>
              <div className="bg-background rounded px-3 py-2 font-mono text-xs text-foreground border border-border break-all">
                {firebaseCredentials[varName as keyof typeof firebaseCredentials]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-accent/50 border border-accent rounded-lg">
          <svg
            className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-accent-foreground">
            Após adicionar todas as variáveis, a página será recarregada automaticamente e o app estará pronto para uso!
          </p>
        </div>
      </div>
    </div>
  )
}
