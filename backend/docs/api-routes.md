# Documentation des routes API

Ce document décrit les routes API de l’application, avec les méthodes HTTP, endpoints, paramètres attendus et structures de réponse. Cette documentation facilite la maintenance de l’API et l’intégration de nouveaux développeurs.

## Vue d’ensemble des routes

---

### Routes Utilisateur

#### Récupérer les informations de l’utilisateur connecté
- **Méthode :** GET  
- **Endpoint :** `/api/users/me`  
- **Description :** Récupère les informations de l’utilisateur actuellement authentifié.
- **Paramètres de requête :**
  - **Headers :**
    - `Authorization` : Token Bearer pour l’authentification.
- **Réponse :**
  - **Code :** 200 OK
  - **Corps :**
    ```json
    {
      "id": number,
      "first_name": "string",
      "last_name": "string",
      "email": "string"
      // autres champs utilisateur
    }
    ```

---

### Authentification

#### Connexion (login)
- **Méthode :** POST  
- **Endpoint :** `/api/auth/login`  
- **Description :** Authentifie un utilisateur et retourne un token JWT.
- **Paramètres de requête :**
  - **Body :**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Réponse :**
  - **Code :** 200 OK
  - **Corps :**
    ```json
    {
      "token": "string",
      "user": {
        "id": number,
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
    ```

#### Inscription (register)
- **Méthode :** POST  
- **Endpoint :** `/api/auth/register`  
- **Description :** Crée un nouvel utilisateur.
- **Paramètres de requête :**
  - **Body :**
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Réponse :**
  - **Code :** 201 Created
  - **Corps :**
    ```json
    {
      "id": number,
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    }
    ```

---

### Routes Profil

#### Créer un profil
- **Méthode :** POST  
- **Endpoint :** `/api/profiles`  
- **Description :** Crée un nouveau profil pour l’utilisateur authentifié.
- **Paramètres de requête :**
  - **Headers :**
    - `Authorization` : Token Bearer pour l’authentification.
  - **Body :**
    ```json
    {
      "data": {
        "first_name": "string",
        "last_name": "string",
        "birthdate": "string", // format : YYYY-MM-DD
        "medical_situation": "string",
        "user_id": number
      }
    }
    ```
- **Réponse :**
  - **Code :** 201 Created
  - **Corps :**
    ```json
    {
      "id": number,
      "first_name": "string",
      "last_name": "string",
      "birthdate": "string",
      "medical_situation": "string"
    }
    ```

#### Récupérer les profils
- **Méthode :** GET  
- **Endpoint :** `/api/profiles`  
- **Description :** Récupère tous les profils associés à l’utilisateur authentifié.
- **Paramètres de requête :**
  - **Headers :**
    - `Authorization` : Token Bearer pour l’authentification.
- **Réponse :**
  - **Code :** 200 OK
  - **Corps :**
    ```json
    [
      {
        "id": number,
        "first_name": "string",
        "last_name": "string",
        "birthdate": "string",
        "medical_situation": "string"
      }
      // autres profils
    ]
    ```

#### Supprimer un profil
- **Méthode :** DELETE  
- **Endpoint :** `/api/profiles/:id`  
- **Description :** Supprime un profil par son ID.
- **Paramètres de requête :**
  - **Headers :**
    - `Authorization` : Token Bearer pour l’authentification.
  - **Path :**
    - `id` : L’ID du profil à supprimer.
- **Réponse :**
  - **Code :** 204 No Content

---

### Gestion des erreurs

- **400 Bad Request**
    ```json
    {
      "error": {
        "message": "string"
      }
    }
    ```
- **401 Unauthorized**
    ```json
    {
      "error": {
        "message": "Authentification requise."
      }
    }
    ```
- **404 Not Found**
    ```json
    {
      "error": {
        "message": "Ressource non trouvée."
      }
    }
    ```
- **500 Internal Server Error**
    ```json
    {
      "error": {
        "message": "Une erreur inattendue est survenue."
      }
    }
    ```

> Cette documentation doit être mise à jour à chaque ajout ou modification de route.