import React, { useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import { LanguageCodes } from '../../constants/languageCodes';
import uz from '../../assets/images/uz.png';
import us from '../../assets/images/us.png';
import ru from '../../assets/images/ru.png';
import { useStore } from 'effector-react';
import { $language, changeLanguage } from './Language.effects';
import { EnumToArray } from '../../utils/EnumHelper';

const useStyles = makeStyles({
  flag: {
    marginRight: 16,
  },
});
const getLanguageFlag = (lang: LanguageCodes) => {
  switch (lang) {
    case LanguageCodes.EN:
      return us;
    case LanguageCodes.RU:
      return ru;
    default:
      return uz;
  }
};
const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const language = useStore($language);
  const languages = useMemo(() => EnumToArray(LanguageCodes), []);
  const classes = useStyles();
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (lang: LanguageCodes) => {
    setAnchorEl(null);
    changeLanguage(lang);
  };
  return (
    <>
      <Button aria-controls="lang-menu" aria-haspopup="true" onClick={handleOpen}>
        <img src={getLanguageFlag(language as LanguageCodes)} className={classes.flag} alt="loading..." />
        {language}
      </Button>
      <Menu id="lang-menu" keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((item) => (
          <MenuItem
            key={`lang-${item.key}`}
            onClick={() => {
              handleSelect(item.value as LanguageCodes);
            }}
          >
            <img src={getLanguageFlag(item.value as LanguageCodes)} className={classes.flag} alt="loading..." />
            {item.value as LanguageCodes}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default LanguageMenu;
