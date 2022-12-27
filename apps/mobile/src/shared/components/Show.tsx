import React from 'react';

const Null = () => null;

interface ShowProps<T> {
  when: T | undefined | null | false;
  renderElse?: () => React.ReactElement | null;
  renderItem?: () => React.ReactElement | null;
}

/**
 * Declarative show/hide, as opposed to {foo && <Bar />}
 *    <Show when={foo} renderItem={() => <Bar />}/>
 */
export function Show<T>({ when, renderElse, renderItem }: ShowProps<T>) {
  const Else = renderElse ?? (() => <Null />);
  const RenderItem = renderItem ?? (() => <Null />);
  if (!when) {
    return <Else />;
  }
  if (renderItem) {
    return <RenderItem />;
  }
  return <Null />;
}
