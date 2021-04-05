import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides: {
    ...overrides,
    MuiList: {
      root: {
        overflowY: 'hidden'
      }
    }
  },
  zIndex: {
    appBar: 1000,
    drawer: 1100,
  },
});

export default theme;
