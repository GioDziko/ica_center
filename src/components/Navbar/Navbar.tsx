import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { label: "კურსები", href: "#services" },
  { label: "კონტაქტი", href: "#contact" },
];

export default function Navbar() {
  const [elevated, setElevated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar position="sticky" color="primary" elevation={elevated ? 4 : 0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          component="img"
          src={logo}
          alt="ICA"
          sx={{ height: 40, display: "block", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              color="inherit"
              href={link.href}
              sx={{ color: "white", fontWeight: 600 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Mobile hamburger */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={() => setDrawerOpen(true)}
          aria-label="მენიუ"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 240, bgcolor: "primary.main" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "white" }}
            aria-label="დახურვა"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
