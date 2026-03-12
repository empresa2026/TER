import React from 'react';
import { XCircle } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: string | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  render() {
    if (this.state.hasError) {
      let displayMessage = "Ocorreu um erro inesperado.";
      try {
        const parsed = JSON.parse(this.state.errorInfo || "");
        if (parsed.error && parsed.error.includes("insufficient permissions")) {
          displayMessage = "Você não tem permissão para realizar esta ação ou acessar estes dados.";
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center bg-luxury-black">
          <Card className="max-w-md border-red-500/30">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-serif mb-4">Ops! Algo deu errado</h2>
            <p className="text-white/60 mb-8">{displayMessage}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Recarregar Página
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
