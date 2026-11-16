import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7EE] text-[#122630] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#FFFDF9] border border-[#E2D7BB] rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <h1 className="text-lg font-bold text-[#8E3742]">
              Algo salió mal… Recarga la página
            </h1>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-[#8E3742] hover:bg-[#742B34] text-[#FAF7EE] text-sm font-semibold transition-colors cursor-pointer"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
