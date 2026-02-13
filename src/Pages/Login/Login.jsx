import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Fade,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import { getApiErrorMessage } from "../../services/auth.api";
import logoLight from "../../assets/logo_light-removebg.png";
import { Visibility, VisibilityOff, Email, Lock, Key } from "@mui/icons-material";

const formatExpiry = (isoDate) => {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString();
};

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, requestLogin, resendLoginOtp, verifyLoginOtp } = useAuth();

  const [step, setStep] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginSessionId, setLoginSessionId] = useState("");
  const [otpDelivery, setOtpDelivery] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const expiryText = useMemo(() => formatExpiry(expiresAt), [expiresAt]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const submitCredentials = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await requestLogin({
        email: email.trim(),
        password,
      });

      setLoginSessionId(response.loginSessionId);
      setOtpDelivery(response.otpDelivery);
      setExpiresAt(response.expiresAt);
      setOtp("");
      setStep("otp");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Login failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await verifyLoginOtp({
        loginSessionId,
        otp: otp.trim(),
      });
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "OTP verification failed."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await resendLoginOtp({ loginSessionId });
      setOtpDelivery(response.otpDelivery);
      setExpiresAt(response.expiresAt);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Could not resend OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--backColor)",
        backgroundImage: "linear-gradient(135deg, rgba(143, 99, 181, 0.05) 0%, rgba(143, 99, 181, 0.02) 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: 5,
          borderRadius: 3,
          border: "1px solid var(--border-color)",
          boxShadow: "0 8px 32px rgba(143, 99, 181, 0.15)",
          background: "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
        }}
      >
        <Stack spacing={3.5}>
          
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={logoLight}
              alt="Sijill"
              sx={{ 
                width: 56, 
                height: 56, 
                objectFit: "contain",
                filter: "drop-shadow(0 2px 8px rgba(143, 99, 181, 0.3))",
              }}
            />
            <Box sx={{ textAlign: "center" }}>
              <Typography 
                variant="h4" 
                fontWeight={700} 
                sx={{
                  background: "linear-gradient(135deg, #8f63b5 0%, #a77fc9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {step === "otp" ? "Verify your identity" : "Sign in to your account"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          
          <Fade in={!!errorMessage}>
            <Box>
              {errorMessage ? (
                <Alert 
                  severity="error" 
                  sx={{ 
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      fontSize: 22,
                    }
                  }}
                >
                  {errorMessage}
                </Alert>
              ) : null}
            </Box>
          </Fade>

          
          {step === "credentials" ? (
            <Box component="form" onSubmit={submitCredentials}>
              <Stack spacing={2.5}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  fullWidth
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "action.active", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#8f63b5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8f63b5",
                      },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  fullWidth
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "action.active", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: "action.active" }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#8f63b5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8f63b5",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  size="large"
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #8f63b5 0%, #a77fc9 100%)",
                    boxShadow: "0 4px 12px rgba(143, 99, 181, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #7d4fa3 0%, #9567b7 100%)",
                      boxShadow: "0 6px 16px rgba(143, 99, 181, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(143, 99, 181, 0.4)",
                    },
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Continue"}
                </Button>
              </Stack>
            </Box>
          ) : (
            
            <Box component="form" onSubmit={submitOtp}>
              <Stack spacing={2.5}>
                <Box 
                  sx={{ 
                    p: 2.5, 
                    borderRadius: 2, 
                    backgroundColor: "rgba(143, 99, 181, 0.08)",
                    border: "1px solid rgba(143, 99, 181, 0.2)",
                  }}
                >
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    We've sent a 6-digit code to
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="primary" textAlign="center" sx={{ mt: 0.5 }}>
                    {otpDelivery || "your email"}
                  </Typography>
                </Box>

                <TextField
                  label="Verification Code"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputProps={{ 
                    maxLength: 6, 
                    inputMode: "numeric",
                    style: { 
                      textAlign: "center", 
                      fontSize: 24, 
                      letterSpacing: 8,
                      fontWeight: 600,
                    }
                  }}
                  required
                  fullWidth
                  placeholder="000000"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key sx={{ color: "action.active", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#8f63b5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#8f63b5",
                      },
                    },
                  }}
                />

                {expiryText ? (
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    textAlign="center"
                    sx={{ 
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    Code expires at: <strong>{expiryText}</strong>
                  </Typography>
                ) : null}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || otp.trim().length !== 6}
                  size="large"
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #8f63b5 0%, #a77fc9 100%)",
                    boxShadow: "0 4px 12px rgba(143, 99, 181, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #7d4fa3 0%, #9567b7 100%)",
                      boxShadow: "0 6px 16px rgba(143, 99, 181, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(143, 99, 181, 0.4)",
                    },
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Verify & Sign In"}
                </Button>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setStep("credentials");
                      setOtp("");
                      setLoginSessionId("");
                      setOtpDelivery("");
                      setExpiresAt("");
                    }}
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      borderColor: "rgba(143, 99, 181, 0.5)",
                      color: "#8f63b5",
                      "&:hover": {
                        borderColor: "#8f63b5",
                        backgroundColor: "rgba(143, 99, 181, 0.08)",
                      },
                    }}
                  >
                    Go Back
                  </Button>

                  <Button
                    type="button"
                    variant="text"
                    onClick={handleResendOtp}
                    disabled={isSubmitting || !loginSessionId}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#8f63b5",
                      "&:hover": {
                        backgroundColor: "rgba(143, 99, 181, 0.08)",
                      },
                    }}
                  >
                    Resend Code
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}