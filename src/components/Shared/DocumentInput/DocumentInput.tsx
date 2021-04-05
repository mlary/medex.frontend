import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { useTranslation } from 'react-i18next';
import { Variant } from '@material-ui/core/styles/createTypography';
import { DocumentDto } from '../../../services/DocumentService/models/DocumentDto';
import DocumentService from '../../../services/DocumentService';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    fileList: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    docItem: {
      padding: theme.spacing(1),
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    fileLink: {
      display: 'flex',
      paddingRight: theme.spacing(2),
    },
  })
);
interface IOwnProps {
  title?: string;
  documents?: DocumentDto[];
  onAdd?: (e: DocumentDto) => void;
  onDelete?: (e: number) => void;
  isList?: boolean;
  titleVariant?: Variant;
  accept?: string;
  name: string;
}

export default (props: IOwnProps) => {
  const { documents, title, onAdd, onDelete, isList, titleVariant, accept, name } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {title && <Typography variant={titleVariant || 'body1'}>{t(title)}</Typography>}
      {onAdd && (
        <label htmlFor={`doc-input-${name}`}>
          <Button color="primary" endIcon={<PublishOutlinedIcon />} component="span">
            {t('Upload document')}
          </Button>
          <input
            id={`doc-input-${name}`}
            accept={accept ?? 'image/*'}
            type="file"
            className={classes.hide}
            onChange={async (e) => {
              try {
                if (e.target.files != null && e.target.files.length > 0) {
                  const data = e.target.files[0];
                  const fData = new FormData();
                  const start = data.name.lastIndexOf('.');
                  const end = data.name.length;
                  const extension = data.name.substring(start, end);
                  const name = data.name.substr(0, start);
                  fData.append('file', data);
                  fData.append('name', name);
                  fData.append('extension', extension);
                  const document = await DocumentService.upload(fData);
                  onAdd(document);
                }
              } catch (err) {
                console.error(err);
              }
              return false;
            }}
          />
        </label>
      )}
      {!isList && documents && documents.length > 0 && (
        <Box className={classes.fileList}>
          {documents.map((doc) => (
            <Box key={doc.id} className={classes.fileLink}>
              <Button
                color="primary"
                onClick={() => {
                  DocumentService.download(doc.id, doc.name as string, doc.extension as string);
                }}
              >
                {doc.name}
              </Button>
              {onDelete && (
                <IconButton
                  color="primary"
                  onClick={() => {
                    onDelete(doc.id);
                  }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}
      {isList && documents && documents.length > 0 && (
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id} button>
              <ListItemText color="primary">
                <Link
                  color="primary"
                  component="button"
                  onClick={() => {
                    DocumentService.download(doc.id, doc.name as string, doc.extension as string);
                  }}
                >
                  {doc.name}
                </Link>
              </ListItemText>
              {onDelete && (
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      onDelete(doc.id);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
