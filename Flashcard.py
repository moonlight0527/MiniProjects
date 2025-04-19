import json
import random
import matplotlib.pyplot as plt
import os
import platform

# clear the screen
def clear_screen():
    # Check the operating system
    current_platform = platform.system().lower()
    if current_platform == "windows":
        os.system("cls")  # Windows
    else:
        os.system("clear")  # macOS/Linux

# add a flashcard to the list
def add_flashcard(flashcards):
    question = input("Enter question: ")
    answer = input("Enter answer: ")
    flashcards.append({"question": question, "answer": answer})
    save_flashcards(flashcards)

# save flashcards to a JSON file
def save_flashcards(flashcards):
    with open("flashcards.json", "w") as f:
        json.dump(flashcards, f)

# load flashcards from the JSON file
def load_flashcards():
    try:
        with open("flashcards.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# quiz the user with random flashcards
def quiz(flashcards):
    score = 0  
    total_questions = len(flashcards)

    if total_questions == 0:
        print("No flashcards available to quiz. Please add some flashcards first.")
        return 0  # if no flashcards are present

    print(f"\nStarting quiz with {total_questions} questions...\n")

    # Shuffle flashcards to randomize the quiz order
    random.shuffle(flashcards)

    for flashcard in flashcards:
        print(f"Question: {flashcard['question']}")
        user_answer = input("Your answer: ")

        # Check if the answer is correct (case-insensitive comparison)
        if user_answer.strip().lower() == flashcard['answer'].strip().lower():
            print("Correct!")
            score += 1
        else:
            print(f"Incorrect! The correct answer is: {flashcard['answer']}")

        print()  # Add an empty line for readability

    print(f"Quiz complete! You got {score} out of {total_questions} correct.")

    # Calculate and return the score as a percentage
    score_percentage = (score / total_questions) * 100 if total_questions > 0 else 0
    return score_percentage  

# view the flashcards
def view_flashcards(flashcards):
    if not flashcards:
        print("No flashcards available.\n")
        return
    print("Current Flashcards:")
    for flashcard in flashcards:
        print(f"Question: {flashcard['question']} | Answer: {flashcard['answer']}")
    print()

# plot the score progress as percentage
def plot_scores(score_history):
    if len(score_history) > 0:
        plt.plot(range(1, len(score_history) + 1), score_history, marker='o', color='b', label='Score Percentage')
        plt.xlabel("Quiz Number")
        plt.ylabel("Score Percentage (%)")
        plt.title("Quiz Score Progress (%)")
        plt.grid(True)
        plt.legend()
        plt.show()

# Main function to run the flashcard app
def main():
    flashcards = load_flashcards()
    score_history = []  # List to store percentage scores after each quiz
    
    while True:
        clear_screen()  # Clear the screen after every interaction
        print("Flashcard Learning")
        print("1. Add Flashcard")
        print("2. Take Quiz")
        print("3. View Flashcards")
        print("4. View Score Progress")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            add_flashcard(flashcards)
        elif choice == '2':
            score_percentage = quiz(flashcards)
            if score_percentage > 0:
                score_history.append(score_percentage)  # Save the percentage score 
        elif choice == '3':
            view_flashcards(flashcards)
        elif choice == '4':
            plot_scores(score_history)  # Plot score percentage history
        elif choice == '5':
            print("Exiting Flashcard Learning App.")
            break
        else:
            print("Invalid choice. Please try again.")
        input("Press Enter to continue...")  # press Enter before continuing

if __name__ == "__main__":
    main()