from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("/notes/", response_model=list[schemas.Note])
def get_notes(db: Session = Depends(get_db)):
    return crud.get_notes(db)

@router.post("/notes/", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db, note)

@router.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = crud.get_note(db, note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    crud.delete_note(db, note_id)
    return {"message": "Note deleted"}

@router.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteUpdate, db: Session = Depends(get_db)):
    existing_note = crud.get_note(db, note_id)
    if existing_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return crud.update_note(db, note_id, note)
