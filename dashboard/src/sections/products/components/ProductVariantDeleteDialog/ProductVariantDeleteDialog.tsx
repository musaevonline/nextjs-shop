import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import { buttonMessages } from "@temp/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    deleteButton: {
      "&:hover": {
        backgroundColor: theme.palette.error.main
      },
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  }),
  { name: "ProductVariantDeleteDialog" }
);

export interface ProductVariantDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  onClose?();
  onConfirm?();
}

const ProductVariantDeleteDialog: React.FC<ProductVariantDeleteDialogProps> = props => {
  const { confirmButtonState, name, open, onConfirm, onClose } = props;

  const classes = useStyles(props);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <FormattedMessage id="delete_variant"
          defaultMessage="Delete Variant"
          description="dialog header"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="sure_delete_variant"
            defaultMessage="Are you sure you want to delete {name}?"
            description="delete product variant"
            values={{
              name
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage {...buttonMessages.back} />
        </Button>
        <ConfirmButton
          transitionState={confirmButtonState}
          className={classes.deleteButton}
          variant="contained"
          onClick={onConfirm}
        >
          <FormattedMessage id="delete_variant"
            defaultMessage="Delete variant"
            description="button"
          />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
ProductVariantDeleteDialog.displayName = "ProductVariantDeleteDialog";
export default ProductVariantDeleteDialog;
