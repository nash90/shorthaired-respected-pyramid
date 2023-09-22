import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { sendMessageToSanta } from "../client-apis/SantaMessageApi";

const SantaLetterForm: React.FC = () => {
  const [username, setUserName] = useState("");
  const [gift_message, setGiftMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [userError, setUserError] = useState("");
  const [giftMessageError, setGiftMessageError] = useState("");
  const [apiError, setApiError] = useState("");

  const clearForm = () => {
    setUserName("");
    setGiftMessage("");
    setApiError("");
  };

  const clientSideValidation = () => {
    let isValid = true;

    // Reset all error messages
    setUserError("");
    setGiftMessageError("");
    setApiError("");

    if (!username) {
      setUserError("User Name is required");
      isValid = false;
    }

    if (!gift_message) {
      setGiftMessageError("Gift Message is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSendMessageClick = () => {
    // Perform client-side validation before sending the message
    if (!clientSideValidation()) {
      return;
    }
  
    setIsSending(true);
  
    // Call sendMessageToSanta and handle the promise with then and catch
    sendMessageToSanta(username, gift_message)
      .then((res) => {
        if (res.status === "success") {
          alert(res.message);
          clearForm();
        } else if (res.status === "error") {
          // Handle bad req API error here
          setApiError(res.message);
        }
      })
      .catch((error) => {
        setApiError("There was an error sending your message to Santa. Please try again later.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="letter-santa-name"
          label="Who are you?"
          placeholder="firstname.lastname"
          variant="standard"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          error={!!userError || !!apiError}
          helperText={userError || ""}
        />
      </div>
      <div>
        <TextField
          label="What do you want for Christmas?"
          multiline
          minRows={5}
          placeholder="Gifts"
          variant="standard"
          value={gift_message}
          onChange={(e) => setGiftMessage(e.target.value)}
          error={!!giftMessageError || !!apiError}
          helperText={giftMessageError || ""}
        />
      </div>
      <Button variant="contained" onClick={handleSendMessageClick} disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </Button>
      {apiError !== "" && <p style={{ color: "red" }}>{apiError}</p>}
    </Box>
  );
  
}

export {
  SantaLetterForm
}