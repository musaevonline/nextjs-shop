import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {buttonMessages, formMessages} from "@temp/intl";
import { EditorState, EntityInstance, RichUtils } from "draft-js";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

interface LinkSourceProps {
  editorState: EditorState;
  entity?: EntityInstance;
  entityType: {
    type: string;
  };
  onComplete: (updateState: EditorState) => void;
  onClose: () => void;
}

const LinkSource: React.FC<LinkSourceProps> = ({
                                                 editorState,
                                                 entity,
                                                 entityType,
                                                 onComplete,
                                                 onClose
                                               }) => {
  const intl = useIntl();
  const initial = entity ? entity.getData().url : "";

  const handleSubmit = (url: string) => {
    if (url) {
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity(
          entityType.type,
          "MUTABLE",
          { url }
      );
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentWithEntity
      });
      const nextState = RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
      );

      onComplete(nextState);
    } else {
      onComplete(editorState);
    }
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {url: initial},
    onSubmit: values => {
      handleSubmit(values.url)
    }
  })

  return (
      <Dialog onClose={onClose} open={true} fullWidth maxWidth="sm">
        <form onSubmit={form.handleSubmit}>
          <DialogTitle>
            <FormattedMessage {...buttonMessages.addOrEditLink}
                              description="button"
            />
          </DialogTitle>
          <DialogContent>
            <TextField
                name="url"
                fullWidth
                label={intl.formatMessage(formMessages.urlLinked)}
                value={form.values.url}
                onChange={form.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>
              <FormattedMessage {...buttonMessages.cancel} />
            </Button>
            <Button type="submit" color="primary" variant="contained">
              <FormattedMessage {...buttonMessages.save} />
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
};

export default LinkSource;
