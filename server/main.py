from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

alphabet = list("abcdefghijklmnopqrstuvwxyz ")
app = FastAPI()

app.add_middleware(
     CORSMiddleware,
     allow_origins=["https://cipherer.netlify.app/"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)

class CipherRequest(BaseModel):
     data: str
     key: int

def cipher(word: str, key: int):
     word = word.lower()
     indexes = [(alphabet.index(i) + key) % len(alphabet) for i in word if i in alphabet]
     ciphered_word = [alphabet[i] for i in indexes]
     return "".join(ciphered_word)

def decipher(word, key):
     indexes = [(alphabet.index(i) - key) % len(alphabet) for i in word if i in alphabet]
     ciphered_word = [alphabet[i] for i in indexes]
     return "".join(ciphered_word)

@app.post("/api/cipher")
def cipher_request(req: CipherRequest):
     return cipher(req.data, req.key)

@app.post("/api/decipher")
def decipher_request(req: CipherRequest):
     return decipher(req.data, req.key)