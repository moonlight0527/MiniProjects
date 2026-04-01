import tkinter as tk
from tkinter import filedialog, messagebox
import pygame
import json
import os
import time
import threading

# init pygame
pygame.mixer.init()

SAVE_FILE = "playlist.json"

# load playlist
if os.path.exists(SAVE_FILE):
    with open(SAVE_FILE, "r") as f:
        playlist = json.load(f)
else:
    playlist = []

current_index = 0
paused = False

# ---------------- SAVE ---------------- #
def save_playlist():
    with open(SAVE_FILE, "w") as f:
        json.dump(playlist, f)

# ---------------- LISTBOX ---------------- #
def update_listbox():
    listbox.delete(0, tk.END)
    for song in playlist:
        listbox.insert(tk.END, os.path.basename(song))

# ---------------- ADD / REMOVE ---------------- #
def add_song():
    file = filedialog.askopenfilename(filetypes=[("Audio Files", "*.mp3 *.wav")])
    if file:
        playlist.append(file)
        save_playlist()
        update_listbox()

def remove_song():
    selected = listbox.curselection()
    if selected:
        playlist.pop(selected[0])
        save_playlist()
        update_listbox()

# ---------------- PLAYBACK ---------------- #
def play_song():
    global current_index, paused
    selected = listbox.curselection()
    if selected:
        current_index = selected[0]
        paused = False
        play_current()

def play_current():
    try:
        pygame.mixer.music.load(playlist[current_index])
        pygame.mixer.music.play()
        now_playing.config(text=os.path.basename(playlist[current_index]))
        update_duration()
    except:
        messagebox.showerror("Error", "Could not play file.")

def pause_resume():
    global paused
    if not paused:
        pygame.mixer.music.pause()
        paused = True
        pause_btn.config(text="Resume")
    else:
        pygame.mixer.music.unpause()
        paused = False
        pause_btn.config(text="Pause")

def stop_song():
    pygame.mixer.music.stop()
    now_playing.config(text="Stopped")
    duration_label.config(text="00:00 / 00:00")

def next_song():
    global current_index
    if playlist:
        current_index = (current_index + 1) % len(playlist)
        play_current()
        select_current()

def prev_song():
    global current_index
    if playlist:
        current_index = (current_index - 1) % len(playlist)
        play_current()
        select_current()

def select_current():
    listbox.select_clear(0, tk.END)
    listbox.select_set(current_index)

# ---------------- AUTO NEXT ---------------- #
def auto_next():
    while True:
        if not pygame.mixer.music.get_busy() and not paused and playlist:
            time.sleep(1)
            next_song()
        time.sleep(1)

# ---------------- DURATION ---------------- #
def format_time(sec):
    return f"{int(sec//60):02}:{int(sec%60):02}"

def update_duration():
    def run():
        try:
            sound = pygame.mixer.Sound(playlist[current_index])
            total = sound.get_length()
            while pygame.mixer.music.get_busy():
                current = pygame.mixer.music.get_pos() / 1000
                duration_label.config(
                    text=f"{format_time(current)} / {format_time(total)}"
                )
                time.sleep(1)
        except:
            pass
    threading.Thread(target=run, daemon=True).start()

# ---------------- DRAG & DROP ---------------- #
drag_index = None

def on_drag_start(event):
    global drag_index
    drag_index = listbox.nearest(event.y)

def on_drag_motion(event):
    global drag_index
    new_index = listbox.nearest(event.y)
    if new_index != drag_index:
        playlist.insert(new_index, playlist.pop(drag_index))
        drag_index = new_index
        update_listbox()
        save_playlist()

def on_drag_release(event):
    save_playlist()

# ---------------- GUI ---------------- #
root = tk.Tk()
root.title("Playlist Manager")
root.geometry("500x600")

main_frame = tk.Frame(root)
main_frame.place(relx=0.5, rely=0.5, anchor="center")

listbox = tk.Listbox(main_frame, width=50, height=15)
listbox.pack(pady=10)

# drag bindings
listbox.bind("<Button-1>", on_drag_start)
listbox.bind("<B1-Motion>", on_drag_motion)
listbox.bind("<ButtonRelease-1>", on_drag_release)

btn_frame = tk.Frame(main_frame)
btn_frame.pack(pady=10)

tk.Button(btn_frame, text="Add", width=10, command=add_song).grid(row=0, column=0, padx=5)
tk.Button(btn_frame, text="Remove", width=10, command=remove_song).grid(row=0, column=1, padx=5)

tk.Button(btn_frame, text="Play", width=10, command=play_song).grid(row=1, column=0, padx=5, pady=5)
pause_btn = tk.Button(btn_frame, text="Pause", width=10, command=pause_resume)
pause_btn.grid(row=1, column=1, padx=5, pady=5)

tk.Button(btn_frame, text="Prev", width=10, command=prev_song).grid(row=2, column=0, padx=5)
tk.Button(btn_frame, text="Next", width=10, command=next_song).grid(row=2, column=1, padx=5)

tk.Button(main_frame, text="Stop", width=22, command=stop_song).pack(pady=5)

now_playing = tk.Label(main_frame, text="No song playing", wraplength=400)
now_playing.pack(pady=10)

duration_label = tk.Label(main_frame, text="00:00 / 00:00")
duration_label.pack()

update_listbox()

# start auto-next thread
threading.Thread(target=auto_next, daemon=True).start()

root.mainloop()
