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
            TicTacToe();
        }
        public static void TicTacToe()
        {
            string a = "a", b = "b", c = "c", d = "d", e = "e", f = "f", g = "g", h = "h", i = "i";
            string currentPlayer = "X";
            int turn = 1;
            while (turn < 10)
            {

                if (turn % 2 == 0)
                    currentPlayer = "O";
                else
                    currentPlayer = "X";
                Console.WriteLine("\nTurn " + turn + ": Player " + currentPlayer);
                Console.WriteLine(PrintBoard(a, b, c, d, e, f, g, h, i));
                Console.Write("\nWhat's your move? (Enter a letter on the board): ");
                string userInput = Console.ReadLine();
                if (userInput == "a" && a != "X" && a != "O")
                    a = currentPlayer;
                else if (userInput == "b" && b != "X" && b != "O")
                    b = currentPlayer;
                else if (userInput == "c" && c != "X" && c != "O")
                    c = currentPlayer;
                else if (userInput == "d" && d != "X" && d != "O")
                    d = currentPlayer;
                else if (userInput == "e" && e != "X" && e != "O")
                    e = currentPlayer;
                else if (userInput == "f" && f != "X" && f != "O")
                    f = currentPlayer;
                else if (userInput == "g" && g != "X" && g != "O")
                    g = currentPlayer;
                else if (userInput == "h" && h != "X" && h != "O")
                    h = currentPlayer;
                else if (userInput == "i" && i != "X" && i != "O")
                    i = currentPlayer;
                else
                {
                    Console.WriteLine("Invalid");
                    turn--;
                }
                turn++;
                if (Winner(a,b,c,d,e,f,g,h,i) != "")
                {
                    Console.WriteLine("\n" + PrintBoard(a,b,c,d,e,f,g,h,i) + "\nThe winner is " + Winner(a, b, c, d, e, f, g, h, i));
                    return;
                }
            }
            Console.WriteLine("\nIt's a tie!");
        }
        public static string PrintBoard(string a, string b, string c, string d, string e, string f, string g, string h, string i)
        {
            string board = " " + a + " | " + b + " | " + c + "\n ---------\n " + d + " | " + e + " | " + f + "\n ---------\n " + g + " | " + h + " | " + i;
            return board;
        }
        public static string Winner(string a, string b, string c, string d, string e, string f, string g, string h, string i)
        {
            string winner = "";
            if (a == b && a == c) //1st row
                winner = a;
            else if (d == e && d == f) //2nd row
                winner = d;
            else if (g == h && g == i) //3rd row
                winner = g;
            else if (a == d && a == g) //1st col
                winner = a;
            else if (b == e && b == h) //2nd col
                winner = b;
            else if (c == f && c == i) //3rd col
                winner = c;
            else if (a == e && a == i) //1st diag
                winner = a;
            else if (c == e && c == g) //2nd diag
                winner = c;
            else
                winner = "";
            return winner;
        }
    }
}
