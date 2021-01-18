import React from 'react';
import {
  Input,
  Chip,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#fafafa',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mb8: {
    marginBottom: 8,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const MetricsSelect = (props: any) => {
  const { metrics, selection, setSelection, latestData } = props;
  const classes = useStyles();

  const handleToggle = (event: any) => {
    setSelection(event.target.value);
  };

  const getValue = (metric: string) => {
    const data = latestData.find((m: any) => m.metric === metric);
    return data !== undefined ? `${data.value}${data.unit}` : '';
  };

  return (
    <CardContent className={classes.header}>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item lg={8} className={classes.right}>
          <Select
            id="demo-mutiple-chip"
            fullWidth
            multiple
            placeholder="Please select the mertic"
            value={selection}
            onChange={handleToggle}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected: any) => (
              <div>
                {selected.map((metric: string) => (
                  <Chip key={metric} label={metric} />
                ))}
              </div>
            )}
          >
            {metrics.map((metric: string) => (
              <MenuItem key={metric} value={metric}>
                {metric}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {metrics.map(
          (metric: string) =>
            selection.indexOf(metric) > -1 && (
              <Grid item lg={2} md={2} sm={2} xs={12} key={metric}>
                <Card>
                  <CardContent className={classes.headerContent}>
                    <Typography className={classes.mb8}>{metric}</Typography>
                    <Typography className={classes.mb8} variant="h5">
                      {getValue(metric)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ),
        )}
      </Grid>
    </CardContent>
  );
};

export default MetricsSelect;
