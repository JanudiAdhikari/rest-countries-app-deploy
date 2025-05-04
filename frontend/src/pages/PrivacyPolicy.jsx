import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore,
  Security,
  Visibility,
  StorageOutlined,
  PrivacyTip,
  DataUsage,
  PeopleAlt,
  Update,
  GppGood,
  ContactSupport,
} from "@mui/icons-material";

const PrivacyPolicy = () => {
  const theme = useTheme();

  // Helper function for the last updated date
  const getFormattedDate = () => {
    const today = new Date();
    return `${today.toLocaleString("default", {
      month: "long",
    })} ${today.getDate()}, ${today.getFullYear()}`;
  };

  // Data for privacy sections
  const privacySections = [
    {
      id: "information-collection",
      icon: <DataUsage sx={{ color: theme.palette.primary.main }} />,
      title: "Information We Collect",
      content: `When you use World Explorer, we collect the following types of information:

• Usage Data: Information about how you interact with our application, including search queries, countries viewed, and features used.

• Device Information: Details about the device you're using, including browser type, operating system, and screen resolution.

• Cookies and Similar Technologies: We use cookies to enhance your experience and collect usage information.

• Account Information: If you create an account, we collect your email address and username to provide account-related functionality like saving favorite countries.`,
    },
    {
      id: "information-use",
      icon: <Visibility sx={{ color: theme.palette.primary.main }} />,
      title: "How We Use Your Information",
      content: `We use the information we collect to:

• Provide and maintain the World Explorer application
• Improve and personalize your experience
• Analyze usage patterns to enhance our features
• Respond to your requests and communications
• Ensure the security and proper functioning of our application
• Develop new features based on user interactions and feedback`,
    },
    {
      id: "information-sharing",
      icon: <PeopleAlt sx={{ color: theme.palette.primary.main }} />,
      title: "Information Sharing and Disclosure",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:

• Service Providers: We may share information with trusted third parties who assist us in operating our application, conducting our business, or servicing you.

• Legal Requirements: We may disclose information when required by law or to protect our rights, privacy, safety, or property.

• Analytics: We use anonymized data for analytical purposes to improve our application.

• With Your Consent: We may share information with third parties when we have your consent to do so.`,
    },
    {
      id: "data-storage",
      icon: <StorageOutlined sx={{ color: theme.palette.primary.main }} />,
      title: "Data Storage and Security",
      content: `We implement appropriate security measures to protect your personal information:

• Data Encryption: We use industry-standard encryption methods to protect data transmission.

• Secure Storage: Your information is stored in secure systems with restricted access.

• Regular Security Audits: We perform regular security assessments to ensure data protection.

• Limited Data Retention: We retain personal information only as long as necessary for the purposes outlined in this Privacy Policy.`,
    },
    {
      id: "your-rights",
      icon: <GppGood sx={{ color: theme.palette.primary.main }} />,
      title: "Your Rights and Choices",
      content: `You have several rights regarding your personal information:

• Access: You can request access to the personal information we hold about you.

• Correction: You can request correction of inaccurate information.

• Deletion: You can request deletion of your personal information under certain circumstances.

• Opt-Out: You can opt out of non-essential data collection.

• Account Settings: If you have created an account, you can update your preferences through your account settings.`,
    },
    {
      id: "policy-updates",
      icon: <Update sx={{ color: theme.palette.primary.main }} />,
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy and take reasonable steps to inform you of significant changes.

We encourage you to review this policy periodically to stay informed about how we are protecting your information.`,
    },
    {
      id: "contact",
      icon: <ContactSupport sx={{ color: theme.palette.primary.main }} />,
      title: "Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:

Email: privacy@worldexplorer.com
Address: 123 Global Street, Explorer City, EX 12345

We will respond to your inquiry as soon as reasonably possible, typically within 30 days.`,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          mb: 6,
          p: 6,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}11)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Security
          sx={{
            fontSize: { xs: 60, md: 80 },
            mb: 2,
            color: theme.palette.primary.main,
            opacity: 0.9,
          }}
        />
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            mb: 2,
            maxWidth: 800,
            mx: "auto",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          At World Explorer, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information.
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Last Updated: {getFormattedDate()}
        </Typography>
      </Paper>

      {/* Introduction Card */}
      <Card sx={{ mb: 6 }} elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            <PrivacyTip
              sx={{
                fontSize: 28,
                mr: 2,
                color: theme.palette.primary.main,
                mt: 0.5,
              }}
            />
            <Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Our Commitment to Privacy
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                World Explorer is designed to help users discover countries and
                cultures from around the globe. While providing this service, we
                respect your privacy rights and are committed to transparency
                about how we handle your information.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                This Privacy Policy applies to all information collected through
                our application, website, and any related services, sales,
                marketing, or events. Please read this Privacy Policy carefully
                as it will help you understand what data we collect, how we use
                it, and what rights you have regarding your personal
                information.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Policy Sections as Accordions */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: 600,
        }}
      >
        Privacy Policy Details
      </Typography>

      {privacySections.map((section) => (
        <Accordion
          key={section.id}
          disableGutters
          elevation={2}
          sx={{
            mb: 2,
            "&:before": {
              display: "none",
            },
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
              borderBottom: `1px solid ${theme.palette.divider}`,
              py: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                {section.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {section.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 3, px: 4, whiteSpace: "pre-line" }}>
            <Typography
              variant="body1"
              component="div"
              sx={{ lineHeight: 1.7 }}
            >
              {section.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Summary Box */}
      <Paper
        elevation={3}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(96, 165, 250, 0.08)"
              : "rgba(59, 130, 246, 0.05)",
          border: `1px solid ${theme.palette.primary.main}22`,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Summary of Key Points
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Security
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </ListItemIcon>
            <ListItemText primary="We prioritize the security and confidentiality of your personal information." />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Security
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </ListItemIcon>
            <ListItemText primary="We only collect information necessary to provide and improve our services." />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Security
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </ListItemIcon>
            <ListItemText primary="You have control over your personal information and can exercise various rights regarding your data." />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Security
                sx={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </ListItemIcon>
            <ListItemText primary="We do not sell your personal information to third parties." />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
