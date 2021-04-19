# Paid-parking 
- sistem de gestionare a masinilor intr-o parcare cu plata

Aplicatia poate fi testata la urmatorul link:
https://paid-parking.herokuapp.com/

Am folosit https://mockapi.io/ pentru a crea urmatoarele endpoint-uri:

- GET /parking -> returneaza lista cu masinile deja existente in parcare
- GET /parking/:id -> returneaza datele masinii inregistrate de utilizatorul curent pentru a realiza sumarul
- POST /parking -> inregistreaza datele masinii la intrarea in parcare
- DELETE /parking/:id -> sterge datele masinii la iesirea din parcare dupa realizarea platii (apasarea butonului pay)