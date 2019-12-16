import * as React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import cards from "../../data/eld.json";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";

export const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [colorFilter, setColorFilter] = useState({
    white: true,
    blue: true,
    black: true,
    red: true,
    green: true,
    none: true
  });
  const [tierFilter, setTierFilter] = useState(3.1);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <FormGroup row={false}>
            {Object.keys(colorFilter).map(k => (
              <FormControlLabel
                key={k}
                control={
                  <Switch
                    checked={colorFilter[k]}
                    onChange={() =>
                      setColorFilter({
                        ...colorFilter,
                        [k]: !colorFilter[k]
                      })
                    }
                  />
                }
                label={k}
              />
            ))}
            <Slider
              value={tierFilter}
              step={0.1}
              marks
              min={1}
              max={5}
              onChange={(_, value) => setTierFilter(value as number)}
            />
            {tierFilter} &lt;= tier
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {cards
        .sort((c1, c2) => c2.tier - c1.tier)
        .filter(c => tierFilter <= c.tier)
        .filter(c =>
          c.colors.length === 0
            ? colorFilter.none
            : c.colors.some(color => colorFilter[color.toLowerCase()])
        )
        .map(c => (
          <Card key={c.name}>
            <CardContent>
              <Typography>
                {c.name} ({c.tier})
              </Typography>
            </CardContent>
            <CardMedia component="img" src={c.imageUrl} />
          </Card>
        ))}
      <BottomNavigation
        showLabels
        style={{ position: "fixed", width: "100%", bottom: 0 }}
      >
        <Button onClick={() => setOpen(true)}>Setting</Button>
      </BottomNavigation>
    </>
  );
};
