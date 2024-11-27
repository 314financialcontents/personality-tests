import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Button,
  Container,
  Box,
  Alert,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import questionsData from "../questions.json";

export const Form = ({}) => {
  const [answers, setAnswers] = useState({});
  const [userKey, setUserKey] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const { t } = useTranslation();

  const handleChange = (questionId, trait, type) => {
    setAnswers((prev) => {
      const questionAnswers = prev[questionId] || { most: null, least: null };

      if (questionAnswers[type] === trait) {
        return {
          ...prev,
          [questionId]: {
            ...questionAnswers,
            [type]: null,
          },
        };
      }

      const otherType = type === "most" ? "least" : "most";
      if (questionAnswers[otherType] === trait) {
        questionAnswers[otherType] = null;
      }

      return {
        ...prev,
        [questionId]: {
          ...questionAnswers,
          [type]: trait,
        },
      };
    });
  };

  useEffect(() => {
    const validateForm = () => {
      const isComplete = questionsData.questions.every(
        (question) => answers[question.id]?.most && answers[question.id]?.least
      );
      setIsValid(isComplete && userKey.trim() !== "");
    };
  
    validateForm();
  }, [answers, userKey]);

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    const payload = {
      userKey,
      answers
    };

    try {
      const response = await fetch(
        "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-cac95d08-002e-4c66-ad1b-cf8966a459fe/sample/hello",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Check for both statusCode and HTTP status
      if (!response.ok || (data.statusCode && data.statusCode !== 200)) {
        throw new Error(data.body ? JSON.parse(data.body).message : data.message || "Something went wrong");
      }

      setModalStatus("success");
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
      console.error('Submit error:', err);
      setModalStatus("error");
      setModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      {error && (
        <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
          {error}
        </Alert>
      )}
      <Alert severity="info" sx={{ mb: 6, mt: 4 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {t("instruction")}
        </Typography>
        {t("instructionText")}
      </Alert>
      <TextField
        fullWidth
        label={t("userKey")}
        variant="outlined"
        value={userKey}
        onChange={(e) => setUserKey(e.target.value)}
        sx={{ mb: 4 }}
        required
      />
      <TableContainer component={Paper}>
        {questionsData.questions.map((question, questionIndex) => (
          <Table
            key={question.id}
            sx={{
              mb: 2,
              backgroundColor:
                questionIndex % 2 === 0 ? "background.paper" : "action.hover",
              "& .MuiTableCell-root": { padding: "8px" },
              "& .MuiTableCell-head": { fontWeight: "bold" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "60%" }}>{question.id}</TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  {t("most")}
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  {t("least")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question.traits.map((trait) => (
                <TableRow key={trait}>
                  <TableCell>
                    {t(
                      `traits.${trait
                        .toLowerCase()
                        .replace(/[()]/g, "")
                        .replace(/\s/g, "_")}`
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={answers[question.id]?.most === trait}
                      onChange={() => handleChange(question.id, trait, "most")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={answers[question.id]?.least === trait}
                      onChange={() => handleChange(question.id, trait, "least")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalStatus === "success" ? t("successTitle") : t("errorTitle")}
        </DialogTitle>
        <DialogContent>
          {modalStatus === "success" ? t("successMessage") : t("errorMessage")}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="large"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("submit")
          )}
        </Button>
      </Box>
    </Container>
  );
};
