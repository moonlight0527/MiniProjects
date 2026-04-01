import tkinter as tk
from tkinter import filedialog, messagebox
import pygame
import json
import os

# initialize pygame
pygame.mixer.init()

# file to save playlist
SAVE_FILE = "playlist.json"

# load playlist if exists
if os.path.exists(SAVE_FILE):
    with open(SAVE_FILE, "r") as f:
        playlist = json.load(f)
else:
    playlist = []

current_index = 0


# save playlist
def save_playlist():
    with open(SAVE_FILE, "w") as f:
        json.dump(playlist, f)


# refresh listbox
def update_listbox():
    listbox.delete(0, tk.END)
    for song in playlist:
        listbox.insert(tk.END, os.path.basename(song))


# add song
def add_song():
    file = filedialog.askopenfilename(filetypes=[("Audio Files", "*.mp3 *.wav")])
    if file:
        playlist.append(file)
        save_playlist()
        update_listbox()


# remove song
def remove_song():
    selected = listbox.curselection()
    if selected:
        index = selected[0]
        playlist.pop(index)
        save_playlist()
        update_listbox()


# play selected
def play_song():
    global current_index
    selected = listbox.curselection()
    if selected:
        current_index = selected[0]
        play_current()


# play current song
def play_current():
    try:
        pygame.mixer.music.load(playlist[current_index])
        pygame.mixer.music.play()
        now_playing_label.config(text="Now Playing: " + os.path.basename(playlist[current_index]))
    except:
        messagebox.showerror("Error", "Could not play file.")


# next song
def next_song():
    global current_index
    if playlist:
        current_index = (current_index + 1) % len(playlist)
        play_current()
        listbox.select_clear(0, tk.END)
        listbox.select_set(current_index)


# previous song
def prev_song():
    global current_index
    if playlist:
        current_index = (current_index - 1) % len(playlist)
        play_current()
        listbox.select_clear(0, tk.END)
        listbox.select_set(current_index)


# stop song
def stop_song():
    pygame.mixer.music.stop()
    now_playing_label.config(text="Stopped")


# ---------------- GUI ---------------- #

root = tk.Tk()
root.title("Playlist Manager")
root.geometry("400x500")

# listbox
listbox = tk.Listbox(root, width=50, height=15)
listbox.pack(pady=10)

# buttons
btn_frame = tk.Frame(root)
btn_frame.pack()

tk.Button(btn_frame, text="Add Song", command=add_song).grid(row=0, column=0, padx=5)
tk.Button(btn_frame, text="Remove Song", command=remove_song).grid(row=0, column=1, padx=5)

tk.Button(btn_frame, text="Play", command=play_song).grid(row=1, column=0, padx=5, pady=5)
tk.Button(btn_frame, text="Stop", command=stop_song).grid(row=1, column=1, padx=5, pady=5)

tk.Button(btn_frame, text="Previous", command=prev_song).grid(row=2, column=0, padx=5)
tk.Button(btn_frame, text="Next", command=next_song).grid(row=2, column=1, padx=5)

# now playing label
now_playing_label = tk.Label(root, text="No song playing", wraplength=300)
now_playing_label.pack(pady=10)

# load existing songs
update_listbox()

# run app
root.mainloop()