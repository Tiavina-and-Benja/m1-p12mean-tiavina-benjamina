// Fonction pour générer des erreurs avec un code, un message et un type personnalisables
const createError = (status, message, type, errors=undefined) => {
  const error = new Error(message);
  error.status = status;
  error.type = type;
  error.errors = errors;
  return error;
};

// Liste des erreurs avec des valeurs par défaut pour le message et le type
export const ERROR = {
  NOT_FOUND: (message = "Ressource non trouvée", type = "not_found", errors = undefined) => createError(404, message, type, errors),
  NOT_AUTHORIZED: (message = "Non autorisé", type = "not_authorized", errors = undefined) => createError(401, message, type, errors),
  FORBIDDEN: (message = "Accès interdit", type = "forbidden") => createError(403, message, type),
  BAD_REQUEST: (message = "Requête invalide", type = "bad_request", errors = undefined) => createError(400, message, type, errors),
  INTERNAL_SERVER_ERROR: (message = "Erreur interne du serveur", type = "internal_error") => createError(500, message, type),
  SERVICE_UNAVAILABLE: (message = "Service temporairement indisponible", type = "service_unavailable") => createError(503, message, type),
  UNPROCESSABLE_ENTITY: (message = "Entité non traitable", type = "unprocessable_entity") => createError(422, message, type),
  CONFLICT: (message = "Conflit de données", type = "conflict") => createError(409, message, type),
  UNAUTHORIZED_ACCESS: (message = "Accès non autorisé", type = "unauthorized_access") => createError(401, message, type),
  RESOURCE_ALREADY_EXISTS: (message = "La ressource existe déjà", type = "resource_exists", errors = undefined) => createError(409, message, type, errors),
  TOKEN_EXPIRED: (message = "Le token d'authentification a expiré", type = "token_expired") => createError(401, message, type),
  INVALID_CREDENTIALS: (message = "Identifiants invalides", type = "invalid_credentials") => createError(401, message, type),
  METHOD_NOT_ALLOWED: (message = "Méthode non autorisée", type = "method_not_allowed") => createError(405, message, type),
  REQUEST_TIMEOUT: (message = "Délai de la requête dépassé", type = "request_timeout") => createError(408, message, type),
  NOT_ACCEPTABLE: (message = "Contenu non acceptable", type = "not_acceptable") => createError(406, message, type),
  PAYLOAD_TOO_LARGE: (message = "Payload trop volumineux", type = "payload_too_large") => createError(413, message, type),
  TOO_MANY_REQUESTS: (message = "Trop de requêtes, veuillez réessayer plus tard", type = "too_many_requests") => createError(429, message, type),
};
