import { ContentCopy, ContentPasteGo, FormatClear } from '@mui/icons-material';
import {
  AppBar,
  Container,
  IconButton,
  IconButtonProps,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import { PropsWithChildren, useState } from 'react';
import AceEditor from 'react-ace';
import { unmar } from './util';

const FullFrame = styled(Container)({
  width: '100%',
  height: '100%',
  margin: '0 !important',
  padding: '0 !important',
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
  const [jsonString, setJsonString] = useState('');

  const setunMarred = (value: string) => setJsonString(unmar(value));

  const handleClear = () => setJsonString('');
  const handleCopy = () =>
    jsonString && navigator.clipboard.writeText(jsonString);
  const handlePaste = () => navigator.clipboard.readText().then(setunMarred);

  return (
    <FullFrame>
      <AppBar position="static">
        <Toolbar>
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
      <AceEditor
        mode="json"
        theme={prefersDarkMode ? 'twilight' : 'github'}
        onChange={setunMarred}
        style={{ width: 'auto' }}
        value={jsonString}
        editorProps={{ $blockScrolling: true }}
      />
    </FullFrame>
  );
}
