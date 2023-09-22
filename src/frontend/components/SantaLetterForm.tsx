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
    <form className="container mt-4">
      <div className="mb-3">
        <label htmlFor="letter-santa-name" className="form-label">
          Who are you?
        </label>
        <input
          type="text"
          id="letter-santa-name"
          className={`form-control ${userError || apiError ? "is-invalid" : ""}`}
          placeholder="firstname.lastname"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {userError && <div className="invalid-feedback">{userError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="gift-message" className="form-label">
          What do you want for Christmas?
        </label>
        <textarea
          id="gift-message"
          rows={5}
          className={`form-control ${giftMessageError || apiError ? "is-invalid" : ""}`}
          placeholder="Gifts"
          value={gift_message}
          onChange={(e) => setGiftMessage(e.target.value)}
        />
        {giftMessageError && <div className="invalid-feedback">{giftMessageError}</div>}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSendMessageClick}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
      {apiError && <div className="text-danger mt-2">{apiError}</div>}
    </form>
  );
};

export default SantaLetterForm;
