import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import dayjs from "dayjs";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchRecent } from "../redux/actions/dataActions";

import relativeTime from "dayjs/plugin/relativeTime";

import ListItemDivider from "../components/ListItemDivider";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";



dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  root: {
    width: theme.customSpacings.innerWidth,
    margin: "auto",
    height: `calc( ${theme.customSpacings.innerHeight} - 110px)`,
    backgroundColor: theme.palette.background.paper,
    top: theme.customSpacings.innerPosition.top,
    borderRadius: theme.shape.innerBorderRadius,
    overflowY: "scroll",
    padding: "0px",
  },

  prevNextBtn:{
    display:'flex',
    backgroundColor:'#FFF',
    justifyContent:'space-evenly',      
    height:'60px',
    position:'relative', 
    bottom:'0px'
  },

  resultDate: {
    margin: "0 0.8em",
    width: "40%",
    minWidth: "150px",
  },
  result: { margin: "auto", color: "orange" },
  Positive: { color: "red" },
  Negative: { color: "green" },
}));

export const RecentTab = (props) => {
  const classes = useStyles();
  const { recent, hasNext, hasPrev, fetchRecent, loading } = props;  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    fetchRecent({ page , perpage: 10 });
    console.log("fetchRecent page = " + page);
  }, [page]);

  // const perpage = document.documentElement.style.getPropertyValue('--vh')

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!props.open) {
    return null;
  }
  return (
    <>
    <div className={classes.tabTitle}>
      {/* <ListItem> */}
          <Typography className={classes.titleText}>Recent Tests</Typography>
          <ListItemIcon >
            {true && <CircularProgress size={18} />}
          </ListItemIcon>
          {/* </ListItem> */}
        </div>
      <List component="ul" className={classes.root}>
        <ListItemDivider>
          {recent.map(({ _id, meta, deviceDataId, created, result }, index) => (
            <React.Fragment key={index}>
              <ListItem key={index}>
                <div className={classes.resultDate}>
                  <Typography style={{ fontSize: 14 }}>
                    {dayjs(meta.created).format("MMM D, hh:mm A")}
                  </Typography>
                  <Typography
                    style={{ fontSize: 11 }}
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    {dayjs(meta.created).fromNow()}
                  </Typography>
                </div>

                {/* <Button onClick={()=>{
                    console.log(`clicked on ${_id}`)
                }}>Edit</Button> */}

                <Typography className={clsx(classes.result, classes[result])}>
                  {result}
                </Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </ListItemDivider>

        

      </List>
      <div className={classes.prevNextBtn}>
        <Button 
        startIcon={<ArrowBackIosIcon/>}
        disabled={!hasPrev || loading}
        onClick={()=>{
          setPage(page - 1);
        }}
        color={hasPrev?"primary":'inherit'}
        >{hasPrev?"Prev":'prev'}</Button>

        <Button endIcon={<ArrowForwardIosIcon />}
         disabled={!hasNext || loading}
         onClick={()=>{
           setPage(page + 1);
         }}
         color={hasNext?"primary":'inherit'}
        >{hasNext?"Next":'next'}</Button>
        </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  recent: state.data.recentData.items,
  hasNext: state.data.recentData.hasNext,
  hasPrev: state.data.recentData.hasPrev,
  loading: state.data.recentData.loading,
});

const mapDispatchToProps = {
  fetchRecent,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTab);

// <Typography variant='button'>Per Page :</Typography>
// <Button
// endIcon = {<ArrowDropDownIcon />}
// onClick={(e)=>{
//     setAnchorEl(e.currentTarget)
// }}>
// {perpage}
// </Button>
// <Menu
//     anchorEl={anchorEl}
//     keepMounted
//     open={Boolean(anchorEl)}
//     onClose={handleClose}
// >
//     <MenuItem onClick={()=>{setPerpage(5);handleClose()}}>5</MenuItem>
//     <MenuItem onClick={()=>{setPerpage(10);handleClose()}}>10</MenuItem>
//     <MenuItem onClick={()=>{setPerpage(20);handleClose()}}>20</MenuItem>
// </Menu>
