import { Button, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableCellHeader from "@temp/components/TableCellHeader";
import TableHead from "@temp/components/TableHead";
import {
  getUserInitials,
  getUserName,
  renderCollection,
  stopPropagation
} from "@temp/misc";
import { sortMembers } from "@temp/sections/permissionGroups/sort";
import { PermissionGroupDetails_permissionGroup_users } from "@temp/sections/permissionGroups/types/PermissionGroupDetails";
import { MembersListUrlSortField } from "@temp/sections/permissionGroups/urls";
import { ListActions, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colActions: {
        width: 120
      },
      colEmail: {
        width: 300
      },
      colName: {
        width: "auto"
      }
    },
    avatar: {
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      float: "left",
      height: 47,
      justifyContent: "center",
      marginRight: theme.spacing(1),
      overflow: "hidden",
      width: 47
    },
    avatarDefault: {
      "& p": {
        color: "#fff",
        lineHeight: "47px"
      },
      background: theme.palette.primary.main,
      height: 47,
      textAlign: "center",
      width: 47
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    colActions: {
      paddingRight: theme.spacing(),
      textAlign: "right"
    },
    helperText: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      textAlign: "center"
    },
    statusText: {
      color: "#9E9D9D"
    },
    tableRow: {}
  }),
  { name: "PermissionGroup" }
);
const numberOfColumns = 4;

interface PermissionGroupProps
  extends ListActions,
    SortPage<MembersListUrlSortField> {
  users: PermissionGroupDetails_permissionGroup_users[];
  disabled: boolean;
  onUnassign: (ida: string[]) => void;
  onAssign: () => void;
}

const PermissionGroupMemberList: React.FC<PermissionGroupProps> = props => {
  const {
    disabled,
    users,
    onUnassign,
    onAssign,
    onSort,
    toggle,
    toolbar,
    isChecked,
    selected,
    toggleAll,
    sort
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const members = users?.sort(sortMembers(sort?.sort, sort?.asc));

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "group_members",
          defaultMessage: "Group members",
          description: "header"
        })}
        toolbar={
          <Button
            color={disabled ? "secondary" : "primary"}
            onClick={onAssign}
            disabled={disabled}
          >
            <FormattedMessage id="assign_members"
              defaultMessage="Assign members"
              description="button"
            />
          </Button>
        }
      />
      {members?.length === 0 ? (
        <div className={classNames(classes.helperText)}>
          <Typography color="textSecondary">
            <FormattedMessage id="you_haven't_assigned_any_member_to_this_permission_group"
              defaultMessage="You haven’t assigned any member to this permission group yet."
              description="empty list message"
            />
          </Typography>
          <Typography color="textSecondary">
            <FormattedMessage id="use_assigned_button"
              defaultMessage="Please use Assign Members button to do so."
              description="empty list message"
            />
          </Typography>
        </div>
      ) : (
        <ResponsiveTable>
          <TableHead
            colSpan={numberOfColumns}
            selected={selected}
            disabled={disabled}
            items={members}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCellHeader
              className={classes.colName}
              arrowPosition="right"
              onClick={() => onSort(MembersListUrlSortField.name)}
              direction={
                sort?.sort === MembersListUrlSortField.name
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
            >
              <FormattedMessage id="name"
                defaultMessage="Name"
                description="staff member full name"
              />
            </TableCellHeader>
            <TableCellHeader
              className={classes.colEmail}
              arrowPosition="right"
              onClick={() => onSort(MembersListUrlSortField.email)}
              direction={
                sort?.sort === MembersListUrlSortField.email
                  ? getArrowDirection(sort.asc)
                  : undefined
              }
            >
              <FormattedMessage id="email_address" defaultMessage="Email Address" />
            </TableCellHeader>
            <TableCellHeader textAlign="right">
              <FormattedMessage id="actions" defaultMessage="Actions" />
            </TableCellHeader>
          </TableHead>
          <TableBody>
            {renderCollection(
              members,
              user => {
                const isSelected = user ? isChecked(user.id) : false;

                return (
                  <TableRow
                    className={classNames({
                      [classes.tableRow]: !!user
                    })}
                    hover={!!user}
                    selected={isSelected}
                    key={user ? user.id : "skeleton"}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        disabled={disabled}
                        disableClickPropagation
                        onChange={() => toggle(user.id)}
                      />
                    </TableCell>
                    <TableCell className={classes.colName}>
                      <div className={classes.avatar}>
                        {user?.avatar?.url ? (
                          <img
                            className={classes.avatarImage}
                            src={user?.avatar?.url}
                          />
                        ) : (
                          <div className={classes.avatarDefault}>
                            <Typography>{getUserInitials(user)}</Typography>
                          </div>
                        )}
                      </div>
                      <Typography>
                        {getUserName(user) || <Skeleton />}
                      </Typography>
                      <Typography
                        variant={"caption"}
                        className={classes.statusText}
                      >
                        {!user ? (
                          <Skeleton />
                        ) : user.isActive ? (
                          intl.formatMessage({id: "active",
                            defaultMessage: "Active",
                            description: "staff member status"
                          })
                        ) : (
                          intl.formatMessage({id: "inactive",
                            defaultMessage: "Inactive",
                            description: "staff member status"
                          })
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.colEmail}>
                      {user?.email || <Skeleton />}
                    </TableCell>
                    <TableCell className={classes.colActions}>
                      {user ? (
                        <>
                          <IconButton
                            disabled={disabled}
                            color="primary"
                            onClick={stopPropagation(() =>
                              onUnassign([user.id])
                            )}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </TableRow>
                );
              },
              () => (
                <TableRow>
                  <TableCell colSpan={numberOfColumns}>
                    <FormattedMessage id="no_members_found" defaultMessage="No members found" />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </ResponsiveTable>
      )}
    </Card>
  );
};
PermissionGroupMemberList.displayName = "PermissionGroupMemberList";
export default PermissionGroupMemberList;
