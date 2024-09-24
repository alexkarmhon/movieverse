import { Component, PropsWithChildren } from 'react';

export default class ErrorBoundary extends Component<
  PropsWithChildren<unknown>
> {
  state: { hasError: boolean };

  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error): void {
    alert(error);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Ой, лишенько! Страшне!</h2>;
    }
    return this.props.children;
  }
}
