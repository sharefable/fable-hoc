import React, { useRef, useState, useEffect, useCallback } from 'react';
import FableEmbed from './FableEmbed';
import parse from 'html-react-parser';
import markdown from '@wcj/markdown-to-html';
import { navAnn } from './utils';
import type { IFableData } from './types';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data: IFableData
}

/**
 * @param data 
 * @returns JSX Component
 */
const Fable = ({ data, ...rest }: IProps) => {
  const [isAnnLoaded, setIsAnnLoaded] = useState<boolean>(false);
  const [annIndex, setAnnIndex] = useState<string>('1');
  const mdConRef = useRef<HTMLDivElement>(null);
  const fableRef = useRef<HTMLIFrameElement>(null);
  const [currContent, setCurrContent] = useState<string>(data?.content[0]?.md as string);

  useEffect(() => {
    const mdConRefCurrent = mdConRef.current;

    if (mdConRefCurrent) {
      const elements = Array.from(mdConRefCurrent.getElementsByTagName('a')).filter((a: HTMLAnchorElement | Element) => {
        const href = (a as HTMLAnchorElement).getAttribute('href');
        return href && href.startsWith('###');
      });

      elements.forEach((el: HTMLAnchorElement) => {
        el.setAttribute('data-f-href', el.getAttribute('href') as string);
        const dir = el.getAttribute('data-f-href')?.replaceAll('#', '');
        el.setAttribute('class', `fable-navigation-links ${dir === 'next' ? 'fable-navigate-next' : 'fable-navigate-prev'}`);
        el.href = '#';
        el.addEventListener('click', () => {
          if (dir === 'next') navAnn('next', fableRef);
          if (dir === 'prev') navAnn('prev', fableRef);
        });
      });
    }

  }, [currContent, isAnnLoaded]);

  useEffect(() => {
    const content = data.content.filter((el) => el.index === Number(annIndex));
    if (content.length) setCurrContent(content[0].md as string);
  }, [annIndex, data.content]);

  const cachedOnLoadedFn = useCallback(() => {
    setIsAnnLoaded(true);
  }, []);
  const cachedOnAnnotationChange = useCallback((index: string) => {
    setAnnIndex(index);
  }, []);

  return (
    <div {...rest}>
      <div className="fable-text" ref={mdConRef}>
        {!isAnnLoaded ?
          parse(markdown(data.loadingContent.md) as string) :
          parse(markdown(currContent) as string)
        }
      </div>
      <FableEmbed
        demoRid={data.demoRid}
        innerRef={fableRef}
        onLoaded={cachedOnLoadedFn}
        onAnnotationChange={cachedOnAnnotationChange}
      />
    </div>
  );
};

export default Fable;
