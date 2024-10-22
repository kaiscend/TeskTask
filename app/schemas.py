from pydantic import BaseModel

class NoteCreate(BaseModel):
    title: str
    description: str

class NoteUpdate(BaseModel):
    title: str
    description: str

class Note(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        orm_mode = True
