import { ContentCopy, ContentPasteGo, FormatClear } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  IconButtonProps,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { useResizeDetector } from 'react-resize-detector';
import { unmar } from './util';

type ToolbarMixin = { toolbar: { minHeight: number } };

const FullFrame = styled('div')({
  margin: '0 !important',
  padding: '0 !important',
  resize: 'both',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const Button = styled(
  ({
    children,
    title,
    ...props
  }: PropsWithChildren<IconButtonProps & { title: string }>) => {
    return (
      <Tooltip title={title}>
        <IconButton {...props} size="large" edge="start" aria-label={title}>
          {children}
        </IconButton>
      </Tooltip>
    );
  }
)({
  marginRight: 2,
  color: 'inherit',
});

export default function Form() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const editorRef = useRef<AceEditor>(null);
  const theme = useTheme();

  const { width, height, ref } = useResizeDetector({
    handleWidth: true,
    handleHeight: true,
  });
  const [jsonString, setJsonString] = useState(
    localStorage.getItem('jsonString') ?? ''
  );
  useEffect(() => localStorage.setItem('jsonString', jsonString), [jsonString]);
  useEffect(() => {
    editorRef.current && editorRef.current.editor.resize();
  }, [width, height]);

  const setunMarred = (value: string) => setJsonString(unmar(value));
  const handleClear = () => setJsonString('');
  const handlePaste = () => navigator.clipboard.readText().then(setunMarred);
  const handleCopy = () =>
    jsonString && navigator.clipboard.writeText(jsonString);

  return (
    <FullFrame ref={ref}>
      <AppBar position="fixed" color="default" variant="outlined">
        <Toolbar variant="dense">
          <Button onClick={handleClear} disabled={!jsonString} title="Clear">
            <FormatClear />
          </Button>
          <Button onClick={handleCopy} disabled={!jsonString} title="Copy">
            <ContentCopy />
          </Button>
          <Button onClick={handlePaste} title="Paste">
            <ContentPasteGo />
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <AceEditor
        ref={editorRef}
        mode="json"
        theme={prefersDarkMode ? 'twilight' : 'github'}
        onChange={setunMarred}
        value={jsonString}
        editorProps={{ $blockScrolling: true }}
        style={{
          ...(height && (theme.mixins as ToolbarMixin).toolbar.minHeight
            ? {
                height:
                  height - (theme.mixins as ToolbarMixin).toolbar.minHeight + 8,
              }
            : {}),
          width,
        }}
      />
    </FullFrame>
  );
}
