'use client';

import { useTheme } from 'next-themes';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import { FC, useEffect, useState } from 'react';

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animate?: boolean;
}

const Code: FC<CodeProps> = ({
  code,
  show,
  animate,
  animationDelay,
  language,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animate ? '' : code);

  useEffect(() => {
    if (show && animate) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animate, animationDelay]);

  // number of lines
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });
            return (
              <div key={`line-${i}`} style={{ position: 'relative' }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, key: i });
                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
