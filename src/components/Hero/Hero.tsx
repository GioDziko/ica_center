import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { PHONE } from "../../config";
import logo from "../../assets/logo.png";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        background:
          "linear-gradient(135deg, #7B1111 0%, #8B1818 50%, #6B1010 100%)",
        py: { xs: 6, md: 8 },
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Text side */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Badge */}
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                px: 2,
                py: 0.5,
                mb: 2.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                სასწავლო ცენტრი
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              შენი წარმატება
              <br />
              იწყება აქ
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.8)",
                mb: 4,
                maxWidth: 460,
                lineHeight: 1.7,
              }}
            >
              ICA — სასწავლო ცენტრი, სადაც მოსწავლეები ეუფლებიან ცოდნას
              გამოცდილი პედაგოგების მეშვეობით.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                href={`tel:${PHONE}`}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.25,
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  "&:hover": {
                    bgcolor: "grey.100",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {PHONE}
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#services"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  fontWeight: 600,
                  px: 3.5,
                  py: 1.25,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                კურსები
              </Button>
            </Box>
          </Grid>

          {/* Logo side */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={logo}
              alt="ICA"
              sx={{
                height: { xs: 160, md: 220 },
                opacity: 0.95,
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.3))",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
