import type { KeyboardEvent, MouseEvent } from 'react';

import { useRouter } from 'next/router';

export default function usePost(id: number) {
  const { push } = useRouter();

  const handleGoToPostPage = () => {
    push(`/post/${id}`);
  };

  const handleKeyboardGoToPostPage = (event: KeyboardEvent) => {
    const keyCode = event.code;
    if (['Space', 'Enter'].includes(keyCode)) {
      handleGoToPostPage();
    }
  };

  const handleCardContentClick = (event: MouseEvent, callback?: () => void) => {
    event.stopPropagation();
    callback?.();
  };

  const handleCardContentKeyboardPress = (event: KeyboardEvent) => {
    event.stopPropagation();
  };

  return {
    handleGoToPostPage,
    handleKeyboardGoToPostPage,
    handleCardContentClick,
    handleCardContentKeyboardPress,
  };
}
