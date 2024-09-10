import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 12,
  },
});

export default function MyThemeProvider(props) {
  return <ThemeProvider theme={theme} {...props} />;
}