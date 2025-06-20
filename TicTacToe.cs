using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Numerics;
using System.Reflection;
using System.Text;

namespace TicTacToe
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to TicTacToe");
            Console.Write("Press Enter to Play");
            if (Console.ReadKey().Key == ConsoleKey.Enter)
            {
                Console.Clear();
                Instructions();
            }
        }

        public static void Instructions()
        {
            string a = "1", b = "2", c = "3", d = "4", e = "5", f = "6", g = "7", h = "8", i = "9";
            Console.WriteLine("When making your move, enter the number corresponding with where you want to move");
            Console.WriteLine("\n" + PrintBoard(a, b, c, d, e, f, g, h, i));
            Console.WriteLine("\nPress Enter to Start");
            if (Console.ReadKey().Key == ConsoleKey.Enter)
            {
                Console.Clear();
                TicTacToe();
            }
        }
        
        public static void TicTacToe()
        {
            string a = " ", b = " ", c = " ", d = " ", e = " ", f = " ", g = " ", h = " ", i = " ";
            string currentPlayer = "X";
            for (int turn = 1; turn<10; turn++)
            {
                if (turn % 2 == 0)
                    currentPlayer = "O";
                else
                    currentPlayer = "X";
                Console.WriteLine("Turn " + turn + ": Player " + currentPlayer);
                Console.WriteLine(PrintBoard(a, b, c, d, e, f, g, h, i));
                Console.Write("\nWhat's your move? \n(Enter # 1-9): ");
                string userInput = Console.ReadLine();
                if (userInput == "1" && a != "X" && a != "O")
                    a = currentPlayer;
                else if (userInput == "2" && b != "X" && b != "O")
                    b = currentPlayer;
                else if (userInput == "3" && c != "X" && c != "O")
                    c = currentPlayer;
                else if (userInput == "4" && d != "X" && d != "O")
                    d = currentPlayer;
                else if (userInput == "5" && e != "X" && e != "O")
                    e = currentPlayer;
                else if (userInput == "6" && f != "X" && f != "O")
                    f = currentPlayer;
                else if (userInput == "7" && g != "X" && g != "O")
                    g = currentPlayer;
                else if (userInput == "8" && h != "X" && h != "O")
                    h = currentPlayer;
                else if (userInput == "9" && i != "X" && i != "O")
                    i = currentPlayer;
                else
                    turn--;
                Console.Clear();
                if (Winner(a, b, c, d, e, f, g, h, i) != "")
                {
                    Console.WriteLine(PrintBoard(a, b, c, d, e, f, g, h, i) + "\n\nThe winner is " + Winner(a, b, c, d, e, f, g, h, i));
                    return;
                }
            }
            Console.WriteLine(PrintBoard(a, b, c, d, e, f, g, h, i) + "\n\nIt's a tie!");
        }
        
        public static string PrintBoard(string a, string b, string c, string d, string e, string f, string g, string h, string i)
        {
             string board = " " + a + " | " + b + " | " + c + "\n ---------\n " + d + " | " + e + " | " + f + "\n ---------\n " + g + " | " + h + " | " + i;
            return board;
        }
        
        public static string Winner(string a, string b, string c, string d, string e, string f, string g, string h, string i)
        {
             string winner = "";
            if (a == b && a == c && a != " ") 
                winner = a;
            else if (d == e && d == f && d != " ") 
                winner = d;
            else if (g == h && g == i && g != " ") 
                winner = g;
            else if (a == d && a == g && a != " ") 
                winner = a;
            else if (b == e && b == h && b != " ") 
                winner = b;
            else if (c == f && c == i && c != " ") 
                winner = c;
            else if (a == e && a == i && a != " ") 
                winner = a;
            else if (c == e && c == g && c != " ") 
                winner = c;
            else
                winner = "";
            return winner;
        }
    }
}
