import toast from "react-hot-toast"

export const notifyFields = () => toast.error("Devi compilare tutti i campi")

export const notifyError = () => toast.error("Errore nel login")

export const notifyEmail = () => toast.error("Inserisci la tua email")

export const notifySuccess = (page?: string | undefined) => {
  page === "signup"
    ? toast.success("L'account è stato creato!")
    : toast.success("Login effettuato correttamente!")
}

export const notifyPasswordSent = () =>
  toast.success("Una email è stata inviata al tuo indirizzo!")

export const emailError = () => toast.error("L'email inserita non è valida")

export const passwordError = () =>
  toast.error("La password deve essere di almeno 6 caratteri")
