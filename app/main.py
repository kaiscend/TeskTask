from fastapi import FastAPI
from app.database import engine
from app import models
from fastapi.middleware.cors import CORSMiddleware
from app.routers import note_router

# Инициализация таблиц в базе данных
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (настройте для фронтенда)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно указать только конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение маршрутов
app.include_router(note_router.router)
