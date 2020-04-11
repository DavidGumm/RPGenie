using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using System.Diagnostics;
#nullable enable

namespace dataparser
{
    class Program
    {
        static void Main(string[] args)
        {
            foreach (string arg in args)
            {
                switch (arg.Substring(0, 2).ToLower())
                {
                    case "-clear":
                        Console.Clear();
                        break;
                    default:
                        // do other stuff...
                        break;
                }
            }

            var stopwatch = new Stopwatch();
            stopwatch.Start();
            
            Console.WriteLine("Starting parser.");
            var dataPath = $"{Directory.GetCurrentDirectory()}\\..\\Data\\JSON\\";
            var files = DirSearch(dataPath);
            Console.WriteLine($"Files located: {files.Count }");

            JObject? table = null;
            Console.WriteLine($"Reading files.");
            int count = 1;
            foreach (string f in files)
            {
                var path = f.Replace(dataPath, "").Replace(".JSON", "").Split("\\");
                Console.Write($"\rReading file {count++} - {path[path.Count()-1]}");

                //table = JObject.Parse(System.IO.File.ReadAllText(f));
                //var tableName = table.Properties().Select(p => p.Name).FirstOrDefault();
                //table[tableName]
                //var stringData = Newtonsoft.Json.JsonConvert.SerializeObject(table[tableName]);


                //System.IO.File.WriteAllText(f, stringData);
                //return;
            }
            stopwatch.Start();
            Console.WriteLine();
            Console.WriteLine("Finished reading files.");
            Console.WriteLine($"Runtime: {stopwatch.ElapsedMilliseconds.ToString()}ms.");
        }

        static JObject setDatabase(JObject data, List<string> Name, JObject subData, int depth, int count) {
        if (depth == 0) return data;

        if (Name.Count() > 1) {
            Name = Name.Skip(1).ToList();
            
            //data[Name[0]] = setDatabase(data[Name[0]], Name, subData, --depth, count);
        } else {
            data[Name[0]] = subData[Name[0]];
        }
        return data;
        }

        static List<string> DirSearch(string sDir)
        {
            var files = new List<string>();
            try
            {
                foreach (string f in Directory.GetFiles(sDir))
                {
                    files.Add(f);
                }
                foreach (string d in Directory.GetDirectories(sDir))
                {
                    foreach (string f in Directory.GetFiles(d))
                    {
                        files.Add(f);
                    }
                    DirSearch(d);
                }
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception.Message);
            }
            return files;
        }
    }
}
