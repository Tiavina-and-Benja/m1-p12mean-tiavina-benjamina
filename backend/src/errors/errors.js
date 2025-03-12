// Fonction pour générer des erreurs avec un code et un message personnalisable
const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
  
// Liste des erreurs avec des messages personnalisables
export const ERROR = {
  NOT_FOUND: (message = "Ressource non trouvé") => createError(404, message),
  NOT_AUTHORIZED: (message = "Non autorisé") => createError(401, message),
  FORBIDDEN: (message = "Accès interdit") => createError(403, message),
  BAD_REQUEST: (message = "Requête invalide") => createError(400, message),
  INTERNAL_SERVER_ERROR: (message = "Erreur interne du serveur") => createError(500, message),
  SERVICE_UNAVAILABLE: (message = "Service temporairement indisponible") => createError(503, message),
  UNPROCESSABLE_ENTITY: (message = "Entité non traitable") => createError(422, message),
  CONFLICT: (message = "Conflit de données") => createError(409, message),
  UNAUTHORIZED_ACCESS: (message = "Accès non autorisé") => createError(401, message),
  RESOURCE_ALREADY_EXISTS: (message = "La ressource existe déjà") => createError(409, message),
  TOKEN_EXPIRED: (message = "Le token d'authentification a expiré") => createError(401, message),
  INVALID_CREDENTIALS: (message = "Identifiants invalides") => createError(401, message),
  METHOD_NOT_ALLOWED: (message = "Méthode non autorisée") => createError(405, message),
  REQUEST_TIMEOUT: (message = "Délai de la requête dépassé") => createError(408, message),
  NOT_ACCEPTABLE: (message = "Contenu non acceptable") => createError(406, message),
  PAYLOAD_TOO_LARGE: (message = "Payload trop volumineux") => createError(413, message),
  TOO_MANY_REQUESTS: (message = "Trop de requêtes, veuillez réessayer plus tard") => createError(429, message),
};
  