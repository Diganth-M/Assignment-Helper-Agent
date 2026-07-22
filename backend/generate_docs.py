import json
import os
import sys
import subprocess

try:
    from fpdf import FPDF
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])
    from fpdf import FPDF

documents = [
    {
        "id": "java-basics",
        "title": "Java Basics",
        "description": "Learn the fundamentals of Java programming.",
        "topic": "JAVA",
        "estimatedReadingTime": "25 minutes",
        "chapters": [
            {
                "id": "introduction-to-java",
                "title": "Introduction to Java",
                "order": 1,
                "content": [
                    {"type": "paragraph", "text": "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible."},
                    {"type": "paragraph", "text": "It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need to recompile."}
                ]
            },
            {
                "id": "features-of-java",
                "title": "Features of Java",
                "order": 2,
                "content": [
                    {"type": "paragraph", "text": "The primary features of Java include:"},
                    {"type": "paragraph", "text": "- Object-Oriented: In Java, everything is an Object. Java can be easily extended since it is based on the Object model."},
                    {"type": "paragraph", "text": "- Platform Independent: Unlike many other programming languages including C and C++, when Java is compiled, it is not compiled into platform specific machine, rather into platform independent byte code."},
                    {"type": "paragraph", "text": "- Simple: Java is designed to be easy to learn."},
                    {"type": "paragraph", "text": "- Secure: With Java's secure feature it enables to develop virus-free, tamper-free systems."}
                ]
            },
            {
                "id": "jdk-jre-jvm",
                "title": "JDK, JRE, and JVM",
                "order": 3,
                "content": [
                    {"type": "paragraph", "text": "JVM (Java Virtual Machine) is an abstract machine. It is a specification that provides runtime environment in which java bytecode can be executed."},
                    {"type": "paragraph", "text": "JRE (Java Runtime Environment) is the implementation of JVM. It physically exists. It contains a set of libraries + other files that JVM uses at runtime."},
                    {"type": "paragraph", "text": "JDK (Java Development Kit) is a software development environment which is used to develop java applications and applets. It physically exists. It contains JRE + development tools."}
                ]
            },
            {
                "id": "variables-and-data-types",
                "title": "Variables and Data Types",
                "order": 4,
                "content": [
                    {"type": "paragraph", "text": "A variable is a container which holds the value while the Java program is executed. A variable is assigned with a data type."},
                    {"type": "paragraph", "text": "Data types specify the different sizes and values that can be stored in the variable. There are two types of data types in Java:"},
                    {"type": "paragraph", "text": "1. Primitive data types: The primitive data types include boolean, char, byte, short, int, long, float and double."},
                    {"type": "paragraph", "text": "2. Non-primitive data types: The non-primitive data types include Classes, Interfaces, and Arrays."},
                    {"type": "code", "language": "java", "code": "int myNum = 5;\nfloat myFloatNum = 5.99f;\nchar myLetter = 'D';\nboolean myBool = true;\nString myText = \"Hello\";"}
                ]
            },
            {
                "id": "operators",
                "title": "Operators",
                "order": 5,
                "content": [
                    {"type": "paragraph", "text": "Operators are used to perform operations on variables and values."},
                    {"type": "paragraph", "text": "Java divides the operators into the following groups:"},
                    {"type": "paragraph", "text": "- Arithmetic operators (+, -, *, /, %, ++, --)"},
                    {"type": "paragraph", "text": "- Assignment operators (=, +=, -=, *=, /=, %=, etc.)"},
                    {"type": "paragraph", "text": "- Comparison operators (==, !=, >, <, >=, <=)"},
                    {"type": "paragraph", "text": "- Logical operators (&&, ||, !)"},
                    {"type": "paragraph", "text": "- Bitwise operators (&, |, ^, ~, <<, >>, >>>)"}
                ]
            },
            {
                "id": "conditional-statements",
                "title": "Conditional Statements",
                "order": 6,
                "content": [
                    {"type": "paragraph", "text": "Java has the following conditional statements:"},
                    {"type": "paragraph", "text": "- Use if to specify a block of code to be executed, if a specified condition is true"},
                    {"type": "paragraph", "text": "- Use else to specify a block of code to be executed, if the same condition is false"},
                    {"type": "paragraph", "text": "- Use else if to specify a new condition to test, if the first condition is false"},
                    {"type": "paragraph", "text": "- Use switch to specify many alternative blocks of code to be executed"},
                    {"type": "code", "language": "java", "code": "if (time < 18) {\n  System.out.println(\"Good day.\");\n} else {\n  System.out.println(\"Good evening.\");\n}"}
                ]
            },
            {
                "id": "loops",
                "title": "Loops",
                "order": 7,
                "content": [
                    {"type": "paragraph", "text": "Loops can execute a block of code as long as a specified condition is reached."},
                    {"type": "paragraph", "text": "Loops are handy because they save time, reduce errors, and they make code more readable."},
                    {"type": "paragraph", "text": "Java provides while loop, do-while loop, and for loop."},
                    {"type": "code", "language": "java", "code": "for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}"}
                ]
            },
            {
                "id": "arrays",
                "title": "Arrays",
                "order": 8,
                "content": [
                    {"type": "paragraph", "text": "Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value."},
                    {"type": "paragraph", "text": "To declare an array, define the variable type with square brackets:"},
                    {"type": "code", "language": "java", "code": "String[] cars = {\"Volvo\", \"BMW\", \"Ford\", \"Mazda\"};\nSystem.out.println(cars[0]); // Outputs Volvo"}
                ]
            },
            {
                "id": "strings",
                "title": "Strings",
                "order": 9,
                "content": [
                    {"type": "paragraph", "text": "Strings are used for storing text."},
                    {"type": "paragraph", "text": "A String variable contains a collection of characters surrounded by double quotes:"},
                    {"type": "code", "language": "java", "code": "String greeting = \"Hello\";\nSystem.out.println(greeting.length()); // Outputs 5\nSystem.out.println(greeting.toUpperCase()); // Outputs HELLO"}
                ]
            },
            {
                "id": "methods",
                "title": "Methods",
                "order": 10,
                "content": [
                    {"type": "paragraph", "text": "A method is a block of code which only runs when it is called."},
                    {"type": "paragraph", "text": "You can pass data, known as parameters, into a method."},
                    {"type": "paragraph", "text": "Methods are used to perform certain actions, and they are also known as functions."},
                    {"type": "code", "language": "java", "code": "static void myMethod(String fname) {\n  System.out.println(fname + \" Doe\");\n}\n\npublic static void main(String[] args) {\n  myMethod(\"John\");\n}"}
                ]
            },
            {
                "id": "classes-and-objects",
                "title": "Classes and Objects",
                "order": 11,
                "content": [
                    {"type": "paragraph", "text": "Java is an object-oriented programming language. Everything in Java is associated with classes and objects, along with its attributes and methods."},
                    {"type": "paragraph", "text": "A Class is like an object constructor, or a \"blueprint\" for creating objects."},
                    {"type": "code", "language": "java", "code": "public class Main {\n  int x = 5;\n\n  public static void main(String[] args) {\n    Main myObj = new Main();\n    System.out.println(myObj.x);\n  }\n}"}
                ]
            },
            {
                "id": "exception-handling",
                "title": "Exception Handling",
                "order": 12,
                "content": [
                    {"type": "paragraph", "text": "When executing Java code, different errors can occur: coding errors made by the programmer, errors due to wrong input, or other unforeseeable things."},
                    {"type": "paragraph", "text": "When an error occurs, Java will normally stop and generate an error message. The technical term for this is: Java will throw an exception (throw an error)."},
                    {"type": "paragraph", "text": "The try statement allows you to define a block of code to be tested for errors while it is being executed."},
                    {"type": "paragraph", "text": "The catch statement allows you to define a block of code to be executed, if an error occurs in the try block."},
                    {"type": "code", "language": "java", "code": "try {\n  int[] myNumbers = {1, 2, 3};\n  System.out.println(myNumbers[10]);\n} catch (Exception e) {\n  System.out.println(\"Something went wrong.\");\n}"}
                ]
            },
            {
                "id": "collections-basics",
                "title": "Collections Basics",
                "order": 13,
                "content": [
                    {"type": "paragraph", "text": "The Collection framework represents a unified architecture for storing and manipulating a group of objects."},
                    {"type": "paragraph", "text": "It has interfaces like Set, List, Queue, Deque, and classes like ArrayList, Vector, LinkedList, PriorityQueue, HashSet, LinkedHashSet, TreeSet."},
                    {"type": "code", "language": "java", "code": "import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> cars = new ArrayList<String>();\n    cars.add(\"Volvo\");\n    cars.add(\"BMW\");\n    System.out.println(cars);\n  }\n}"}
                ]
            },
            {
                "id": "practice-questions",
                "title": "Practice Questions",
                "order": 14,
                "content": [
                    {"type": "paragraph", "text": "1. What is Java and what are its features?"},
                    {"type": "paragraph", "text": "2. Explain the difference between JDK, JRE, and JVM."},
                    {"type": "paragraph", "text": "3. Write a Java program to print the Fibonacci series."}
                ]
            }
        ]
    },
    {
        "id": "python-basics",
        "title": "Python Basics",
        "description": "Learn Python syntax, variables, lists, functions, and file handling.",
        "topic": "PYTHON",
        "estimatedReadingTime": "20 minutes",
        "chapters": [
            {
                "id": "introduction",
                "title": "Introduction to Python",
                "order": 1,
                "content": [
                    {"type": "paragraph", "text": "Python is a popular programming language. It was created by Guido van Rossum, and released in 1991."},
                    {"type": "paragraph", "text": "It is used for web development (server-side), software development, mathematics, and system scripting."}
                ]
            },
            {
                "id": "variables",
                "title": "Variables and Data Types",
                "order": 2,
                "content": [
                    {"type": "paragraph", "text": "Variables are containers for storing data values. Python has no command for declaring a variable. A variable is created the moment you first assign a value to it."},
                    {"type": "code", "language": "python", "code": "x = 5\ny = \"John\"\nprint(x)\nprint(y)"}
                ]
            },
            {
                "id": "lists",
                "title": "Lists",
                "order": 3,
                "content": [
                    {"type": "paragraph", "text": "Lists are used to store multiple items in a single variable. Lists are created using square brackets."},
                    {"type": "code", "language": "python", "code": "thislist = [\"apple\", \"banana\", \"cherry\"]\nprint(thislist)"}
                ]
            },
             {
                "id": "functions",
                "title": "Functions",
                "order": 4,
                "content": [
                    {"type": "paragraph", "text": "A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result."},
                    {"type": "code", "language": "python", "code": "def my_function(fname):\n  print(fname + \" Refsnes\")\n\nmy_function(\"Emil\")"}
                ]
            },
             {
                "id": "classes",
                "title": "Classes",
                "order": 5,
                "content": [
                    {"type": "paragraph", "text": "Python is an object oriented programming language. Almost everything in Python is an object, with its properties and methods. A Class is like an object constructor."},
                    {"type": "code", "language": "python", "code": "class MyClass:\n  x = 5\n\np1 = MyClass()\nprint(p1.x)"}
                ]
            },
            {
                "id": "practice-questions",
                "title": "Practice Questions",
                "order": 6,
                "content": [
                    {"type": "paragraph", "text": "1. How do you create a variable in Python?"},
                    {"type": "paragraph", "text": "2. What is a list and how is it different from a tuple?"},
                    {"type": "paragraph", "text": "3. Write a Python function that takes a string as input and returns it reversed."}
                ]
            }
        ]
    },
    {
        "id": "oops-concepts",
        "title": "OOP Concepts",
        "description": "Master Object-Oriented Programming principles.",
        "topic": "CS",
        "estimatedReadingTime": "30 minutes",
        "chapters": [
            {
                "id": "introduction",
                "title": "Introduction to OOP",
                "order": 1,
                "content": [
                    {"type": "paragraph", "text": "Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior."}
                ]
            },
            {
                "id": "encapsulation",
                "title": "Encapsulation",
                "order": 2,
                "content": [
                    {"type": "paragraph", "text": "Encapsulation is defined as the wrapping up of data under a single unit. It is the mechanism that binds together code and the data it manipulates. Another way to think about encapsulation is, it is a protective shield that prevents the data from being accessed by the code outside this shield."},
                    {"type": "code", "language": "java", "code": "public class Person {\n  private String name; // restricted access\n\n  // Getter\n  public String getName() {\n    return name;\n  }\n\n  // Setter\n  public void setName(String newName) {\n    this.name = newName;\n  }\n}"}
                ]
            },
            {
                "id": "inheritance",
                "title": "Inheritance",
                "order": 3,
                "content": [
                    {"type": "paragraph", "text": "Inheritance is an important pillar of OOP(Object-Oriented Programming). It is the mechanism in java by which one class is allow to inherit the features(fields and methods) of another class."},
                    {"type": "code", "language": "java", "code": "class Vehicle {\n  protected String brand = \"Ford\";\n  public void honk() {\n    System.out.println(\"Tuut, tuut!\");\n  }\n}\n\nclass Car extends Vehicle {\n  private String modelName = \"Mustang\";\n}"}
                ]
            },
            {
                "id": "polymorphism",
                "title": "Polymorphism",
                "order": 4,
                "content": [
                    {"type": "paragraph", "text": "Polymorphism means \"many forms\", and it occurs when we have many classes that are related to each other by inheritance."},
                    {"type": "code", "language": "java", "code": "class Animal {\n  public void animalSound() {\n    System.out.println(\"The animal makes a sound\");\n  }\n}\n\nclass Pig extends Animal {\n  public void animalSound() {\n    System.out.println(\"The pig says: wee wee\");\n  }\n}"}
                ]
            },
             {
                "id": "abstraction",
                "title": "Abstraction",
                "order": 5,
                "content": [
                    {"type": "paragraph", "text": "Data abstraction is the process of hiding certain details and showing only essential information to the user. Abstraction can be achieved with either abstract classes or interfaces."},
                    {"type": "code", "language": "java", "code": "abstract class Animal {\n  public abstract void animalSound();\n  public void sleep() {\n    System.out.println(\"Zzz\");\n  }\n}"}
                ]
            },
            {
                "id": "practice-questions",
                "title": "Practice Questions",
                "order": 6,
                "content": [
                    {"type": "paragraph", "text": "1. What are the four main principles of OOP?"},
                    {"type": "paragraph", "text": "2. Explain the difference between method overloading and method overriding."},
                    {"type": "paragraph", "text": "3. Why do we need interfaces if we have abstract classes?"}
                ]
            }
        ]
    },
    {
        "id": "sql-basics",
        "title": "SQL Basics",
        "description": "Learn SQL queries, table creation, joins, and database concepts.",
        "topic": "DATABASE",
        "estimatedReadingTime": "20 minutes",
        "chapters": [
             {
                "id": "introduction",
                "title": "Introduction to SQL",
                "order": 1,
                "content": [
                    {"type": "paragraph", "text": "SQL stands for Structured Query Language. SQL lets you access and manipulate databases. SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987."}
                ]
            },
            {
                "id": "select",
                "title": "SELECT Statement",
                "order": 2,
                "content": [
                    {"type": "paragraph", "text": "The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set."},
                    {"type": "code", "language": "sql", "code": "SELECT column1, column2, ...\nFROM table_name;"}
                ]
            },
             {
                "id": "where",
                "title": "WHERE Clause",
                "order": 3,
                "content": [
                    {"type": "paragraph", "text": "The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition."},
                    {"type": "code", "language": "sql", "code": "SELECT * FROM Customers\nWHERE Country='Mexico';"}
                ]
            },
             {
                "id": "joins",
                "title": "Joins",
                "order": 4,
                "content": [
                    {"type": "paragraph", "text": "A JOIN clause is used to combine rows from two or more tables, based on a related column between them."},
                    {"type": "paragraph", "text": "Here are the different types of the JOINs in SQL:"},
                    {"type": "paragraph", "text": "- (INNER) JOIN: Returns records that have matching values in both tables"},
                    {"type": "paragraph", "text": "- LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table"},
                    {"type": "paragraph", "text": "- RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table"},
                    {"type": "paragraph", "text": "- FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table"},
                    {"type": "code", "language": "sql", "code": "SELECT Orders.OrderID, Customers.CustomerName\nFROM Orders\nINNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;"}
                ]
            },
            {
                "id": "practice-questions",
                "title": "Practice Questions",
                "order": 5,
                "content": [
                    {"type": "paragraph", "text": "1. What is a primary key?"},
                    {"type": "paragraph", "text": "2. Write a query to select all records from a table named 'Employees' where 'Salary' is greater than 50000."},
                    {"type": "paragraph", "text": "3. Explain the difference between INNER JOIN and LEFT JOIN."}
                ]
            }
        ]
    }
]

