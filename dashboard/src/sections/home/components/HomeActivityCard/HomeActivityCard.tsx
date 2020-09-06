import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import { DateTime } from "@temp/components/Date";
import Skeleton from "@temp/components/Skeleton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { renderCollection } from "@temp/misc";
import { Home_activities_edges_node } from "@temp/sections/home/types/Home";
import { getActivityMessage } from "./activityMessages";

const useStyles = makeStyles(
  {
    loadingProducts: {
      paddingBottom: "10px",
      paddingTop: "10px"
    },
    noProducts: {
      paddingBottom: "16px",
      paddingTop: "16px"
    }
  },
  { name: "HomeActivityCard" }
);

interface HomeActivityCardProps {
  activities: Home_activities_edges_node[];
}

const HomeActivityCard: React.FC<HomeActivityCardProps> = props => {
  const { activities } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Activity",
          description: "header",
          id: "homeActivityCardHeader"
        })}
      />
      <List dense={true}>
        {renderCollection(
          activities,
          (activity, activityId) => (
            <ListItem key={activityId}>
              {activity ? (
                <ListItemText
                  primary={
                    <Typography>
                      {getActivityMessage(activity, intl)}
                    </Typography>
                  }
                  secondary={<DateTime date={activity.date} />}
                />
              ) : (
                <ListItemText className={classes.loadingProducts}>
                  <Typography>
                    <Skeleton />
                  </Typography>
                </ListItemText>
              )}
            </ListItem>
          ),
          () => (
            <ListItem className={classes.noProducts}>
              <ListItemText
                primary={
                  <Typography>
                    <FormattedMessage
                      defaultMessage="No activities found"
                      id="homeActivityCardNoActivities"
                    />
                  </Typography>
                }
              />
            </ListItem>
          )
        )}
      </List>
    </Card>
  );
};
HomeActivityCard.displayName = "HomeActivityCard";
export default HomeActivityCard;
