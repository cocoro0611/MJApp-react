import { Grid, ListItem } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={8}>
          <ListItem className="h-40">size=8</ListItem>
        </Grid>
        <Grid size={4}>
          <ListItem className="h-40">size=4</ListItem>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