base_dir = r"f:\Project\Assignment Helper Agent\backend\src\main\resources\default-documents"
os.makedirs(os.path.join(base_dir, "content"), exist_ok=True)

# Generate JSON
for doc in documents:
    json_path = os.path.join(base_dir, "content", f"{doc['id']}.json")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)
    print(f"Generated {json_path}")

# Generate PDF
class PDF(FPDF):
    def header(self):
        self.set_font("helvetica", "B", 15)
        self.cell(0, 10, self.title_text, align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(10)

    def chapter_title(self, num, label):
        self.set_font("helvetica", "B", 12)
        self.set_fill_color(200, 220, 255)
        self.cell(0, 6, f"Chapter {num} : {label}", fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(4)

    def chapter_body(self, text):
        self.set_font("helvetica", "", 11)
        self.multi_cell(0, 5, text)
        self.ln()
        
    def chapter_code(self, code):
        self.set_font("courier", "", 10)
        self.set_fill_color(240, 240, 240)
        self.multi_cell(0, 5, code, fill=True)
        self.ln()

for doc in documents:
    pdf = PDF()
    pdf.title_text = doc['title']
    pdf.add_page()
    pdf.set_title(doc['title'])
    
    for idx, chapter in enumerate(doc['chapters']):
        pdf.chapter_title(idx + 1, chapter['title'])
        for item in chapter['content']:
            if item['type'] == 'paragraph':
                # Convert smart quotes to ascii, etc if needed. encode-decode trick for fpdf
                text = item['text'].encode('latin-1', 'replace').decode('latin-1')
                pdf.chapter_body(text)
            elif item['type'] == 'code':
                code = item['code'].encode('latin-1', 'replace').decode('latin-1')
                pdf.chapter_code(code)
                
    pdf_path = os.path.join(base_dir, f"{doc['id']}.pdf")
    pdf.output(pdf_path)
    print(f"Generated {pdf_path}")

print("All default documents generated successfully.")
