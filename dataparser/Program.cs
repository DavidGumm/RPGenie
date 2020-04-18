using System;
using System.Text.Json;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using System.Diagnostics;
using System.Xml;
#nullable enable

namespace dataparser
{
    class Program
    {
        public static bool __verbose { get; set; }
        public static bool __parseJson { get; set; }
        public static bool __parseXml { get; set; }
        public static Newtonsoft.Json.Formatting __compressJson { get; set; }
        public static Newtonsoft.Json.Formatting __compressXlm { get; set; }

        public static void setArguments(string[] args) 
        {
            __verbose = false;
            __parseJson = false;
            __parseXml = false;
            __compressJson = Newtonsoft.Json.Formatting.Indented;
            __compressXlm = Newtonsoft.Json.Formatting.Indented;

            foreach (string arg in args)
            {
                switch (arg.Substring(0, 2).ToLower())
                {
                    case "-clear":
                        Console.Clear();
                        break;
                    case "-verbose":
                        __verbose = true;
                        break;
                    case "-parse json":
                        __parseJson = true;
                        break;
                    case "-parse xml":
                        __parseXml = true;
                        break;
                   case "-compress json":
                        __compressJson = Newtonsoft.Json.Formatting.None;
                        break;
                   case "-compress xlm":
                        __compressXlm = Newtonsoft.Json.Formatting.None;
                        break;
                    default:
                        // do the default stuff...
                        break;
                }
            }
        }

        static void Main(string[] args)
        {
            setArguments(new []{"-parse json"});
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            Console.WriteLine("");
            Console.WriteLine("Starting parser.");

            if (__parseXml) 
            {
                parseXml();
            }

            if (__parseJson) 
            {
                parseJSON();
            }
            parseJSON();

            stopwatch.Start();
            Console.WriteLine();
            Console.WriteLine("Finished.");
            Console.WriteLine($"Runtime: {stopwatch.ElapsedMilliseconds.ToString()}ms.");
        }

        static void parseXml()
        { 
            var dataPath = $"{Directory.GetCurrentDirectory()}\\..\\Data\\db.xml";
            XmlDocument document = new XmlDocument();
            document.Load(dataPath);
            string data = JsonConvert.SerializeXmlNode(document);
            
            System.IO.File.WriteAllText($"{dataPath}\\..\\db.json", data);
        }

        static void parseJSON() 
        {
            var dataPath = $"{Directory.GetCurrentDirectory()}\\..\\Data\\JSON\\";
            var files = DirSearch(dataPath);
            Console.WriteLine($"Files located: {files.Count}");

            JToken Database = JToken.Parse("{}");
            Console.WriteLine($"Reading files.");
            int count = 1;
            foreach (string f in files)
            {
                JToken? table = null;
                var path = f.Replace(dataPath, "").Replace(".JSON", "").Split("\\").ToList();
                var fileName = path[path.Count() - 1];
                decimal percent = (count/files.Count) * 100;
                Console.Write($"\r { Math.Round(percent) }% compleat. Reading file {count++} - {fileName}                                                                                ");

                table = JToken.Parse(System.IO.File.ReadAllText(f));
                var tableName = table.Children<JProperty>().Select(P => P.Name).FirstOrDefault();

                if (tableName == fileName)
                {
                    table = JToken.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(table[tableName]));
                    System.IO.File.WriteAllText(f, table.ToString(__compressJson));
                }

                Database = setDatabase(Database, path, table, 0, 64);
            }
            var output = Newtonsoft.Json.JsonConvert.SerializeObject(Database);
            System.IO.File.WriteAllText($"{dataPath}\\..\\database.json", output);
            System.IO.File.WriteAllText($"{dataPath}\\..\\..\\js\\database.js", $"let database = {output};");

            Console.WriteLine($"Datasize: {output.Count()} bytes");
        }

        static void writeError(String[] args, Exception error) 
        {
            Console.WriteLine("");
            Console.ForegroundColor = ConsoleColor.Red;
            foreach (var arg in args)
            { 
                Console.WriteLine(arg);
            }
                    Console.WriteLine("");
                    Console.WriteLine($"{error.Message}");
                    Console.WriteLine($"{error.StackTrace}");
                    Console.ResetColor();
                    Console.WriteLine("");

        }
        static JToken setDatabase(JToken data, List<string> Path, JToken table, int depth, int maxDepth) {
            if (depth > maxDepth ) return data;

            var path = Path.Skip(depth).FirstOrDefault();
            var properties = data.Children<JProperty>().Select(P => P.Name).ToList();

            if (!properties.Contains(path))
            {
                data[path] = JObject.Parse("{}");
            }


            if (Path.Count() > 1 && depth < Path.Count()-1) {
                try 
                {
                    data[path] = setDatabase(data[path], Path, table, ++depth, maxDepth);
                }
                catch (Exception error)
                {
                    string[] args = new String[]{
                        "",
                        "setDatabase",
                        "",
                        $"at Depth:{(depth + 1)}",
                        $"at Path:{String.Join(" -> ", Path)}"};
                    writeError(args, error);
                }
            } else {
                try
                {
                    data[path] = table;
                }
                catch (Exception error)
                {
                    string[] args = new String[]{"",
                        data.ToString(),
                        "",
                        "else",
                        "",
                        $"at Depth:{(depth + 1)}",
                        $"at Path:{String.Join(" -> ", Path)}"};
                    writeError(args, error);
                }
            }
            return data;
        }

        static List<string> DirSearch(string sDir)
        {
            return Directory.GetFiles(sDir, "*.JSON", SearchOption.AllDirectories).ToList();
        }
    }
}
