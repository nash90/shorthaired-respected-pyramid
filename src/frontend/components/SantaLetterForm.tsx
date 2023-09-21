import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { sendMessageToSanta } from "../client-apis/SantaMessageApi";

const SantaLetterForm: React.FC = () => {
  const [user_id, setUserId] = useState("");
  const [gift_message, setGiftMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [userError, setUserError] = useState("");
  const [giftMessageError, setGiftMessageError] = useState("");
  const [apiError, setApiError] = useState("");

  const clearForm = () => {
    setUserId("");
    setGiftMessage("");
    setApiError("");
  };

  const clientSideValidation = () => {
    let isValid = true;

    // Reset all error messages
    setUserError("");
    setGiftMessageError("");
    setApiError("");

    if (!user_id) {
      setUserError("User ID is required");
      isValid = false;
    }

    if (!gift_message) {
      setGiftMessageError("Gift Message is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSendMessageClick = async () => {
    setIsSending(true);

    try {
      if (!clientSideValidation()) {
        return;
      }

      const res = await sendMessageToSanta(user_id, gift_message);
      if (res.status === "success") {
        alert(res.message);
      } else {
        setApiError(res.message);
      }
      clearForm();
      
    } catch (error) {
      setApiError("There was an error sending your message to Santa. Please try again later.");
    } finally {
      setIsSending(false);
    }
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
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          error={!!userError || !!apiError}
          helperText={userError || ""}
        />
      </div>
      <div>
      <TextField
        label="what do you want for christmas?"
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
      {apiError && <p style={{ color: "red" }}>{apiError}</p>}
    </Box>
  )
}

export {
  SantaLetterForm
}