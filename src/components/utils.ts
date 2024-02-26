export const navAnn = (
  dir: 'prev' | 'next',
  fableRef: React.RefObject<HTMLIFrameElement>
) => {
  const win = fableRef.current;
  if (win) {
    win.contentWindow?.postMessage(
      {
        type: 'navigate-to-annotation',
        sender: 'sharefable.com',
        payload: {
          action: dir
        }
      },
      '*'
    );
  }
};

export const goToFirstAnnOfModule = (
  screenId: number,
  refId: string,
  fableRef: React.RefObject<HTMLIFrameElement>
) => {
  const win = fableRef.current;
  if (win) {
    win.contentWindow?.postMessage(
      {
        type: 'navigate-to-annotation',
        sender: 'sharefable.com',
        payload: {
          main: `${screenId}/${refId}`
        }
      },
      '*'
    );
  }
};
