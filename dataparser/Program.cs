using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Newtonsoft.Json;
#nullable enable

namespace dataparser
{
    class Program
    {
        static void Main(string[] args)
        {
            var dataPath = $"{Directory.GetCurrentDirectory()}\\..\\Data\\JSON";
            var files = DirSearch(dataPath);

            foreach (string f in files)
            {
                var table = Newtonsoft.Json.JsonConvert.DeserializeObject<Table>(System.IO.File.ReadAllText(f));
                var stringData = Newtonsoft.Json.JsonConvert.SerializeObject(table);
                System.IO.File.WriteAllText(f, stringData);
            }
        }

        public class Table
        { 
            public Dictionary<String, data>? Data { get; set; }
        }

        public class data 
        {
            //public data? Data { get; set; }
            public String? Title { get; set; }
            public String? Description { get; set; }
            public List<String>? Items { get; set; }
         }

        // static Object setDatabase(Dictionary<string, object> data, List<string> Name, string subData, int depth, int count) {
        // if (depth == 0) return data;

        // if (Name.Count() > 1) {
        //     Name = Name.Skip(1).ToList();
            
        //     data[Name[0]] = setDatabase(data[Name[0]], Name, subData, --depth, count);
        // } else {
        //     data[Name[0]] = subData[Name[0]];
        // }
        // return data;
        // }

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
