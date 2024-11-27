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

export const Form = ({ language, translations }) => {
  const [answers, setAnswers] = useState({});
  const [userKey, setUserKey] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      const questionsModule = await import(`../lang/${language}.json`);
      setQuestions(questionsModule.default.questions);
    };

    loadQuestions();
  }, [language]);

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
      // Check if all questions have both most and least answers
      const isComplete = questions.every(
        (question) => answers[question.id]?.most && answers[question.id]?.least
      );
      setIsValid(isComplete && userKey.trim() !== "");
    };

    validateForm();
  }, [answers, questions, userKey]);

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-cac95d08-002e-4c66-ad1b-cf8966a459fe/sample/hello",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            userKey,
            answers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      setModalStatus("success");
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
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
          {translations.instruction || "Instruction"}
        </Typography>
        {translations.instructionText ||
          "Choose one MOST and one LEAST in each of the 28 groups of words."}
      </Alert>
      <TextField
        fullWidth
        label={translations.userKey || "User Key"}
        variant="outlined"
        value={userKey}
        onChange={(e) => setUserKey(e.target.value)}
        sx={{ mb: 4 }}
        required
      />
      <TableContainer component={Paper}>
        {questions.map((question, questionIndex) => (
          <Table
            key={question.id}
            sx={{
              mb: 2,
              backgroundColor:
                questionIndex % 2 === 0 ? "background.paper" : "action.hover",
              "& .MuiTableCell-root": {
                padding: "8px",
              },
              "& .MuiTableCell-head": {
                fontWeight: "bold",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "60%" }}>{question.id}</TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  {translations.most || "Most"}
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  {translations.least || "Least"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question.traits.map((trait) => (
                <TableRow
                  key={trait}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ width: "60%" }}>
                    {trait}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Box display="flex" justifyContent="center">
                      <Checkbox
                        checked={answers[question.id]?.most === trait}
                        onChange={() =>
                          handleChange(question.id, trait, "most")
                        }
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Box display="flex" justifyContent="center">
                      <Checkbox
                        checked={answers[question.id]?.least === trait}
                        onChange={() =>
                          handleChange(question.id, trait, "least")
                        }
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalStatus === "success"
            ? translations.successTitle || "Success!"
            : translations.errorTitle || "Error"}
        </DialogTitle>
        <DialogContent>
          {modalStatus === "success"
            ? translations.successMessage || "Form submitted successfully!"
            : translations.errorMessage ||
              "An error occurred. Please try again later."}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>
            {translations.close || "Close"}
          </Button>
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
            translations.submit || "Submit"
          )}
        </Button>
      </Box>
    </Container>
  );
};
